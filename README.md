# 🎵 Music Explorer

A modern, interactive web application for discovering and exploring music using the Deezer API. Built with vanilla JavaScript, HTML, and CSS, this single-page application provides a seamless music discovery experience with search functionality, favorites management, and dark mode support.

## ✨ Features

### 🎼 Core Functionality
- **Album Discovery**: Browse albums with detailed information including cover art, artist, release date, and genre
- **Track Previews**: Listen to 30-second previews of tracks directly in the browser
- **Search & Explore**: Search for albums and artists using the Deezer API
- **Favorites Management**: Add tracks to your personal favorites playlist
- **Interactive UI**: Modern, responsive design with smooth animations

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes with persistent preference storage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Dynamic content loading without page refreshes
- **Audio Controls**: Built-in audio player with play/pause functionality
- **Visual Feedback**: Highlighted currently playing tracks and hover effects

### 🔧 Technical Features
- **CORS Proxy Integration**: Seamless API access using corsproxy.io
- **Local Storage**: Persistent theme preferences and user settings
- **Error Handling**: Graceful error management with user-friendly messages
- **Performance Optimized**: Efficient DOM manipulation and event handling

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API access
- No additional software installation required

### Installation

1. **Clone or Download** the project files
2. **Navigate** to the project directory
3. **Open** `index.html` in your web browser
4. **Start Exploring** music immediately!

```bash
# If using git
git clone [repository-url]
cd phase-1-final-project
# Open index.html in your browser
```

## 📖 Usage Guide

### 🎯 Basic Navigation
1. **Default View**: The app loads with a featured album (Daft Punk - Discovery)
2. **Search**: Use the search bar to find albums by artist or album name
3. **View Tracks**: Click "View Tracks" on any album to see its track list
4. **Play Music**: Use the audio controls to play 30-second previews
5. **Add Favorites**: Click "Add to Favorites" to save tracks to your playlist

### 🎨 Theme Customization
- Click the **🌙/☀️** button in the header to toggle dark/light mode
- Your theme preference is automatically saved and restored on future visits

### 💾 Managing Favorites
- **Add**: Click "Add to Favorites" on any track
- **Remove**: Click "Remove" on any track in your favorites list
- **Play**: Use the audio controls in the favorites sidebar

## 🔌 API Integration

### Deezer API
This application integrates with the [Deezer API](https://developers.deezer.com/) to provide:
- Album search functionality
- Track information and metadata
- Audio preview URLs
- Artist and album details

### CORS Proxy
Due to browser security restrictions, the app uses [corsproxy.io](https://corsproxy.io/) to access the Deezer API without requiring API keys or server-side code.

### API Endpoints Used
- `https://api.deezer.com/search/album?q={query}` - Search for albums
- `https://api.deezer.com/album/{id}` - Get album details and tracks

## 📁 Project Structure

```
phase-1-final-project/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── index.js           # JavaScript functionality and API integration
└── README.md          # This documentation file
```

### File Descriptions

- **`index.html`**: Semantic HTML structure with header, main content area, and favorites sidebar
- **`styles.css`**: Complete styling including dark mode, responsive design, and interactive elements
- **`index.js`**: Core application logic including API calls, DOM manipulation, and event handling

## 🛠️ Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox, transitions, and responsive design
- **Vanilla JavaScript**: ES6+ features including async/await, template literals, and arrow functions

### Key JavaScript Features
- **Async/Await**: Clean asynchronous API calls
- **Event Delegation**: Efficient event handling
- **Local Storage**: Persistent user preferences
- **DOM Manipulation**: Dynamic content creation and updates
- **Error Handling**: Try-catch blocks and user feedback

### CSS Features
- **Flexbox Layout**: Responsive two-column design
- **CSS Transitions**: Smooth theme switching and hover effects
- **Media Queries**: Mobile-first responsive design
- **CSS Variables**: Consistent theming and color management

## 🎯 Project Requirements Met

This project successfully implements all required features for a Phase 1 JavaScript project:

✅ **Single Page Application** - No redirects or page reloads  
✅ **API Integration** - Deezer API with JSON communication  
✅ **Event Listeners** - Multiple distinct event types (click, play, DOMContentLoaded)  
✅ **Array Methods** - forEach, map, reduce for data manipulation  
✅ **DRY Code** - Modular functions and reusable components  
✅ **Async Operations** - Fetch API with proper error handling  

## 🚀 Future Enhancements

Potential improvements and additional features:
- **User Authentication**: Personal accounts and cloud favorites
- **Playlist Creation**: Custom playlist functionality
- **Advanced Search**: Filter by genre, year, or popularity
- **Offline Support**: Service worker for offline functionality
- **Social Features**: Share playlists and recommendations
- **Audio Visualization**: Real-time audio spectrum analysis

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a coding bootcamp curriculum.

## 🙏 Acknowledgments

- **Deezer API** for providing music data and previews
- **CORS Proxy** services for enabling cross-origin requests
- **Flatiron School** for the educational framework and requirements

---

**Happy Music Exploring! 🎵** 