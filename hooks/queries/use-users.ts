import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  synced_at: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;

const usersResponseSchema = z.array(userSchema);

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  const validationResult = usersResponseSchema.safeParse(data);

  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error);
    throw new Error("Invalid response format");
  }

  return validationResult.data;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
