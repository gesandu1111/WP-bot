const { default: makeWASocket, useMultiFileAuthState } = require("@adiwajshing/baileys");
const P = require('pino');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');

    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close'){
            console.log('🔌 Bot disconnected');
        } else if(connection === 'open'){
            console.log('✅ Bot connected successfully!');
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if(!msg.message) return;
        const text = msg.message.conversation || '';

        // Sinhala / English replies
        if(text.toLowerCase() === 'hi'){
            await sock.sendMessage(msg.key.remoteJid, { text: '👋 හෙලෝ! මම M.R.Gesa Bot 🦾' });
        }
        if(text.toLowerCase() === 'kohomada'){
            await sock.sendMessage(msg.key.remoteJid, { text: '🙏 හෙලෝ මචං, මම *M.R.Gesa Bot* 🦾' });
        }
        if(text.toLowerCase() === 'suba udasank'){
            await sock.sendMessage(msg.key.remoteJid, { text: '🌞 සුභ උදෑසනක්! මගේ මිතුරා 🌸' });
        }
    });
}

startBot();
