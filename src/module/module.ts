import { warn, error, debug, i18n, log } from './lib/lib';
import { ChatPortrait } from './ChatPortrait';
import type { ChatSpeakerData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/chatSpeakerData';
import type EmbeddedCollection from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/embedded-collection.mjs';
import type { CombatData } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs';
import type { ImageReplaceVoiceData } from './ChatPortraitModels';
import CONSTANTS from './constants';
import { setApi } from '../main';
import API from './api';
import { registerSocket } from './socket';

const mapCombatTrackerPortrait = new Map<string, string>();

export const initHooks = () => {
  warn('Init Hooks processing');

  Hooks.once('socketlib.ready', registerSocket);
};

export const setupHooks = async () => {
  setApi(API);

  // setup all the hooks
  let imageReplacer: ImageReplaceVoiceData[];
  // if (ChatPortrait.settings.useImageReplacer) {
  //   imageReplacer = ImageReplacerInit();
  // }

  let currentSpeakerBackUp: ChatSpeakerData;
  /**
   * This line connects our method above with the chat rendering.
   * Note that this happens after the core code has already generated HTML.
   * Bind to any newly rendered chat cards at runtime
   * For whatever reason, this callback is sometimes called with unattached html elements
   */
  Hooks.on('renderChatMessage', async (message: ChatMessage, html: JQuery<HTMLElement>, speakerInfo) => {
    if (!speakerInfo.message.speaker.token && currentSpeakerBackUp?.token) {
      if (currentSpeakerBackUp.scene) speakerInfo.message.speaker.scene = currentSpeakerBackUp.scene;
      if (currentSpeakerBackUp.actor) speakerInfo.message.speaker.actor = currentSpeakerBackUp.actor;
      if (currentSpeakerBackUp.token) speakerInfo.message.speaker.token = currentSpeakerBackUp.token;
      if (currentSpeakerBackUp.alias) speakerInfo.message.speaker.alias = currentSpeakerBackUp.alias;
    }

    if (!message.data.speaker.token && currentSpeakerBackUp?.token) {
      if (currentSpeakerBackUp.scene) message.data.speaker.scene = currentSpeakerBackUp.scene;
      if (currentSpeakerBackUp.actor) message.data.speaker.actor = currentSpeakerBackUp.actor;
      if (currentSpeakerBackUp.token) message.data.speaker.token = currentSpeakerBackUp.token;
      if (currentSpeakerBackUp.alias) message.data.speaker.alias = currentSpeakerBackUp.alias;
    }

    ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);

    setTimeout(function () {
      const log = document.querySelector('#chat-log');
      const shouldForceScroll = log ? ChatPortrait.shouldScrollToBottom(log) : false;
      if (log && shouldForceScroll) {
        log.scrollTo({ behavior: 'smooth', top: log.scrollHeight });
      }
    }, 50);

    // ChatPortraitChatCard.bind(message, html, speakerInfo, imageReplacer);
  });

  // Hooks.on('createChatMessage', async (message:ChatMessage, render, userId) => {
  //   if(!message.data.speaker.token && currentSpeakerBackUp?.token){
  //     if(currentSpeakerBackUp.scene) message.data.speaker.scene = currentSpeakerBackUp.scene;
  //     if(currentSpeakerBackUp.actor) message.data.speaker.actor = currentSpeakerBackUp.actor;
  //     if(currentSpeakerBackUp.token) message.data.speaker.token = currentSpeakerBackUp.token;
  //     if(currentSpeakerBackUp.alias) message.data.speaker.alias = currentSpeakerBackUp.alias;
  //   }
  //   if(render.render){
  //     const html:JQuery<HTMLElement> = $("<div>" + message.data.content + "</div>");
  //     let speakerInfo = message.data.speaker;
  //     //@ts-ignore
  //     if(!speakerInfo.alias && speakerInfo.document?.alias){
  //       //@ts-ignore
  //       speakerInfo.alias = speakerInfo.document?.alias;
  //     }
  //     await ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
  //     let updates = {
  //       content: html.html()
  //     };
  //     message.data.update(updates);
  //     //@ts-ignore
  //     speakerInfo.message = {};
  //      //@ts-ignore
  //     speakerInfo.message = message.data;
  //   }
  // });

  // let chatData:any = {
  //   type: ChatPortrait.getMessageTypeVisible(speakerInfo),
  //   user: game.user,
  //   speaker: speakerInfo,
  //   content: message.data.content,
  //   //@ts-ignore
  //   whisper: message.data.whisper ? message.data.whisper : speakerInfo.document.data.whisper,
  // };
  // await ChatMessage.create(chatData,{});

  // Hooks.on("chatMessage", (chatlog, messageText, chatData) => {
  //   let test = "";
  // });

  // Hooks.on('updateChatMessage', (message, update, options, user) => {

  // });

  // let flag = true;

  /**
   * Catch chat message creations and add some more data if we need to
   */
  Hooks.on('preCreateChatMessage', async (message: ChatMessage, options, render, userId) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'applyPreCreateChatMessagePatch')) {
      if (options) {
        // Update the speaker
        if (!options.speaker || (!options.speaker.token && !options.speaker.actor)) {
          let user = game.users?.get(options.user);
          let avatar;
          if (!user && options.user) {
            user = game.users?.get(options.user?.id);
          } else {
            user = game.users?.get(userId);
          }
          const speakerInfo: any = {};
          const mytoken = ChatPortrait.getFirstPlayerToken();
          speakerInfo.alias = message.alias;
          speakerInfo.token = mytoken;
          speakerInfo.actor = game.actors?.get(<string>user?.data.character);
          const updates = {
            speaker: speakerInfo,
          };
          message.data.update(updates);
        }
        // MidiQol , Better Rolls, and other modules.. sometime destroy the info
        // for my purpose i backup the speaker i will found on the preCreateChatMessage
        else if (options.speaker) {
          currentSpeakerBackUp = options.speaker;
          if (options.speaker.token) {
            currentSpeakerBackUp.token = options.speaker.token?.id;
          }
        }
      }
      // if(render.render){
      //   const html:JQuery<HTMLElement> = $("<div>" + message.data.content + "</div>");
      //   let speakerInfo = message.data.speaker;
      //   //@ts-ignore
      //   if(!speakerInfo.alias && speakerInfo.document?.alias){
      //     //@ts-ignore
      //     speakerInfo.alias = speakerInfo.document?.alias;
      //   }
      //   await ChatPortrait.onRenderChatMessage(message, html, speakerInfo, imageReplacer);
      //   let updates = {
      //     content: html.html()
      //   };
      //   message.data.update(updates);
      //   //@ts-ignore
      //   speakerInfo.message = {};
      //    //@ts-ignore
      //   speakerInfo.message = message.data;
      //   if(flag){
      //     let chatData:any = {
      //       type: ChatPortrait.getMessageTypeVisible(speakerInfo),
      //       user: game.user,
      //       speaker: speakerInfo,
      //       content: message.data.content,
      //       //@ts-ignore
      //       whisper: message.data.whisper ? message.data.whisper : speakerInfo.document.data.whisper,
      //     };
      //     flag = false;
      //     ChatMessage.create(chatData,{});
      //   }else{
      //     flag = true;
      //   }
      // }
    }
  });
};

