class PortraitsOnChatMessage {
  static onRenderChatMessage(chatMessage, html, messageData) {
    let actor = game.actors.get((messageData.message.speaker.actor));
    if (actor) {
      let img = document.createElement("img");
      img.src = actor.img;
      img.width = 36;
      img.height = 36;
      img.style.border = `2px solid ${messageData.author.data.color}`;
      let element = html.find(".message-header")[0];
      element.prepend(img);
    }
  }
}

Hooks.on('renderChatMessage', PortraitsOnChatMessage.onRenderChatMessage);
