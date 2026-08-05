const tg = window.Telegram?.WebApp;
if (tg) {
    tg.expand(); // অ্যাপ ফুলস্ক্রিন করবে
}

async function verifyJoin() {
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "Checking verification...";

    // টেলিগ্রাম থেকে ইউজারের ID নেওয়া
    const userId = tg?.initDataUnsafe?.user?.id || 123456789; 

    try {
        // ব্যাকএন্ড API-কে কল করে ভেরিফাই করা
        const response = await fetch(`/api/verify-user?userId=${userId}`);
        const data = await response.json();

        if (data.isJoined) {
            document.getElementById("force-join-screen").classList.add("hidden");
            document.getElementById("main-app").classList.remove("hidden");
        } else {
            errorMsg.innerText = "❌ আপনি সব কটি চ্যানেলে জয়েন করেননি!";
        }
    } catch (e) {
        errorMsg.innerText = "Server Error! Please try again.";
    }
}

function showAd() {
    // Monetag / Adsterra Direct Link Open করা
    window.open("YOUR_MONETAG_DIRECT_LINK_HERE", "_blank");
}