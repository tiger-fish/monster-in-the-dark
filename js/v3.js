// game setup
const allBtn = document.querySelectorAll(".button");
const mainScreen = document.querySelector(".main");
const gameScreen = document.querySelector("html");
const monster = document.querySelector(".monster");

// background music
let audioBg = document.querySelector(".audio__bg");
playAudioBg = () => {
  audioBg.volume = 0.5;
  audioBg.play();
};
pauseAudioBg = () => {
  audioBg.pause();
  let audioLose = document.querySelector(".audio__lose");
  audioLose.volume = 0.2;
  audioLose.play();
};

// move monster to random position
moveMonster = () => {
  function getRandomPosition(e) {
    var x = document.body.offsetHeight - e.clientHeight;
    var y = document.body.offsetWidth - e.clientWidth;
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);
    return [randomX, randomY];
  }
  var xy = getRandomPosition(monster);
  monster.style.top = xy[0] + "px";
  monster.style.left = xy[1] + "px";
};

// The monster will move every n seconds
let intervalMonster = window.setInterval(moveMonster, 1000);

// backgroung img for each mode
hard = () => {
  gameScreen.style.backgroundImage = "url(assets/hard.jpg)";
  gameScreen.style.visibility = "visible";
  gameScreen.style.overflow = "hidden";
};
medium = () => {
  gameScreen.style.backgroundImage = "url(assets/medium.jpg)";
  gameScreen.style.visibility = "visible";
  gameScreen.style.overflow = "hidden";
};
easy = () => {
  gameScreen.style.backgroundImage = "url(assets/easy.jpg)";
  gameScreen.style.visibility = "visible";
  gameScreen.style.overflow = "hidden";
};

loseGame = () => {
  window.clearInterval(intervalMonster);
  gameScreen.style.pointerEvents = "none";
  pauseAudioBg();
  setTimeout(function () {
    gameScreen.style.opacity = "0";
    alert("The monster ate you!");
    location.reload();
  }, 1000);
};

// win game
monster.onmouseover = () => {
  let audioWin = document.querySelector(".audio__win");
  window.clearInterval(intervalMonster);
  monster.style.transform = "scale(3)";
  audioBg.pause();
  audioWin.play();
  setTimeout(function () {
    alert("You vanquished the monster! You get to live another day.");
    location.reload();
  }, 1000);
};

hardTime = () => {
  hard();
  playAudioBg();
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 3vmax";
    hard();
  }, 1);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 2vmax";
    hard();
  }, 3000);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 1max";
    hard();
  }, 6000);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 0vmax";
    hard();
    loseGame();
  }, 7000);
};

mediumTime = () => {
  medium();
  playAudioBg();
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 4vmax";
    medium();
  }, 3000);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 3vmax";
    medium();
  }, 7000);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 1max";
    medium();
  }, 8000);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 0vmax";
    medium();
    loseGame();
  }, 9000);
};

easyTime = () => {
  easy();
  playAudioBg();
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 4vmax";
    easy();
  }, 5000);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 3vmax";
    easy();
  }, 10000);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 1max";
    easy();
  }, 14000);
  setTimeout(function () {
    document.documentElement.style.cssText = "--cursorSize: 0vmax";
    easy();
    loseGame();
  }, 15000);
};

// click button to begin game and hide the mainScreen. Each button links to different background images.
allBtn.forEach(function (button) {
  button.onclick = () => {
    mainScreen.style.visibility = "hidden";
    gameScreen.style.visibility = "visible";
    moveMonster();
    if (button.classList.contains("button__hard")) {
      hardTime();
    } else if (button.classList.contains("button__medium")) {
      mediumTime();
    } else if (button.classList.contains("button__easy")) {
      easyTime();
    }
  };
});
