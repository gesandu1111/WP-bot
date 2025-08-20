// M.R.Gesa WhatsApp Bot
const { default: makeWASocket, useMultiFileAuthState } = require("@adiwajshing/baileys");
const P = require('pino');

async function startBot() {
    // Authentication state save කරන්න folder එක
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');

    // Bot connection
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,    // ✅ QR code terminal එකේ print වෙන flag එක
        auth: state
    });

    // Connection updates handle කරන block
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if(qr) {
            console.log("📸 Scan this QR code from WhatsApp app!");
        }

        if(connection === 'open') {
            console.log('✅ Bot Connected Successfully!');
        } else if (connection === 'close') {
            console.log('❌ Bot disconnected. Trying to reconnect...');
            if(lastDisconnect.error){
                console.log('Reason:', lastDisconnect.error.output?.statusCode, lastDisconnect.error.message);
            }
        }
    });

    // Credentials update save කරන block
    sock.ev.on('creds.update', saveCreds);

    // Incoming messages handle කරන block
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if(!msg.message) return;

        const text = msg.message.conversation || '';
        const jid = msg.key.remoteJid;

        // Sinhala + English replies
        if(text.toLowerCase() === 'hi'){
            await sock.sendMessage(jid, { text: '👋 හෙලෝ! මම M.R.Gesa Bot 🦾' });
        }
        if(text.toLowerCase() === 'kohomada'){
            await sock.sendMessage(jid, { text: '🙏 හෙලෝ මචං, මම *M.R.Gesa Bot* 🦾' });
        }
        if(text.toLowerCase() === 'suba udasank'){
            await sock.sendMessage(jid, { text: '🌞 සුභ උදෑසනක්! මගේ මිතුරා 🌸' });
        }
        if(text.toLowerCase() === 'mage nama'){
            await sock.sendMessage(jid, { text: '😎 මගේ නම *M.R.Gesa Bot* 🖤' });
        }
    });
}

// Bot start කරන්න
startBot();
