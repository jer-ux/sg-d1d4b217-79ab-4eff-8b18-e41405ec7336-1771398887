# Snowflake Secrets Management for War Room Integration

## Overview

This guide covers secure credential management for the Snowflake → War Room integration using Snowflake's native secrets feature.

---

## Why Use Snowflake Secrets?

**Without Secrets** (hardcoded tokens):
```sql
CREATE OR REPLACE EXTERNAL FUNCTION POST_TO_KIQ_WARROOM(payload STRING)
  HEADERS = ('x-kiq-ingest-token' = 'abc123hardcoded')  -- ❌ Bad!
  AS 'https://yourdomain.com/api/war-room/ingest';
```

**Problems**:
- Token visible in Snowflake query history
- Token visible to anyone with `SHOW FUNCTIONS` privilege
- Token rotation requires `CREATE OR REPLACE` (drops permissions)
- Audit trail shows token in plaintext

**With Secrets** (stored procedure):
```python
def run(session):
    token = session.get_secret("INGEST_TOKEN")  # ✅ Good!
```

**Benefits**:
- Token encrypted at rest
- Token never appears in query history
- Token rotation without redeploying code
- Fine-grained access control (USAGE privilege on secret)
- Audit trail shows secret name, not value

---

## Setup: Create Secret

```sql
-- Create secret (run as ACCOUNTADMIN)
USE ROLE ACCOUNTADMIN;

CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'a1b2c3d4e5f6...your-64-char-token';

-- Grant usage to service account
GRANT USAGE ON SECRET KIQ_INGEST_TOKEN_SECRET TO ROLE KIQ_SERVICE_ROLE;
```

### Verify Secret Created

```sql
-- List secrets (won't show actual value)
SHOW SECRETS LIKE 'KIQ_INGEST_TOKEN_SECRET';

-- Describe secret
DESC SECRET KIQ_INGEST_TOKEN_SECRET;
```

**Output**:
```
name                        | type           | created_on          | owner
----------------------------|----------------|---------------------|-------
KIQ_INGEST_TOKEN_SECRET     | GENERIC_STRING | 2026-01-24 12:00:00 | ACCOUNTADMIN
```

---

## Token Generation Best Practices

### Generate Secure Token (64 characters)

```bash
# Option 1: OpenSSL (recommended)
openssl rand -hex 32
# Output: a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456

# Option 2: Python
python3 -c "import secrets; print(secrets.token_hex(32))"

# Option 3: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Store in Both Systems

```sql
-- 1. Snowflake Secret
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'a1b2c3d4...';
```

```bash
# 2. Vercel Environment Variable
vercel env add KIQ_INGEST_TOKEN production
# Paste token when prompted

# Or via CLI
echo "a1b2c3d4..." | vercel env add KIQ_INGEST_TOKEN production --stdin
```

---

## Token Rotation Workflow

### Scenario: Rotate token every 90 days

```sql
-- Step 1: Generate new token
-- (use openssl rand -hex 32)

-- Step 2: Update Snowflake secret
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'NEW_TOKEN_HERE';

-- Step 3: Update Vercel
-- vercel env rm KIQ_INGEST_TOKEN production
-- vercel env add KIQ_INGEST_TOKEN production
-- (paste new token)

-- Step 4: Deploy Vercel
-- vercel --prod

-- Step 5: Test delivery
CALL KIQ.PUSH_WARROOM_EVENTS();

-- Step 6: Verify in delivery log
SELECT * FROM KIQ.WARROOM_DELIVERY_LOG
WHERE DELIVERED_AT > DATEADD('minute', -5, CURRENT_TIMESTAMP())
  AND HTTP_STATUS BETWEEN 200 AND 299;
```

**Critical**: Update both systems before testing. If Snowflake uses new token but Vercel still has old token, all deliveries will fail with 401 Unauthorized.

---

## Access Control

### Grant Secret Usage to Service Account

```sql
-- Create service role (if not exists)
CREATE ROLE IF NOT EXISTS KIQ_SERVICE_ROLE;

