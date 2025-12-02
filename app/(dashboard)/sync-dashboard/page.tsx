"use client";

import { UsersTable } from "@/components/dashboard/users-table";
import { UsersCardList } from "@/components/dashboard/users-card-list";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUsers } from "@/hooks/queries/use-users";

export default function Page() {
  const { data: users, isLoading, error } = useUsers();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <UsersCardList users={users} isLoading={isLoading} error={error} />;
  }

  return <UsersTable users={users} isLoading={isLoading} error={error} />;
}
