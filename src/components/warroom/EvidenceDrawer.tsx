import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface EvidenceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evidenceId?: string;
  data?: any;
}

export function EvidenceDrawer({
  open,
  onOpenChange,
  evidenceId,
  data
}: EvidenceDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Evidence Details</DrawerTitle>
            <DrawerDescription>
              Viewing evidence artifact {evidenceId || "details"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="mt-3 h-[120px] w-full rounded-md border border-dashed border-zinc-700 bg-zinc-900/50 flex items-center justify-center text-sm text-zinc-400">
              {data ? JSON.stringify(data).slice(0, 100) : "No preview available"}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}