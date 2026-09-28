import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-12 md:py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <Image src="/logo.svg" alt="Khobor Key Logo" width={160} height={45} className="h-10 w-auto" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Your source for the latest and most relevant news, tailored with AI.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-sm tracking-wider uppercase">Categories</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/categories/technology" className="hover:text-foreground transition-colors">Technology</Link></li>
            <li><Link href="/categories/business" className="hover:text-foreground transition-colors">Business</Link></li>
            <li><Link href="/categories/sports" className="hover:text-foreground transition-colors">Sports</Link></li>
            <li><Link href="/categories/entertainment" className="hover:text-foreground transition-colors">Entertainment</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-sm tracking-wider uppercase">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
            <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-sm tracking-wider uppercase">Subscribe</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get personalized news delivered to your inbox daily.
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Khobor Key. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
