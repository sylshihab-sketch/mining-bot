// Firebase Configuration (Replace with your Firebase details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Telegram WebApp Setup
const tg = window.Telegram.WebApp;
tg.expand();

// User State Structure
let userData = {
    tgId: tg.initDataUnsafe?.user?.id || "guest_123",
    name: tg.initDataUnsafe?.user?.first_name || "User",
    tokens: 0,
    referrals: 0,
    adsWatched: 0,
    withdrawCount: 0,
    vipLevel: 1
};

const DIRECT_AD_LINK = "https://www.google.com"; // Monetag / Adsterra Smartlink/Direct link

// Multi-Language Dictionary
const translations = {
    en: {
        home: "Home", mine: "Mine", refer: "Refer", profile: "Profile",
        welcome: "Welcome", balance: "Balance", withdrawBtn: "💸 Withdraw USDT",
        miningTitle: "⛏️ Mining Buddies", reqWithdraw: "💸 Request Withdrawal", selectNetwork: "Select Wallet Network:"
    },
    bn: {
        home: "হোম", mine: "মাইনিং", refer: "রেফার", profile: "প্রোফাইল",
        welcome: "স্বাগতম", balance: "ব্যালেন্স", withdrawBtn: "💸 উইথড্র USDT",
        miningTitle: "⛏️ মাইনিং পার্টনার", reqWithdraw: "💸 উইথড্র রিকোয়েস্ট", selectNetwork: "ওয়ালেট নেটওয়ার্ক নির্বাচন করুন:"
    },
    ar: {
        home: "الرئيسية", mine: "التعدين", refer: "الإحالة", profile: "الملف الشخصي",
        welcome: "مرحباً", balance: "الرصيد", withdrawBtn: "💸 سحب USDT",
        miningTitle: "⛏️ شركاء التعدين", reqWithdraw: "💸 طلب السحب", selectNetwork: "اختر شبكة المحفظة:"
    }
};

// Language Changer Logic
function changeLanguage(lang) {
    document.body.style.direction = (lang === 'ar') ? 'rtl' : 'ltr';
    const t = translations[lang];

    document.getElementById('nav-home').innerText = t.home;
    document.getElementById('nav-mine').innerText = t.mine;
    document.getElementById('nav-refer').innerText = t.refer;
    document.getElementById('nav-profile').innerText = t.profile;
    document.getElementById('txt-welcome').innerText = t.welcome;
    document.getElementById('txt-balance').innerText = t.balance;
    document.getElementById('txt-withdraw-btn').innerText = t.withdrawBtn;
    document.getElementById('txt-mine-title').innerText = t.miningTitle;
    document.getElementById('txt-req-withdraw').innerText = t.reqWithdraw;
    document.getElementById('txt-select-network').innerText = t.selectNetwork;
}

// 5 Channels Force Join System Logic
let joinedChannels = { 1: false, 2: false, 3: false, 4: false, 5: false };

function markChannelJoined(channelNum) {
    joinedChannels[channelNum] = true;
}

function verifyJoin() {
    let allJoined = Object.values(joinedChannels).every(status => status === true);

    if (allJoined) {
        document.getElementById('force-join-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        loadUserData();
    } else {
        alert("❌ Access Denied! You MUST click and join all 5 channels to continue.");
    }
}

// Tab Switching
function switchTab(tabName, btn) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(`tab-${tabName}`).classList.add('active');
    btn.classList.add('active');
}

// Strict 15 Sec Ad Watch + 1 Click Required Logic
function showStrictAdAndVerify() {
    return new Promise((resolve) => {
        let isAdWatched = false;
        let isAdClicked = false;

        alert("⚠️ Notice: You MUST stay 15 SECONDS on the ad AND CLICK IT to verify!");

        setTimeout(() => { isAdWatched = true; }, 15000);
        window.open(DIRECT_AD_LINK, "_blank");
        window.onblur = function() { isAdClicked = true; };

        setTimeout(() => {
            if (isAdWatched && isAdClicked) {
                alert("✅ Ad verified (Watched 15s + Clicked).");
                resolve(true);
            } else {
                alert("❌ Verification Failed! You must watch 15 seconds AND click the ad.");
                resolve(false);
            }
        }, 16000);
    });
}

