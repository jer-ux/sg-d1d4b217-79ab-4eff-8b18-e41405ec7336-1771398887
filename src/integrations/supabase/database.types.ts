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
          company: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          company?: string | null
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          company?: string | null
          message?: string | null
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