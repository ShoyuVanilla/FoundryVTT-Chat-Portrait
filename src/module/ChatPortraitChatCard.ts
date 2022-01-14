import { DOCUMENT_PERMISSIONS } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs';
import { log } from '../main';
import { ChatPortrait } from './ChatPortrait';
import { canvas, game } from './settings';

/**
 * Class that encapsulates a better rolls card at runtime.
 * When a chat message enters the chat it should be binded
 * with ChatPortraitChatCard.bind().
 */
export class ChatPortraitChatCard extends ChatMessage {
  speaker: Actor;
  // id: string;
  // roll:Roll;

  constructor(message, html, speakerInfo, imageReplacer) {
    super(message.data.document);
    this.updateBinding(message, html, speakerInfo, imageReplacer);
  }

  get message() {
    return game.messages?.get(<string>this.id);
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
    // this.id = message.id;
    this.speaker = <Actor>game.actors?.get(message.data.speaker.actor);
    // this.roll = message?.roll ? message?.roll : message?.data?.document?.roll;
    //message.BetterRoll = this.roll;

    // Hide Save DCs
    // const actor = this.speaker;
    // if ((!actor && !game.user?.isGM) || actor?.permission != 3) {
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
      log('Retrieved existing card');
      //existing.updateBinding(message, chatCard);
      existing.updateBinding(message, html, speakerInfo, imageReplacer);

      // Pulse the card to make it look more obvious
      // Wait for the event queue before doing so to allow CSS calculations to work,
      // otherwise the border color will be incorrectly transparent
      window.setTimeout(() => {
        //@ts-ignore
        gsap?.from(html.get(), {
          'border-color': 'red',
          'box-shadow': '0 0 6px inset #ff6400',
          duration: 2,
        });
      }, 0);

      // Scroll to bottom if the last card had updated
      const messagesSize: number = game.messages?.size || 0;
      const last = game.messages?.contents[messagesSize - 1];
      if (last?.id === existing.id) {
        //window.setTimeout(() => { ui.chat?.scrollBottom(); }, 0);
        window.setTimeout(function () {
          const log = document.querySelector('#chat-log');
          const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
          if (log && shouldForceScroll) {
            log.scrollTo({ behavior: 'smooth', top: log.scrollHeight });
          }
        }, 50);
      }
      return existing;
    } else {
      const newCard = new ChatPortraitChatCard(message, html, speakerInfo, imageReplacer);
      message.ChatPortraitCardBinding = newCard;
      return newCard;
    }
  }

  // fromMessage(message:ChatMessage) {
  // 	const data = message.data.rollflags.betterrolls5e;
  // 	const roll = new CustomItemRoll(null, data?.params ?? {}, data?.fields ?? []);
  // 	roll._currentId = -1;
  // 	roll.messageId = message.id;
  // 	roll.rolled = true;
  // 	if (data) {
  // 		roll.isCrit = data.isCrit;
  // 		roll.entries = FoundryProxy.create(data.entries);
  // 		roll.properties = data.properties;
  // 		roll.params = data.params;

  // 		// Set these up so that lazy loading can be done
  // 		roll.actorId = data.actorId;
  // 		roll.itemId = data.itemId;
  // 		roll.tokenId = data.tokenId;
  // 	}

  // 	roll.storedItemData = message.getFlag("dnd5e", "itemData");

  // 	return roll;
  // }
}
