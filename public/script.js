const socket = io();

const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chat');
const usernameInput = document.getElementById('usernameInput');
const enterChatBtn = document.getElementById('enterChat');
const messages = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');

let username = '';

enterChatBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username !== '') {
        socket.emit('join', username);
        loginScreen.style.display = 'none';
        chatScreen.style.display = 'flex';
    }
});

sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const msg = msgInput.value.trim();
    if (msg !== '') {
        socket.emit('chatMessage', msg);
        msgInput.value = '';
    }
}

socket.on('message', (data) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');

    msgDiv.innerHTML = `
        <div class="meta">
            <span class="user">${data.user}</span> • <span class="time">${data.time}</span>
        </div>
        <div class="text">${data.text}</div>
    `;

    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
});
