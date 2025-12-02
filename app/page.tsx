import { redirect } from "next/navigation";

export default function Page() {
  redirect("/sync-dashboard");

  return <div>Redirecting to sync dashboard...</div>;
}
