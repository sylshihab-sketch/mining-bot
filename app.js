let mining = false;
let seconds = 14400; // 4 hours

const timer = document.getElementById("timer");
const bar = document.getElementById("bar");
const mineBtn = document.getElementById("mineBtn");
const claimBtn = document.getElementById("claimBtn");

mineBtn.onclick = () => {

if(mining) return;

mining = true;

let total = seconds;

const interval = setInterval(()=>{

seconds--;

let h=Math.floor(seconds/3600);
let m=Math.floor((seconds%3600)/60);
let s=seconds%60;

timer.innerHTML=
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

bar.style.width=((total-seconds)/total)*100+"%";

if(seconds<=0){

clearInterval(interval);

claimBtn.disabled=false;

mineBtn.disabled=true;

}

},1000);

};

claimBtn.onclick=()=>{

coins+=500;

document.getElementById("coin").innerHTML=coins;

alert("500 Coins Added!");

seconds=14400;

timer.innerHTML="04:00:00";

bar.style.width="0%";

mineBtn.disabled=false;

claimBtn.disabled=true;

mining=false;

};