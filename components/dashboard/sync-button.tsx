"use client";

import { Button } from "@/components/ui/button";
import { useSyncUser } from "@/hooks/mutations/use-sync-user";
import { toast } from "sonner";

type SyncButtonProps = {
  userId: number;
  name: string;
};

export function SyncButton({ userId, name }: SyncButtonProps) {
  const syncUserMutation = useSyncUser();

  async function handleSync() {
    try {
      await syncUserMutation.mutateAsync(userId);
      toast.success(`${name} synced successfully`);
    } catch {
      toast.error(`Failed to sync ${name}`, {
        duration: 6000,
      });
    }
  }

  return (
    <Button onClick={handleSync} disabled={syncUserMutation.isPending}>
      {syncUserMutation.isPending ? "Syncing..." : "Sync Data"}
    </Button>
  );
}
