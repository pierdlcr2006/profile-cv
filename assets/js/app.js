const root = document.documentElement;
const rainLayer = document.querySelector('.code-rain');

const codeTokens = [
    '<div>',
    '</div>',
    '<section>',
    '</section>',
    '<header>',
    '</header>',
    '<main>',
    '</main>',
    '<article>',
    '</article>',
    '<h1>',
    '</h1>',
    '<p>',
    '</p>',
    '<button>',
    '</button>',
    '<a>',
    '</a>',
    '<ul>',
    '</ul>',
    '<li>',
    '</li>',
    '<script>',
    '</script>',
    '<style>',
    '</style>',
    '<>',
    '</>',
    '/>',
    '<!-- -->'
];

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function buildCodeRain() {
    if (!rainLayer) return;

    const viewport = window.innerWidth;
    const count = viewport < 480 ? 16 : viewport < 900 ? 26 : 40;

    rainLayer.textContent = '';

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i += 1) {
        const drop = document.createElement('span');
        drop.className = 'code-drop';
        drop.textContent = randomItem(codeTokens);

        drop.style.left = `${Math.random() * 100}%`;
        drop.style.fontSize = `${11 + Math.random() * 11}px`;
        drop.style.setProperty('--duration', `${8 + Math.random() * 10}s`);
        drop.style.setProperty('--delay', `${-Math.random() * 18}s`);
        drop.style.setProperty('--sway', `${-40 + Math.random() * 80}px`);
        drop.style.setProperty('--alpha', `${0.16 + Math.random() * 0.4}`);

        fragment.appendChild(drop);
    }

    rainLayer.appendChild(fragment);
}

window.addEventListener(
    'pointermove',
    (event) => {
        root.style.setProperty('--mouse-x', `${event.clientX}px`);
        root.style.setProperty('--mouse-y', `${event.clientY}px`);
    },
    { passive: true }
);

let resizeTimeout;
window.addEventListener(
    'resize',
    () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(buildCodeRain, 180);
    },
    { passive: true }
);

buildCodeRain();
