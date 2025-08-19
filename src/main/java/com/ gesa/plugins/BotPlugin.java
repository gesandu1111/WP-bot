package com.gesa.plugins;

import it.auties.whatsapp.model.chat.MessageInfo;

public interface BotPlugin {
    void handle(MessageInfo info, String message);
}
