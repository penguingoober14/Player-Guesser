'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

interface ClubPathProps {
  clubs: { name: string; logo: string }[];
}

export function ClubPath({ clubs }: ClubPathProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      {clubs.map((club, index) => (
        <div
          key={`${club.name}-${index}`}
          className="w-full group"
          style={{ animation: `fadeInUp 0.5s ${index * 0.1}s ease-out forwards`, opacity: 0 }}
        >
          {index > 0 && (
            <div className="h-4 w-px bg-border mx-auto" />
          )}
          <div
            className={cn(
              'flex items-center justify-center gap-3 p-2 rounded-full border bg-secondary/50 text-secondary-foreground text-sm font-medium transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md'
            )}
          >
             <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center overflow-hidden">
                <Image src={club.logo} alt={`${club.name} logo`} width={24} height={24} className="object-cover" data-ai-hint="club logo" />
             </div>
            <span>{club.name}</span>
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
