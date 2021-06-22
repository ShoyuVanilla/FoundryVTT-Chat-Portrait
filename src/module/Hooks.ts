import { warn, error, debug, i18n } from "../main";
import { ChatLink } from "./chatlink";
import { ChatPortrait } from "./ChatPortrait";
import { MessageRenderData } from "./MessageRenderData";
import { MODULE_NAME } from "./settings";

export let readyHooks = async () => {

}

export const setupHooks = async () => {

  // setup all the hooks

  /**
  * This line connects our method above with the chat rendering.
  * Note that this happens after the core code has already generated HTML.
  */
  Hooks.on('renderChatMessage', (message, html, speakerInfo) => {
    ChatPortrait.onRenderChatMessage(message, html, speakerInfo);
    ChatLink.prepareEvent(message, html, speakerInfo);
  });

}

export const initHooks = () => {
  warn("Init Hooks processing");

}
