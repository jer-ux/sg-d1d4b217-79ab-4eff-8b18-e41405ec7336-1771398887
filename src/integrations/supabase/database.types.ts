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
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
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
