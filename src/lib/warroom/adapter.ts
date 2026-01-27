import { mockWarRoomAdapter } from "./mockAdapter";
import type { WarRoomSummary } from "./types";

export type WarRoomAdapter = {
  getSummary(): Promise<WarRoomSummary>;
};

// Factory function: swap between mock and real adapters
export function getWarRoomAdapter(): WarRoomAdapter {
  // Later: add env var check to switch to Snowflake/streaming adapter
  // if (process.env.WARROOM_ADAPTER === "snowflake") {
  //   return snowflakeWarRoomAdapter;
  // }
  
  return mockWarRoomAdapter;
}