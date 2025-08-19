package com.gesa.plugins;

import it.auties.whatsapp.model.chat.MessageInfo;

public class HelloSinhalaPlugin implements BotPlugin {
    @Override
    public void handle(MessageInfo info, String message) {
        if(message.equalsIgnoreCase("kohomada")){
            info.chat().sendMessage("🙏 හෙලෝ මචං, මම *M.R.Gesa Bot* 🦾");
        }

        if(message.equalsIgnoreCase("mage nama")){
            info.chat().sendMessage("😎 මගේ නම *M.R.Gesa Bot* 🖤");
        }

        if(message.equalsIgnoreCase("suba udasank")){
            info.chat().sendMessage("🌞 සුභ උදෑසනක්! මගේ මිතුරා 🌸");
        }
    }
}
