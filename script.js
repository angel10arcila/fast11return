// Configuración de medios predefinidos //Ángel José Arcila Parra 
const mediaFiles = [


{
    name:"Spnoiss 1 - Español",
    url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Psinosis-Español.mp3",
    type: "Video"
},

{
    name: "Psinosis 2 - English.",
    url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Psinosis- English.mp3",
    type: "Video"
},

{
    name: "Fast",
    url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Fast 11 return (Ángel José Arcila Parra - venearci music).mp3",
    type: "Audio"
},

{
    name: "Fast-2",
    url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Fast 11 return - Ángel José Arcila Parra - venearci music .mp3",
    type: "Audio"
},

{
    name: "Fast-3",
    url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Fast 11 return - Ángel José Arcila Parra venearci music .mp3",
    type: "Audio"
},

{
    name: "Fast - 4",
    url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Fast 11 return 11 (2) Ángel José Arcila Parra - venearci music..mp3",
    type: "Audio"
},

{
    name: "Fast - 5",
    url: "https://raw.githubusercontent.com/angel10arcila/angeljosearcilaparra/refs/heads/main/Fast 11 return 3 - Ángel José Arcila Parra - venearci music .mp3",
    type: "Audio"
},
          
];

let currentTrack = 0;
const mediaPlayer = document.getElementById('mediaPlayer');
const playlist = document.getElementById('playlist');

// Inicializar reproductor
function initPlayer() {
    // Generar playlist
    mediaFiles.forEach((media, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            ${media.name}
            <span class="format-badge">${media.type.toUpperCase()}</span>
        `;
        item.onclick = () => loadMedia(index);
        playlist.appendChild(item);
    });

    // Cargar primer medio
    loadMedia(0);
}

function loadMedia(index) {
    currentTrack = index;
    const media = mediaFiles[index];
    
    // Actualizar clase activa en playlist
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Cargar medio según tipo
    if (media.type === 'm3u') {
        loadM3U(media.url);
    } else {
        mediaPlayer.src = media.url;
        mediaPlayer.play();
    }
}

async function loadM3U(url) {
    try {
        const response = await fetch(url);
        const content = await response.text();
        // Procesar M3U y extraer URLs
        const urls = content.match(/^(?!#).+$/gm);
        if (urls && urls.length > 0) {
            mediaPlayer.src = urls[0];
            mediaPlayer.play();
        }
    } catch (error) {
        console.error('Error loading M3U:', error);
    }
}

function playPause() {
    if (mediaPlayer.paused) {
        mediaPlayer.play();
    } else {
        mediaPlayer.pause();
    }
}

function nextTrack() {
    const next = (currentTrack + 1) % mediaFiles.length;
    loadMedia(next);
}

function previousTrack() {
    const prev = (currentTrack - 1 + mediaFiles.length) % mediaFiles.length;
    loadMedia(prev);
}

function toggleMute() {
    mediaPlayer.muted = !mediaPlayer.muted;
}

// Eventos del reproductor
mediaPlayer.addEventListener('ended', () => {
    nextTrack();
});

mediaPlayer.addEventListener('error', (e) => {
    console.error('Error en la reproducción:', e);
    nextTrack();
});

// Inicializar
initPlayer();
      