// Start Mining Logic
async function startMiningWithStrictAds(buddyName, rate) {
    alert(`To activate ${buddyName}, you need to watch and click Ad #1 and Ad #2!`);

    let ad1 = await showStrictAdAndVerify();
    if (!ad1) return;

    let ad2 = await showStrictAdAndVerify();
    if (!ad2) return;

    userData.adsWatched += 2;
    userData.tokens += rate;
    updateUI();
    saveUserDataToFirebase();

    alert(`🎉 Mining Activated for ${buddyName}! Received ${rate} Tokens.`);
}

// VIP Level Manager
function updateVIPStatus() {
    let refs = userData.referrals;
    if (refs >= 50) userData.vipLevel = 3;
    else if (refs >= 20) userData.vipLevel = 2;
    else if (refs >= 10) userData.vipLevel = 3;
    else if (refs >= 5) userData.vipLevel = 2;
    else userData.vipLevel = 1;
}

// Strict Withdrawal Rules Logic
function processWithdrawal() {
    if (userData.referrals < 3) {
        alert("❌ Withdrawal Locked! Minimum 3 active referrals required.");
        return;
    }

    let reqAds = 10;
    let minUsdt = 0.20; // 1st withdrawal limit

    if (userData.withdrawCount === 1) {
        reqAds = 15;
        minUsdt = 0.40; // 2nd withdrawal limit
    } else if (userData.withdrawCount >= 2) {
        reqAds = 20;
        minUsdt = 1.00; // 3rd+ withdrawal limit
    }

    let minTokens = minUsdt * 10000000; // 10M Tokens = 1 USDT

    if (userData.adsWatched < reqAds) {
        alert(`❌ Requires ${reqAds} ads watched for Withdrawal #${userData.withdrawCount + 1}! Current: ${userData.adsWatched}`);
        return;
    }

    if (userData.tokens < minTokens) {
        alert(`❌ Required balance: ${minUsdt} USDT (${minTokens.toLocaleString()} Tokens).`);
        return;
    }

    let address = document.getElementById('wallet-address').value;
    let network = document.getElementById('wallet-network').value;

    if (!address) {
        alert("Enter a valid wallet address!");
        return;
    }

    db.collection("withdrawals").add({
        tgId: userData.tgId,
        amountUsdt: minUsdt,
        tokensDeducted: minTokens,
        network: network,
        address: address,
        status: "pending",
        date: new Date()
    }).then(() => {
        alert(`✅ Request of ${minUsdt} USDT submitted successfully!`);
        userData.tokens -= minTokens;
        userData.withdrawCount++;
        userData.adsWatched = 0; // Reset ad counter for next limit
        updateUI();
        saveUserDataToFirebase();
        closeWithdrawModal();
    });
}

function openWithdrawModal() { document.getElementById('withdraw-modal').style.display = 'flex'; }
function closeWithdrawModal() { document.getElementById('withdraw-modal').style.display = 'none'; }

function copyRefLink() {
    const link = document.getElementById("ref-link");
    link.select();
    navigator.clipboard.writeText(link.value);
    alert("Referral link copied!");
}

function updateUI() {
    updateVIPStatus();
    document.getElementById('user-name').innerText = userData.name;
    document.getElementById('user-tokens').innerText = userData.tokens.toLocaleString();
    document.getElementById('user-usdt').innerText = (userData.tokens / 10000000).toFixed(4);
    document.getElementById('user-vip').innerText = userData.vipLevel;
    document.getElementById('user-id').innerText = userData.tgId;
    document.getElementById('user-ads-count').innerText = userData.adsWatched;
    document.getElementById('user-refers').innerText = userData.referrals;
}

function saveUserDataToFirebase() {
    db.collection("users").doc(String(userData.tgId)).set(userData, { merge: true });
}

function loadUserData() {
    db.collection("users").doc(String(userData.tgId)).get().then((doc) => {
        if (doc.exists) {
            userData = doc.data();
        } else {
            saveUserDataToFirebase();
        }
        updateUI();
    });
}