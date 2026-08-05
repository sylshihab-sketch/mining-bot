* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #121212;
    color: #ffffff;
    display: flex;
    justify-content: center;
}

.modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modal-card {
    background: #1e1b18;
    border: 1px solid #d4af37;
    padding: 24px;
    border-radius: 16px;
    width: 90%;
    max-width: 380px;
    text-align: center;
}

.channel-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
}

.btn-channel {
    background: #2a2421;
    color: #ffcc00;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    border: 1px solid #ffcc00;
}

#verify-btn, .btn-primary, .btn-gold {
    background: linear-gradient(135deg, #f39c12, #d35400);
    color: white;
    border: none;
    padding: 14px;
    width: 100%;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

.hidden { display: none !important; }
.error-text { color: #ff4d4d; font-size: 14px; margin-top: 10px; }

.app-container {
    width: 100%;
    max-width: 420px;
    padding: 16px;
}

.user-profile {
    background: #241e19;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #443728;
    margin-bottom: 20px;
}

.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 420px;
    background: #181512;
    display: flex;
    justify-content: space-around;
    padding: 12px 0;
    border-top: 1px solid #33281c;
}

.nav-item {
    background: none;
    border: none;
    color: #888;
    font-size: 14px;
}

.nav-item.active {
    color: #f39c12;
    font-weight: bold;
}