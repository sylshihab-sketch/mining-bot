// Telegram Mini App Context থেকে User ID বের করা
const tg = window.Telegram.WebApp;
tg.ready();

const userId = tg.initDataUnsafe?.user?.id;

async function checkForceJoin() {
    if (!userId) {
        console.log("User ID পাওয়া যায়নি");
        return;
    }

    try {
        // ব্যাকএন্ড API এ রিকোয়েস্ট পাঠানো
        const response = await fetch('/api/check-join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        });

        const data = await response.json();

        if (data.joined) {
            // ৫টি চ্যানেলেই যুক্ত থাকলে মাইনিং/অ্যাপ অপশন আনলক হবে
            document.getElementById('main-app').style.display = 'block';
            document.getElementById('force-join-screen').style.display = 'none';
        } else {
            // চ্যানেল বাকি থাকলে অ্যালার্ট বা স্ক্রিন ব্লক থাকবে
            alert(`দয়া করে সবকটি চ্যানেলে জয়েন করুন! (${data.channelFailed} বাকি আছে)`);
        }
    } catch (error) {
        console.error("Verification Error:", error);
    }
}

// অ্যাপ ওপেন হলেই চেক কল হবে
checkForceJoin();