const express = require('express');
const bodyParser = require('body-parser');
const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const P = require('pino');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// auth file
const { state, saveCreds } = useSingleFileAuthState('auth_info.json');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
    const { phone, code } = req.body;
    // මෙහිදී Baileys එකේ login flow handle කරන්න
    // WhatsApp bot connection initiate කරන්න
    res.send(`Phone: ${phone} | Code: ${code} received. Bot will connect (simulate).`);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
