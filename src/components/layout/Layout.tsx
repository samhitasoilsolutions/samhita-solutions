import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import PageMeta from "@/components/PageMeta";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
