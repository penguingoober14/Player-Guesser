// --- Minimal, dependency-free game logic ---
// 1) You can edit the inline demo data here, OR
// 2) Create data/players.json (see schema below) and it will load that instead.

/** Example schema for data/players.json
 [
   { "name": "Cristiano Ronaldo", "clubs": [
       "Sporting CP","Manchester United","Real Madrid","Juventus","Manchester United","Al Nassr"
     ]},
   { "name": "Lionel Messi", "clubs": ["Barcelona","Paris Saint-Germain","Inter Miami"] }
 ]
*/

const demo = [
  { name: "Player One", clubs: ["Club A", "Club B", "Club C"] },
  { name: "Player Two", clubs: ["Club X", "Club Y"] },
  { name: "Player Three", clubs: ["Club D", "Club E", "Club F", "Club G"] }
];

async function loadPlayers() {
  try {
    const res = await fetch('data/players.json', { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Failed to fetch players.json: ${res.status} ${res.statusText}`);
    } else {
      const json = await res.json();
      if (!Array.isArray(json)) {
        console.error('Invalid data format for players.json: expected an array.');
      } else {
        const sanitized = json.reduce((players, entry, index) => {
          if (!entry || typeof entry !== 'object') {
            console.error(`Invalid player entry at index ${index}: expected an object.`);
            return players;
          }

          const { name, clubs } = entry;
          if (typeof name !== 'string') {
            console.error(`Invalid player name at index ${index}: expected a string.`);
            return players;
          }

          if (!Array.isArray(clubs)) {
            console.error(`Invalid clubs list for player "${name}" at index ${index}: expected an array.`);
            return players;
          }

          const clubNames = clubs.filter((club, clubIndex) => {
            const isString = typeof club === 'string';
            if (!isString) {
              console.error(`Invalid club entry for player "${name}" at index ${index}, club #${clubIndex}: expected a string.`);
            }
            return isString;
          });

          if (!clubNames.length) {
            console.error(`Player "${name}" at index ${index} has no valid club entries.`);
            return players;
          }

          players.push({ name, clubs: clubNames });
          return players;
        }, []);

        if (sanitized.length) return sanitized;
        console.error('No valid player entries found in players.json.');
      }
    }
  } catch (error) {
    console.error('Error loading players:', error);
  }
  return demo;
}

let data = [];
let order = [];
let i = 0;

function shuffle(n) {
  const a = Array.from({length: n}, (_, k) => k);
  for (let j = n - 1; j > 0; j--) {
    const r = Math.floor(Math.random() * (j + 1));
    [a[j], a[r]] = [a[r], a[j]];
  }
  return a;
}

function render() {
  const clubsEl = document.getElementById('clubs');
  const ansEl = document.getElementById('answer');
  clubsEl.replaceChildren();
  ansEl.style.display = 'none';

  const player = data[order[i]];
  player.clubs.forEach((club) => {
    const li = document.createElement('li');
    li.className = 'club-badge';
    li.textContent = club;
    clubsEl.appendChild(li);
  });

  ansEl.textContent = player.name;
}

document.getElementById('reveal').addEventListener('click', () => {
  document.getElementById('answer').style.display = 'block';
});

document.getElementById('next').addEventListener('click', () => {
  i = (i + 1) % data.length;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

loadPlayers().then((players) => {
  data = players;
  order = shuffle(data.length);
  render();
});
