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
    setTimeout(
      function() {
        const log = document.querySelector("#chat-log");
        const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
        if (log && shouldForceScroll) {  
          //@ts-ignore
          log.scrollTo({ behavior: "smooth", top: log.scrollHeight });
        }
      }, 50
    );
  });

  // Hooks.on('updateChatMessage', (message, update, options, user) => {
 
  // });

  /**
   * Catch chat message creations and add some more data if we need to
  */
  Hooks.on('preCreateChatMessage', (msg, options, render, userId) => {
      if(options){
        // Update the speaker
        if (!options.speaker || (!options.speaker.token && !options.speaker.actor)){
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
      }
  });

  //@ts-ignore
	// libWrapper.register(MODULE_NAME, 'ChatLog.prototype.scrollBottom',chatLogPrototypeScrollBottomHandler,'OVERRIDE');

	// Posting messages should force a scroll if we're within range of the bottom, in the case that a new message is so large it is bigger than half the box.
  //@ts-ignore
  // libWrapper.register(MODULE_NAME, 'ChatLog.prototype.postOne',chatLogPrototypePostOneHandler,'MIXED');

	// When we first render, we should force a scroll.
  //@ts-ignore
	// libWrapper.register(MODULE_NAME, 'ChatLog.prototype._render',chatLogPrototypeRenderHandler,'MIXED');

}

export const initHooks = () => {
  warn("Init Hooks processing");

}


// export const chatLogPrototypeScrollBottomHandler = function () {
//   const force = args[0] || false;
//   const log = ChatPortrait.getLogElement(this);
//   if ( log )
//   {
//     if ( force || ChatPortrait.shouldScrollToBottom(log) ){
//       log.scrollTop = log.scrollHeight + log.offsetTop ;
//     }
//   }
//   return;
// }

// export const chatLogPrototypePostOneHandler = async function (wrapped, ...args) {
//   //const log = ChatPortrait.getLogElement(this);
//   //const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
//   //this.scrollBottom(shouldForceScroll);
//   // Bug fix scroll issue
// 	const log = document.querySelector("#chat-log");
// 	const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
// 	if (log && shouldForceScroll) {
// 		//@ts-ignore
// 		log.scrollTo({ behavior: "smooth", top: log.scrollHeight });
// 	}
//   return wrapped(...args);
// }

// export const chatLogPrototypeRenderHandler = async function (wrapped, ...args) {
//   // const rendered = this.rendered;
//   // if (rendered){
//   //   return wrapped(...args); // Never re-render the Chat Log itself, only it's contents
//   // }
//   // this.scrollBottom(true);
//   // Bug fix scroll issue
// 	const log = document.querySelector("#chat-log");
// 	const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
// 	if (log && shouldForceScroll) {
// 		//@ts-ignore
// 		log.scrollTo({ behavior: "smooth", top: log.scrollHeight });
// 	}
  
//   return wrapped(...args);
// }