-- Grant secret usage
GRANT USAGE ON SECRET KIQ_INGEST_TOKEN_SECRET TO ROLE KIQ_SERVICE_ROLE;

-- Grant procedure execution
GRANT USAGE ON PROCEDURE KIQ.PUSH_WARROOM_EVENTS() TO ROLE KIQ_SERVICE_ROLE;

-- Assign role to service user
GRANT ROLE KIQ_SERVICE_ROLE TO USER kiq_service_user;
```

### Test Access

```sql
-- Switch to service role
USE ROLE KIQ_SERVICE_ROLE;

-- Try to call procedure (should work)
CALL KIQ.PUSH_WARROOM_EVENTS();

-- Try to read secret directly (should fail)
SELECT SYSTEM$GET_SECRET('KIQ_INGEST_TOKEN_SECRET');
-- Error: Insufficient privileges
```

**Note**: Secrets can only be accessed via `session.get_secret()` inside stored procedures with proper grants, not via direct SQL queries.

---

## Audit Trail

### Track Secret Access

```sql
-- Query access history (requires ACCOUNTADMIN)
USE ROLE ACCOUNTADMIN;

SELECT 
  QUERY_TEXT,
  USER_NAME,
  ROLE_NAME,
  EXECUTION_STATUS,
  START_TIME,
  END_TIME
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE QUERY_TEXT ILIKE '%KIQ_INGEST_TOKEN_SECRET%'
  AND START_TIME > DATEADD('day', -7, CURRENT_TIMESTAMP())
ORDER BY START_TIME DESC;
```

**Safe Queries** (expected):
```sql
-- Creating secret (ACCOUNTADMIN)
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET...

-- Describing secret (metadata only)
DESC SECRET KIQ_INGEST_TOKEN_SECRET;

-- Granting usage
GRANT USAGE ON SECRET KIQ_INGEST_TOKEN_SECRET...
```

**Suspicious Queries** (investigate):
```sql
-- Direct access attempts (should fail)
SELECT SYSTEM$GET_SECRET('KIQ_INGEST_TOKEN_SECRET');

-- Unexpected role using secret
-- (e.g., ANALYST_ROLE calling procedure when only SERVICE_ROLE should)
```

---

## Disaster Recovery

### Backup Secret Metadata

```sql
-- Export secret metadata (not actual value)
SELECT 
  name,
  schema_name,
  owner,
  comment,
  created_on
FROM SNOWFLAKE.ACCOUNT_USAGE.SECRETS
WHERE name = 'KIQ_INGEST_TOKEN_SECRET';
```

**Save output** to secure location (e.g., password manager, encrypted vault).

### Restore Secret

If secret is accidentally dropped:

```sql
-- Restore from backup
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET
  TYPE = GENERIC_STRING
  SECRET_STRING = 'BACKUP_TOKEN_FROM_PASSWORD_MANAGER';

-- Re-grant permissions
GRANT USAGE ON SECRET KIQ_INGEST_TOKEN_SECRET TO ROLE KIQ_SERVICE_ROLE;

-- Test
CALL KIQ.PUSH_WARROOM_EVENTS();
```

---

## Multi-Environment Setup

### Development Environment

```sql
-- Create dev secret
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET_DEV
  TYPE = GENERIC_STRING
  SECRET_STRING = 'dev-token-12345...';

-- Update procedure to use dev secret
CREATE OR REPLACE PROCEDURE KIQ.PUSH_WARROOM_EVENTS_DEV()
...
SECRETS = ('INGEST_TOKEN' = KIQ_INGEST_TOKEN_SECRET_DEV)
AS
$$
def run(session):
    endpoint = "https://dev.yourdomain.com/api/war-room/ingest"
    token = session.get_secret("INGEST_TOKEN")
    ...
$$;
```

### Production Environment

```sql
-- Create prod secret
CREATE OR REPLACE SECRET KIQ_INGEST_TOKEN_SECRET_PROD
  TYPE = GENERIC_STRING
  SECRET_STRING = 'prod-token-67890...';

