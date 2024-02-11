"use client";

import { redirect } from "next/navigation";

import useSessionState from "~/next-auth/useSession";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = useSessionState();
  if (s.status === "unauthenticated" || s.data?.role === "PEASANT") {
    console.log(s.status);

    redirect("/auth");
  } else {
    console.log("Mr.", s.data?.name, "is a", s.data?.role);
  }
  return children;
}
