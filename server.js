const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔑 ১. এখানে আপনার Bot Token বসান
const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN_HERE";

// 📢 ২. আপনার ৫টি চ্যানেলের Username বা ID বসান (অবশ্যই @ সহ)
const CHANNELS = [
    "@channel_1",
    "@channel_2",
    "@channel_3",
    "@channel_4",
    "@channel_5"
];

app.use(express.static(path.join(__dirname)));

// 🔍 চ্যানেল ভেরিফিকেশন API Endpoint
app.get('/api/verify-user', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.json({ isJoined: false, message: "User ID missing" });
    }

    try {
        for (let channel of CHANNELS) {
            const url = `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${channel}&user_id=${userId}`;
            const response = await axios.get(url);
            const status = response.data?.result?.status;

            // যদি ইউজার যেকোনো একটি চ্যানেলেও না থাকে
            if (!['member', 'administrator', 'creator'].includes(status)) {
                return res.json({ isJoined: false });
            }
        }
        
        // সবগুলোতে থাকলে
        return res.json({ isJoined: true });

    } catch (error) {
        console.error("Verification Error:", error.message);
        return res.json({ isJoined: false, error: "Bot is not admin or invalid channel" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});