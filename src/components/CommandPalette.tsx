"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import type { WarEvent } from "@/lib/warroom/types";
import { getPacketStatus } from "@/components/warroom/packetUi";
import { submitPacket, approvePacket, closePacket } from "@/components/warroom/apiClient";
import { toast } from "@/hooks/use-toast";

type CommandPaletteProps = {
  events: WarEvent[];
  onOpenEvidence: (event: WarEvent | null) => void;
};

export default function CommandPalette({ events, onOpenEvidence }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<"root" | "event">("root");
  const [selectedEvent, setSelectedEvent] = useState<WarEvent | null>(null);

  // ⌘K / Ctrl+K to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Reset state when closing
  useEffect(() => {
    if (!open) {
      setSearch("");
      setPage("root");
      setSelectedEvent(null);
    }
  }, [open]);

  const handleEventSelect = useCallback((event: WarEvent) => {
    setSelectedEvent(event);
    setPage("event");
  }, []);

  const handleViewEvidence = useCallback(() => {
    if (selectedEvent) {
      onOpenEvidence(selectedEvent);
      setOpen(false);
    }
  }, [selectedEvent, onOpenEvidence]);

  const handleAction = useCallback(
    async (action: "submit" | "approve" | "close") => {
      if (!selectedEvent) return;

      try {
        let result;
        if (action === "submit") result = await submitPacket(selectedEvent.id);
        else if (action === "approve") result = await approvePacket(selectedEvent.id);
        else result = await closePacket(selectedEvent.id);

        if (!result.ok) {
          toast({
            title: "Action failed",
            description: result.policyReasons?.length
              ? result.policyReasons.join(" • ")
              : result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: `Packet ${action}ed successfully`,
          });
          setOpen(false);
        }
      } catch (e: any) {
        toast({
          title: "Error",
          description: e?.message ?? "Unknown error",
          variant: "destructive",
        });
      }
    },
    [selectedEvent]
  );

  const handleBulkSubmit = useCallback(async (lane: string) => {
    try {
      const res = await fetch("/api/packet/bulk-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lane, max: 50 }),
      });
      const result = await res.json();

      if (!result.ok) {
        toast({
          title: "Bulk submit failed",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Bulk submit complete",
          description: `${result.okCount} packets submitted (${result.failCount} failed)`,
        });
        setOpen(false);
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ?? "Unknown error",
        variant: "destructive",
      });
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <Command
        className="w-full max-w-2xl k-panel k-glow shadow-2xl"
        shouldFilter={false}
      >
        <div className="flex items-center border-b border-white/10 px-4">
          <svg
            className="mr-2 h-4 w-4 shrink-0 opacity-50"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Search events, take actions..."
            className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/40 text-white"
          />
          <kbd className="pointer-events-none ml-auto hidden h-6 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-2 text-[10px] font-medium text-white/60 sm:flex">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[400px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-white/50">
            No results found.
          </Command.Empty>

          {page === "root" && (
            <>
              <Command.Group heading="Quick Actions" className="text-xs text-white/50 px-2 py-1.5">
                <Command.Item
                  onSelect={() => handleBulkSubmit("value")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                >
                  <span className="text-emerald-400">⚡</span>
                  <span>Submit all drafts in Value lane</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => handleBulkSubmit("control")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                >
                  <span className="text-violet-400">⚡</span>
                  <span>Submit all drafts in Control lane</span>
                </Command.Item>
                <Command.Item
                  onSelect={() => handleBulkSubmit("exposure")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                >
                  <span className="text-rose-400">⚡</span>
                  <span>Submit all drafts in Exposure lane</span>
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Events" className="text-xs text-white/50 px-2 py-1.5 mt-2">
                {events
                  .filter((e) => {
                    if (!search) return true;
                    const s = search.toLowerCase();
                    return (
                      e.title.toLowerCase().includes(s) ||
                      e.subtitle?.toLowerCase().includes(s) ||
                      e.owner?.toLowerCase().includes(s) ||
                      e.lane.toLowerCase().includes(s) ||
                      e.id.toLowerCase().includes(s)
                    );
                  })
                  .slice(0, 20)
                  .map((e) => (
                    <Command.Item
                      key={e.id}
                      value={e.id}
                      onSelect={() => handleEventSelect(e)}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white truncate">{e.title}</div>
                        <div className="text-xs text-white/50 mt-0.5">
                          {e.lane} • ${Math.abs(e.amount).toLocaleString()} • {getPacketStatus(e)}
                        </div>
                      </div>
                      <kbd className="ml-3 hidden h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 text-[10px] font-medium text-white/60 sm:flex">
                        →
                      </kbd>
                    </Command.Item>
                  ))}
              </Command.Group>
            </>
          )}

          {page === "event" && selectedEvent && (
            <>
              <div className="px-3 py-2 border-b border-white/10">
                <div className="text-sm text-white font-medium">{selectedEvent.title}</div>
                <div className="text-xs text-white/50 mt-1">
                  {selectedEvent.lane} • ${Math.abs(selectedEvent.amount).toLocaleString()} •{" "}
                  {getPacketStatus(selectedEvent)}
                </div>
              </div>

              <Command.Group heading="Actions" className="text-xs text-white/50 px-2 py-1.5">
                <Command.Item
                  onSelect={handleViewEvidence}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                >
                  <span>📋</span>
                  <span>View evidence</span>
                </Command.Item>

                {getPacketStatus(selectedEvent) === "DRAFT" && (
                  <Command.Item
                    onSelect={() => handleAction("submit")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                  >
                    <span>📤</span>
                    <span>Submit packet</span>
                  </Command.Item>
                )}

                {getPacketStatus(selectedEvent) === "SUBMITTED" && (
                  <Command.Item
                    onSelect={() => handleAction("approve")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                  >
                    <span>✅</span>
                    <span>Approve packet</span>
                  </Command.Item>
                )}

                {getPacketStatus(selectedEvent) === "APPROVED" && (
                  <Command.Item
                    onSelect={() => handleAction("close")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                  >
                    <span>🔒</span>
                    <span>Close packet</span>
                  </Command.Item>
                )}

                <Command.Item
                  onSelect={() => setPage("root")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 data-[selected=true]:bg-white/10"
                >
                  <span>←</span>
                  <span>Back to search</span>
                </Command.Item>
              </Command.Group>
            </>
          )}
        </Command.List>
      </Command>

      <div
        className="fixed inset-0 -z-10"
        onClick={() => setOpen(false)}
      />
    </div>
  );
}