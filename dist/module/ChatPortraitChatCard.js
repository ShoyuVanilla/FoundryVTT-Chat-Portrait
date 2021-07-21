import { log } from "../main.js";
import { ChatPortrait } from "./ChatPortrait.js";
import { getGame } from "./settings.js";
/**
 * Class that encapsulates a better rolls card at runtime.
 * When a chat message enters the chat it should be binded
 * with ChatPortraitChatCard.bind().
 */
export class ChatPortraitChatCard {
    constructor(message, html, speakerInfo, imageReplacer) {
        //super(message.data.document);
        this.updateBinding(message, html, speakerInfo, imageReplacer);
    }
    get message() {
        return getGame().messages?.get(this.id);
    }
    /**
     * Initializes data. Used in the constructor or by ChatPortraitChatCard.bind().
     * @param {*} message
     * @param {*} html
     * @private
     */
    updateBinding(message, html, speakerInfo, imageReplacer) {
        // IMPLEMENTATION WARNING: DO NOT STORE html into the class properties (NO this.html AT ALL)
        // Foundry will sometimes call renderChatMessage() multiple times with un-bound HTML,
        // and we can't do anything except rely on closures to handle those events.
        this.id = message.id;
        this.speaker = getGame().actors?.get(message.data.speaker.actor);
        this.roll = message?.roll ? message?.roll : message?.data?.document?.roll;
        //message.BetterRoll = this.roll;
        // Hide Save DCs
        // const actor = this.speaker;
        // if ((!actor && !getGame().user?.isGM) || actor?.permission != 3) {
        // 	html.find(".hideSave").text(i18n("displayUnknownPlaceHolderActorName"));
        // }
        // Setup the events for card buttons (the permanent ones, not the hover ones)
        //this._setupCardButtons(html);
        // Setup hover buttons when hovered (for optimization)
        // Just like with html, we cannot save hoverInitialized to the object
        // let hoverInitialized = false;
        // html.hover(async () => {
        // 	if (!hoverInitialized) {
        // 		hoverInitialized = true;
        // 		await this._setupOverlayButtons(html);
        // 		this._onHover(html);
        // 		console.log("BetterRolls5e | Hover Buttons Initialized");
        // 	}
        // })
        ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
    }
    /**
     * Inflates an existing chat message, adding runtime elements
     * and events to it. Does nothing if the message is not the correct type.
     * @param {ChatMessage} message
     * @param {JQuery} html
     */
    static async bind(message, html, speakerInfo, imageReplacer) {
        const chatCard = html.find('.message-sender');
        if (chatCard.length === 0) {
            return null;
        }
        // Check if the card already exists
        const existing = message.ChatPortraitCardBinding;
        if (existing) {
            log("Retrieved existing card");
            //existing.updateBinding(message, chatCard);
            existing.updateBinding(message, html, speakerInfo, imageReplacer);
            // Pulse the card to make it look more obvious
            // Wait for the event queue before doing so to allow CSS calculations to work,
            // otherwise the border color will be incorrectly transparent
            window.setTimeout(() => {
                //@ts-ignore
                gsap?.from(html.get(), {
                    "border-color": "red",
                    "box-shadow": "0 0 6px inset #ff6400",
                    duration: 2
                });
            }, 0);
            // Scroll to bottom if the last card had updated
            const messagesSize = getGame().messages?.size || 0;
            const last = getGame().messages?.contents[messagesSize - 1];
            if (last?.id === existing.id) {
                //window.setTimeout(() => { ui.chat?.scrollBottom(); }, 0);
                window.setTimeout(function () {
                    const log = document.querySelector("#chat-log");
                    const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
                    if (log && shouldForceScroll) {
                        log.scrollTo({ behavior: "smooth", top: log.scrollHeight });
                    }
                }, 50);
            }
            return existing;
        }
        else {
            const newCard = new ChatPortraitChatCard(message, html, speakerInfo, imageReplacer);
            message.ChatPortraitCardBinding = newCard;
            return newCard;
        }
    }
}
