import type { Metadata } from 'next';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Waves } from 'lucide-react';
import { Header } from '@/components/header';
import DashboardNav from '@/components/dashboard-nav';
import { UserNav } from '@/components/user-nav';

export const metadata: Metadata = {
  title: 'Painel | FluvPred',
  description: 'Painel do FluvPred.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold font-headline">FluvPred</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav />
        </SidebarContent>
        <SidebarFooter>
            {/* The UserNav is in the header, but on collapsed icon view, it could be here. For simplicity, we keep it in the header only. */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
 