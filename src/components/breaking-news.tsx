"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const BREAKING_NEWS = [
  "Global Markets React Positively to New Tech Regulations",
  "Championship Finals: A Historic Victory for the Underdogs",
  "New Electric Vehicle Breaks Range Records in Winter Testing",
  "Breakthrough in Renewable Energy: Solar Panels Now 40% More Efficient",
];

export function BreakingNews() {
  return (
    <div className="container mx-auto px-4 max-w-7xl mt-4 md:mt-6 mb-2">
      <div className="w-full bg-background/95 backdrop-blur-xl border border-border/60 rounded-xl relative flex items-center h-12 overflow-hidden shadow-sm">
      
      {/* Left Label - Modern Slanted/Gradient Design */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center">
        <div className="flex items-center justify-center h-full px-6 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-extrabold text-xs md:text-sm tracking-[0.2em] shadow-[8px_0_20px_rgba(0,0,0,0.15)] relative">
          <Zap className="w-4 h-4 mr-2 animate-pulse fill-current" />
          LATEST
          {/* Slanted edge effect using an absolute pseudo-element trick */}
          <div className="absolute -right-4 top-0 bottom-0 w-8 bg-primary/90 skew-x-[-20deg] -z-10 shadow-[8px_0_15px_rgba(0,0,0,0.1)]"></div>
        </div>
      </div>

      {/* Marquee Container with Fade Masks */}
      <div 
        className="flex flex-1 overflow-hidden ml-36 md:ml-48 relative h-full items-center"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
      >
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: [0, -2500] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          }}
        >
          {/* Double the array for seamless infinite looping effect */}
          {[...BREAKING_NEWS, ...BREAKING_NEWS, ...BREAKING_NEWS].map((news, idx) => (
            <div key={idx} className="flex items-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} 
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="mx-8 flex-shrink-0"
              >
                <Image 
                  src="/logo.svg" 
                  alt="Khobor Key" 
                  width={60} 
                  height={20} 
                  className="h-5 w-auto drop-shadow-sm opacity-90" 
                />
              </motion.div>
              <Link 
                href="#" 
                className="text-sm md:text-base font-semibold text-foreground/90 hover:text-primary transition-all duration-300 flex items-center group"
              >
                {news}
                <span className="inline-block w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100 ml-0 group-hover:ml-2">
                  →
                </span>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

    </div>
    </div>
  );
}
