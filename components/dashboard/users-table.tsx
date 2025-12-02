"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { SyncButton } from "@/components/dashboard/sync-button";
import { User } from "@/hooks/queries/use-users";

interface UsersTableProps {
  users: User[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function UsersTable({ users, isLoading, error }: UsersTableProps) {
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Synced At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="py-4">
                <Skeleton className="h-7 w-32" />
              </TableCell>
              <TableCell className="py-4">
                <Skeleton className="h-7 w-48" />
              </TableCell>
              <TableCell className="py-4">
                <Skeleton className="h-7 w-32" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (error || users === undefined) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Synced At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className="text-center text-destructive">
              Failed to fetch users data
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  const sortedUsers = users ? [...users].sort((a, b) => b.id - a.id) : [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Synced At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.length > 0 ? (
          sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.synced_at ? (
                  new Date(user.synced_at).toLocaleString()
                ) : (
                  <SyncButton userId={user.id} name={user.name} />
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No users found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
