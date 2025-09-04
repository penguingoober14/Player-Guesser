'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClubPath } from '@/components/club-path';
import type { Player } from '@/lib/players';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  isRevealed: boolean;
}

export function PlayerCard({ player, isRevealed }: PlayerCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105">
      <CardHeader className="p-0 relative h-64">
        <div className={cn(
          "absolute inset-0 transition-opacity duration-700",
          isRevealed ? "opacity-100" : "opacity-0"
        )}>
          <Image
            src={player.image}
            alt={player.name}
            width={400}
            height={400}
            data-ai-hint="football player"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-secondary transition-opacity duration-700",
          isRevealed ? "opacity-0" : "opacity-100"
        )}>
           <User className="w-24 h-24 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-card">
        <div className="text-center min-h-[4rem] flex flex-col justify-center">
            <div className={cn(
              "transition-all duration-500",
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            )}>
              <CardTitle className="font-headline text-3xl">{isRevealed ? player.name : '???'}</CardTitle>
            </div>
            <div className={cn(
              "text-4xl font-bold font-headline text-muted-foreground transition-all duration-500",
              !isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}>
              Who am I?
            </div>
        </div>
        <div className="mt-6">
          <h3 className="text-center text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            Career Path
          </h3>
          <ClubPath clubs={player.clubs} />
        </div>
      </CardContent>
    </Card>
  );
}
