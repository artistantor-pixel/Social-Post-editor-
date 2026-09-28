"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Trending", href: "/trending" },
  { name: "Categories", href: "/categories" },
  { name: "Editor's Picks", href: "/editors-picks" },
  { name: "For You", href: "/for-you" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between max-w-7xl">
        
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-4 lg:w-1/4">
          <Button variant="ghost" size="icon" aria-label="Toggle menu" className="lg:hidden hover:bg-primary/10 hover:text-primary transition-colors">
            <Menu className="h-6 w-6" />
          </Button>

          <Link href="/" className="flex items-center group">
            <Image 
              src="/logo.svg" 
              alt="Khobor Key Logo" 
              width={160} 
              height={45} 
              priority 
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>
        </div>

        {/* Center Section: Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center space-x-1 lg:w-2/4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Actions */}
        <div className="flex items-center justify-end gap-2 lg:gap-4 lg:w-1/4">
          
          <div className="hidden sm:flex items-center relative group">
            <div className="absolute left-3 text-muted-foreground group-hover:text-primary transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <input 
              type="text" 
              placeholder="Search news..." 
              className="h-10 w-full sm:w-48 lg:w-64 rounded-full border border-input bg-muted/30 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary/50"
            />
          </div>

          <Button variant="ghost" size="icon" aria-label="Search" className="sm:hidden hover:bg-primary/10 hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </Button>

          <ThemeToggle />

          <Button className="hidden md:flex gap-2 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
