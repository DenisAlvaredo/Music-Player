var songs = [{
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    duration: "3:15",
    ubication: "/src/lost-in-city-lights-145038.mp3",
    cover: "/src/cover-1.png"
}, {
    title: "Forest Lubally",
    author: "Lesfm",
    duration: "3:45",
    ubication: "/src/forest-lullaby-110624.mp3",
    cover: "/src/cover-2.png"
}]

function showActualSong(index) {
    var actualSong = songs[index];
    
    document.getElementById('cover').src = actualSong.cover;
    document.getElementById('title').textContent = actualSong.title;
    document.getElementById('author').textContent = actualSong.author;
    document.getElementById('duration').textContent = actualSong.duration;
}

document.addEventListener('DOMContentLoaded', () => {
    showActualSong(0)
});