-- Update procedure to use prod secret
CREATE OR REPLACE PROCEDURE KIQ.PUSH_WARROOM_EVENTS_PROD()
...
SECRETS = ('INGEST_TOKEN' = KIQ_INGEST_TOKEN_SECRET_PROD)
AS
$$
def run(session):
    endpoint = "https://yourdomain.com/api/war-room/ingest"
    token = session.get_secret("INGEST_TOKEN")
    ...
$$;
```

### Environment Promotion

```sql
-- Promote from dev to prod (test first!)
-- 1. Test in dev
CALL KIQ.PUSH_WARROOM_EVENTS_DEV();

-- 2. If successful, promote code to prod
--    (update endpoint + secret name in prod procedure)

-- 3. Test in prod
CALL KIQ.PUSH_WARROOM_EVENTS_PROD();
```

---

## Security Checklist

- [ ] Token generated with cryptographically secure RNG (openssl/crypto)
- [ ] Token is at least 32 bytes (64 hex characters)
- [ ] Token stored in Snowflake secret (not hardcoded)
- [ ] Token stored in Vercel environment variable (not in code)
- [ ] Secret USAGE granted only to service role (not PUBLIC)
- [ ] Token rotation schedule defined (every 90 days recommended)
- [ ] Backup token stored in password manager (encrypted)
- [ ] Audit queries reviewed monthly for suspicious access
- [ ] Development and production secrets are different
- [ ] Old tokens revoked after rotation (don't reuse)

---

## Common Mistakes to Avoid

### ❌ Hardcoding Token in SQL

```sql
-- DON'T DO THIS
CREATE EXTERNAL FUNCTION POST_TO_KIQ_WARROOM(payload STRING)
  HEADERS = ('x-kiq-ingest-token' = 'abc123')  -- ❌ Visible in SHOW FUNCTIONS
  AS 'https://yourdomain.com/api/war-room/ingest';
```

### ❌ Committing Token to Git

```python
# DON'T DO THIS
def run(session):
    token = "abc123hardcoded"  # ❌ Visible in version control
```

### ❌ Sharing Token via Email/Slack

```
From: dev@company.com
To: ops@company.com
Subject: War Room Token

Here's the token: abc123...  ❌ Plaintext in email logs
```

**Instead**: Use password manager sharing (1Password, LastPass) or Snowflake GRANT.

### ❌ Reusing Same Token Across Environments

```sql
-- DON'T DO THIS
-- Dev and prod using same token ❌
KIQ_INGEST_TOKEN_SECRET = 'abc123...' (both environments)
```

**Risk**: If dev environment is compromised, prod is also compromised.

---

## FAQ

### Q: Can I read the secret value directly in SQL?

**A**: No. Secrets can only be accessed inside stored procedures via `session.get_secret()`. This prevents accidental exposure in query results.

### Q: What happens if I delete a secret that's in use?

**A**: The stored procedure will fail with error:
```
Secret 'KIQ_INGEST_TOKEN_SECRET' does not exist or not authorized
```

Restore the secret and re-grant USAGE to fix.

### Q: How do I know if someone accessed the secret?

**A**: Query `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY` for procedure executions:

```sql
SELECT 
  USER_NAME,
  ROLE_NAME,
  START_TIME,
  QUERY_TEXT
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE QUERY_TEXT ILIKE '%PUSH_WARROOM_EVENTS%'
  AND START_TIME > DATEADD('day', -7, CURRENT_TIMESTAMP());
```

### Q: Can I use AWS Secrets Manager instead?

**A**: Yes, but it requires additional setup:
1. Create External Function pointing to AWS Lambda
2. Lambda retrieves secret from AWS Secrets Manager
3. Lambda forwards request to Vercel API

Snowflake native secrets are simpler for this use case.

---

## Additional Resources

- [Snowflake Secrets Documentation](https://docs.snowflake.com/en/sql-reference/sql/create-secret)
- [External Access Integrations](https://docs.snowflake.com/en/sql-reference/sql/create-external-access-integration)
- [Python Stored Procedures](https://docs.snowflake.com/en/developer-guide/snowpark/python/creating-sprocs)

---

**Status: Production-Ready** ✅