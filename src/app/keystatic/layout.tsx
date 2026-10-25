import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard · Keystatic CMS",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-[#121211] text-[#EDE6D3] overflow-auto">
      {children}
    </div>
  );
}
