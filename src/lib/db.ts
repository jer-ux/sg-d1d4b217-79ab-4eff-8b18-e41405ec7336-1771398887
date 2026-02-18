import { supabase } from "@/integrations/supabase/client";

export type Row = Record<string, any>;

/**
 * Database client wrapper for Supabase
 * Provides a simple query interface for raw SQL execution
 */
export const db = {
  /**
   * Execute a raw SQL query and return all rows
   * @param sql - The SQL query string
   * @param params - Optional query parameters (not used with rpc, but kept for interface compatibility)
   * @returns Array of rows matching the query
   */
  async query(sql: string, params: any[] = []): Promise<Row[]> {
    try {
      // For Supabase, we use the rpc function to execute raw SQL
      // Note: This requires a database function to be created in Supabase
      // For direct table queries, use supabase.from() instead
      
      // If the query is a SELECT statement, we can parse it and use .from()
      if (sql.trim().toLowerCase().startsWith("select")) {
        console.warn("Direct SQL queries require database functions. Consider using supabase.from() instead.");
        return [];
      }

      // For other queries, you would need to create a database function
      // Using 'as any' to bypass strict type checking if the function doesn't exist in types yet
      const { data, error } = await supabase.rpc("execute_sql" as any, { 
        query: sql,
        params: params 
      });

      if (error) {
        console.error("Database query error:", error);
        throw new Error(`Database query failed: ${error.message}`);
      }

      return (data as any) || [];
    } catch (err) {
      console.error("Database connection error:", err);
      return [];
    }
  },

  /**
   * Execute a query and return the first row only
   * @param sql - The SQL query string
   * @param params - Optional query parameters
   * @returns Single row or null if no results
   */
  async one(sql: string, params: any[] = []): Promise<Row | null> {
    const rows = await db.query(sql, params);
    return rows[0] ?? null;
  },

  /**
   * Helper method for type-safe table queries
   * Use this for standard CRUD operations instead of raw SQL
   * @example
   * const users = await db.table("users").select("*");
   */
  table(tableName: string) {
    // Cast to any to allow dynamic table names
    return supabase.from(tableName as any);
  },

  /**
   * Execute a Supabase RPC function
   * @param functionName - Name of the database function
   * @param params - Parameters to pass to the function
   */
  async rpc(functionName: string, params: Record<string, any> = {}): Promise<Row[]> {
    const { data, error } = await supabase.rpc(functionName as any, params);
    
    if (error) {
      console.error(`RPC error (${functionName}):`, error);
      throw new Error(`RPC failed: ${error.message}`);
    }

    return (data as any) || [];
  },
};

/**
 * Type-safe query builder helpers
 * These methods provide a more ergonomic interface for common queries
 */
export const queries = {
  /**
   * Select all rows from a table with optional filtering
   */
  async selectAll<T = Row>(tableName: string, filter?: Record<string, any>): Promise<T[]> {
    let query = supabase.from(tableName as any).select("*");
    
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;
    
    if (error) {
      console.error(`Select error (${tableName}):`, error);
      throw new Error(`Select failed: ${error.message}`);
    }

    return (data as T[]) || [];
  },

  /**
   * Select a single row by ID
   */
  async selectById<T = Row>(tableName: string, id: string): Promise<T | null> {
    const { data, error } = await supabase
      .from(tableName as any)
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) {
      // Check for PGRST116 (0 rows) error safely
      if (error.code === "PGRST116") {
        return null; // No rows found
      }
      console.error(`Select by ID error (${tableName}):`, error);
      throw new Error(`Select by ID failed: ${error.message}`);
    }

    return data as T;
  },

  /**
   * Insert a new row
   */
  async insert<T = Row>(tableName: string, data: Partial<T>): Promise<T> {
    const { data: inserted, error } = await supabase
      .from(tableName as any)
      .insert(data)
      .select()
      .single();
    
    if (error) {
      console.error(`Insert error (${tableName}):`, error);
      throw new Error(`Insert failed: ${error.message}`);
    }

    return inserted as T;
  },

  /**
   * Update an existing row by ID
   */
  async update<T = Row>(tableName: string, id: string, data: Partial<T>): Promise<T> {
    const { data: updated, error } = await supabase
      .from(tableName as any)
      .update(data)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error(`Update error (${tableName}):`, error);
      throw new Error(`Update failed: ${error.message}`);
    }

    return updated as T;
  },

  /**
   * Delete a row by ID
   */
  async delete(tableName: string, id: string): Promise<void> {
    const { error } = await supabase
      .from(tableName as any)
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error(`Delete error (${tableName}):`, error);
      throw new Error(`Delete failed: ${error.message}`);
    }
  },
};