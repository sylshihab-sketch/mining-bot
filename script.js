// =======================
// Referral System
// =======================

let referrals = 0;
let vip = 1;

async function loadReferral() {

const doc = await userRef.get();

if (!doc.exists) return;

const data = doc.data();

referrals = data.referrals || 0;
vip = data.vip || 1;

updateVIP();

}

function updateVIP() {

if (referrals >= 10) {
    vip = 3;
} else if (referrals >= 5) {
    vip = 2;
} else {
    vip = 1;
}

document.getElementById("vipBadge").innerHTML = "VIP " + vip;

userRef.update({
    vip: vip
});

}

// =======================
// Referral Link
// =======================

function shareReferral() {

const bot = "YOUR_BOT_USERNAME";

const url =
`https://t.me/share/url?url=https://t.me/${bot}?start=${user.id}`;

window.open(url);

}

function copyReferral(){

const bot="YOUR_BOT_USERNAME";

navigator.clipboard.writeText(
`https://t.me/${bot}?start=${user.id}`
);

toast("Referral Link Copied");

}

// =======================
// Withdraw
// =======================

async function withdraw(){

let amount=parseInt(
document.getElementById("withdrawAmount").value
);

let wallet=document.getElementById("wallet").value;

if(amount<30000){

toast("Minimum 30000 Coins");

return;

}

if(amount>balance){

toast("Insufficient Balance");

return;

}

balance-=amount;

updateBalance();

await saveUser();

await db.collection("withdraws").add({

user:user.id,

name:user.first_name,

wallet:wallet,

coins:amount,

status:"Pending",

time:new Date()

});

toast("Withdraw Submitted");

}

// =======================
// Leaderboard
// =======================

async function leaderboard(){

const snap=await db.collection("users")

.orderBy("balance","desc")

.limit(20)

.get();

let html="";

let rank=1;

snap.forEach(doc=>{

let d=doc.data();

html+=`

<div class="leader">

<span>#${rank}</span>

<span>${d.name}</span>

<b>${d.balance}</b>

</div>

`;

rank++;

});

document.getElementById("leaderboard").innerHTML=html;

}// =======================
// Telegram Mining Bot
// script.js
// =======================

const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user || {
    id: "demo_user",
    first_name: "Guest"
};

let balance = 0;
let mining = false;
let miningSpeed = 200; // coins/hour

const firebaseConfig = {
    // আপনার Firebase Config এখানে দিন
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const userRef = db.collection("users").doc(user.id.toString());

loadUser();

async function loadUser(){

const doc = await userRef.get();

if(doc.exists){

const data = doc.data();

balance = data.balance || 0;

updateBalance();

}else{

await userRef.set({

name:user.first_name,

balance:500,

vip:1,

referrals:0,

lifetime:500

});

balance=500;

updateBalance();

}

hideLoading();

}

function updateBalance(){

document.getElementById("balance").innerHTML=Math.floor(balance);

}

function hideLoading(){

document.getElementById("loading").style.display="none";

document.getElementById("app").style.display="block";

}

async function saveUser(){

await userRef.update({

balance:balance

});

}

document.getElementById("dailyBonus").onclick=async()=>{

balance+=500;

updateBalance();

await saveUser();

toast("🎁 Daily Bonus Claimed");

};

document.getElementById("spin").onclick=async()=>{

let reward=Math.floor(Math.random()*900)+100;

balance+=reward;

updateBalance();

await saveUser();

toast("🎡 You Won "+reward+" Coins");

};

document.getElementById("startMining").onclick=()=>{

if(mining){

toast("Mining already running");

return;

}

mining=true;

toast("⛏ Mining Started");

startMining();

};

function startMining(){

setInterval(async()=>{

if(!mining)return;

balance+=Math.floor(miningSpeed/3600);

updateBalance();

await saveUser();

},1000);

}

function toast(msg){

let t=document.querySelector(".toast");

t.innerHTML=msg;

t.style.display="block";

setTimeout(()=>{

t.style.display="none";

},2500);

}

function showPage(page){

console.log(page);

}