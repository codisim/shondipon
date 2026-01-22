// components/Header.tsx

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      {/* supports-[backdrop-filter]:bg-background/60 */}
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* max-w-screen-xl */}
        {/* Left side: Mobile menu + Logo */}
        <div className="flex items-center">
          {/* Mobile menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="mr-4 px-0 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/about-us">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/our-branches">Our Branches</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/gallery">Gallery</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/new-songs">New Songs</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-lg font-bold">
            {/* Replace with your actual logo image or text */}
             <span>Shondipon</span> {/* Placeholder logo text; use <Image> for actual logo */}
          </Link>
        </div>

        {/* Middle: Desktop navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          <Link href="/about-us" className="transition-colors hover:text-foreground/80">
            About Us
          </Link>
          <Link href="/our-branches" className="transition-colors hover:text-foreground/80">
            Our Branches
          </Link>
          <Link href="/gallery" className="transition-colors hover:text-foreground/80">
            Gallery
          </Link>
          <Link href="/new-songs" className="transition-colors hover:text-foreground/80">
            New Songs
          </Link>
        </nav>

        {/* Right side: Login button */}
        <div className="flex items-center">
          <Button variant="default">Login</Button>
        </div>
      </div>
    </header>
  );
}