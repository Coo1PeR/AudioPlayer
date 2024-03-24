'use strict';

// Modals buttons const
const modal = document.querySelector('#modal');
const btnOpenModal = document.querySelectorAll('.open-btn');
const btnCloseModal = document.querySelectorAll('.close-btn');

// Buttons for open modal
btnOpenModal.forEach(el => {
  el.addEventListener('click', e => {
    let modalId = e.currentTarget.getAttribute('id');
    document.querySelector(`[id-modal="${modalId}"]`).showModal();
  });
});

// Button to close modal
btnCloseModal.forEach(el => {
  el.addEventListener('click', e => {
    e.target.parentNode.close();
  });
});

// Player const
const player = document.querySelector('.player');
const btnPlay = document.querySelector('.play');
const btnNext = document.querySelector('.next');
const btnPrev = document.querySelector('.prev');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const coverImg = document.querySelector('.cover__img');
const imgSrc = document.querySelector('.img_src');

const text = document.querySelector('.text_src');

audio.volume = 0.1;

// Songs names
const songs = [
  'Moonlit Devotion',
  'Save Me',
  'Chiromanter',
  'Awaken',
  'For the Rest Of Your Death',
  'My Witchery',
  'My Unborn Twin',
  'The Last Exorcism Master',
  'Cursed With Immortality Master',
];

// Song by default
let songIndex = 0;

// Init
const loadSong = function (song) {
  title.innerHTML = song;
  audio.src = `albums/DarkShadesOfMystery/${song}.mp3`;

  coverImg.src = 'albums/DarkShadesOfMystery/images/vinylGrey.png';
};
loadSong(songs[songIndex]);

// Play
const playSong = function () {
  player.classList.add('play');
  coverImg.classList.add('active');
  imgSrc.src = 'images/pause_button_empty.png';
  audio.play();
};

// Pause
const pauseSong = function () {
  player.classList.remove('play');
  coverImg.classList.remove('active');
  imgSrc.src = 'images/play_empty.png';
  audio.pause();
};

btnPlay.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change texts images
const textAndPlayPause = function () {
  loadSong(songs[songIndex]);
  text.src = `albums/DarkShadesOfMystery/images/img_0${songIndex + 1}.jpg`;

  if (player.classList.contains('play')) {
    playSong();
  } else {
    pauseSong();
  }
};

// Next song
const nextSong = function () {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  textAndPlayPause();
};
btnNext.addEventListener('click', nextSong);

// Previous song
const prevSong = function () {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  textAndPlayPause();
};
btnPrev.addEventListener('click', prevSong);

// Progress Bar
const updateProgress = function (e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercents = (currentTime / duration) * 100;
  progress.style.width = `${progressPercents}%`;
};

audio.addEventListener('timeupdate', updateProgress);

// Set progress
const setProgress = function (e) {
  const widthProgress = this.clientWidth;
  const clickProgressX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickProgressX / widthProgress) * duration;
};
progressContainer.addEventListener('click', setProgress);

// Autoplay
audio.addEventListener('ended', nextSong);
