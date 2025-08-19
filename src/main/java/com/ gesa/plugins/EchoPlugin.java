package com.gesa.plugins;

import it.auties.whatsapp.model.chat.MessageInfo;

public class EchoPlugin implements BotPlugin {
    @Override
    public void handle(MessageInfo info, String message) {
        if(message.startsWith("echo ")){
            String response = message.substring(5);
            info.chat().sendMessage("🔁 Echo: " + response);
        }
    }
}
