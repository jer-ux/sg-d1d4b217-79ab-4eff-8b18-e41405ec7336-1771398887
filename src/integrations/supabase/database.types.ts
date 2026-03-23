/* eslint-disable @typescript-eslint/no-empty-object-type */
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
      comparison_sessions: {
        Row: {
          accessed_at: string | null
          comparison_results: Json | null
          contract_ids: string[]
          cost_variance: number | null
          created_at: string | null
          id: string
          key_findings: string[] | null
          session_name: string | null
          user_id: string | null
        }
        Insert: {
          accessed_at?: string | null
          comparison_results?: Json | null
          contract_ids: string[]
          cost_variance?: number | null
          created_at?: string | null
          id?: string
          key_findings?: string[] | null
          session_name?: string | null
          user_id?: string | null
        }
        Update: {
          accessed_at?: string | null
          comparison_results?: Json | null
          contract_ids?: string[]
          cost_variance?: number | null
          created_at?: string | null
          id?: string
          key_findings?: string[] | null
          session_name?: string | null
          user_id?: string | null
        }
        Relationships: []
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
      contract_ai_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          role: string
          session_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role: string
          session_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_ai_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "contract_ai_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_ai_sessions: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          session_type: string
          status: string
          updated_at: string | null
          upload_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          session_type: string
          status?: string
          updated_at?: string | null
          upload_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          session_type?: string
          status?: string
          updated_at?: string | null
          upload_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_ai_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "contract_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_ai_sessions_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "contract_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_analysis_results: {
        Row: {
          analysis_summary: Json | null
          annual_cost_estimate: number | null
          contract_name: string
          contract_type: string | null
          created_at: string | null
          effective_date: string | null
          expiration_date: string | null
          id: string
          overall_score: number | null
          pbm_name: string | null
          potential_savings: number | null
          red_flags_count: number | null
          risk_level: string | null
          total_provisions_analyzed: number | null
          updated_at: string | null
          upload_id: string | null
        }
        Insert: {
          analysis_summary?: Json | null
          annual_cost_estimate?: number | null
          contract_name: string
          contract_type?: string | null
          created_at?: string | null
          effective_date?: string | null
          expiration_date?: string | null
          id?: string
          overall_score?: number | null
          pbm_name?: string | null
          potential_savings?: number | null
          red_flags_count?: number | null
          risk_level?: string | null
          total_provisions_analyzed?: number | null
          updated_at?: string | null
          upload_id?: string | null
        }
        Update: {
          analysis_summary?: Json | null
          annual_cost_estimate?: number | null
          contract_name?: string
          contract_type?: string | null
          created_at?: string | null
          effective_date?: string | null
          expiration_date?: string | null
          id?: string
          overall_score?: number | null
          pbm_name?: string | null
          potential_savings?: number | null
          red_flags_count?: number | null
          risk_level?: string | null
          total_provisions_analyzed?: number | null
          updated_at?: string | null
          upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_analysis_results_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "contract_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_analytics: {
        Row: {
          avg_cost_estimate: number | null
          avg_score: number | null
          common_red_flags: string[] | null
          high_risk_count: number | null
          id: string
          last_updated: string | null
          pbm_name: string
          total_contracts: number | null
        }
        Insert: {
          avg_cost_estimate?: number | null
          avg_score?: number | null
          common_red_flags?: string[] | null
          high_risk_count?: number | null
          id?: string
          last_updated?: string | null
          pbm_name: string
          total_contracts?: number | null
        }
        Update: {
          avg_cost_estimate?: number | null
          avg_score?: number | null
          common_red_flags?: string[] | null
          high_risk_count?: number | null
          id?: string
          last_updated?: string | null
          pbm_name?: string
          total_contracts?: number | null
        }
        Relationships: []
      }
      contract_benchmarks: {
        Row: {
          best_in_class: number | null
          created_at: string | null
          gap_analysis: string | null
          id: string
          improvement_potential: number | null
          industry_average: number | null
          percentile_rank: number | null
          provision_type: string
          upload_id: string | null
          your_score: number | null
        }
        Insert: {
          best_in_class?: number | null
          created_at?: string | null
          gap_analysis?: string | null
          id?: string
          improvement_potential?: number | null
          industry_average?: number | null
          percentile_rank?: number | null
          provision_type: string
          upload_id?: string | null
          your_score?: number | null
        }
        Update: {
          best_in_class?: number | null
          created_at?: string | null
          gap_analysis?: string | null
          id?: string
          improvement_potential?: number | null
          industry_average?: number | null
          percentile_rank?: number | null
          provision_type?: string
          upload_id?: string | null
          your_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_benchmarks_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "contract_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_board_analytics: {
        Row: {
          average_contract_score: number | null
          contracts_by_pbm: Json | null
          created_at: string | null
          date: string
          high_risk_contracts: number | null
          id: string
          organization_id: string | null
          top_risk_categories: Json | null
          total_contracts_analyzed: number | null
          total_potential_savings: number | null
          total_red_flags_identified: number | null
          user_activity: Json | null
        }
        Insert: {
          average_contract_score?: number | null
          contracts_by_pbm?: Json | null
          created_at?: string | null
          date?: string
          high_risk_contracts?: number | null
          id?: string
          organization_id?: string | null
          top_risk_categories?: Json | null
          total_contracts_analyzed?: number | null
          total_potential_savings?: number | null
          total_red_flags_identified?: number | null
          user_activity?: Json | null
        }
        Update: {
          average_contract_score?: number | null
          contracts_by_pbm?: Json | null
          created_at?: string | null
          date?: string
          high_risk_contracts?: number | null
          id?: string
          organization_id?: string | null
          top_risk_categories?: Json | null
          total_contracts_analyzed?: number | null
          total_potential_savings?: number | null
          total_red_flags_identified?: number | null
          user_activity?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_board_analytics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "contract_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_insights: {
        Row: {
          ai_reasoning: string | null
          category: string
          confidence_score: number | null
          created_at: string | null
          description: string
          financial_impact: number | null
          id: string
          insight_type: string
          severity: string | null
          supporting_evidence: Json | null
          title: string
          upload_id: string | null
        }
        Insert: {
          ai_reasoning?: string | null
          category: string
          confidence_score?: number | null
          created_at?: string | null
          description: string
          financial_impact?: number | null
          id?: string
          insight_type: string
          severity?: string | null
          supporting_evidence?: Json | null
          title: string
          upload_id?: string | null
        }
        Update: {
          ai_reasoning?: string | null
          category?: string
          confidence_score?: number | null
          created_at?: string | null
          description?: string
          financial_impact?: number | null
          id?: string
          insight_type?: string
          severity?: string | null
          supporting_evidence?: Json | null
          title?: string
          upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_insights_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "contract_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_organizations: {
        Row: {
          api_enabled: boolean | null
          contract_limit: number
          created_at: string | null
          id: string
          metadata: Json | null
          name: string
          priority_support: boolean | null
          slug: string
          subscription_tier: string
          updated_at: string | null
          user_limit: number
          white_label_enabled: boolean | null
        }
        Insert: {
          api_enabled?: boolean | null
          contract_limit?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          priority_support?: boolean | null
          slug: string
          subscription_tier: string
          updated_at?: string | null
          user_limit?: number
          white_label_enabled?: boolean | null
        }
        Update: {
          api_enabled?: boolean | null
          contract_limit?: number
          created_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          priority_support?: boolean | null
          slug?: string
          subscription_tier?: string
          updated_at?: string | null
          user_limit?: number
          white_label_enabled?: boolean | null
        }
        Relationships: []
      }
      contract_pdf_exports: {
        Row: {
          analysis_id: string | null
          completed_at: string | null
          download_count: number | null
          expires_at: string | null
          export_type: string
          file_size: number | null
          id: string
          metadata: Json | null
          requested_at: string | null
          status: string
          storage_path: string | null
          user_id: string | null
        }
        Insert: {
          analysis_id?: string | null
          completed_at?: string | null
          download_count?: number | null
          expires_at?: string | null
          export_type: string
          file_size?: number | null
          id?: string
          metadata?: Json | null
          requested_at?: string | null
          status?: string
          storage_path?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_id?: string | null
          completed_at?: string | null
          download_count?: number | null
          expires_at?: string | null
          export_type?: string
          file_size?: number | null
          id?: string
          metadata?: Json | null
          requested_at?: string | null
          status?: string
          storage_path?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_pdf_exports_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "contract_analysis_results"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_provision_analysis: {
        Row: {
          analysis_id: string | null
          compliance_status: string | null
          created_at: string | null
          financial_impact: number | null
          id: string
          industry_benchmark: number | null
          is_red_flag: boolean | null
          provision_category: string
          provision_name: string
          provision_text: string | null
          recommendation: string | null
          risk_level: string | null
          score: number | null
        }
        Insert: {
          analysis_id?: string | null
          compliance_status?: string | null
          created_at?: string | null
          financial_impact?: number | null
          id?: string
          industry_benchmark?: number | null
          is_red_flag?: boolean | null
          provision_category: string
          provision_name: string
          provision_text?: string | null
          recommendation?: string | null
          risk_level?: string | null
          score?: number | null
        }
        Update: {
          analysis_id?: string | null
          compliance_status?: string | null
          created_at?: string | null
          financial_impact?: number | null
          id?: string
          industry_benchmark?: number | null
          is_red_flag?: boolean | null
          provision_category?: string
          provision_name?: string
          provision_text?: string | null
          recommendation?: string | null
          risk_level?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_provision_analysis_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "contract_analysis_results"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_provisions: {
        Row: {
          analysis: string | null
          contract_id: string
          cost_impact: number | null
          created_at: string | null
          extracted_text: string | null
          id: string
          provision_name: string
          provision_type: string
          recommendations: string | null
          risk_flag: string | null
          score: number | null
        }
        Insert: {
          analysis?: string | null
          contract_id: string
          cost_impact?: number | null
          created_at?: string | null
          extracted_text?: string | null
          id?: string
          provision_name: string
          provision_type: string
          recommendations?: string | null
          risk_flag?: string | null
          score?: number | null
        }
        Update: {
          analysis?: string | null
          contract_id?: string
          cost_impact?: number | null
          created_at?: string | null
          extracted_text?: string | null
          id?: string
          provision_name?: string
          provision_type?: string
          recommendations?: string | null
          risk_flag?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_provisions_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "pbm_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_recommendations: {
        Row: {
          action_items: Json | null
          created_at: string | null
          description: string
          expected_impact: number | null
          id: string
          implementation_effort: string | null
          priority: number | null
          recommendation_type: string
          success_probability: number | null
          timeline_days: number | null
          title: string
          upload_id: string | null
        }
        Insert: {
          action_items?: Json | null
          created_at?: string | null
          description: string
          expected_impact?: number | null
          id?: string
          implementation_effort?: string | null
          priority?: number | null
          recommendation_type: string
          success_probability?: number | null
          timeline_days?: number | null
          title: string
          upload_id?: string | null
        }
        Update: {
          action_items?: Json | null
          created_at?: string | null
          description?: string
          expected_impact?: number | null
          id?: string
          implementation_effort?: string | null
          priority?: number | null
          recommendation_type?: string
          success_probability?: number | null
          timeline_days?: number | null
          title?: string
          upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_recommendations_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "contract_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_uploads: {
        Row: {
          error_message: string | null
          file_name: string
          file_size: number
          file_type: string
          id: string
          metadata: Json | null
          organization_id: string | null
          processing_completed_at: string | null
          processing_started_at: string | null
          storage_path: string
          upload_status: string
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          error_message?: string | null
          file_name: string
          file_size: number
          file_type: string
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          processing_completed_at?: string | null
          processing_started_at?: string | null
          storage_path: string
          upload_status?: string
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          error_message?: string | null
          file_name?: string
          file_size?: number
          file_type?: string
          id?: string
          metadata?: Json | null
          organization_id?: string | null
          processing_completed_at?: string | null
          processing_started_at?: string | null
          storage_path?: string
          upload_status?: string
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_uploads_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "contract_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_usage_logs: {
        Row: {
          action: string
          created_at: string | null
          duration_ms: number | null
          error_message: string | null
          id: string
          ip_address: unknown
          organization_id: string | null
          resource_id: string | null
          resource_type: string
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          ip_address?: unknown
          organization_id?: string | null
          resource_id?: string | null
          resource_type: string
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          ip_address?: unknown
          organization_id?: string | null
          resource_id?: string | null
          resource_type?: string
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_usage_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "contract_organizations"
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
      pbm_contracts: {
        Row: {
          annual_cost_estimate: number | null
          contract_name: string
          contract_type: string
          created_at: string | null
          effective_date: string
          expiration_date: string | null
          file_url: string | null
          id: string
          metadata: Json | null
          overall_score: number | null
          pbm_name: string
          plan_size: string | null
          red_flags: number | null
          risk_level: string | null
          total_provisions: number | null
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          annual_cost_estimate?: number | null
          contract_name: string
          contract_type: string
          created_at?: string | null
          effective_date: string
          expiration_date?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          overall_score?: number | null
          pbm_name: string
          plan_size?: string | null
          red_flags?: number | null
          risk_level?: string | null
          total_provisions?: number | null
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          annual_cost_estimate?: number | null
          contract_name?: string
          contract_type?: string
          created_at?: string | null
          effective_date?: string
          expiration_date?: string | null
          file_url?: string | null
          id?: string
          metadata?: Json | null
          overall_score?: number | null
          pbm_name?: string
          plan_size?: string | null
          red_flags?: number | null
          risk_level?: string | null
          total_provisions?: number | null
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
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