export const readyHooks = async () => {
  // When the combat tracker is rendered, we need to completely replace
  // its HTML with a custom version.
  Hooks.on('renderCombatTracker', async (app, html: JQuery<HTMLElement>, options) => {
    if (game.settings.get(CONSTANTS.MODULE_NAME, 'applyOnCombatTracker')) {
      // If there's as combat, we can proceed.
      if (game.combat) {
        // Retrieve a list of the combatants
        const combatants = <EmbeddedCollection<typeof Combatant, CombatData>>game.combat?.data.combatants;

        combatants.forEach(async (c) => {
          // Add class to trigger drag events.
          const $combatant = html.find(`.combatant[data-combatant-id="${c.id}"]`);
          //$combatant.addClass('actor-elem');
          //@ts-ignore
          const img: HTMLImageElement = $combatant.find('.token-image')[0];
          const tokenID = <string>c.token?.id;
          let imgPath = CONSTANTS.DEF_TOKEN_IMG_PATH;

          if (!mapCombatTrackerPortrait.get(tokenID)) {
            const actorID = <string>c.actor?.id;

            const token: TokenDocument = <TokenDocument>ChatPortrait.getTokenFromId(tokenID);
            let userID = '';
            let isOwnedFromPLayer = false;
            let useTokenImage: boolean = ChatPortrait.settings.useTokenImage;
            const actor = ChatPortrait.getActor(token.actor);
            const doNotUseTokenImageWithSpecificType: string[] = ChatPortrait.settings
              .doNotUseTokenImageWithSpecificType
              ? String(ChatPortrait.settings.doNotUseTokenImageWithSpecificType).split(',')
              : [];
            if (
              doNotUseTokenImageWithSpecificType.length > 0 &&
              doNotUseTokenImageWithSpecificType.includes(<string>actor?.type)
            ) {
              useTokenImage = false;
            }
            if (ChatPortrait.settings.useAvatarImage && !useTokenImage) {
              // if user not admin is owner of the token
              //userID = (!game.user?.isGM && token.actor?.hasPerm(<User>game.user, "OWNER")) ? <string>game.user?.id : "";
              //userID = (!game.user?.isGM && (token.document.permission === CONST.ENTITY_PERMISSIONS.OWNER)) ? <string>game.user?.id : "";
              const permissions: Record<string, 0 | 1 | 2 | 3> = <Record<string, 0 | 1 | 2 | 3>>(
                token.actor?.data.permission
              );
              for (const keyPermission in permissions) {
                const valuePermission = <number>permissions[keyPermission];
                if (game.user?.isGM) {
                  if (game.user?.id != keyPermission && valuePermission === CONST.ENTITY_PERMISSIONS.OWNER) {
                    userID = <string>keyPermission;
                    break;
                  }
                } else {
                  if (game.user?.id === keyPermission && valuePermission === CONST.ENTITY_PERMISSIONS.OWNER) {
                    userID = <string>game.user?.id;
                    isOwnedFromPLayer = true;
                    break;
                  }
                }
              }
            }

            const sceneID = <string>(<Token>canvas.tokens?.get(<string>token.id)).scene.id;
            imgPath = ChatPortrait.loadImagePathForCombatTracker(tokenID, actorID, userID, sceneID, isOwnedFromPLayer);
            if (imgPath?.includes('.webm')) {
              try {
                const imgThumb = await ImageHelper.createThumbnail(imgPath);
                if (imgPath.includes('.webm')) {
                  imgPath = imgThumb.thumb;
                } else {
                  imgPath = <string>imgThumb.src;
                }
              } catch {
                //img.src = imgPath;
              }
            }
            mapCombatTrackerPortrait.set(tokenID, imgPath);
          } else {
            imgPath = <string>mapCombatTrackerPortrait.get(tokenID);
          }
          if (imgPath) {
            img.setAttribute('data-src', imgPath);
          }
        });
      } else {
        mapCombatTrackerPortrait.clear();
      }
    }
  });

  Hooks.on('renderSettingsConfig', (app, html, data) => {
    // Add colour pickers to the Configure Game Settings: Module Settings menu
    const nameBorderColor = `${CONSTANTS.MODULE_NAME}.borderColor`;
    const colourBorderColor = <string>game.settings.get(CONSTANTS.MODULE_NAME, 'borderColor');
    $('<input>')
      .attr('type', 'color')
      .attr('data-edit', nameBorderColor)
      .val(colourBorderColor)
      .insertAfter($(`input[name="${nameBorderColor}"]`, html).addClass('color'));
  });
};
