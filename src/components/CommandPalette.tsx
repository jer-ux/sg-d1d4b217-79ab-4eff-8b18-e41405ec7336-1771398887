"use client";

import { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/router";
import type { WarEvent } from "@/lib/warroom/types";
import type { NavLink } from "@/components/site";
import { getPacketStatus } from "@/components/warroom/packetUi";
import { submitPacket, approvePacket, closePacket } from "@/components/warroom/apiClient";
import { toast } from "@/hooks/use-toast";

type CommandPaletteProps = {
  // War Room mode
  events?: WarEvent[];
  onOpenEvidence?: (event: WarEvent | null) => void;
  
  // Site mode
  links?: NavLink[];
  open?: boolean;
  onClose?: () => void;
};

export default function CommandPalette({ 
  events = [], 
  onOpenEvidence, 
  links = [], 
  open: controlledOpen, 
  onClose 
}: CommandPaletteProps) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<"root" | "event">("root");
  const [selectedEvent, setSelectedEvent] = useState<WarEvent | null>(null);

  const isControlled = typeof controlledOpen === "boolean";
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const closePalette = useCallback(() => {
    setSearch("");
    setPage("root");
    setSelectedEvent(null);
    
    if (isControlled && onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, onClose]);

  // ⌘K / Ctrl+K to open (only if uncontrolled)
  useEffect(() => {
    if (isControlled) return;

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setInternalOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isControlled]);

  const handleEventSelect = useCallback((event: WarEvent) => {
    setSelectedEvent(event);
    setPage("event");
    setSearch("");
  }, []);

  const handleLinkSelect = useCallback((href: string) => {
    router.push(href);
    closePalette();
  }, [router, closePalette]);

  const handleViewEvidence = useCallback(() => {
    if (selectedEvent && onOpenEvidence) {
      onOpenEvidence(selectedEvent);
      closePalette();
    }
  }, [selectedEvent, onOpenEvidence, closePalette]);

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
          closePalette();
        }
      } catch (e: any) {
        toast({
          title: "Error",
          description: e?.message ?? "Unknown error",
          variant: "destructive",
        });
      }
    },
    [selectedEvent, closePalette]
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
        closePalette();
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ?? "Unknown error",
        variant: "destructive",
      });
    }
  }, [closePalette]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <Command
        className="w-full max-w-2xl k-panel k-glow shadow-2xl overflow-hidden"
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
            placeholder={page === "event" ? "Search actions..." : "Search events, links, or actions..."}
            className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/40 text-white"
          />
          <kbd className="pointer-events-none ml-auto hidden h-6 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-2 text-[10px] font-medium text-white/60 sm:flex">
            ESC
          </kbd>
        </div>

        <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <Command.Empty className="py-6 text-center text-sm text-white/50">
            No results found.
          </Command.Empty>

          {page === "root" && (
            <>
              {/* Site Navigation Links */}
              {links.length > 0 && (
                <Command.Group heading="Navigation" className="text-xs text-white/50 px-2 py-1.5">
                  {links
                    .filter(l => !search || l.label.toLowerCase().includes(search.toLowerCase()))
                    .slice(0, 5)
                    .map((link) => (
                      <Command.Item
                        key={link.href}
                        value={link.href}
                        onSelect={() => handleLinkSelect(link.href)}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-white/60">🔗</span>
                          <span className="text-white/90">{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/60">
                            {link.badge}
                          </span>
                        )}
                      </Command.Item>
                    ))}
                </Command.Group>
              )}

              {/* War Room Actions (only show if we have events context or search matches specific keywords) */}
              {(events.length > 0 || search.includes("submit") || search.includes("draft")) && (
                <Command.Group heading="War Room Actions" className="text-xs text-white/50 px-2 py-1.5 mt-2">
                  <Command.Item
                    onSelect={() => handleBulkSubmit("value")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
                  >
                    <span className="text-emerald-400">⚡</span>
                    <span className="text-white/90">Submit all drafts in Value lane</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => handleBulkSubmit("control")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
                  >
                    <span className="text-violet-400">⚡</span>
                    <span className="text-white/90">Submit all drafts in Control lane</span>
                  </Command.Item>
                </Command.Group>
              )}

              {/* War Room Events */}
              {events.length > 0 && (
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
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
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
              )}
            </>
          )}

          {page === "event" && selectedEvent && (
            <>
              <div className="px-3 py-2 border-b border-white/10 mb-2">
                <div className="text-sm text-white font-medium">{selectedEvent.title}</div>
                <div className="text-xs text-white/50 mt-1">
                  {selectedEvent.lane} • ${Math.abs(selectedEvent.amount).toLocaleString()} •{" "}
                  {getPacketStatus(selectedEvent)}
                </div>
              </div>

              <Command.Group heading="Actions" className="text-xs text-white/50 px-2 py-1.5">
                <Command.Item
                  onSelect={handleViewEvidence}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
                >
                  <span className="text-white/60">📋</span>
                  <span className="text-white/90">View evidence</span>
                </Command.Item>

                {getPacketStatus(selectedEvent) === "DRAFT" && (
                  <Command.Item
                    onSelect={() => handleAction("submit")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
                  >
                    <span className="text-white/60">📤</span>
                    <span className="text-white/90">Submit packet</span>
                  </Command.Item>
                )}

                {getPacketStatus(selectedEvent) === "SUBMITTED" && (
                  <Command.Item
                    onSelect={() => handleAction("approve")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
                  >
                    <span className="text-white/60">✅</span>
                    <span className="text-white/90">Approve packet</span>
                  </Command.Item>
                )}

                {getPacketStatus(selectedEvent) === "APPROVED" && (
                  <Command.Item
                    onSelect={() => handleAction("close")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
                  >
                    <span className="text-white/60">🔒</span>
                    <span className="text-white/90">Close packet</span>
                  </Command.Item>
                )}

                <Command.Item
                  onSelect={() => setPage("root")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/10 transition-colors"
                >
                  <span className="text-white/60">←</span>
                  <span className="text-white/90">Back to search</span>
                </Command.Item>
              </Command.Group>
            </>
          )}
        </Command.List>
      </Command>

      <div
        className="fixed inset-0 -z-10"
        onClick={closePalette}
      />
    </div>
  );
}