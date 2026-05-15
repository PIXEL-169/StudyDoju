function addtask() {
    const input = document.getElementById('taskinput');
    const list = document.getElementById('tasklist');
    if (input.value.trim() === '') return;
    const li = document.createElement('li');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.addEventListener('change', function () {
        if (check.checked) {
            li.style.textDecoration = 'line-through';
            li.style.opacity = '0.5';
        } else {
            li.style.textDecoration = 'none';
            li.style.opacity = '1'
        }
    });
    li.appendChild(check);
    li.appendChild(document.createTextNode(input.value));
    list.appendChild(li);
    input.value = '';
}
document.getElementById('taskinput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addtask();
    }
})
const gifs = [
    'PixelJeffXDivoom-PixelJeff.gif',
    'Reblogby@cinnamon-irl1image.gif',
    'InvincibleGIF.gif',
];
let currentgif = 0;
function changegif(direction) {
    currentgif += direction;
    if (currentgif < 0) currentgif = gifs.length - 1;
    if (currentgif >= gifs.length) currentgif = 0;
    document.querySelector('.Homepage').style.backgroundImage = `url('${gifs[currentgif]}')`;
}
const Start = document.querySelector(".Start");
const Pause = document.querySelector(".Pause");
const Reset = document.querySelector(".Reset");
const timer = document.querySelector("#time");

let timeleft = 2700;
let currenttime = 2700;
let interval;

const uptadetimer = () => {
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

function shownotification() {
    document.querySelector('.notification').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

function closenotification() {
    document.querySelector('.notification').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}

const starttimer = () => {
    clearInterval(interval);
    interval = setInterval(() => {
        timeleft--;
        uptadetimer();
        if (timeleft === 0) {
            clearInterval(interval);
            shownotification();
            timeleft = 2700;
            uptadetimer();
        }
    }, 1000)
};

const stoptimer = () => clearInterval(interval);
const resettimer = () => {
    clearInterval(interval);
    timeleft = currenttime;
    uptadetimer();
}

Start.addEventListener("click", starttimer);
Pause.addEventListener("click", stoptimer);
Reset.addEventListener("click", resettimer);

document.querySelector(".Focus").addEventListener("click", () => {
    clearInterval(interval);
    currenttime = 2700;
    timeleft = currenttime
    uptadetimer();
});
document.querySelector(".Shortbreak").addEventListener("click", () => {
    clearInterval(interval);
    currenttime = 300;
    timeleft = currenttime
    uptadetimer();
});
document.querySelector(".Longbreak").addEventListener("click", () => {
    clearInterval(interval);
    currenttime = 900;
    timeleft = currenttime
    uptadetimer();
});

let nowplaying = document.querySelector('.nowplaying');
let trackname = document.querySelector('.name');
let playpause = document.querySelector('.playpause');
let next = document.querySelector('.nexttrack');
let prevtracker = document.querySelector('.prevtrack');
let slider = document.querySelector('.slider');
let volumeslider = document.querySelector('.volumeslider');
let current_time = document.querySelector('.current_time');
let totaltime = document.querySelector('.totaltime');
let currenttrack = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let uptade_Timer;

const musiclist = [
    {
        name: 'campfire',
        music: 'campfire.wav'
    },
    {
        name: 'raindrops',
        music: 'rain.wav'
    },

    {
        name: 'calm ambient sound',
        music: 'calmambient.mp3'
    }
];

loadTrack(track_index);
function loadTrack(track_index) {
    clearInterval(uptade_Timer);
    reset();

    currenttrack.src = musiclist[track_index].music;
    currenttrack.loop = true;
    currenttrack.load();
    trackname.textContent = musiclist[track_index].name;
    nowplaying.textContent = "Playing music" + (track_index + 1) + "of" + musiclist.length;
    uptade_Timer = setInterval(setUptade, 1000);
    currenttrack.addEventListener('ended', nexttrack);
    isPlaying = false;
    playpause.innerHTML = '<img src="play.png" class="play-pause">'
}

function reset() {
    current_time.textContent = "00:00";
    totaltime.textContent = "00:00";
    slider.value = 0;
}

function playpausetrack() {
    isPlaying ? pausetrack() : playtrack();
}

function playtrack() {
    currenttrack.play();
    isPlaying = true;
    playpause.innerHTML = '<img src="pause.png" class="play-pause">';
}

function pausetrack() {
    currenttrack.pause();
    isPlaying = false;
    playpause.innerHTML = '<img src="play.png" class="play-pause">';
}

function nexttrack() {
    if (track_index < musiclist.length - 1) {
        track_index += 1;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
}

function prevtrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = musiclist.length - 1;
    }
    loadTrack(track_index);
}

function seekTo() {
    let seekto = currenttrack.duration * (slider.value / 100);
    currenttrack.currentTime = seekto;
}

function setvolume() {
    currenttrack.volume = volumeslider.value / 100;
}

function setUptade() {
    let seekposition = 0;
    if (!isNaN(currenttrack.duration > 0)) {
        seekposition = currenttrack.currentTime * (100 / currenttrack.duration);
        slider.value = seekposition;

        let currentminutes = Math.floor(currenttrack.currentTime / 60);
        let currentseconds = Math.floor(currenttrack.currentTime - currentminutes * 60);
        let durationminutes = Math.floor(currenttrack.duration / 60);
        let durationseconds = Math.floor(currenttrack.duration - durationminutes * 60);

        if (currentseconds < 10) { currentseconds = "0" + currentseconds; }
        if (durationseconds < 10) { durationseconds = "0" + durationseconds; }
        if (currentminutes < 10) { currentminutes = "0" + currentminutes; }
        if (durationminutes < 10) { durationminutes = "0" + durationminutes; }

        current_time.textContent = currentminutes + ":" + currentseconds;
        totaltime.textContent = durationminutes + ":" + durationseconds;
    }
}