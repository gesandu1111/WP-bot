package com.gesa;

import it.auties.whatsapp.api.Whatsapp;
import it.auties.whatsapp.model.chat.MessageInfo;
import it.auties.whatsapp.model.message.standard.TextMessage;
import com.gesa.plugins.*;

import java.util.List;

public class MRGesaBot {
    private static final List<BotPlugin> plugins = List.of(
            new EchoPlugin() // add more plugins here
    );

    public static void main(String[] args) {
        Whatsapp.webBuilder()
                .lastConnection()
                .newConnection()
                .name("M.R.Gesa")
                .build()
                .addListener(MRGesaBot::onMessage);
    }

    private static void onMessage(MessageInfo info) {
        if(info.message().content() instanceof TextMessage text){
            String message = text.text();
            System.out.println("📩 Received: " + message);

            // Built-in commands
            if(message.equalsIgnoreCase("hi") || message.equalsIgnoreCase("hello")){
                info.chat().sendMessage("👋 Hello! I am *M.R.Gesa Bot* 🤖");
            }

            if(message.equalsIgnoreCase("help")){
                info.chat().sendMessage("📌 Commands available:\n1. hi/hello\n2. help\n3. plugins\n4. echo <msg>");
            }

            if(message.equalsIgnoreCase("plugins")){
                info.chat().sendMessage("🔌 Plugin system enabled. More features coming soon!");
            }

            // Run through plugins
            for(BotPlugin plugin : plugins){
                plugin.handle(info, message);
            }
        }
    }
}
