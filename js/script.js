import { musicList } from "./data.js";

// Set Music Items & Set Backgrounds
musicList.forEach((item, idx) => {
  let musicItem = "";
  musicItem += `
    <article>
      <div class="inner">
        <div class="musicInfo">
          <div class="albumImg">
            <span></span>
          </div>
          <div class="albumDesc">
            <h4>${item.title}</h4>
            <h5>${item.album}</h5>
            <p>${item.releaseDate}</p>
          </div>
        </div>
        <div class="playingBar">
          <div class="fullLeng">
            <div class="nowLeng"></div>
          </div>
        </div>
        <div class="musicPlayer">
          <div class="randomPlayBtn">
            <i class="fa-solid fa-shuffle"></i>
          </div>
          <div class="playOrPauseBtn">
            <div class="playBtn on">
              <i class="fa-solid fa-circle-play"></i>
            </div>
            <div class="pauseBtn">
              <i class="fa-solid fa-circle-pause"></i>
            </div>
          </div>
          <div class="replayBtn">
            <i class="fa-solid fa-arrow-rotate-left"></i>
          </div>
        </div>
        <audio id="music" src="/music/musicAudio(${idx + 1}).mp4"></audio>
      </div>
    </article>
  `;
  document.querySelector("#musicItemsBox").innerHTML += musicItem;

  let bgItem = "";
  bgItem += `
    <div class="bgItem bgItem${idx}"></div>
  `;
  document.querySelector("#bgBox").innerHTML += bgItem;
});

// === Variables ===
const musicItemsBox = document.querySelector('#musicItemsBox');
const musicItems = document.querySelectorAll('article');
const musicLeng = musicList.length;
const rotateDeg = 360 / musicLeng;
let rotateCount = 0;
let currentIdx = 0;

// === Function ===
//Change Background Color
function setBgColor(idx) {
  bgItems.forEach((item) => {
    item.classList.remove('active');
  });
  document.querySelector(`.bgItem${idx}`).classList.add('active');
}
// Click Next or Prev Button
function clickNextOrPrev(article) {
  article.classList.remove('active');
  article.querySelector("audio").pause();
  article.querySelector("audio").load();
  article.querySelector(".playBtn").classList.add("on");
  article.querySelector(".pauseBtn").classList.remove("on");
}
// Play Music
function playMusic(item) {
  item.querySelector("audio").play();
  item.querySelector(".playBtn").classList.remove("on");
  item.querySelector(".pauseBtn").classList.add("on");
}
// Pause Music
function pauseMusic(item) {
  item.querySelector("audio").pause();
  item.querySelector(".playBtn").classList.add("on");
  item.querySelector(".pauseBtn").classList.remove("on");
}
// Replay Music
function replayMusic(item) {
  if(!item.querySelector(".playBtn").classList.contains("on")) {
    item.querySelector("audio").load();
    item.querySelector("audio").play();
  }
}

// === Setting ===
// Set Background Colors
const bgItems = document.querySelectorAll('.bgItem');
bgItems.forEach((item, idx) => {
  item.style.background = `linear-gradient(135deg, ${musicList[idx].bgColor.join()})`
});

// Set Active Class
musicItems[0].classList.add('active');
bgItems[0].classList.add('active');

// Set Music Album Img & Transform & Skills
musicItems.forEach((item, idx) => {
  musicItems[idx].querySelector('.albumImg').style.backgroundImage = `url('${musicList[idx].albumImg}')`;
  musicItems[idx].querySelector('.albumImg span').style.backgroundImage = `url('${musicList[idx].albumImg}')`;

  item.style.transform = `rotate(${rotateDeg * idx}deg) translateY(-90vh)`;

  // play
  const playBtn = item.querySelector(".playBtn");
  playBtn.addEventListener("click", (e) => {
    const article = e.target.closest("article");
    playMusic(article);
  });

  // pause
  const pauseBtn = item.querySelector(".pauseBtn");
  pauseBtn.addEventListener("click", (e) => {
    const article = e.target.closest("article");
    pauseMusic(article);
  });

  // replay
  const replayBtn = item.querySelector(".replayBtn");
  replayBtn.addEventListener("click", (e) => {
    const article = e.target.closest("article");
    replayMusic(article);
  });

  // random
  const randomBtn = item.querySelector(".randomPlayBtn");
  randomBtn.addEventListener('click', (e) => {
    musicItemsBox.classList.toggle('random');
  });

  const playBar = item.querySelector(".playingBar");
  const musicAudio = item.querySelector("audio");

  // music start
  const playBarNowLeng = item.querySelector(".nowLeng");
  musicAudio.addEventListener('timeupdate', (e) => {
    let width = -1 * (100 - (e.target.currentTime / musicList[idx].playLen * 100).toFixed());
    playBarNowLeng.style.transform = `translateX(${width}%)`;
  });
  // music end
  musicAudio.addEventListener('ended', (e) => {
    playBtn.classList.add("on");
    pauseBtn.classList.remove("on");
    playBarNowLeng.style.transform = `translateX(-100%)`;
  });
});

// === Event Listener ===
// Next Button
const nextBtn = document.querySelector('.nextBtn');
nextBtn.addEventListener('click', () => {
  musicItems.forEach((article) => {
    clickNextOrPrev(article)
  });

  let number = musicItemsBox.classList.contains('random') ? Math.ceil(Math.random() * (musicLeng - 2) ) : 1; 
  
  rotateCount += number;
  musicItemsBox.style.transform = `rotate(${-rotateDeg * rotateCount}deg)`;
  
  currentIdx += number;
  currentIdx = currentIdx > musicLeng - 1 ? (currentIdx % musicLeng) : currentIdx;
  musicItems[currentIdx].classList.add('active');

  setBgColor(currentIdx);
});
// Prev Button
const prevBtn = document.querySelector('.prevBtn');
prevBtn.addEventListener('click', () => {
  musicItems.forEach((article) => {
    clickNextOrPrev(article)
  });

  let number = musicItemsBox.classList.contains('random') ? Math.ceil(Math.random() * (musicLeng - 2) ) : 1; 

  rotateCount -= number;
  musicItemsBox.style.transform = `rotate(${-rotateDeg * rotateCount}deg)`;

  currentIdx -= number;
  currentIdx = currentIdx < 0 ? musicLeng - Math.abs(currentIdx) : currentIdx;
  musicItems[currentIdx].classList.add('active');

  setBgColor(currentIdx);
});



