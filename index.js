var songs = [{
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    duration: "1:12",
    ubication: "/src/lost-in-city-lights-145038.mp3",
    cover: "/src/cover-1.png"
}, {
    title: "Forest Lubally",
    author: "Lesfm",
    duration: "2:18",
    ubication: "/src/forest-lullaby-110624.mp3",
    cover: "/src/cover-2.png"
}]

var currentIndex = 0;
var audio = document.getElementById('audio');
var playPauseButton = document.getElementById('play-pause');
var progressBar = document.getElementById('progress');
var durationDisplay = document.getElementById('start');

var isPlaying = false;

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

function updateProgressBar() {
  var percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percentage;

    var minutes = Math.floor(audio.currentTime / 60);
    var seconds = Math.floor(audio.currentTime % 60);
    durationDisplay.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function updatePlayPauseButton() {
    playPauseButton.src = isPlaying ? 'src/Play_fill.svg' : 'src/Play_fill.svg';
}

playPauseButton.addEventListener('click', function () {
    togglePlayPause();
    isPlaying = !isPlaying;
    updatePlayPauseButton();
});

audio.addEventListener('loadedmetadata', function () {
    progressBar.max = 100;
    progressBar.value = 0;
});

audio.addEventListener('timeupdate', function () {
    updateProgressBar();
});

progressBar.addEventListener('input', function () {
  var seekPosition = progressBar.value * audio.duration / 100;
    audio.currentTime = seekPosition;
});

audio.addEventListener('ended', function () {
    isPlaying = false;
    updatePlayPauseButton();
    progressBar.value = 0;
    durationDisplay.textContent = '0:00';

    if (currentIndex < songs.length - 1) {
        changeSong(currentIndex + 1);
    }
});

function showActualSong(index) {
    var actualSong = songs[index];

    var wasPlaying = !audio.paused;
    
    audio.pause();
    
    document.getElementById('cover').src = actualSong.cover;
    document.getElementById('title').textContent = actualSong.title;
    document.getElementById('author').textContent = actualSong.author;
    document.getElementById('duration').textContent = actualSong.duration;

    audio.src = actualSong.ubication;

    progressBar.value = 0;
    isPlaying = false;

    if (wasPlaying) {
        audio.play();
        isPlaying = true;
        updatePlayPauseButton();
    }
}

function changeSong(offset) {
    currentIndex += offset;

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    if (currentIndex >= songs.length) {
        currentIndex = songs.length - 1;
    }

    showActualSong(currentIndex);

    audio.play();
    isPlaying = true;
    updatePlayPauseButton();
}

document.addEventListener('DOMContentLoaded', () => {
    showActualSong(currentIndex)
});