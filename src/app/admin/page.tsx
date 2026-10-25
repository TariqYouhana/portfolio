import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal · Tariq Youhana Leon",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  redirect("/keystatic");
}
