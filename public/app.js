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
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length) return json;
    }
  } catch (_) {}
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
  clubsEl.innerHTML = '';
  ansEl.style.display = 'none';

  const player = data[order[i]];
  player.clubs.forEach((club) => {
    const li = document.createElement('li');
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
