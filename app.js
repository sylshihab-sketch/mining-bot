const app = document.getElementById("app");

app.innerHTML = `
<div class="header">
    <div class="logo">
        <div style="width:50px;height:50px;background:#ffb300;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:28px;">⛏</div>
        <div>
            <h2>Mining Earning</h2>
            <small>Thee Man</small>
        </div>
    </div>

    <div>
        🔔 ⚙️
    </div>
</div>

<div class="profile">
    <h2>Thee Man <span class="vip">VIP 2</span></h2>

    <div class="balance">

        <div class="card">
            <h3>🪙 Coins</h3>
            <p id="coins">60</p>
        </div>

        <div class="card">
            <h3>💵 USDT</h3>
            <p>0.592</p>
        </div>

    </div>
</div>

<div class="daily">

<h2>🔥 Daily Streak</h2>

<div class="days">

<div class="day">D1</div>
<div class="day">D2</div>
<div class="day">D3</div>
<div class="day">D4</div>
<div class="day">D5</div>
<div class="day">D6</div>
<div class="day active">D7</div>

</div>

<button class="claim" onclick="mine()">
Claim +500 Coins
</button>

</div>

<div class="actions">

<button>Convert</button>

<button>Withdraw</button>

<button onclick="mine()">Mine</button>

<button>VIP</button>

<button>History</button>

</div>

<nav class="bottom">

<button>🏠<br>Home</button>

<button>📋<br>Tasks</button>

<button class="mine" onclick="mine()">⛏</button>

<button>👥<br>Friends</button>

<button>👤<br>Profile</button>

</nav>
`;

let coins = 60;

function mine() {
    coins += 10;
    document.getElementById("coins").innerText = coins;
}