 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      actuarial_databank: {
        Row: {
          created_at: string | null
          document_type: string | null
          ein: string | null
          error_message: string | null
          file_name: string
          file_size: number
          file_url: string
          funding_ratio: number | null
          id: string
          participant_count: number | null
          plan_name: string | null
          plan_year: number | null
          processing_notes: string | null
          status: string | null
          total_assets: number | null
          total_liabilities: number | null
          updated_at: string | null
          upload_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_type?: string | null
          ein?: string | null
          error_message?: string | null
          file_name: string
          file_size: number
          file_url: string
          funding_ratio?: number | null
          id?: string
          participant_count?: number | null
          plan_name?: string | null
          plan_year?: number | null
          processing_notes?: string | null
          status?: string | null
          total_assets?: number | null
          total_liabilities?: number | null
          updated_at?: string | null
          upload_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_type?: string | null
          ein?: string | null
          error_message?: string | null
          file_name?: string
          file_size?: number
          file_url?: string
          funding_ratio?: number | null
          id?: string
          participant_count?: number | null
          plan_name?: string | null
          plan_year?: number | null
          processing_notes?: string | null
          status?: string | null
          total_assets?: number | null
          total_liabilities?: number | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "actuarial_databank_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_databank: {
        Row: {
          created_at: string | null
          error_message: string | null
          file_name: string
          file_size: number
          file_url: string
          id: string
          is_shared: boolean | null
          processing_notes: string | null
          report_period: string | null
          report_title: string | null
          report_type: string | null
          shared_with: string[] | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
          upload_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          file_name: string
          file_size: number
          file_url: string
          id?: string
          is_shared?: boolean | null
          processing_notes?: string | null
          report_period?: string | null
          report_title?: string | null
          report_type?: string | null
          shared_with?: string[] | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          upload_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          is_shared?: boolean | null
          processing_notes?: string | null
          report_period?: string | null
          report_title?: string | null
          report_type?: string | null
          shared_with?: string[] | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_databank_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      api_keys: {
        Row: {
          created_at: string | null
          created_by: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          organization_id: string
          rate_limit_per_day: number | null
          rate_limit_per_hour: number | null
          revoked_at: string | null
          revoked_by: string | null
          scopes: string[] | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          organization_id: string
          rate_limit_per_day?: number | null
          rate_limit_per_hour?: number | null
          revoked_at?: string | null
          revoked_by?: string | null
          scopes?: string[] | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          organization_id?: string
          rate_limit_per_day?: number | null
          rate_limit_per_hour?: number | null
          revoked_at?: string | null
          revoked_by?: string | null
          scopes?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_keys_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_keys_revoked_by_fkey"
            columns: ["revoked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          api_key_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          organization_id: string | null
          resource_id: string | null
          resource_type: string
          severity: string | null
          status: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          api_key_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          organization_id?: string | null
          resource_id?: string | null
          resource_type: string
          severity?: string | null
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          api_key_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          organization_id?: string | null
          resource_id?: string | null
          resource_type?: string
          severity?: string | null
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      census_databank: {
        Row: {
          average_age: number | null
          census_date: string | null
          created_at: string | null
          dependent_count: number | null
          error_message: string | null
          female_count: number | null
          file_name: string
          file_size: number
          file_url: string
          id: string
          male_count: number | null
          member_count: number | null
          organization_name: string | null
          plan_year: number | null
          processing_notes: string | null
          status: string | null
          updated_at: string | null
          upload_date: string | null
          user_id: string
        }
        Insert: {
          average_age?: number | null
          census_date?: string | null
          created_at?: string | null
          dependent_count?: number | null
          error_message?: string | null
          female_count?: number | null
          file_name: string
          file_size: number
          file_url: string
          id?: string
          male_count?: number | null
          member_count?: number | null
          organization_name?: string | null
          plan_year?: number | null
          processing_notes?: string | null
          status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          user_id: string
        }
        Update: {
          average_age?: number | null
          census_date?: string | null
          created_at?: string | null
          dependent_count?: number | null
          error_message?: string | null
          female_count?: number | null
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          male_count?: number | null
          member_count?: number | null
          organization_name?: string | null
          plan_year?: number | null
          processing_notes?: string | null
          status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "census_databank_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      claims_databank: {
        Row: {
          claim_count: number | null
          created_at: string | null
          date_range_end: string | null
          date_range_start: string | null
          duplicate_records: number | null
          error_message: string | null
          file_name: string
          file_size: number
          file_url: string
          id: string
          invalid_records: number | null
          plan_year: number | null
          processing_notes: string | null
          status: string | null
          total_amount: number | null
          updated_at: string | null
          upload_date: string | null
          user_id: string
          valid_records: number | null
        }
        Insert: {
          claim_count?: number | null
          created_at?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          duplicate_records?: number | null
          error_message?: string | null
          file_name: string
          file_size: number
          file_url: string
          id?: string
          invalid_records?: number | null
          plan_year?: number | null
          processing_notes?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          upload_date?: string | null
          user_id: string
          valid_records?: number | null
        }
        Update: {
          claim_count?: number | null
          created_at?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          duplicate_records?: number | null
          error_message?: string | null
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          invalid_records?: number | null
          plan_year?: number | null
          processing_notes?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string
          valid_records?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_databank_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_certifications: {
        Row: {
          auditor_name: string | null
          certificate_url: string | null
          certification_date: string | null
          certification_type: string
          compliance_score: number | null
          created_at: string | null
          expiration_date: string | null
          findings: Json | null
          id: string
          last_audit_date: string | null
          metadata: Json | null
          next_audit_date: string | null
          organization_id: string
          status: string
          updated_at: string | null
        }
        Insert: {
          auditor_name?: string | null
          certificate_url?: string | null
          certification_date?: string | null
          certification_type: string
          compliance_score?: number | null
          created_at?: string | null
          expiration_date?: string | null
          findings?: Json | null
          id?: string
          last_audit_date?: string | null
          metadata?: Json | null
          next_audit_date?: string | null
          organization_id: string
          status: string
          updated_at?: string | null
        }
        Update: {
          auditor_name?: string | null
          certificate_url?: string | null
          certification_date?: string | null
          certification_type?: string
          compliance_score?: number | null
          created_at?: string | null
          expiration_date?: string | null
          findings?: Json | null
          id?: string
          last_audit_date?: string | null
          metadata?: Json | null
          next_audit_date?: string | null
          organization_id?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_certifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts_databank: {
        Row: {
          auto_renewal: boolean | null
          compliance_status: string | null
          contract_type: string | null
          contract_value: number | null
          created_at: string | null
          end_date: string | null
          error_message: string | null
          file_name: string
          file_size: number
          file_url: string
          id: string
          processing_notes: string | null
          risk_score: number | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          upload_date: string | null
          user_id: string
          vendor_name: string | null
        }
        Insert: {
          auto_renewal?: boolean | null
          compliance_status?: string | null
          contract_type?: string | null
          contract_value?: number | null
          created_at?: string | null
          end_date?: string | null
          error_message?: string | null
          file_name: string
          file_size: number
          file_url: string
          id?: string
          processing_notes?: string | null
          risk_score?: number | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          user_id: string
          vendor_name?: string | null
        }
        Update: {
          auto_renewal?: boolean | null
          compliance_status?: string | null
          contract_type?: string | null
          contract_value?: number | null
          created_at?: string | null
          end_date?: string | null
          error_message?: string | null
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          processing_notes?: string | null
          risk_score?: number | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_databank_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      data_retention_policies: {
        Row: {
          archive_enabled: boolean | null
          archive_storage_class: string | null
          compliance_requirements: string[] | null
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          organization_id: string
          retention_days: number
          table_name: string
          updated_at: string | null
        }
        Insert: {
          archive_enabled?: boolean | null
          archive_storage_class?: string | null
          compliance_requirements?: string[] | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          organization_id: string
          retention_days: number
          table_name: string
          updated_at?: string | null
        }
        Update: {
          archive_enabled?: boolean | null
          archive_storage_class?: string | null
          compliance_requirements?: string[] | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          organization_id?: string
          retention_days?: number
          table_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_retention_policies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_retention_policies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_databank: {
        Row: {
          created_at: string | null
          currency: string | null
          document_type: string | null
          error_message: string | null
          file_name: string
          file_size: number
          file_url: string
          fiscal_period: string | null
          fiscal_year: number | null
          id: string
          net_amount: number | null
          processing_notes: string | null
          status: string | null
          total_expenses: number | null
          total_revenue: number | null
          updated_at: string | null
          upload_date: string | null
          user_id: string
          vendor_name: string | null
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          document_type?: string | null
          error_message?: string | null
          file_name: string
          file_size: number
          file_url: string
          fiscal_period?: string | null
          fiscal_year?: number | null
          id?: string
          net_amount?: number | null
          processing_notes?: string | null
          status?: string | null
          total_expenses?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          upload_date?: string | null
          user_id: string
          vendor_name?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          document_type?: string | null
          error_message?: string | null
          file_name?: string
          file_size?: number
          file_url?: string
          fiscal_period?: string | null
          fiscal_year?: number | null
          id?: string
          net_amount?: number | null
          processing_notes?: string | null
          status?: string | null
          total_expenses?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_databank_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount_paid: number
          contract_file_name: string | null
          contract_file_url: string | null
          contract_upload_date: string | null
          contract_uploaded: boolean | null
          created_at: string | null
          currency: string
          customer_company: string | null
          customer_email: string
          customer_job_title: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          notes: string | null
          payment_status: string
          product_name: string
          report_generated_date: string | null
          report_status: string
          report_url: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_paid?: number
          contract_file_name?: string | null
          contract_file_url?: string | null
          contract_upload_date?: string | null
          contract_uploaded?: boolean | null
          created_at?: string | null
          currency?: string
          customer_company?: string | null
          customer_email: string
          customer_job_title?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          payment_status?: string
          product_name?: string
          report_generated_date?: string | null
          report_status?: string
          report_url?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_paid?: number
          contract_file_name?: string | null
          contract_file_url?: string | null
          contract_upload_date?: string | null
          contract_uploaded?: boolean | null
          created_at?: string | null
          currency?: string
          customer_company?: string | null
          customer_email?: string
          customer_job_title?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          payment_status?: string
          product_name?: string
          report_generated_date?: string | null
          report_status?: string
          report_url?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          invited_at: string | null
          invited_by: string | null
          is_active: boolean | null
          joined_at: string | null
          last_active_at: string | null
          organization_id: string
          permissions: Json | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          last_active_at?: string | null
          organization_id: string
          permissions?: Json | null
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          invited_at?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          joined_at?: string | null
          last_active_at?: string | null
          organization_id?: string
          permissions?: Json | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          billing_email: string | null
          created_at: string | null
          domain: string | null
          features: Json | null
          id: string
          industry: string | null
          is_active: boolean | null
          max_storage_gb: number | null
          max_users: number | null
          metadata: Json | null
          name: string
          organization_size: string | null
          plan_tier: string
          slug: string
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          billing_email?: string | null
          created_at?: string | null
          domain?: string | null
          features?: Json | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          max_storage_gb?: number | null
          max_users?: number | null
          metadata?: Json | null
          name: string
          organization_size?: string | null
          plan_tier?: string
          slug: string
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_email?: string | null
          created_at?: string | null
          domain?: string | null
          features?: Json | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          max_storage_gb?: number | null
          max_users?: number | null
          metadata?: Json | null
          name?: string
          organization_size?: string | null
          plan_tier?: string
          slug?: string
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pharmacy_databank: {
        Row: {
          average_cost_per_script: number | null
          brand_utilization_rate: number | null
          claim_count: number | null
          created_at: string | null
          date_range_end: string | null
          date_range_start: string | null
          error_message: string | null
          file_name: string
          file_size: number
          file_url: string
          generic_utilization_rate: number | null
          id: string
          pbm_name: string | null
          processing_notes: string | null
          specialty_utilization_rate: number | null
          status: string | null
          total_cost: number | null
          updated_at: string | null
          upload_date: string | null
          user_id: string
        }
        Insert: {
          average_cost_per_script?: number | null
          brand_utilization_rate?: number | null
          claim_count?: number | null
          created_at?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          error_message?: string | null
          file_name: string
          file_size: number
          file_url: string
          generic_utilization_rate?: number | null
          id?: string
          pbm_name?: string | null
          processing_notes?: string | null
          specialty_utilization_rate?: number | null
          status?: string | null
          total_cost?: number | null
          updated_at?: string | null
          upload_date?: string | null
          user_id: string
        }
        Update: {
          average_cost_per_script?: number | null
          brand_utilization_rate?: number | null
          claim_count?: number | null
          created_at?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          error_message?: string | null
          file_name?: string
          file_size?: number
          file_url?: string
          generic_utilization_rate?: number | null
          id?: string
          pbm_name?: string | null
          processing_notes?: string | null
          specialty_utilization_rate?: number | null
          status?: string | null
          total_cost?: number | null
          updated_at?: string | null
          upload_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_databank_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          full_name: string | null
          id: string
          job_title: string | null
          last_login_at: string | null
          last_login_ip: unknown
          locale: string | null
          mfa_enabled: boolean | null
          notification_preferences: Json | null
          organization_id: string | null
          phone_number: string | null
          role: string | null
          security_settings: Json | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          job_title?: string | null
          last_login_at?: string | null
          last_login_ip?: unknown
          locale?: string | null
          mfa_enabled?: boolean | null
          notification_preferences?: Json | null
          organization_id?: string | null
          phone_number?: string | null
          role?: string | null
          security_settings?: Json | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          last_login_at?: string | null
          last_login_ip?: unknown
          locale?: string | null
          mfa_enabled?: boolean | null
          notification_preferences?: Json | null
          organization_id?: string | null
          phone_number?: string | null
          role?: string | null
          security_settings?: Json | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      report_deliverables: {
        Row: {
          created_at: string | null
          deliverable_name: string
          deliverable_type: string
          file_size: number | null
          file_url: string | null
          generated_at: string | null
          id: string
          metadata: Json | null
          order_id: string
          status: string
        }
        Insert: {
          created_at?: string | null
          deliverable_name: string
          deliverable_type: string
          file_size?: number | null
          file_url?: string | null
          generated_at?: string | null
          id?: string
          metadata?: Json | null
          order_id: string
          status?: string
        }
        Update: {
          created_at?: string | null
          deliverable_name?: string
          deliverable_type?: string
          file_size?: number | null
          file_url?: string | null
          generated_at?: string | null
          id?: string
          metadata?: Json | null
          order_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "report_deliverables_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      security_incidents: {
        Row: {
          affected_resources: Json | null
          assigned_to: string | null
          automated_response: string[] | null
          created_at: string | null
          description: string
          detected_at: string
          id: string
          incident_type: string
          metadata: Json | null
          organization_id: string | null
          resolution_notes: string | null
          resolved_at: string | null
          severity: string
          status: string
          updated_at: string | null
        }
        Insert: {
          affected_resources?: Json | null
          assigned_to?: string | null
          automated_response?: string[] | null
          created_at?: string | null
          description: string
          detected_at: string
          id?: string
          incident_type: string
          metadata?: Json | null
          organization_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          severity: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          affected_resources?: Json | null
          assigned_to?: string | null
          automated_response?: string[] | null
          created_at?: string | null
          description?: string
          detected_at?: string
          id?: string
          incident_type?: string
          metadata?: Json | null
          organization_id?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          severity?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_incidents_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "security_incidents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sso_configurations: {
        Row: {
          configuration: Json
          created_at: string | null
          id: string
          is_enabled: boolean | null
          metadata: Json | null
          organization_id: string
          provider: string
          updated_at: string | null
        }
        Insert: {
          configuration: Json
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          metadata?: Json | null
          organization_id: string
          provider: string
          updated_at?: string | null
        }
        Update: {
          configuration?: Json
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          metadata?: Json | null
          organization_id?: string
          provider?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sso_configurations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_metrics: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          metric_date: string
          metric_type: string
          metric_value: number
          organization_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_date: string
          metric_type: string
          metric_value: number
          organization_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_date?: string
          metric_type?: string
          metric_value?: number
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_metrics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
