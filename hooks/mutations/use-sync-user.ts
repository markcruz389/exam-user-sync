import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import type { User } from "../queries/use-users";

const syncUserResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    synced_at: z.string(),
  }),
});

export type SyncUserResponse = z.infer<typeof syncUserResponseSchema>;

async function syncUser(userId: number): Promise<SyncUserResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const response = await fetch(`${baseUrl}/sync-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Failed to sync user");
  }

  const data = await response.json();
  const validationResult = syncUserResponseSchema.safeParse(data);

  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error);
    throw new Error("Invalid response format");
  }

  return validationResult.data;
}

export function useSyncUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncUser,
    onSuccess: (data) => {
      queryClient.setQueryData<User[]>(["users"], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((user) =>
          user.id === data.data.id
            ? { ...user, synced_at: data.data.synced_at }
            : user
        );
      });
    },
  });
}
