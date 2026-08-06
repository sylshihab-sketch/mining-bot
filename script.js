// Telegram Mini App
if (window.Telegram && window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
}

// Loading Screen
window.addEventListener("load", () => {
    const progress = document.querySelector(".progress");
    const loading = document.getElementById("loading-screen");
    const app = document.getElementById("app");

    let percent = 0;

    const timer = setInterval(() => {
        percent += 1;

        if (progress) {
            progress.style.width = percent + "%";
        }

        const text = document.querySelector(".loading-text");
        if (text) {
            text.innerText = "Loading... " + percent + "%";
        }

        if (percent >= 100) {
            clearInterval(timer);

            setTimeout(() => {
                loading.style.display = "none";
                app.style.display = "block";
            }, 300);
        }
    }, 30);
});

// Token System
let token = 0;

function addToken(amount) {
    token += amount;
    const el = document.getElementById("token");
    if (el) {
        el.innerText = token;
    }

    localStorage.setItem("token", token);
}

window.onload = function () {
    const saved = localStorage.getItem("token");

    if (saved) {
        token = parseInt(saved);
        document.getElementById("token").innerText = token;
    }
};