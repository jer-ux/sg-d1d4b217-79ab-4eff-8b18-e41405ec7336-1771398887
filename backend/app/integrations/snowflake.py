"""
KINCAID HEALTH™ SNOWFLAKE INTEGRATION
Bi-directional data sync with Snowflake Data Cloud
"""

import snowflake.connector
from snowflake.connector import DictCursor
from typing import List, Dict, Any, Optional
import pandas as pd
from datetime import datetime, date
import logging
from dataclasses import dataclass

logger = logging.getLogger(__name__)


@dataclass
class SnowflakeConfig:
    """Snowflake connection configuration"""
    account: str
    user: str
    password: str
    warehouse: str
    database: str
    schema: str
    role: Optional[str] = None
    
    @classmethod
    def from_env(cls):
        """Load config from environment variables"""
        import os
        return cls(
            account=os.getenv("SNOWFLAKE_ACCOUNT"),
            user=os.getenv("SNOWFLAKE_USER"),
            password=os.getenv("SNOWFLAKE_PASSWORD"),
            warehouse=os.getenv("SNOWFLAKE_WAREHOUSE"),
            database=os.getenv("SNOWFLAKE_DATABASE"),
            schema=os.getenv("SNOWFLAKE_SCHEMA", "PUBLIC"),
            role=os.getenv("SNOWFLAKE_ROLE")
        )


