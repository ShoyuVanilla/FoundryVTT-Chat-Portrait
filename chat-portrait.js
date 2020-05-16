class PortraitsOnChatMessage {
  static onRenderChatMessage(chatMessage, html, messageData) {
    let speaker = messageData.message.speaker
    var actor;
    if (speaker.token) {
      actor = game.actors.tokens[speaker.token];
    }
    
    if (!actor) {
      actor = game.actors.get((speaker.actor));
    }

    const forceNameSearch = game.settings.get('ChatPortrait', 'forceNameSearch');
    if (!actor && forceNameSearch) {
      game.actors.forEach((value) => {
        if (value.name === speaker.alias) {
          actor = value;
        }
      });
    }

    if (actor) {
      let img = document.createElement("img");
      img.src = actor.img;
      img.width = 36;
      img.height = 36;
      let authorColor = messageData.author ? messageData.author.data.color : "black";
      img.style.border = `2px solid ${authorColor}`;
      let element = html.find(".message-header")[0];
      element.prepend(img);
    }
  }
}

Hooks.once('init', () => {
  game.settings.register('ChatPortrait', 'forceNameSearch', {
    name: game.i18n.localize("chat-portrait.force-name-search-s"),
    hint: game.i18n.localize("chat-portrait.force-name-search-l"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: forceNameSearch => window.location.reload()
  });
});

Hooks.on('renderChatMessage', PortraitsOnChatMessage.onRenderChatMessage);
