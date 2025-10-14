"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { usePathname } from "next/navigation";
import React from "react";

export function Header() {
    const pathname = usePathname();
    const pageTitle = pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard';
    const capitalizedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="hidden md:block text-lg font-semibold">{capitalizedTitle}</h1>
            </div>
            <div className="ml-auto flex items-center gap-4">
                <UserNav />
            </div>
        </header>
    );
}
