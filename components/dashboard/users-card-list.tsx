"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SyncButton } from "@/components/dashboard/sync-button";
import { User } from "@/hooks/queries/use-users";

interface UsersCardListProps {
  users: User[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function UsersCardList({ users, isLoading, error }: UsersCardListProps) {
  useEffect(() => {
    if (!isLoading && (error || users === undefined)) {
      toast.error("Failed to fetch users data", {
        description: "Unable to load user data. Please try again later.",
        duration: 6000,
      });
    }
  }, [error, users, isLoading]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-40" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || users === undefined) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-destructive">
            Failed to fetch users data
          </p>
        </CardContent>
      </Card>
    );
  }

  const sortedUsers = [...users].sort((a, b) => b.id - a.id);

  if (sortedUsers.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center">No users found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sortedUsers.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-muted-foreground">Synced At</div>
              {user.synced_at ? (
                <div className="text-sm">
                  {new Date(user.synced_at).toLocaleString()}
                </div>
              ) : (
                <SyncButton userId={user.id} name={user.name} />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
