// API URL (with CORS proxy)
const url = 'https://corsproxy.io/?https://api.deezer.com/album/302127';

// DOM selectors
const DOM = {
  searchButton: document.getElementById('searchBtn'),
  playlistContainer: document.getElementsByClassName('music-list'),
  favPlaylistContainer: document.getElementsByClassName('playlist-list'),
};

// Favorites array
let favorites = [];

// Add DOM selectors for search
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const reloadBtn = document.getElementById('reloadBtn');
const darkModeBtn = document.getElementById('darkModeBtn');

// Dark mode functionality
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update button text
  if (isDarkMode) {
    darkModeBtn.textContent = '☀️ Light Mode';
  } else {
    darkModeBtn.textContent = '🌙 Dark Mode';
  }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.toggle('dark-mode', isDarkMode);
  if (isDarkMode) {
    darkModeBtn.textContent = '☀️ Light Mode';
  }
});

// Event listener for dark mode toggle
if (darkModeBtn) {
  darkModeBtn.addEventListener('click', toggleDarkMode);
}

// Helper: Format duration in mm:ss
function formatDuration(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = String(seconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

// Helper: Get total album duration
function getTotalDuration(tracks) {
  const total = tracks.reduce((sum, t) => sum + t.duration, 0);
  return formatDuration(total);
}

// Fetch album data and render everything
async function fetchAlbum() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.tracks && data.tracks.data) {
      renderAlbumDetails(data);
      renderMusicList(data.tracks.data, data);
      renderTotalDuration(data.tracks.data);
    } else {
      renderMusicList([]);
    }
  } catch (error) {
    console.error('Error fetching album:', error);
  }
}

// Render album details above the track list
function renderAlbumDetails(album) {
  const container = DOM.playlistContainer[0];
  container.innerHTML = `
    <div class="album-details">
      <img src="${album.cover_medium}" alt="${album.title}" width="120"/>
      <div>
        <h2>${album.title}</h2>
        <p>
          By <a href="${album.artist.link}" target="_blank">${album.artist.name}</a><br>
          Release: ${album.release_date}<br>
          Genre: ${album.genres?.data[0]?.name || 'N/A'}<br>
          Tracks: ${album.nb_tracks}
        </p>
      </div>
    </div>
    <h3>Track List</h3>
  `;
}

// Render music cards (tracks)
function renderMusicList(tracks, album) {
  const container = DOM.playlistContainer[0];
  // Don't clear container, as album details are already rendered
  const trackListDiv = document.createElement('div');
  trackListDiv.className = 'track-list';
  tracks.forEach((track, idx) => {
    const div = document.createElement('div');
    div.className = 'music-card';
    div.innerHTML = `
      <span class="track-number">${idx + 1}.</span>
      <h4>${track.title}</h4>
      <span class="track-duration">${formatDuration(track.duration)}</span>
      <audio controls src="${track.preview}"></audio>
      <button class="fav-btn">Add to Favorites</button>
      <button class="copy-link-btn">Copy Link</button>
      <a href="${track.preview}" download="${track.title}.mp3" class="download-btn">Download Preview</a>
    `;
    // Add to favorites
    div.querySelector('.fav-btn').addEventListener('click', () => {
      addToFavorites(track.title, track.artist.name, track.preview);
    });
    // Copy link
    div.querySelector('.copy-link-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(track.link);
      alert('Track link copied!');
    });
    // Highlight now playing
    div.querySelector('audio').addEventListener('play', function() {
      // Remove highlight from all
      trackListDiv.querySelectorAll('.music-card').forEach(card => card.classList.remove('playing'));
      div.classList.add('playing');
    });
    trackListDiv.appendChild(div);
  });
  container.appendChild(trackListDiv);
}

// Render total album duration
function renderTotalDuration(tracks) {
  const container = DOM.playlistContainer[0];
  const totalDuration = getTotalDuration(tracks);
  const totalDiv = document.createElement('div');
  totalDiv.className = 'album-total-duration';
  totalDiv.innerHTML = `<strong>Total Album Duration:</strong> ${totalDuration}`;
  container.appendChild(totalDiv);
}

// Favorites management
function addToFavorites(title, artist, preview) {
  favorites.push({ title, artist, preview });
  renderFavorites();
}

function renderFavorites() {
  const favList = DOM.favPlaylistContainer[0];
  favList.innerHTML = '';
  favorites.forEach((fav, index) => {
    const div = document.createElement('div');
    div.className = 'fav-card';
    div.innerHTML = `
      <h4>${fav.title}</h4>
      <p>${fav.artist}</p>
      <audio controls src="${fav.preview}"></audio>
      <button class="remove-fav-btn">Remove</button>
    `;
    div.querySelector('.remove-fav-btn').addEventListener('click', () => {
      favorites.splice(index, 1);
      renderFavorites();
    });
    favList.appendChild(div);
  });
}

// Search for albums by artist or album name
async function searchAlbums(query) {
  const searchUrl = `https://corsproxy.io/?https://api.deezer.com/search/album?q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    if (data && data.data && data.data.length > 0) {
      renderSearchResults(data.data);
    } else {
      renderSearchResults([]);
    }
  } catch (error) {
    alert('Error fetching search results.');
  }
}

// Render search results as albums
function renderSearchResults(albums) {
  const container = DOM.playlistContainer[0];
  container.innerHTML = '<h2>Search Results</h2>';
  if (albums.length === 0) {
    container.innerHTML += '<p>No albums found.</p>';
    return;
  }
  const resultsDiv = document.createElement('div');
  resultsDiv.className = 'album-search-results';
  albums.forEach(album => {
    const div = document.createElement('div');
    div.className = 'music-card';
    div.innerHTML = `
      <img src="${album.cover_medium}" alt="${album.title}" width="100"/>
      <h4>${album.title}</h4>
      <p>${album.artist.name}</p>
      <button class="view-tracks-btn">View Tracks</button>
    `;
    div.querySelector('.view-tracks-btn').addEventListener('click', () => {
      fetchAlbumById(album.id);
    });
    resultsDiv.appendChild(div);
  });
  container.appendChild(resultsDiv);
}

// Fetch album by ID (for search results)
async function fetchAlbumById(albumId) {
  const albumUrl = `https://corsproxy.io/?https://api.deezer.com/album/${albumId}`;
  try {
    const response = await fetch(albumUrl);
    const data = await response.json();
    if (data && data.tracks && data.tracks.data) {
      renderAlbumDetails(data);
      renderMusicList(data.tracks.data, data);
      renderTotalDuration(data.tracks.data);
    }
  } catch (error) {
    alert('Error loading album.');
  }
}

// Event listeners for search and reload
if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      searchAlbums(query);
    }
  });
}
if (reloadBtn) {
  reloadBtn.addEventListener('click', fetchAlbum);
}

// Fetch and render album on load
fetchAlbum();
