/**
 * KINCAID HEALTH™
 * Supabase Database Types
 * Auto-generated type definitions for database schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          email: string
          name: string | null
          full_name: string | null
          company: string | null
          phone: string | null
          job_title: string | null
          message: string | null
          status: string | null
          source: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          full_name?: string | null
          company?: string | null
          phone?: string | null
          job_title?: string | null
          message?: string | null
          status?: string | null
          source?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          full_name?: string | null
          company?: string | null
          phone?: string | null
          job_title?: string | null
          message?: string | null
          status?: string | null
          source?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      pbm_contracts: {
        Row: {
          id: string
          contract_name: string
          contract_number: string | null
          pbm_name: string
          contract_type: string | null
          plan_size: string | null
          effective_date: string | null
          termination_date: string | null
          overall_score: number | null
          risk_level: string | null
          red_flags: number | null
          annual_cost_estimate: number | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          contract_name: string
          contract_number?: string | null
          pbm_name: string
          contract_type?: string | null
          plan_size?: string | null
          effective_date?: string | null
          termination_date?: string | null
          overall_score?: number | null
          risk_level?: string | null
          red_flags?: number | null
          annual_cost_estimate?: number | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          contract_name?: string
          contract_number?: string | null
          pbm_name?: string
          contract_type?: string | null
          plan_size?: string | null
          effective_date?: string | null
          termination_date?: string | null
          overall_score?: number | null
          risk_level?: string | null
          red_flags?: number | null
          annual_cost_estimate?: number | null
          metadata?: Json | null
          created_at?: string
        }
      }
      contract_provisions: {
        Row: {
          id: string
          contract_id: string
          provision_type: string
          provision_text: string | null
          score: number | null
          risk_flag: string | null
          analysis: string | null
          cost_impact: number | null
          created_at: string
        }
        Insert: {
          id?: string
          contract_id: string
          provision_type: string
          provision_text?: string | null
          score?: number | null
          risk_flag?: string | null
          analysis?: string | null
          cost_impact?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          contract_id?: string
          provision_type?: string
          provision_text?: string | null
          score?: number | null
          risk_flag?: string | null
          analysis?: string | null
          cost_impact?: number | null
          created_at?: string
        }
      }
      claims_databank: {
        Row: {
          id: string
          organization_id: string
          claim_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          claim_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          claim_data?: Json
          created_at?: string
        }
      }
      census_databank: {
        Row: {
          id: string
          organization_id: string
          census_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          census_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          census_data?: Json
          created_at?: string
        }
      }
      financial_databank: {
        Row: {
          id: string
          organization_id: string
          financial_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          financial_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          financial_data?: Json
          created_at?: string
        }
      }
      contracts_databank: {
        Row: {
          id: string
          organization_id: string
          contract_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          contract_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          contract_data?: Json
          created_at?: string
        }
      }
      actuarial_databank: {
        Row: {
          id: string
          organization_id: string
          actuarial_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          actuarial_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          actuarial_data?: Json
          created_at?: string
        }
      }
      pharmacy_databank: {
        Row: {
          id: string
          organization_id: string
          pharmacy_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          pharmacy_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          pharmacy_data?: Json
          created_at?: string
        }
      }
      analytics_databank: {
        Row: {
          id: string
          organization_id: string
          analytics_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          analytics_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          analytics_data?: Json
          created_at?: string
        }
      }
      report_schedules: {
        Row: {
          id: string
          organization_id: string
          schedule_config: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          schedule_config: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          schedule_config?: Json
          created_at?: string
        }
      }
      report_history: {
        Row: {
          id: string
          organization_id: string
          report_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          report_data: Json
          created_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          report_data?: Json
          created_at?: string
        }
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