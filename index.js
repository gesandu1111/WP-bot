const { default: makeWASocket, useSingleFileAuthState } = require("@adiwajshing/baileys");
const P = require('pino');

const { state, saveCreds } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if(qr) console.log("📸 Scan this QR code from WhatsApp app!");
        if(connection === 'open') console.log('✅ Bot Connected!');
        if(connection === 'close') console.log('❌ Bot disconnected.', lastDisconnect?.error?.output?.statusCode);
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if(!msg.message) return;

        const text = msg.message.conversation || '';
        const jid = msg.key.remoteJid;

        if(text.toLowerCase() === 'hi') await sock.sendMessage(jid, { text: '👋 හෙලෝ! මම M.R.Gesa Bot 🦾' });
        if(text.toLowerCase() === 'kohomada') await sock.sendMessage(jid, { text: '🙏 හෙලෝ මචං, මම *M.R.Gesa Bot* 🦾' });
        if(text.toLowerCase() === 'suba udasank') await sock.sendMessage(jid, { text: '🌞 සුභ උදෑසනක්! මගේ මිතුරා 🌸' });
        if(text.toLowerCase() === 'mage nama') await sock.sendMessage(jid, { text: '😎 මගේ නම *M.R.Gesa Bot* 🖤' });
    });
}

startBot();
