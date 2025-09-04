'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { players, type Player } from '@/lib/players';
import { Button } from '@/components/ui/button';
import { PlayerCard } from '@/components/player-card';
import { SettingsMenu } from '@/components/settings-menu';
import { Shuffle, Eye, ArrowRight, Dices } from 'lucide-react';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Player[]): Player[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Home() {
  const [shuffledPlayers, setShuffledPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setShuffledPlayers(shuffleArray(players));
    setIsMounted(true);
  }, []);

  const handleNextPlayer = useCallback(() => {
    setIsRevealed(false);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % shuffledPlayers.length);
  }, [shuffledPlayers.length]);

  const handleReveal = () => {
    setIsRevealed(true);
  };
  
  const handleShuffle = () => {
    setIsRevealed(false);
    setShuffledPlayers(shuffleArray(players));
    setCurrentPlayerIndex(0);
  };

  const currentPlayer = useMemo(() => shuffledPlayers[currentPlayerIndex], [shuffledPlayers, currentPlayerIndex]);

  if (!isMounted || !currentPlayer) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Dices className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary">
          Player Guesser
        </h1>
        <div className="flex items-center gap-4">
           <Link href="/daily-challenge">
            <Button variant="ghost">Daily Challenge</Button>
          </Link>
          <SettingsMenu />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <PlayerCard player={currentPlayer} isRevealed={isRevealed} />
      </main>

      <footer className="p-4 flex justify-center items-center gap-4">
        <Button variant="outline" onClick={handleShuffle}>
          <Shuffle />
          Shuffle
        </Button>
        <Button onClick={handleReveal} disabled={isRevealed} variant="default" className="bg-accent hover:bg-accent/90">
          <Eye />
          Reveal
        </Button>
        <Button onClick={handleNextPlayer}>
          <ArrowRight />
          Next Player
        </Button>
      </footer>
    </div>
  );
}
