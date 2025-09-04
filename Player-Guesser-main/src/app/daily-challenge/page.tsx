'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { generateDailyChallenge, type GenerateDailyChallengeOutput } from '@/ai/flows/generate-daily-challenge';
import { Button } from '@/components/ui/button';
import { PlayerCard } from '@/components/player-card';
import { Dices, ArrowLeft, PartyPopper, Frown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

type DailyPlayer = {
  id: number;
  name: string;
  image: string;
  clubs: { name: string; logo: string }[];
};

export default function DailyChallengePage() {
  const [challenge, setChallenge] = useState<GenerateDailyChallengeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getChallenge = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        
        let userPerformance = 5; // Default performance
        const storedPerformance = localStorage.getItem('userPerformance');
        if (storedPerformance) {
          userPerformance = parseInt(storedPerformance, 10);
        }

        const todayStr = new Date().toDateString();
        const lastPlayed = localStorage.getItem('dailyChallengeLastPlayed');
        if (lastPlayed === todayStr) {
          setHasPlayed(true);
        }

        const result = await generateDailyChallenge({ seed, userPerformance });
        setChallenge(result);
      } catch (e) {
        setError('Failed to generate daily challenge. Please try again later.');
        toast({
          title: 'Error',
          description: 'Could not load the daily challenge.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    getChallenge();
  }, [toast]);

  const handleReveal = () => setIsRevealed(true);

  const handlePerformance = (correct: boolean) => {
    let currentPerformance = parseInt(localStorage.getItem('userPerformance') || '5', 10);
    currentPerformance = correct ? Math.min(10, currentPerformance + 1) : Math.max(0, currentPerformance - 1);
    localStorage.setItem('userPerformance', currentPerformance.toString());
    localStorage.setItem('dailyChallengeLastPlayed', new Date().toDateString());
    setHasPlayed(true);
    toast({
      title: correct ? 'Congratulations!' : 'Better luck next time!',
      description: `Your performance score is now ${currentPerformance}. Difficulty will be adjusted for tomorrow's challenge.`,
    });
  };

  const dailyPlayer: DailyPlayer | null = challenge ? {
    id: new Date().getDate(),
    name: challenge.playerName,
    image: 'https://picsum.photos/400/400',
    clubs: challenge.clubHistory.map(club => ({ name: club, logo: 'https://picsum.photos/40/40' })),
  } : null;

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <header className="p-4 flex justify-between items-center">
        <Link href="/" passHref>
          <Button variant="outline"><ArrowLeft className="mr-2" /> Back to Game</Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary text-center">
          Daily Challenge
        </h1>
        <div className="w-32"></div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        {isLoading && <Dices className="w-12 h-12 animate-spin text-primary" />}
        {error && <p className="text-destructive">{error}</p>}
        {!isLoading && !error && dailyPlayer && (
           <div className="flex flex-col items-center gap-6">
            <PlayerCard player={dailyPlayer} isRevealed={isRevealed} />

            {!isRevealed && (
              <Button onClick={handleReveal} className="bg-accent hover:bg-accent/90">Reveal Player</Button>
            )}

            {isRevealed && (
              <Card className="w-full max-w-sm text-center">
                <CardHeader>
                  <CardTitle>Did you guess correctly?</CardTitle>
                  <CardDescription>
                    {hasPlayed ? "You've already played today. Come back tomorrow!" : "This will adjust tomorrow's difficulty."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center gap-4">
                  <Button onClick={() => handlePerformance(true)} disabled={hasPlayed} variant="default" className="bg-green-600 hover:bg-green-700">
                    <PartyPopper className="mr-2" /> Yes
                  </Button>
                  <Button onClick={() => handlePerformance(false)} disabled={hasPlayed} variant="destructive">
                    <Frown className="mr-2" /> No
                  </Button>
                </CardContent>
              </Card>
            )}
           </div>
        )}
      </main>
    </div>
  );
}
