import { warn, error, debug, i18n } from "../main";
import { ChatLink } from "./chatlink";
import { ChatPortrait } from "./ChatPortrait";
import { ImageReplacerInit } from "./ImageReplacer";
import { MessageRenderData } from "./MessageRenderData";
import { MODULE_NAME } from "./settings";

export let readyHooks = async () => {

}

export const setupHooks = async () => {

  // setup all the hooks
  let imageReplacer;
  if(ChatPortrait.settings.useImageReplacer){
    imageReplacer = ImageReplacerInit();
  }
  /**
  * This line connects our method above with the chat rendering.
  * Note that this happens after the core code has already generated HTML.
  */
  Hooks.on('renderChatMessage', (message, html, speakerInfo) => {
    ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
    ChatLink.prepareEvent(message, html, speakerInfo);
  });

  /**
   * Catch chat message creations and add some more data if we need to
  */
  Hooks.on('preCreateChatMessage', (msg, options, render, userId) => {

      // Update the speaker
      if (!options.speaker.token && !options.speaker.actor){
        let user = game.users.get(options.user);
        let avatar
        if(!user){
            user = game.users.get(options.user.id);
        }
        let speakerInfo:any = {};
        let mytoken = ChatPortrait.getFirstPlayerToken();
        speakerInfo.alias = msg.alias;
        speakerInfo.token = mytoken;
        speakerInfo.actor = game.actors.get(user.data.character);
        let updates = {
          speaker: speakerInfo
        }
        msg.data.update(updates);
      }
  });

}

export const initHooks = () => {
  warn("Init Hooks processing");

}
