var songs = ['1.TS', '2.TS', '3.TS'];
var names = ['Farouk I','Muhammad Ali Pasha', 'Isma\'il Pasha'];
var posters = ['image/Poster1.jpg', 'image/Poster2.jpg', 'image/Poster3.jpg'];

var nameOfSong = document.querySelector('.nameOfSong');
var posterOfSong = document.querySelector('.main .image img');
var bg = document.querySelector('.bg img');
var play = document.querySelector('.main .btns .btn.play');
var preBtn = document.querySelector('.main .btns .btn.pre');
var nextBtn = document.querySelector('.main .btns .btn.next');
var fill = document.querySelector('.main .seekBar .bar .fill');
var bar = document.querySelector('.main .seekBar .bar');
var time = document.querySelector('.main .extension .time');
var minus = document.querySelector('.main .extension .exBtns .minus');
var plus = document.querySelector('.main .extension .exBtns .plus');
var volume = document.querySelector('.main .extension .exBtns .volume');

var song = new Audio();
song.volume=0.40;
var currentSong = 0;

/****************************************************/
function playSong() {
    song.src = songs[currentSong];
    nameOfSong.textContent = names[currentSong];
    posterOfSong.src = posters[currentSong];
    bg.src = posters[currentSong];
    toggle();
    song.play();
}

function toggle() {
    song.paused ? (song.play(), play.children[0].className = "fas fa-pause") : (song.pause(), play.children[0].className = "fas fa-play");
}

function handleFill() {
    fillWidth = ((song.currentTime / song.duration) * 100) + "%";
    fill.style.width = fillWidth;
    if (song.ended) {
        play.children[0].className = "fas fa-play";
        fill.style.width = 0;
    }
    convertTime(Math.round(song.currentTime));
    
}

function convertTime(x) {
    min = Math.floor(x / 60);
    sec = x % 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    time.textContent = min + ':' + sec;
    totalTime(Math.round(song.duration))
}

function totalTime(x) {
    min = Math.floor(x / 60);
    sec = x % 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    time.textContent += '/'+min + ':' + sec;
}

function next() {
    currentSong >= 2 ? currentSong = 0 : ++currentSong;
    playSong();
}

function pre() {
    currentSong <= 0 ? currentSong = songs.length - 1 : --currentSong;
    playSong();
}

function scrub(e) {
    song.currentTime = ((e.offsetX / bar.offsetWidth) * song.duration);

}
function decreaseVolume(){
   song.volume<=0?null:(song.volume-=0.10);
}
function increaseVolume(){
    song.volume>=1?null:song.volume+=0.10;
}
/****************************************************/
window.addEventListener('load', playSong);
play.addEventListener('click', toggle);
song.addEventListener('timeupdate', handleFill);
nextBtn.addEventListener('click', next);
preBtn.addEventListener('click', pre);


let mousedown = 0;
bar.addEventListener('click', scrub);
bar.addEventListener('mousemove', (e) => {mousedown ? scrub(e) : 1;});
bar.addEventListener('mousedown', () => { mousedown = 1;});
bar.addEventListener('mouseup', () => {mousedown = 0;});
minus.addEventListener('click', decreaseVolume);
plus.addEventListener('click', increaseVolume);
