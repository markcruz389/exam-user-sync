import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";

const syncUserSchema = z.object({
  userId: z.number(),
});

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = syncUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "User ID is required",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { userId } = validationResult.data;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, synced_at")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error(userError);
      return NextResponse.json(
        { message: "Failed to get user" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.synced_at) {
      return NextResponse.json(
        { message: "User already synced" },
        { status: 400 }
      );
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({ synced_at: new Date().toISOString() })
      .eq("id", userId)
      .select("id, synced_at")
      .single();

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { message: "Failed to sync user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to sync user" },
      { status: 500 }
    );
  }
}
