export interface Player {
  id: number;
  name: string;
  image: string;
  clubs: { name: string; logo: string }[];
}

export const players: Player[] = [
  {
    id: 1,
    name: 'Lionel Messi',
    image: 'https://picsum.photos/400/400',
    clubs: [
      { name: 'FC Barcelona', logo: 'https://picsum.photos/40/40' },
      { name: 'Paris Saint-Germain', logo: 'https://picsum.photos/40/40' },
      { name: 'Inter Miami CF', logo: 'https://picsum.photos/40/40' },
    ],
  },
  {
    id: 2,
    name: 'Cristiano Ronaldo',
    image: 'https://picsum.photos/400/400',
    clubs: [
      { name: 'Sporting CP', logo: 'https://picsum.photos/40/40' },
      { name: 'Manchester United', logo: 'https://picsum.photos/40/40' },
      { name: 'Real Madrid', logo: 'https://picsum.photos/40/40' },
      { name: 'Juventus', logo: 'https://picsum.photos/40/40' },
      { name: 'Al Nassr', logo: 'https://picsum.photos/40/40' },
    ],
  },
  {
    id: 3,
    name: 'Zlatan Ibrahimović',
    image: 'https://picsum.photos/400/400',
    clubs: [
      { name: 'Malmö FF', logo: 'https://picsum.photos/40/40' },
      { name: 'Ajax', logo: 'https://picsum.photos/40/40' },
      { name: 'Juventus', logo: 'https://picsum.photos/40/40' },
      { name: 'Inter Milan', logo: 'https://picsum.photos/40/40' },
      { name: 'FC Barcelona', logo: 'https://picsum.photos/40/40' },
      { name: 'AC Milan', logo: 'https://picsum.photos/40/40' },
      { name: 'Paris Saint-Germain', logo: 'https://picsum.photos/40/40' },
      { name: 'Manchester United', logo: 'https://picsum.photos/40/40' },
      { name: 'LA Galaxy', logo: 'https://picsum.photos/40/40' },
    ],
  },
  {
    id: 4,
    name: 'Neymar Jr.',
    image: 'https://picsum.photos/400/400',
    clubs: [
        { name: 'Santos FC', logo: 'https://picsum.photos/40/40' },
        { name: 'FC Barcelona', logo: 'https://picsum.photos/40/40' },
        { name: 'Paris Saint-Germain', logo: 'https://picsum.photos/40/40' },
        { name: 'Al Hilal SFC', logo: 'https://picsum.photos/40/40' },
    ],
  },
  {
    id: 5,
    name: 'Kevin De Bruyne',
    image: 'https://picsum.photos/400/400',
    clubs: [
        { name: 'KRC Genk', logo: 'https://picsum.photos/40/40' },
        { name: 'Chelsea FC', logo: 'https://picsum.photos/40/40' },
        { name: 'SV Werder Bremen', logo: 'https://picsum.photos/40/40' },
        { name: 'VfL Wolfsburg', logo: 'https://picsum.photos/40/40' },
        { name: 'Manchester City', logo: 'https://picsum.photos/40/40' },
    ],
  },
];
