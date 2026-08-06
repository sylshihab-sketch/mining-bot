// Telegram Mini App
if (window.Telegram && window.Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

window.onload = function () {

  const splash = document.getElementById("splash");
  const forceJoin = document.getElementById("forceJoin");
  const app = document.getElementById("app");

  let percent = 0;

  const progress = document.querySelector(".progress");
  const text = document.getElementById("loadingText");

  const timer = setInterval(() => {

    percent++;

    if (progress) {
      progress.style.width = percent + "%";
    }

    if (text) {
      text.innerHTML = "Loading... " + percent + "%";
    }

    if (percent >= 100) {
      clearInterval(timer);

      splash.style.display = "none";
      forceJoin.style.display = "block";
    }

  }, 30);

};

// I've Joined Button
document.getElementById("checkJoin").onclick = function () {

  document.getElementById("forceJoin").style.display = "none";
  document.getElementById("app").style.display = "block";

};