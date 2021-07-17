import { warn } from "../main.js";
import { ChatLink } from "./chatlink.js";
import { ChatPortrait } from "./ChatPortrait.js";
import { ImageReplacerInit } from "./ImageReplacer.js";
import { getGame } from "./settings.js";
export let readyHooks = async () => {
};
export const setupHooks = async () => {
    // setup all the hooks
    let imageReplacer;
    if (ChatPortrait.settings.useImageReplacer) {
        imageReplacer = ImageReplacerInit();
    }
    let currentSpeakerBackUp;
    /**
    * This line connects our method above with the chat rendering.
    * Note that this happens after the core code has already generated HTML.
    */
    Hooks.on('renderChatMessage', async (message, html, speakerInfo) => {
        if (!speakerInfo.message.speaker.token && currentSpeakerBackUp?.token) {
            if (currentSpeakerBackUp.scene)
                speakerInfo.message.speaker.scene = currentSpeakerBackUp.scene;
            if (currentSpeakerBackUp.actor)
                speakerInfo.message.speaker.actor = currentSpeakerBackUp.actor;
            if (currentSpeakerBackUp.token)
                speakerInfo.message.speaker.token = currentSpeakerBackUp.token;
            if (currentSpeakerBackUp.alias)
                speakerInfo.message.speaker.alias = currentSpeakerBackUp.alias;
        }
        if (!message.data.speaker.token && currentSpeakerBackUp?.token) {
            if (currentSpeakerBackUp.scene)
                message.data.speaker.scene = currentSpeakerBackUp.scene;
            if (currentSpeakerBackUp.actor)
                message.data.speaker.actor = currentSpeakerBackUp.actor;
            if (currentSpeakerBackUp.token)
                message.data.speaker.token = currentSpeakerBackUp.token;
            if (currentSpeakerBackUp.alias)
                message.data.speaker.alias = currentSpeakerBackUp.alias;
        }
        ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
        ChatLink.prepareEvent(message, html, speakerInfo);
        setTimeout(function () {
            const log = document.querySelector("#chat-log");
            const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
            if (log && shouldForceScroll) {
                log.scrollTo({ behavior: "smooth", top: log.scrollHeight });
            }
        }, 50);
    });
    // Hooks.on('createChatMessage', async (message:ChatMessage, render, userId) => {
    //   if(!message.data.speaker.token && currentSpeakerBackUp?.token){
    //     if(currentSpeakerBackUp.scene) message.data.speaker.scene = currentSpeakerBackUp.scene;
    //     if(currentSpeakerBackUp.actor) message.data.speaker.actor = currentSpeakerBackUp.actor;
    //     if(currentSpeakerBackUp.token) message.data.speaker.token = currentSpeakerBackUp.token;
    //     if(currentSpeakerBackUp.alias) message.data.speaker.alias = currentSpeakerBackUp.alias;
    //   }
    // });
    // Hooks.on('updateChatMessage', (message, update, options, user) => {
    // });
    /**
     * Catch chat message creations and add some more data if we need to
    */
    Hooks.on('preCreateChatMessage', async (msg, options, render, userId) => {
        if (options) {
            // Update the speaker
            if (!options.speaker || (!options.speaker.token && !options.speaker.actor)) {
                let user = getGame().users?.get(options.user);
                let avatar;
                if (!user) {
                    user = getGame().users?.get(options.user.id);
                }
                let speakerInfo = {};
                let mytoken = ChatPortrait.getFirstPlayerToken();
                speakerInfo.alias = msg.alias;
                speakerInfo.token = mytoken;
                speakerInfo.actor = getGame().actors?.get(user?.data.character);
                let updates = {
                    speaker: speakerInfo
                };
                msg.data.update(updates);
            }
            // MidiQol , Better Rolls, and other modules.. sometime destroy the info 
            // for my purpose i backup the speaker i will found on the preCreateChatMessage
            else if (options.speaker) {
                currentSpeakerBackUp = options.speaker;
                currentSpeakerBackUp.token = options.speaker.token.id;
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
};
export const initHooks = () => {
    warn("Init Hooks processing");
};
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
// 		log.scrollTo({ behavior: "smooth", top: log.scrollHeight });
// 	}
//   return wrapped(...args);
// }
