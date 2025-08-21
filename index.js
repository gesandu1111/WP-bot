const { default: makeWASocket, useSingleFileAuthState } = require("@adiwajshing/baileys");
const P = require('pino');
const { state, saveCreds } = useSingleFileAuthState('./auth_info.json');
const fbPlugin = require('./plugins/fbBotM.R.Gesa'); // plugin එක import

async function startBot() {
  const sock = makeWASocket({
    logger: P({ level: 'silent' }),
    auth: state
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("📸 Scan this QR code from WhatsApp app!");
      require('qrcode-terminal').generate(qr, { small: true });
    }

    if (connection === 'open') console.log('✅ Bot Connected!');
    if (connection === 'close') console.log('❌ Bot disconnected.', lastDisconnect?.error?.output?.statusCode);
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation?.trim();
    const jid = msg.key.remoteJid;

    // 🔹 Sinhala CLI replies
    if (text?.toLowerCase() === 'hi') {
      await sock.sendMessage(jid, { text: '👋 හෙලෝ! මම M.R.Gesa Bot 🦾' });
    }
    if (text?.toLowerCase() === 'kohomada') {
      await sock.sendMessage(jid, { text: '🙏 හෙලෝ මචං, මම *M.R.Gesa Bot* 🦾' });
    }
    if (text?.toLowerCase() === 'suba udasank') {
      await sock.sendMessage(jid, { text: '🌞 සුභ උදෑසනක්! මගේ මිතුරා 🌸' });
    }
    if (text?.toLowerCase() === 'mage nama') {
      await sock.sendMessage(jid, { text: '😎 මගේ නම *M.R.Gesa Bot* 🖤' });
    }

    // 🔹 .fb plugin trigger
    if (text?.startsWith('.fb')) {
      console.log('✅ .fb command detected:', text);
      await fbPlugin.run(sock, msg, text);
    }

    // 🔹 reply tracking for .fb plugin
    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      await fbPlugin.onReply(sock, msg);
    }
  });
}

startBot();
