import { warn, error, debug, i18n } from "../main";
import { ChatPortrait } from "./ChatPortrait";
import { MODULE_NAME } from "./settings";

export let readyHooks = async () => {

  // setup all the hooks

  /**
  * This line connects our method above with the chat rendering.
  * Note that this happens after the core code has already generated HTML.
  */
  Hooks.on('renderChatMessage', ChatPortrait.onRenderChatMessage);
  
}

export let initHooks = () => {
  warn("Init Hooks processing");

}
