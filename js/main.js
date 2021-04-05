let container = document.querySelector('.songs');

// для музыки
let play = document.querySelector('#play-sidebar');
let slider = document.querySelector('#duration-slider');
let trackImage = document.querySelector('#track-image');
let playHover = document.querySelector('#play-main-bar');
let currentTimeText = document.querySelector('#current-time-text');
let durationTimeText = document.querySelector('#duration-time-text');

let timer;

let indexNo = 0;
let playingSong = false;

let track = document.createElement('audio');

//* создаем объект для хранения постов
const allSong = [
    {
        id: 1,
        singer: {
            name: "Елена Темникова",
            photo: "image/Жара.jpg"
        },
        path: "sounds/Elena-Temnikova_-_Zhara.mp3",
        title: "Жара",
        time: "2:53"
    },
    {
        id: 2,
        singer: {
            name: "Shawn Mendes",
            photo: "image/senorita.jpg"
        },
        path: "sounds/shawn_mendes_-_senorita_(feat._camila_cabello)_muzter.net.mp3",
        title: "Señorita",
        time: "3:10"
    },
    {
        id: 3,
        singer: {
            name: "Ashley O",
            photo: "image/Ashley.png"
        },
        path: "sounds/ashley-o-on-a-roll.mp3",
        title: "On A Roll",
        time: "2:34"
    },
];

//* для отображения песен
const showAllSong = () => {
    allSong.forEach(({singer, title, time}) => {

        let boxDiv = document.createElement('div');
        boxDiv.className = "box";
        let imgDiv = document.createElement('div');
        let img = document.createElement('img');
        img.className = "songs-image";
        let songsDiv = document.createElement('div');
        songsDiv.className = "songs-name";
        let firstParagraph = document.createElement('p');
        firstParagraph.className = "songs-name-first";
        firstParagraph.id = "title";
        let secondParagraph = document.createElement('p');
        secondParagraph.id = "artist";
        let timeDiv = document.createElement('div');
        timeDiv.className = "songs-time"
        let timeP = document.createElement('p');

        container.appendChild(boxDiv);
        boxDiv.appendChild(imgDiv);
        imgDiv.appendChild(img);
        img.src = `${singer.photo || "img/avacado.jpg"}`;
        boxDiv.appendChild(songsDiv);
        songsDiv.appendChild(firstParagraph);
        firstParagraph.innerText = `${title}`;
        songsDiv.appendChild(secondParagraph);
        secondParagraph.innerText = `${singer.name}`;
        boxDiv.appendChild(timeDiv);
        timeDiv.appendChild(timeP);
        timeP.innerText = `${time}`;
    })
};

showAllSong()

// function load the track
function loadTrack(indexNo) {
    resetSlider();

    track.src = allSong[indexNo].path;
    title.innerHTML = allSong[indexNo].title;
    trackImage.src = allSong[indexNo].singer.photo;
    artist.innerHTML = allSong[indexNo].singer.name;
    track.load();

    timer = setInterval(rangeSlider, 1000);
}

loadTrack(indexNo);

// checking the song is playing or not
function justPlay() {
    if (!playingSong) {
        playSong();
    } else {
        pauseSong();
    }
}

// reset song slider
function resetSlider() {
    slider.value = 0;
}

// play song
function playSong() {
    track.play().then(r => {});
    playingSong = true;
    play.innerHTML = '<i class="fa fa-pause" ></i>';
    playHover.innerHTML = '<i class="fa fa-pause" ></i>';
}

//pause song
function pauseSong() {
    track.pause();
    playingSong = false;
    play.innerHTML = '<i class="fa fa-play" ></i>';
    playHover.innerHTML = '<i class="fa fa-play" ></i>';
}

// next song
function nextSong() {
    if (indexNo < allSong.length - 1) {
        indexNo += 1;
        loadTrack(indexNo);
        playSong();
    } else {
        indexNo = 0;
        loadTrack(indexNo);
        playSong();
    }
}

// previous song
function previousSong() {
    if (indexNo > 0) {
        indexNo -= 1;
        loadTrack(indexNo);
        playSong();
    } else {
        indexNo = allSong.length;
        loadTrack(indexNo);
        playSong();
    }
}

// change slider position
function changeDuration() {
    sliderPosition = track.duration * (slider.value / 100);
    track.currentTime = sliderPosition;
}

let seeking;
let seekTo;

slider.addEventListener("mousedown", function (event) {
    seeking = true;
});
slider.addEventListener("mouseup", function (event) {
    seeking = false;
});
track.addEventListener("timeupdate", function () {
    rangeSlider();
});
track.addEventListener("ended", function () {
    nextSong();
});

function rangeSlider() {
    // update slider position
    if (track.currentTime !== 0) {
        slider.value = track.currentTime * (100 / track.duration);
        let minutes = Math.floor(track.currentTime / 60);
        let seconds = Math.floor(track.currentTime % 60);
        let durMins = Math.floor(track.duration / 60);
        let durSecs = Math.floor(track.duration % 60);
        if (seconds < 10) {seconds = "0" + seconds}
        currentTimeText.innerHTML = minutes + ":" + seconds;
        durationTimeText.innerHTML = durMins + ":" + durSecs;
    } else {
        currentTimeText.innerHTML = "0" + ":" + "00";
        durationTimeText.innerHTML = "0" + ":" + "00";
    }
}