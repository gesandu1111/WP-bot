const { default: makeWASocket, useMultiFileAuthState } = require("@adiwajshing/baileys");
const P = require('pino');

async function startBot() {
    // Auth state folder
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');

    // Create WhatsApp socket
    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,   // ✅ QR code terminal eke display wenawa
        auth: state
    });

    // Connection update events
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close'){
            console.log('🔌 Bot disconnected, reconnect karanna...');
            if(lastDisconnect.error){
                console.log('Reason:', lastDisconnect.error.output?.statusCode, lastDisconnect.error.message);
            }
        } else if(connection === 'open'){
            console.log('✅ Bot connected successfully!');
        }
    });

    // Message listener
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if(!msg.message) return;
        const text = msg.message.conversation || '';

        // Sinhala + English replies
        if(text.toLowerCase() === 'hi'){
            await sock.sendMessage(msg.key.remoteJid, { text: '👋 හෙලෝ! මම M.R.Gesa Bot 🦾' });
        }
        if(text.toLowerCase() === 'kohomada'){
            await sock.sendMessage(msg.key.remoteJid, { text: '🙏 හෙලෝ මචං, මම *M.R.Gesa Bot* 🦾' });
        }
        if(text.toLowerCase() === 'suba udasank'){
            await sock.sendMessage(msg.key.remoteJid, { text: '🌞 සුභ උදෑසනක්! මගේ මිතුරා 🌸' });
        }
        if(text.toLowerCase() === 'mage nama'){
            await sock.sendMessage(msg.key.remoteJid, { text: '😎 මගේ නම *M.R.Gesa Bot* 🖤' });
        }
    });
}

startBot();
