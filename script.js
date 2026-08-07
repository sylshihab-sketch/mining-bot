// =======================
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