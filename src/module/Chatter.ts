

export class Chatter {

    static sendTurnMessage(html, speakerRendered) {       
        ChatMessage.create({
            speaker: speakerRendered,
            content: html
        });
    }
}