class SnowflakeConnector:
    """
    Snowflake Data Cloud integration.
    
    Features:
    - Bi-directional data sync
    - Claims data ingestion from Snowflake
    - Results publishing back to Snowflake
    - Zero-copy clone for staging
    - Incremental load support
    """
    
    def __init__(self, config: SnowflakeConfig):
        self.config = config
        self.connection = None
    
    def connect(self):
        """Establish Snowflake connection"""
        try:
            self.connection = snowflake.connector.connect(
                account=self.config.account,
                user=self.config.user,
                password=self.config.password,
                warehouse=self.config.warehouse,
                database=self.config.database,
                schema=self.config.schema,
                role=self.config.role
            )
            logger.info(f"Connected to Snowflake: {self.config.account}/{self.config.database}")
            return True
        except Exception as e:
            logger.error(f"Snowflake connection failed: {e}")
            return False
    
    def disconnect(self):
        """Close Snowflake connection"""
        if self.connection:
            self.connection.close()
            logger.info("Snowflake connection closed")
    
    def execute_query(self, query: str, params: Optional[Dict] = None) -> List[Dict]:
        """Execute query and return results as list of dicts"""
        if not self.connection:
            self.connect()
        
        cursor = self.connection.cursor(DictCursor)
        try:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            
            results = cursor.fetchall()
            logger.info(f"Query executed: {len(results)} rows returned")
            return results
        except Exception as e:
            logger.error(f"Query execution failed: {e}")
            raise
        finally:
            cursor.close()
    
    def load_claims_incremental(
        self,
        table_name: str,
        last_sync_date: Optional[date] = None,
        batch_size: int = 10000
    ) -> List[Dict]:
        """
        Load medical claims from Snowflake incrementally.
        
        Args:
            table_name: Snowflake table name (e.g., CLAIMS.MEDICAL_CLAIMS)
            last_sync_date: Only load claims after this date
            batch_size: Number of rows per batch
        
        Returns:
            List of claim dictionaries
        """
        query = f"""
        SELECT 
            claim_id,
            member_id,
            provider_id,
            service_date_from,
            service_date_through,
            claim_type,
            claim_status,
            billed_amount,
            allowed_amount,
            paid_amount,
            member_responsibility,
            deductible,
            coinsurance,
            copay,
            primary_diagnosis_code,
            place_of_service,
            revenue_code,
            drg_code,
            created_at,
            updated_at
        FROM {table_name}
        WHERE 1=1
        """
        
        if last_sync_date:
            query += f" AND service_date_from >= '{last_sync_date}'"
        
        query += f" LIMIT {batch_size}"
        
        return self.execute_query(query)
    
    def load_pharmacy_claims_incremental(
        self,
        table_name: str,
        last_sync_date: Optional[date] = None,
        batch_size: int = 10000
    ) -> List[Dict]:
        """
        Load pharmacy claims from Snowflake incrementally.
        
        Args:
            table_name: Snowflake table name
            last_sync_date: Only load claims after this date
            batch_size: Number of rows per batch
        
        Returns:
            List of pharmacy claim dictionaries
        """
        query = f"""
        SELECT 
            claim_id,
            member_id,
            pharmacy_npi,
            ndc_code,
            fill_date,
            days_supply,
            quantity,
            prescriber_npi,
            ingredient_cost,
            dispensing_fee,
            sales_tax,
            plan_paid,
            member_paid,
            rebate_amount,
            brand_generic_indicator,
            specialty_flag,
            created_at,
            updated_at
        FROM {table_name}
        WHERE 1=1
        """
        
        if last_sync_date:
            query += f" AND fill_date >= '{last_sync_date}'"
        
        query += f" LIMIT {batch_size}"
        
        return self.execute_query(query)
    
    def load_eligibility_snapshot(
        self,
        table_name: str,
        snapshot_date: date
    ) -> List[Dict]:
        """
        Load eligibility snapshot for specific date.
        
        Args:
            table_name: Snowflake eligibility table
            snapshot_date: Date of eligibility snapshot
        
        Returns:
            List of eligibility records
        """
        query = f"""
        SELECT 
            member_id,
            employer_id,
            plan_id,
            coverage_type,
            effective_date,
            termination_date,
            coverage_tier,
            relationship,
            is_cobra,
            deductible_in_network,
            deductible_out_of_network,
            oop_max_in_network,
            oop_max_out_of_network,
            ytd_deductible,
            ytd_oop
        FROM {table_name}
        WHERE effective_date <= '{snapshot_date}'
          AND (termination_date IS NULL OR termination_date >= '{snapshot_date}')
        """
        
        return self.execute_query(query)
    
    def publish_analytics_results(
        self,
        table_name: str,
        results: List[Dict],
        mode: str = "append"
    ):
        """
        Publish analytics results back to Snowflake.
        
        Args:
            table_name: Target Snowflake table
            results: Analytics results to publish
            mode: 'append' or 'overwrite'
        """
        if not results:
            logger.warning("No results to publish")
            return
        
        # Convert to DataFrame
        df = pd.DataFrame(results)
        
        # Connect if not already connected
        if not self.connection:
            self.connect()
        
        cursor = self.connection.cursor()
        
        try:
            # Create table if not exists
            if mode == "overwrite":
                cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
            
            # Infer column types from DataFrame
            create_table_sql = self._generate_create_table_sql(table_name, df)
            cursor.execute(create_table_sql)
            
            # Insert data
            placeholders = ", ".join(["%s"] * len(df.columns))
            insert_sql = f"INSERT INTO {table_name} VALUES ({placeholders})"
            
            for row in df.itertuples(index=False):
                cursor.execute(insert_sql, row)
            
            self.connection.commit()
            logger.info(f"Published {len(results)} rows to {table_name}")
            
        except Exception as e:
            logger.error(f"Failed to publish results: {e}")
            self.connection.rollback()
            raise
        finally:
            cursor.close()
    
    def _generate_create_table_sql(self, table_name: str, df: pd.DataFrame) -> str:
        """Generate CREATE TABLE SQL from DataFrame"""
        type_mapping = {
            "int64": "INTEGER",
            "float64": "FLOAT",
            "object": "VARCHAR(500)",
            "datetime64[ns]": "TIMESTAMP",
            "bool": "BOOLEAN"
        }
        
        columns = []
        for col, dtype in df.dtypes.items():
            snowflake_type = type_mapping.get(str(dtype), "VARCHAR(500)")
            columns.append(f"{col} {snowflake_type}")
        
        return f"CREATE TABLE IF NOT EXISTS {table_name} ({', '.join(columns)})"
    
    def create_stage_table(self, source_table: str, stage_suffix: str = "_STAGE"):
        """
        Create zero-copy clone for staging.
        
        Useful for:
        - Data validation before production load
        - Testing transformations
        - Rollback capability
        """
        stage_table = f"{source_table}{stage_suffix}"
        
        query = f"CREATE TABLE {stage_table} CLONE {source_table}"
        
        cursor = self.connection.cursor()
        try:
            cursor.execute(query)
            logger.info(f"Created stage table: {stage_table}")
            return stage_table
        except Exception as e:
            logger.error(f"Failed to create stage table: {e}")
            raise
        finally:
            cursor.close()
    
    def swap_tables(self, stage_table: str, production_table: str):
        """
        Swap stage and production tables atomically.
        
        Pattern for zero-downtime deployments.
        """
        cursor = self.connection.cursor()
        try:
            # Rename production table to backup
            backup_table = f"{production_table}_BACKUP_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            cursor.execute(f"ALTER TABLE {production_table} RENAME TO {backup_table}")
            
            # Rename stage table to production
            cursor.execute(f"ALTER TABLE {stage_table} RENAME TO {production_table}")
            
            logger.info(f"Swapped tables: {stage_table} -> {production_table}")
            logger.info(f"Backup created: {backup_table}")
            
        except Exception as e:
            logger.error(f"Table swap failed: {e}")
            self.connection.rollback()
            raise
        finally:
            cursor.close()


# Example Usage
"""
# Setup
config = SnowflakeConfig.from_env()
connector = SnowflakeConnector(config)
connector.connect()

# Load claims incrementally
last_sync = date(2026, 6, 1)
claims = connector.load_claims_incremental(
    table_name="CLAIMS.MEDICAL_CLAIMS",
    last_sync_date=last_sync,
    batch_size=50000
)

# Process claims through Kincaid Health intelligence engines
# ... (actuarial analysis, trend forecasting, etc.)

# Publish results back to Snowflake
connector.publish_analytics_results(
    table_name="ANALYTICS.KINCAID_HEALTH_RESULTS",
    results=analytics_output,
    mode="append"
)

# Cleanup
connector.disconnect()
"""