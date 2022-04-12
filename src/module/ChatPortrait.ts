import { warn, error, i18n } from './lib/lib';
import { ChatLink } from './Chatlink';
import { SettingsForm } from './ChatPortraitForm';
import type { ChatPortraitSettings } from './ChatPortraitSettings';
import { imageReplacerDamageType, imageReplacerIconizer } from './ImageReplacer';
import type { MessageRenderData } from './MessageRenderData';
import { ChatPortraitCustomData, ImageReplacerData, ImageReplaceVoiceData } from './ChatPortraitModels';
import CONSTANTS from './constants';

/**
 * Main class wrapper for all of our features.
 */
export class ChatPortrait {
  /**
   * @param  {ChatMessage} chatMessage
   * @param  {JQuery} html
   * @param  {MessageRenderData} messageData
   */
  static onRenderChatMessage(
    chatMessage: ChatMessage,
    html: JQuery<HTMLElement>,
    speakerInfo,
    imageReplacer: ImageReplaceVoiceData[],
  ): JQuery<HTMLElement> | undefined {
    let doNotStyling = false;

    // PreHook (can abort the interaction with the door)
    if (Hooks.call('ChatPortraitEnabled') === false) {
      return html;
    }

    if (!ChatPortrait.shouldOverrideMessageStyling(speakerInfo)) {
      // Do not style this
      doNotStyling = true;
    }

    if (!ChatPortrait.settings.displaySettingWhisperToOther && ChatPortrait.isWhisperToOther(speakerInfo)) {
      // Don't update whispers that the current player isn't privy to
      doNotStyling = true;
    }

    const messageType = ChatPortrait.getMessageTypeVisible(speakerInfo);

    if (!ChatPortrait.settings.displaySettingOTHER && messageType == CONST.CHAT_MESSAGE_TYPES.OTHER) {
      doNotStyling = true;
    }
    if (!ChatPortrait.settings.displaySettingOOC && messageType == CONST.CHAT_MESSAGE_TYPES.OOC) {
      doNotStyling = true;
    }
    if (!ChatPortrait.settings.displaySettingIC && messageType == CONST.CHAT_MESSAGE_TYPES.IC) {
      doNotStyling = true;
    }
    if (!ChatPortrait.settings.displaySettingEMOTE && messageType == CONST.CHAT_MESSAGE_TYPES.EMOTE) {
      doNotStyling = true;
    }
    if (!ChatPortrait.settings.displaySettingWHISPER && messageType == CONST.CHAT_MESSAGE_TYPES.WHISPER) {
      doNotStyling = true;
    }
    if (!ChatPortrait.settings.displaySettingROLL && messageType == CONST.CHAT_MESSAGE_TYPES.ROLL) {
      doNotStyling = true;
    }

    if (ChatPortrait.settings.disablePortraitForAliasGmMessage) {
      const userByAlias = <User>game.users?.find((u: User) => {
        return speakerInfo.alias === u.name && u?.isGM;
      });
      if (userByAlias) {
        doNotStyling = true;
      }
    }

    // PATCH MODULE NARRATOR TOOLS
    // Do not styling narrator message because it's make no sense the module has is own css customizing
    if (speakerInfo.alias == i18n('NT.Narrator')) {
      //  && game.modules.get('narrator-tools')?.active
      return html;
    }
    // PATCH MODULE koboldworks-turn-announcer
    const isTurnAnnouncer = html.find('.message-content .turn-announcer .portrait')[0];
    if (isTurnAnnouncer) {
      //  && game.modules.get('koboldworks-turn-announcer')?.active
      const size: number = ChatPortrait.settings.portraitSize;
      if (size && size > 0) {
        isTurnAnnouncer.style.width = size + 'px';
        isTurnAnnouncer.style.height = size + 'px';
        isTurnAnnouncer.style.flex = '0 0 ' + size + 'px';
      }
      doNotStyling = true;
    }
    // PATCH MODULE TOKEN BAR  - IS MONK TOKEN BAR XP
    const isMonkTokenBarXP = html.find('.message-content')[0]?.firstElementChild?.classList;
    if (isMonkTokenBarXP && isMonkTokenBarXP.length > 0) {
      if (isMonkTokenBarXP.contains('monks-tokenbar') && 'assignxp') {
        doNotStyling = true;
      }
    }
    // PATCH MODULE CHAT IMAGE
    const isChatImage = html.find('.message-content .chat-images-container img')[0];
    if (isChatImage) {
      isChatImage.style.width = '100%';
      isChatImage.style.height = '100%';
      doNotStyling = true;
    }
    // PATCH INNOCENTI LOOT
    const isInnocentiLoot = html.find('.message-content .innocenti-loot')[0];
    if (isInnocentiLoot) {
      doNotStyling = true;
    }

    // MULTISYSTEM MANAGEMENT
    let messageSenderElement: HTMLElement;
    let messageHeaderElement: HTMLElement;
    let elementItemImageList;
    let elementItemNameList;
    let elementItemContentList;
    let elementItemTextList;

    messageSenderElement = <HTMLElement>html.find('.message-sender')[0];
    if (!messageSenderElement) {
      messageSenderElement = <HTMLElement>html.find('.chat-card')[0];
    }
    messageHeaderElement = <HTMLElement>html.find('.message-header')[0];
    if (!messageHeaderElement) {
      messageHeaderElement = <HTMLElement>html.find('.card-header')[0];
    }
    elementItemImageList = html.find('.message-content img');
    if (!elementItemImageList) {
      elementItemImageList = html.find('.card-content img');
    }
    elementItemNameList = html.find('.message-content h3');
    if (!elementItemNameList) {
      elementItemNameList = html.find('.card-content h3');
    }
    elementItemContentList = html.find('.message-content');
    if (!elementItemContentList) {
      elementItemContentList = html.find('.card-content');
    }
    elementItemTextList = html.find('.message-header .flavor-text');
    if (!elementItemTextList) {
      elementItemTextList = html.find('.card-header p');
    }

    if (doNotStyling) {
      let authorColor = 'black';
      if (speakerInfo.author) {
        authorColor = <string>speakerInfo.author.data.color;
      } else {
        //@ts-ignore
        authorColor = <string>speakerInfo?.document?.user.color;
      }
      const messageData = speakerInfo.message ? speakerInfo.message : speakerInfo.document.data;
      ChatPortrait.setCustomStylingText(html, messageData, authorColor);
      ChatPortrait.setChatMessageBackground(html, messageData, authorColor);
      ChatPortrait.setChatMessageBorder(html, messageData, authorColor);
      if (ChatPortrait.settings.displayPlayerName) {
        ChatPortrait.appendPlayerName(messageSenderElement, speakerInfo.author);
      }
      if (ChatPortrait.settings.displayMessageTag) {
        ChatPortrait.injectMessageTag(html, speakerInfo);
        ChatPortrait.injectWhisperParticipants(html, speakerInfo);
      }
      ChatLink.prepareEvent(chatMessage, html, speakerInfo);
      return <JQuery<HTMLElement>>html;
    } else {
      //@ts-ignore
      const myPromise: Promise<JQuery<HTMLElement>> = ChatPortrait.onRenderChatMessageInternal(
        chatMessage,
        html,
        speakerInfo,
        messageSenderElement,
        messageHeaderElement,
        elementItemImageList,
        elementItemNameList,
        elementItemContentList,
        elementItemTextList,
        imageReplacer,
      );
      if (myPromise) {
        myPromise.then((html: JQuery<HTMLElement>) => {
          return <JQuery<HTMLElement>>html;
        });
      } else {
        return <JQuery<HTMLElement>>html;
      }
    }
  }

  /**
   * @param  {ChatMessage} chatMessage
   * @param  {JQuery} html
   * @param  {MessageRenderData} messageData
   */
  static onRenderChatMessageInternal(
    chatMessage: ChatMessage,
    html: JQuery<HTMLElement>,
    speakerInfo,
    messageSender: HTMLElement,
    messageHeader: HTMLElement,
    elementItemImageList,
    elementItemNameList,
    elementItemContentList,
    elementItemTextList,
    imageReplacer: ImageReplaceVoiceData[],
  ): Promise<JQuery<HTMLElement>> | null {
    const messageDataBase: MessageRenderData = speakerInfo;
    let imgPath: string;
    let authorColor = 'black';
    if (messageDataBase.author) {
      authorColor = <string>messageDataBase.author.data.color;
    } else {
      //@ts-ignore
      authorColor = <string>messageDataBase?.document?.user.color;
    }
    let speaker: any;
    if (speakerInfo.message?.user) {
      speaker = speakerInfo;
    }
    if (!speaker && speakerInfo.message) {
      speaker = speakerInfo.message.speaker;
    }
    if (!speaker) {
      speaker = speakerInfo;
    }
    if (speaker && !speaker.alias && speaker.document?.alias) {
      speaker.alias = speaker.document?.alias;
    }

    const message = speaker ? (speaker.message ? speaker.message : speaker.document) : null;
    if (!message) {
      warn(
        'No message thi is usually a error from other modules like midi-qol, dnd5e helper, ecc you can try to use the "preCreateChatMessage" hook by enable the module setting',
      );
      return null;
    }

    const useTokenName: boolean = ChatPortrait.settings.useTokenName;
    if (useTokenName) {
      ChatPortrait.replaceSenderWithTokenName(messageSender, speaker);
    }

    if (ChatPortrait.shouldOverrideMessageUnknown(messageDataBase)) {
      imgPath = CONSTANTS.DEF_TOKEN_IMG_PATH;
    } else {
      imgPath = ChatPortrait.loadImagePathForChatMessage(html, speaker);
    }

    const chatPortraitCustomData: ChatPortraitCustomData = {
      customIconPortraitImage: imgPath,
      customImageReplacer: {},
      customImageReplacerData: imageReplacerIconizer,
    };

    Hooks.call('ChatPortraitReplaceData', chatPortraitCustomData, chatMessage);

    if (chatPortraitCustomData.customIconPortraitImage) {
      imgPath = chatPortraitCustomData.customIconPortraitImage;
    }
    // ty to Mejari for the contribute
    let imageReplacerToUse: ImageReplaceVoiceData[] = [];
    if (
      !!chatPortraitCustomData.customImageReplacerData &&
      typeof chatPortraitCustomData.customImageReplacerData == 'object'
    ) {
      imageReplacerToUse = chatPortraitCustomData.customImageReplacerData;
    } else if (
      chatPortraitCustomData.customImageReplacer &&
      !!chatPortraitCustomData.customImageReplacer &&
      typeof chatPortraitCustomData.customImageReplacer == 'object'
    ) {
      const imageReplacerToUseOLD: Record<string, string> = chatPortraitCustomData.customImageReplacer;
      for (const key in imageReplacerToUseOLD) {
        imageReplacerToUse.push({
          name: key,
          icon: <string>imageReplacerToUseOLD[key],
        });
      }
    }
    return ChatPortrait.generatePortraitImageElement(imgPath).then((imgElement) => {
      const messageData = messageDataBase.message ? messageDataBase.message : messageDataBase.document.data;
      // GOD HELP ME: Use case where we not must prepend the image or imagReplacer
      const isRollTable = messageData.flags?.core?.RollTable ? true : false;
      let messageHtmlContent: any = undefined;
      try {
        messageHtmlContent = $(messageData.content);
      } catch (e) {
        messageHtmlContent = undefined;
      }
      const isEnhancedConditionsCUB = messageHtmlContent ? messageHtmlContent.hasClass('enhanced-conditions') : false;
      const isMidiDisplaySave = messageHtmlContent
        ? $(messageData.content).find('.midi-qol-saves-display')?.length > 0
        : false;
      const isStarwarsffgDiceRoll = messageHtmlContent ? messageHtmlContent.hasClass('starwarsffg dice-roll') : false;

      const doNotPrependImage = isRollTable || isEnhancedConditionsCUB || isMidiDisplaySave || isStarwarsffgDiceRoll;
      const doNotImageReplacer = isMidiDisplaySave;
      // Very very rare use case ????
      if (!imgElement) {
        imgElement = document.createElement('img');
        imgElement.src = '';
        const size: number = ChatPortrait.settings.portraitSize;
        if (size && size > 0) {
          imgElement.width = size;
          imgElement.height = size;
        }
        // WE TRY TO GET THE AVATAR IMAGE ANYWAY
        if (ChatPortrait.settings.useAvatarImage) {
          imgElement.src = ChatPortrait.getUserAvatarImage(speaker);
        }
        if (!imgElement.src || imgElement.src.length <= 0) {
          imgElement.src = CONSTANTS.INV_UNIDENTIFIED_BOOK;
        }
        if (!imgElement.classList.contains('message-portrait')) {
          imgElement.classList.add('message-portrait');
        }
      }

      ChatPortrait.setImageBorder(imgElement, authorColor);
      // Place the image to left of the header by injecting the HTML
      //const messageHeader: HTMLElement = html.find('.message-header')[0];
      messageHeader.prepend(imgElement);

      if (ChatPortrait.settings.flavorNextToPortrait) {
        const flavorElement: JQuery = html.find('.flavor-text');
        if (flavorElement && flavorElement.length > 0) {
          const copiedElement: Node = <Node>flavorElement[0]?.cloneNode(true);
          flavorElement.remove();
          const brElement: HTMLElement = document.createElement('br');

          messageSender.appendChild(brElement);
          messageSender.appendChild(copiedElement);
        }
      }

      // Default style
      if (!messageSender.classList.contains('chat-portrait-text-size-name')) {
        messageSender.classList.add('chat-portrait-text-size-name');
        messageSender.textContent = messageSender.innerText + ' ';
      }
      // Update size text name by settings
      if (ChatPortrait.settings.textSizeName > 0) {
        const size: number = ChatPortrait.settings.textSizeName;
        messageSender.style.fontSize = size + 'px';
        if (ChatPortrait.shouldOverrideMessageUnknown(messageData)) {
          messageSender.innerText = ChatPortrait.settings.displayUnknownPlaceHolderActorName; //'Unknown Actor';
        }
      } else if (ChatPortrait.shouldOverrideMessageUnknown(messageData)) {
        messageSender.innerText = ChatPortrait.settings.displayUnknownPlaceHolderActorName; //'Unknown Actor';
      }

      // Add click listener to image and text
      ChatLink.prepareEventImage(chatMessage, html, speaker);

      // Update size item image by settings
      if (
        elementItemImageList.length > 0 &&
        ChatPortrait.settings.portraitSizeItem != 36 &&
        ChatPortrait.settings.portraitSizeItem > 0
      ) {
        for (let i = 0; i < elementItemImageList.length; i++) {
          const elementItemImage: HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
          if (!elementItemImage) {
            continue;
          }
          const size: number = ChatPortrait.settings.portraitSizeItem;
          if (size && size > 0) {
            elementItemImage.width = size;
            elementItemImage.height = size;
          }
          if (ChatPortrait.shouldOverrideMessageUnknown(messageData)) {
            elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon; //`/modules/${MODULE_NAME}/assets/inv-unidentified.png`;
          }
          if (!elementItemImage.classList.contains('message-portrait')) {
            elementItemImage.classList.add('message-portrait');
          }
        }
      } else if (ChatPortrait.shouldOverrideMessageUnknown(messageData)) {
        for (let i = 0; i < elementItemImageList.length; i++) {
          const elementItemImage: HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
          if (!elementItemImage) {
            continue;
          }
          elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon; //`/modules/${MODULE_NAME}/assets/inv-unidentified.png`;
          const size: number = ChatPortrait.settings.portraitSizeItem;
          if (size && size > 0) {
            elementItemImage.width = size;
            elementItemImage.height = size;
          }
          if (!elementItemImage.classList.contains('message-portrait')) {
            elementItemImage.classList.add('message-portrait');
          }
        }
      }

      // Update hide info about the weapon
      if (ChatPortrait.shouldOverrideMessageUnknown(messageData)) {
        for (let i = 0; i < elementItemNameList.length; i++) {
          const elementItemName: HTMLElement = <HTMLElement>elementItemNameList[i];
          elementItemName.innerText = ChatPortrait.settings.displayUnknownPlaceHolderItemName; //'Unknown Weapon';
        }

        for (let i = 0; i < elementItemContentList.length; i++) {
          const elementItemContent: HTMLElement = <HTMLElement>elementItemContentList[i];
          elementItemContent.innerText = ChatPortrait.settings.displayUnknownPlaceHolderItemName; //'Unknown Weapon';
        }
      }
      // Check for Ability/Skills/Tools/Saving Throw for avoid the double portrait
      if (elementItemNameList.length > 0) {
        for (let i = 0; i < elementItemNameList.length; i++) {
          const elementItemName: HTMLElement = <HTMLElement>elementItemNameList[i];
          if (elementItemName) {
            if (!elementItemName.classList.contains('chat-portrait-text-size-name')) {
              elementItemName.classList.add('chat-portrait-text-size-name');
              elementItemName.textContent = elementItemName.innerText + ' ';
            }
            let value = '';
            let images: ImageReplacerData = { iconMainReplacer: '', iconsDamageType: [] };
            if (ChatPortrait.useImageReplacer(html)) {
              images = ChatPortrait.getImagesReplacerAsset(
                imageReplacerToUse,
                elementItemName.innerText,
                elementItemContentList[i],
              );
              if (images && images.iconMainReplacer) {
                value = images.iconMainReplacer;
              }
            }
            if (value) {
              if (elementItemImageList.length > 0) {
                const elementItemImage: HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
                if (!elementItemImage) {
                  continue;
                }
                const size: number = ChatPortrait.settings.portraitSizeItem;
                if (size && size > 0) {
                  elementItemImage.width = size;
                  elementItemImage.height = size;
                }
                // Just ignore if a image is provided
                //if(!elementItemImage.src || elementItemImage.src?.includes(CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME)){
                if (value.length > 0 && !doNotImageReplacer) {
                  elementItemImage.src = value;
                }
                //}
                if (elementItemImage.classList.contains('message-portrait')) {
                  elementItemImage.classList.remove('message-portrait');
                }
                if (!doNotImageReplacer && !doNotPrependImage && !elementItemImage.src.endsWith('/game')) {
                  elementItemImage.classList.add('chat-portrait-image-size-name');
                  elementItemName.prepend(elementItemImage);
                }
                // DAMAGE TYPES
                if (images && images.iconsDamageType.length > 0 && ChatPortrait.settings.useImageReplacerDamageType) {
                  const elementItemContainerDamageTypes: HTMLImageElement = <HTMLImageElement>(
                    document.createElement('div')
                  );
                  for (const [index, itemImage] of images.iconsDamageType.entries()) {
                    const elementItemImage2: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                    const size: number = ChatPortrait.settings.portraitSizeItem;
                    if (size && size > 0) {
                      elementItemImage2.width = size;
                      elementItemImage2.height = size;
                    }
                    // Just ignore if a image is provided
                    if (itemImage.length > 0) {
                      elementItemImage2.src = itemImage; //images[1];
                    }
                    if (!elementItemImage2.classList.contains('message-portrait')) {
                      elementItemImage2.classList.add('message-portrait');
                    }
                    elementItemContainerDamageTypes.appendChild(elementItemImage2);
                  }
                  // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                  // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                  // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                  elementItemName.parentNode?.insertBefore(
                    elementItemContainerDamageTypes,
                    elementItemName.nextSibling,
                  );
                }
              } else {
                if (ChatPortrait.useImageReplacer(html)) {
                  const elementItemImage: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                  const size: number = ChatPortrait.settings.portraitSizeItem;
                  if (size && size > 0) {
                    elementItemImage.width = size;
                    elementItemImage.height = size;
                  }
                  // Just ignore if a image is provided
                  //if(!elementItemImage.src || elementItemImage.src?.includes(CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME)){
                  if (value.length > 0 && !doNotImageReplacer) {
                    elementItemImage.src = value;
                  }
                  //}
                  if (elementItemImage.classList.contains('message-portrait')) {
                    elementItemImage.classList.remove('message-portrait');
                  }
                  if (!doNotImageReplacer && !doNotPrependImage && !elementItemImage.src.endsWith('/game')) {
                    elementItemImage.classList.add('chat-portrait-image-size-name');
                    elementItemName.prepend(elementItemImage);
                  }
                  // DAMAGE TYPES
                  if (images && images.iconsDamageType.length > 0 && ChatPortrait.settings.useImageReplacerDamageType) {
                    const elementItemContainerDamageTypes: HTMLImageElement = <HTMLImageElement>(
                      document.createElement('div')
                    );
                    for (const [index, itemImage] of images.iconsDamageType.entries()) {
                      const elementItemImage2: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                      const size: number = ChatPortrait.settings.portraitSizeItem;
                      if (size && size > 0) {
                        elementItemImage2.width = size;
                        elementItemImage2.height = size;
                      }
                      // Just ignore if a image is provided
                      if (itemImage.length > 0) {
                        elementItemImage2.src = itemImage; //images[1];
                      }
                      if (!elementItemImage2.classList.contains('message-portrait')) {
                        elementItemImage2.classList.add('message-portrait');
                      }
                      elementItemContainerDamageTypes.appendChild(elementItemImage2);
                    }
                    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                    // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                    // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                    elementItemName.parentNode?.insertBefore(
                      elementItemContainerDamageTypes,
                      elementItemName.nextSibling,
                    );
                  }
                }
              }
            } else {
              if (elementItemImageList.length > 0) {
                const elementItemImage: HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
                if (!elementItemImage) {
                  continue;
                }
                const size: number = ChatPortrait.settings.portraitSizeItem;
                if (size && size > 0) {
                  elementItemImage.width = size;
                  elementItemImage.height = size;
                }
                if (!elementItemImage.src || elementItemImage.src?.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
                  // TODO DA RIVEDERE
                  elementItemImage.src = ''; // ChatPortrait.settings.displayUnknownPlaceHolderItemIcon;
                  if (messageHtmlContent) {
                    // PATCH MODULE MERCHANT SHEET
                    const itemName =
                      messageHtmlContent.find('.item-name').length > 0
                        ? messageHtmlContent.find('.item-name')[0].textContent
                        : '';
                    if (itemName) {
                      const actorIdMerchant = <string>messageHtmlContent.attr('data-actor-id');
                      let item: Item;
                      if (actorIdMerchant) {
                        item = <Item>game.actors?.get(actorIdMerchant)?.items?.find((i: Item) => {
                          return i.name == itemName;
                        });
                      } else {
                        item = <Item>game.items?.find((i: Item) => {
                          return i.name == itemName;
                        });
                      }
                      elementItemImage.src = <string>item.img;
                      if (!elementItemImage.src || elementItemImage.src?.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
                        elementItemImage.src = '';
                      }
                    }
                  }
                }
                if (elementItemImage.classList.contains('message-portrait')) {
                  elementItemImage.classList.remove('message-portrait');
                }
                if (!doNotImageReplacer && !doNotPrependImage && !elementItemImage.src.endsWith('/game')) {
                  elementItemImage.classList.add('chat-portrait-image-size-name');
                  elementItemName.prepend(elementItemImage);
                }
                // DAMAGE TYPES
                if (images && images.iconsDamageType.length > 0 && ChatPortrait.settings.useImageReplacerDamageType) {
                  const elementItemContainerDamageTypes: HTMLImageElement = <HTMLImageElement>(
                    document.createElement('div')
                  );
                  for (const [index, itemImage] of images.iconsDamageType.entries()) {
                    const elementItemImage2: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                    const size: number = ChatPortrait.settings.portraitSizeItem;
                    if (size && size > 0) {
                      elementItemImage2.width = size;
                      elementItemImage2.height = size;
                    }
                    // Just ignore if a image is provided
                    if (itemImage.length > 0) {
                      elementItemImage2.src = itemImage; //images[1];
                    }
                    if (!elementItemImage2.classList.contains('message-portrait')) {
                      elementItemImage2.classList.add('message-portrait');
                    }
                    elementItemContainerDamageTypes.appendChild(elementItemImage2);
                  }
                  // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                  // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                  // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                  elementItemName.parentNode?.insertBefore(
                    elementItemContainerDamageTypes,
                    elementItemName.nextSibling,
                  );
                }
              } else {
                if (ChatPortrait.useImageReplacer(html)) {
                  const elementItemImage: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                  const size: number = ChatPortrait.settings.portraitSizeItem;
                  if (size && size > 0) {
                    elementItemImage.width = size;
                    elementItemImage.height = size;
                  }
                  if (
                    !doNotImageReplacer &&
                    (!elementItemImage.src || elementItemImage.src?.includes(CONSTANTS.DEF_TOKEN_IMG_NAME))
                  ) {
                    // TODO DA RIVEDERE
                    elementItemImage.src = ''; // ChatPortrait.settings.displayUnknownPlaceHolderItemIcon;
                    if (messageHtmlContent) {
                      // PATCH MODULE MERCHANT SHEET
                      const itemName =
                        messageHtmlContent.find('.item-name').length > 0
                          ? messageHtmlContent.find('.item-name')[0].textContent
                          : '';
                      if (itemName) {
                        const actorIdMerchant = <string>messageHtmlContent.attr('data-actor-id');
                        let item: Item;
                        if (actorIdMerchant) {
                          item = <Item>game.actors?.get(actorIdMerchant)?.items?.find((i: Item) => {
                            return i.name == itemName;
                          });
                        } else {
                          item = <Item>game.items?.find((i: Item) => {
                            return i.name == itemName;
                          });
                        }
                        elementItemImage.src = <string>item.img;
                        if (!elementItemImage.src || elementItemImage.src?.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
                          elementItemImage.src = '';
                        }
                      }
                    }
                  }
                  if (elementItemImage.classList.contains('message-portrait')) {
                    elementItemImage.classList.remove('message-portrait');
                  }
                  if (!doNotImageReplacer && !doNotPrependImage && !elementItemImage.src.endsWith('/game')) {
                    elementItemImage.classList.add('chat-portrait-image-size-name');
                    elementItemName.prepend(elementItemImage);
                  }
                  // DAMAGE TYPES
                  if (images && images.iconsDamageType.length > 0 && ChatPortrait.settings.useImageReplacerDamageType) {
                    const elementItemContainerDamageTypes: HTMLImageElement = <HTMLImageElement>(
                      document.createElement('div')
                    );
                    for (const [index, itemImage] of images.iconsDamageType.entries()) {
                      const elementItemImage2: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                      const size: number = ChatPortrait.settings.portraitSizeItem;
                      if (size && size > 0) {
                        elementItemImage2.width = size;
                        elementItemImage2.height = size;
                      }
                      // Just ignore if a image is provided
                      if (itemImage.length > 0) {
                        elementItemImage2.src = itemImage; //images[1];
                      }
                      if (!elementItemImage2.classList.contains('message-portrait')) {
                        elementItemImage2.classList.add('message-portrait');
                      }
                      elementItemContainerDamageTypes.appendChild(elementItemImage2);
                    }
                    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                    // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                    // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                    elementItemName.parentNode?.insertBefore(
                      elementItemContainerDamageTypes,
                      elementItemName.nextSibling,
                    );
                  }
                }
              }
            }
          }
        }
      } else {
        for (let i = 0; i < elementItemTextList.length; i++) {
          const elementItemText: HTMLElement = <HTMLElement>elementItemTextList[i];
          if (!elementItemText.classList.contains('chat-portrait-text-size-name')) {
            elementItemText.classList.add('chat-portrait-text-size-name');
            elementItemText.textContent = elementItemText.innerText + ' ';
          }
          let value = '';
          let images: ImageReplacerData = { iconMainReplacer: '', iconsDamageType: [] };
          if (ChatPortrait.useImageReplacer(html)) {
            images = ChatPortrait.getImagesReplacerAsset(
              imageReplacerToUse,
              elementItemText.innerText,
              elementItemContentList[i],
            );
            if (images && images.iconMainReplacer) {
              value = images.iconMainReplacer;
            }
          }
          if (value) {
            if (elementItemImageList.length > 0) {
              const elementItemImage: HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
              if (!elementItemImage) {
                continue;
              }
              const size: number = ChatPortrait.settings.portraitSizeItem;
              if (size && size > 0) {
                elementItemImage.width = size;
                elementItemImage.height = size;
              }
              // Just ignore if a image is provided
              //if(!elementItemImage.src || elementItemImage.src?.includes(CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME)){
              if (value.length > 0 && !doNotImageReplacer) {
                elementItemImage.src = value;
              }
              //}
              if (elementItemImage.classList.contains('message-portrait')) {
                elementItemImage.classList.remove('message-portrait');
              }
              if (!doNotImageReplacer && !doNotPrependImage && !elementItemImage.src.endsWith('/game')) {
                elementItemImage.classList.add('chat-portrait-image-size-name');
                elementItemText.prepend(elementItemImage);
              }
              // DAMAGE TYPES
              if (images && images.iconsDamageType.length > 0 && ChatPortrait.settings.useImageReplacerDamageType) {
                const elementItemContainerDamageTypes: HTMLImageElement = <HTMLImageElement>(
                  document.createElement('div')
                );
                for (const [index, itemImage] of images.iconsDamageType.entries()) {
                  const elementItemImage2: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                  const size: number = ChatPortrait.settings.portraitSizeItem;
                  if (size && size > 0) {
                    elementItemImage2.width = size;
                    elementItemImage2.height = size;
                  }
                  // Just ignore if a image is provided
                  if (itemImage.length > 0) {
                    elementItemImage2.src = itemImage; //images[1];
                  }
                  if (!elementItemImage2.classList.contains('message-portrait')) {
                    elementItemImage2.classList.add('message-portrait');
                  }
                  elementItemContainerDamageTypes.appendChild(elementItemImage2);
                }
                // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                elementItemText.parentNode?.insertBefore(elementItemContainerDamageTypes, elementItemText.nextSibling);
              }
            } else {
              if (ChatPortrait.useImageReplacer(html)) {
                const elementItemImage: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                const size: number = ChatPortrait.settings.portraitSizeItem;
                if (size && size > 0) {
                  elementItemImage.width = size;
                  elementItemImage.height = size;
                }
                // Just ignore if a image is provided
                //if(!elementItemImage.src || elementItemImage.src?.includes(CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME)){
                if (value.length > 0 && !doNotImageReplacer) {
                  elementItemImage.src = value;
                }
                //}
                if (elementItemImage.classList.contains('message-portrait')) {
                  elementItemImage.classList.remove('message-portrait');
                }
                if (!doNotImageReplacer && !doNotPrependImage && !elementItemImage.src.endsWith('/game')) {
                  elementItemImage.classList.add('chat-portrait-image-size-name');
                  elementItemText.prepend(elementItemImage);
                }
                // DAMAGE TYPES
                if (images && images.iconsDamageType.length > 0 && ChatPortrait.settings.useImageReplacerDamageType) {
                  const elementItemContainerDamageTypes: HTMLImageElement = <HTMLImageElement>(
                    document.createElement('div')
                  );
                  for (const [index, itemImage] of images.iconsDamageType.entries()) {
                    const elementItemImage2: HTMLImageElement = <HTMLImageElement>document.createElement('img');
                    const size: number = ChatPortrait.settings.portraitSizeItem;
                    if (size && size > 0) {
                      elementItemImage2.width = size;
                      elementItemImage2.height = size;
                    }
                    // Just ignore if a image is provided
                    if (itemImage.length > 0) {
                      elementItemImage2.src = itemImage; //images[1];
                    }
                    if (!elementItemImage2.classList.contains('message-portrait')) {
                      elementItemImage2.classList.add('message-portrait');
                    }
                    elementItemContainerDamageTypes.appendChild(elementItemImage2);
                  }
                  // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                  // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                  // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                  elementItemText.parentNode?.insertBefore(
                    elementItemContainerDamageTypes,
                    elementItemText.nextSibling,
                  );
                }
              }
            }
          } else {
            if (elementItemImageList.length > 0) {
              const elementItemImage: HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
              if (!elementItemImage) {
                continue;
              }
              const size: number = ChatPortrait.settings.portraitSizeItem;
              if (size && size > 0) {
                elementItemImage.width = size;
                elementItemImage.height = size;
              }
              if (!elementItemImage.src || elementItemImage.src?.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
                elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon;
              }
              if (elementItemImage.classList.contains('message-portrait')) {
                elementItemImage.classList.remove('message-portrait');
              }
              if (!doNotImageReplacer && !doNotPrependImage && !elementItemImage.src.endsWith('/game')) {
                elementItemImage.classList.add('chat-portrait-image-size-name');
                elementItemText.prepend(elementItemImage);
              }
            } else {
              if (ChatPortrait.useImageReplacer(html)) {
                // REMOVED SEEM OVERKILL
                /*
                            const elementItemImage:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                            if(!elementItemImage){
                              continue;
                            }
                            const size: number = ChatPortrait.settings.portraitSizeItem;
                            if(size && size > 0){
                              elementItemImage.width = size;
                              elementItemImage.height = size;
                            }
                            if( !doNotImageReplacer && (!elementItemImage.src || elementItemImage.src?.includes(CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME))){
                              elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon;
                            }
                            if(!elementItemImage.classList.contains("message-portrait")){
                              elementItemImage.classList.add("message-portrait");
                            }
                            if(!isRollTable) elementItemText.prepend(elementItemImage);
                            */
              }
            }
          }
          if (ChatPortrait.shouldOverrideMessageUnknown(messageData)) {
            elementItemText.innerText = ChatPortrait.settings.displayUnknownPlaceHolderItemName;
          }
        }
      }

      ChatPortrait.setCustomStylingText(html, messageData, authorColor);
      ChatPortrait.setChatMessageBackground(html, messageData, authorColor);
      ChatPortrait.setChatMessageBorder(html, messageData, authorColor);
      // Final settings
      if (ChatPortrait.settings.displayPlayerName) {
        ChatPortrait.appendPlayerName(messageSender, speaker.author);
      }
      if (ChatPortrait.settings.displayMessageTag) {
        ChatPortrait.injectMessageTag(html, messageData);
        ChatPortrait.injectWhisperParticipants(html, messageData);
      }
      ChatLink.prepareEvent(chatMessage, html, speakerInfo);
      return html;
    });
  }

  /**
   * Load the appropriate actor image path for a given message, leveraging token or actor or actor search.
   * @param  {{scene?:string;actor?:string;token?:string;alias?:string;}} speaker
   * @returns string
   */
  static loadImagePathForChatMessage(html: JQuery<HTMLElement>, speakerInfo): string {
    const message = speakerInfo.message ? speakerInfo.message : speakerInfo.document;
    const speaker = message.speaker ? message.speaker : speakerInfo;
    const isOOC = ChatPortrait.getMessageTypeVisible(speakerInfo) === CONST.CHAT_MESSAGE_TYPES.OOC;

    const imgFinal = CONSTANTS.DEF_TOKEN_IMG_PATH;

    if (
      !ChatPortrait.settings.disablePortraitForAliasGmMessage &&
      ChatPortrait.settings.setUpPortraitForAliasGmMessage?.length > 0
    ) {
      const userByAlias = <User>game.users?.find((u: User) => {
        return speakerInfo.alias === u.name && u?.isGM;
      });
      if (userByAlias) {
        return ChatPortrait.settings.setUpPortraitForAliasGmMessage;
      }
    }

    if (message.user && isOOC) {
      const imgAvatar: string = ChatPortrait.getUserAvatarImage(message);
      if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
        return imgAvatar;
      } else {
        warn('No specific avatar player image found it for player "' + ChatPortrait.getUserName(message) + '"');
        return imgAvatar ? imgAvatar : imgFinal;
      }
    }

    if (speaker) {
      // CASE 1
      if ((!speaker.token && !speaker.actor) || ChatPortrait.settings.useAvatarImage) {
        if (message.user && ChatPortrait.settings.useAvatarImage && !ChatPortrait.isSpeakerGM(message)) {
          const imgAvatar: string = ChatPortrait.getUserAvatarImage(message);
          if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
            return imgAvatar;
          } else {
            warn('No specific avatar player image found it for player "' + ChatPortrait.getUserName(message) + '"');
            return imgAvatar ? imgAvatar : imgFinal;
          }
        } else if (!speaker.token && !speaker.actor) {
          if (message.user && ChatPortrait.settings.useAvatarImage) {
            const imgAvatar: string = ChatPortrait.getUserAvatarImage(message);
            if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
              return imgAvatar;
            } else {
              // This is just a partial solution....
              // const currentToken:Token = ChatPortrait.getFirstPlayerToken();
              // if(currentToken){
              //   speaker.token = currentToken;
              //   return currentToken.data.img;
              // }else{
              //warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
              //return imgAvatar ? imgAvatar : imgFinal;
              // }
            }
          } else {
            //warn("No message user is found");
            return imgFinal;
          }
        }
      }
      // It's a chat message associated with an actor
      let useTokenImage: boolean = ChatPortrait.settings.useTokenImage;
      const actor = ChatPortrait.getActor(speaker);
      const doNotUseTokenImageWithSpecificType: string[] = ChatPortrait.settings.doNotUseTokenImageWithSpecificType
        ? String(ChatPortrait.settings.doNotUseTokenImageWithSpecificType).split(',')
        : [];
      if (
        doNotUseTokenImageWithSpecificType.length > 0 &&
        doNotUseTokenImageWithSpecificType.includes(<string>actor?.type)
      ) {
        useTokenImage = false;
      }
      // Make sense only for player and for non GM
      if (actor?.type == 'character' && ChatPortrait.settings.useAvatarImage && !ChatPortrait.isSpeakerGM(message)) {
        const imgAvatar: string = ChatPortrait.getUserAvatarImage(message);
        if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
          return imgAvatar;
        } else {
          //warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
        }
      }

      let token: TokenDocument;
      //@ts-ignore
      let tokenData: TokenData;
      if (speaker.token) {
        token = <TokenDocument>ChatPortrait.getTokenFromScene(speaker.scene, speaker.token);
        if (!token) {
          token = <TokenDocument>ChatPortrait.getTokenFromId(speaker.token);
        }
        if (!token && speaker.actor) {
          token = <TokenDocument>ChatPortrait.getTokenFromActor(speaker.actor);
        }
        // THIS PIECE OF CODE IS PROBABLY NOT NECESSARY ANYMORE ??
        if (!token) {
          try {
            token = <TokenDocument>(
              canvas?.tokens?.getDocuments().find((token: TokenDocument) => token.id === speaker.token)
            );
            //token = canvas?.tokens?.getDocuments().find(speaker.token);
          } catch (e) {
            // Do nothing
          }
          if (!token) {
            tokenData = game.scenes?.get(speaker.scene)?.data?.tokens?.find((t) => <string>t.id === speaker.token); // Deprecated on 0.8.6
          } else {
            tokenData = token.data;
          }
        } else {
          tokenData = token.data;
        }

        let imgToken = '';
        if (tokenData) {
          if (useTokenImage) {
            if (tokenData?.img) {
              imgToken = tokenData.img;
            }

            if ((!imgToken || ChatPortrait.isWildcardImage(imgToken)) && tokenData?.data?.img) {
              imgToken = tokenData?.data?.img;
            }
          } else {
            if (tokenData?.actorData?.img) {
              imgToken = tokenData.actorData.img;
            }

            if ((!imgToken || ChatPortrait.isWildcardImage(imgToken)) && tokenData?.data?.actorData?.img) {
              imgToken = tokenData.data?.actorData.img;
            }
          }
          // if((!imgToken || ChatPortrait.isWildcardImage(imgToken)) || imgToken.includes(CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME)){
          //return useTokenImage ? <string>actor?.data.token.img : <string>actor?.token?.data?.img; // actor?.img; // Deprecated on 0.8.6
          //return useTokenImage ? actor?.data?.token?.img : actor.data.img; // actor?.img; // Deprecated on 0.8.6
          //}

          if (imgToken && !ChatPortrait.isWildcardImage(imgToken) && !imgToken.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
            return imgToken;
          }
        }
      }

      let imgActor = '';
      if (actor) {
        if ((!imgActor || imgActor.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) && useTokenImage) {
          imgActor = <string>actor?.data.token.img;
          if (imgActor && ChatPortrait.isWildcardImage(imgActor)) {
            imgActor = '';
          }
        }
        if ((!imgActor || imgActor.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) && useTokenImage) {
          imgActor = <string>actor?.token?.data?.img;
          if (imgActor && ChatPortrait.isWildcardImage(imgActor)) {
            imgActor = '';
          }
        }
        if (!imgActor || imgActor.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
          imgActor = <string>actor?.data.img;
        }
        if (imgActor && !imgActor.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
          return imgActor;
        }
      }

      const imgAvatar = ChatPortrait.getUserAvatarImage(message);
      // if (isMonkTokenBarXP(html)) {
      //   return imgAvatar;
      // } else {
      if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
        return imgAvatar;
      } else {
        //warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
        return imgAvatar ? imgAvatar : CONSTANTS.INV_UNIDENTIFIED_BOOK;
      }
      // }
      //return  useTokenImage ? <string>actor?.data.token.img : <string>actor?.img;
      //return useTokenImage ? actor?.data?.token?.img : actor.data.img;
    } else if (message && message.user) {
      // CASE 2
      const imgAvatar: string = ChatPortrait.getUserAvatarImage(message);
      if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
        return imgAvatar;
      } else {
        warn("No specific avatar player image found it for player '" + ChatPortrait.getUserName(message) + "'");
        return imgAvatar ? imgAvatar : imgFinal;
      }
    } else {
      // CASE 3
      return imgFinal;
    }
  }
  /**
   * Generate portrait HTML Image Element to insert into chat messages.
   * @param  {string} imgPath
   * @returns HTMLImageElement
   */
  static async generatePortraitImageElement(imgPath: string): Promise<HTMLImageElement | undefined> {
    if (!imgPath) {
      return;
    }
    const img: HTMLImageElement = document.createElement('img');
    img.src = '';
    const size: number = ChatPortrait.settings.portraitSize;
    // Support for video or webm file
    //let thumb = diff.img;
    //if (VideoHelper.hasVideoExtension(diff.img))
    //    thumb = await ImageHelper.createThumbnail(diff.img, { width: 48, height: 48 });
    //let thumb = CONSTANTS.DEF_TOKEN_IMG_PATH;
    if (imgPath.includes('.webm')) {
      try {
        const imgThumb = await ImageHelper.createThumbnail(imgPath, { width: size, height: size });
        if (imgPath.includes('.webm')) {
          img.src = imgThumb.thumb;
          // If a url we need these anyway
          if (size && size > 0) {
            img.width = size;
            img.height = size;
          }
        } else {
          img.src = <string>imgThumb.src;
          if (size && size > 0) {
            // If a url we need these anyway
            img.width = size;
            img.height = size;
          }
        }
      } catch {
        img.src = imgPath;
        if (size && size > 0) {
          img.width = size;
          img.height = size;
        }
      }
    } else {
      img.src = imgPath;
      if (size && size > 0) {
        img.width = size;
        img.height = size;
      }
    }
    if (!img.classList.contains('message-portrait')) {
      img.classList.add('message-portrait');
    }
    return img;
  }

  /**
   * Set portrait image border shape
   * @param  {HTMLImageElement} img
   * @param  {string} authorColor
   */
  static setImageBorder(img: HTMLImageElement, authorColor: string) {
    const borderShape: string = ChatPortrait.settings.borderShape;
    const borderWidth: number = ChatPortrait.settings.borderWidth;
    const borderColor: string = ChatPortrait.settings.useUserColorAsBorderColor
      ? authorColor
      : ChatPortrait.settings.borderColor;
    switch (borderShape) {
      case 'square':
        img.style.border = `${borderWidth}px solid ${borderColor}`;
        break;
      case 'circle':
        img.style.border = `${borderWidth}px solid ${borderColor}`;
        img.style.borderRadius = '50%';
        break;
      case 'none':
        img.style.border = 'none';
        break;
    }
  }

  static setCustomStylingText(html: JQuery, messageData: MessageRenderData, authorColor: string) {
    const elementItemTextList = html.find('.chat-portrait-text-size-name');
    for (let i = 0; i < elementItemTextList.length; i++) {
      const elementItemText: HTMLElement = <HTMLElement>elementItemTextList[i];
      if (elementItemText) {
        if (ChatPortrait.settings.customStylingMessageText) {
          elementItemText.style.cssText = ChatPortrait.settings.customStylingMessageText;
        } else if (game.settings.get(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem')) {
          // THIS WILL APPLY SOME DEFAULT CSS
          if (game.system.id == 'swade') {
            /* https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/91 */
            elementItemText.style.cssText = 'height: auto;display: flex;';
          } else if (game.system.id == 'pf2e') {
            elementItemText.style.cssText = 'display: block; margin: auto;';
          } else if (game.system.id == 'dnd5e') {
            elementItemText.style.cssText = 'display: flex; margin: auto;';
          }
        }
        // You need this anyway
        //elementItemText.style.display = 'flex';
      }
    }
    const elementItemImageList = html.find('.chat-portrait-image-size-name');
    for (let i = 0; i < elementItemImageList.length; i++) {
      const elementItemImage: HTMLElement = <HTMLElement>elementItemTextList[i];
      if (elementItemImage) {
        if (ChatPortrait.settings.customStylingMessageImage) {
          elementItemImage.style.cssText = ChatPortrait.settings.customStylingMessageImage;
        } else if (game.settings.get(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem')) {
          // THIS WILL APPLY SOME DEFAULT CSS
          if (game.system.id == 'swade') {
            /* https://github.com/ShoyuVanilla/FoundryVTT-Chat-Portrait/issues/91 */
            elementItemImage.style.cssText = 'height: auto;display: flex;';
          } else if (game.system.id == 'pf2e') {
            elementItemImage.style.cssText = 'display: block; margin: auto;';
          } else if (game.system.id == 'dnd5e') {
            elementItemImage.style.cssText = 'display: flex; margin: auto;';
          }
        }
      }
    }
  }

  /**
   * Set the background color of the entire message to be the color for the author.
   * Only do so if
   *  - chatBackgroundColor setting is true AND
   * @param  {JQuery} html
   * @param  {MessageRenderData} messageData
   * @param  {string} authorColor
   */
  static setChatMessageBackground(html: JQuery, messageData: MessageRenderData, authorColor: string) {
    const useUserBackgroundColor = ChatPortrait.settings.useUserColorAsChatBackgroundColor;
    if (useUserBackgroundColor) {
      //html[0].setAttribute('style','background-color:' + authorColor + ';background-blend-mode:screen;');
      (<HTMLElement>(<JQuery<HTMLElement>>html)[0]).style.background = 'url(../ui/parchment.jpg) repeat';
      (<HTMLElement>(<JQuery<HTMLElement>>html)[0]).style.backgroundColor = authorColor;
      //@ts-ignore
      html[0].style.backgroundBlendMode = 'screen';
    }
  }

  /**
   * Set the border color of the entire message to be the color for the author.
   * Only do so if
   *  - chatBorderColor setting is true AND
   *  - someone further up the chain hasn't already changed the color
   * @param  {JQuery} html
   * @param  {MessageRenderData} messageData
   * @param  {string} authorColor
   */
  static setChatMessageBorder(html: JQuery, messageData: MessageRenderData, authorColor: string) {
    const useUserBorderColor = ChatPortrait.settings.useUserColorAsChatBorderColor;

    // only override the border color if someone further up the chain hasn't already done so.
    if (useUserBorderColor && !messageData.borderColor) {
      (<HTMLElement>(<JQuery<HTMLElement>>html)[0]).style.borderColor = authorColor;
      messageData.borderColor = authorColor;
    }
  }

  static get settings(): ChatPortraitSettings {
    //return mergeObject(this.defaultSettings, <ChatPortraitSettings>game.settings.get(MODULE_NAME, 'settings'));
    //return mergeObject(this.defaultSettings,{
    return {
      //borderShapeList: Settings.getBorderShapeList(),
      useTokenImage: SettingsForm.getUseTokenImage(),
      doNotUseTokenImageWithSpecificType: SettingsForm.getDoNotUseTokenImageWithSpecificType(),
      useTokenName: SettingsForm.getUseTokenName(),
      portraitSize: SettingsForm.getPortraitSize(),
      portraitSizeItem: SettingsForm.getPortraitSizeItem(),
      borderShape: SettingsForm.getBorderShape(),
      useUserColorAsBorderColor: SettingsForm.getUseUserColorAsBorderColor(),
      borderColor: SettingsForm.getBorderColor(),
      borderWidth: SettingsForm.getBorderWidth(),
      useUserColorAsChatBackgroundColor: SettingsForm.getUseUserColorAsChatBackgroundColor(),
      useUserColorAsChatBorderColor: SettingsForm.getUseUserColorAsChatBorderColor(),
      flavorNextToPortrait: SettingsForm.getFlavorNextToPortrait(),
      forceNameSearch: SettingsForm.getForceNameSearch(),
      // hoverTooltip: SettingsForm.getHoverTooltip(),
      textSizeName: SettingsForm.getTextSizeName(),
      displaySetting: SettingsForm.getDisplaySetting(),
      useAvatarImage: SettingsForm.getUseAvatarImage(),
      displayPlayerName: SettingsForm.getDisplayPlayerName(),
      displayUnknown: SettingsForm.getDisplayUnknown(),
      displayUnknownPlaceHolderActorName: SettingsForm.getDisplayUnknownPlaceHolderActorName(),
      displayUnknownPlaceHolderItemName: SettingsForm.getDisplayUnknownPlaceHolderItemName(),
      displayUnknownPlaceHolderItemIcon: SettingsForm.getDisplayUnknownPlaceHolderItemIcon(),
      displaySettingOTHER: SettingsForm.getDisplaySettingOTHER(),
      displaySettingOOC: SettingsForm.getDisplaySettingOOC(),
      displaySettingIC: SettingsForm.getDisplaySettingIC(),
      displaySettingEMOTE: SettingsForm.getDisplaySettingEMOTE(),
      displaySettingWHISPER: SettingsForm.getDisplaySettingWHISPER(),
      displaySettingROLL: SettingsForm.getDisplaySettingROLL(),
      displaySettingWhisperToOther: SettingsForm.getDisplaySettingWhisperToOther(),
      customStylingMessageSystem: SettingsForm.getCustomStylingMessageSystem(),
      customStylingMessageText: SettingsForm.getCustomStylingMessageText(),
      customStylingMessageImage: SettingsForm.getCustomStylingMessageImage(),
      displayMessageTag: SettingsForm.getDisplayMessageTag(),
      useImageReplacer: SettingsForm.getUseImageReplacer(),
      useImageReplacerDamageType: SettingsForm.getUseImageReplacerDamageType(),
      applyOnCombatTracker: SettingsForm.getApplyOnCombatTracker(),
      applyPreCreateChatMessagePatch: SettingsForm.getApplyPreCreateChatMessagePatch(),
      disablePortraitForAliasGmMessage: SettingsForm.getDisablePortraitForAliasGmMessage(),
      setUpPortraitForAliasGmMessage: SettingsForm.getSetUpPortraitForAliasGmMessage(),
    };
  }

  /**
   * Get default settings object.
   * @returns ChatPortraitSetting
   */
  static get defaultSettings(): ChatPortraitSettings {
    return {
      useTokenImage: false,
      doNotUseTokenImageWithSpecificType: '',
      useTokenName: false,
      portraitSize: 36,
      portraitSizeItem: 36,
      borderShape: 'square',
      useUserColorAsBorderColor: true,
      borderColor: '#000000',
      borderWidth: 2,
      useUserColorAsChatBackgroundColor: false,
      useUserColorAsChatBorderColor: false,
      flavorNextToPortrait: false,
      forceNameSearch: false,
      // hoverTooltip: false,
      textSizeName: 0,
      displaySetting: 'allCards',
      useAvatarImage: false,
      displayPlayerName: false,
      displayUnknown: 'none',
      displayUnknownPlaceHolderActorName: 'Unknown Actor',
      displayUnknownPlaceHolderItemName: 'Unknown Item',
      displayUnknownPlaceHolderItemIcon: `/modules/${CONSTANTS.MODULE_NAME}/assets/inv-unidentified.png`,
      displaySettingOTHER: true,
      displaySettingOOC: true,
      displaySettingIC: true,
      displaySettingEMOTE: true,
      displaySettingWHISPER: true,
      displaySettingROLL: true,
      displaySettingWhisperToOther: false,
      customStylingMessageSystem: false,
      customStylingMessageText: '',
      customStylingMessageImage: '',
      displayMessageTag: false,
      useImageReplacer: true,
      useImageReplacerDamageType: true,
      applyOnCombatTracker: false,
      applyPreCreateChatMessagePatch: false,
      disablePortraitForAliasGmMessage: false,
      setUpPortraitForAliasGmMessage: '',
    };
  }

  // static getSpeakerImage = function (message, useTokenImage):string {
  //   const speaker = message.speaker;
  //   if (speaker) {
  //       if (speaker.token && useTokenImage) {
  //           const token = canvas?.tokens?.getDocuments().get(speaker.token);
  //           if (token) {
  //               return token.data.img;
  //           }
  //       }

  //       if (speaker.actor && !useTokenImage) {
  //           const actor = Actors.instance.get(speaker.actor);
  //           if (actor) {
  //             return actor.data.img;
  //           }
  //       }
  //   }

  //   return "icons/svg/mystery-man.svg";
  // }

  // static showSpeakerImage = function (message, useTokenImage):boolean {
  //   const speaker = message.speaker;
  //   if (!speaker) {
  //       return false;
  //   } else {
  //     let bHasImage = false;
  //     if (speaker.token && useTokenImage) {
  //         const token = canvas?.tokens?.getDocuments().get(speaker.token);
  //         if (token) {
  //             bHasImage = bHasImage || token.data.img != null;
  //         }
  //     }

  //     if (speaker.actor) {
  //         const actor = Actors.instance.get(speaker.actor);
  //         if (actor) {
  //             bHasImage = bHasImage || actor.data.img != null;
  //         }
  //     }

  //     if (!bHasImage) {
  //         return false;
  //     }else{
  //       return true;
  //     }
  //   }
  // }

  static getActor(speaker): Actor | undefined {
    let actor = <Actor>game.actors?.get(speaker.actor);
    if (!actor) {
      actor = <Actor>game.actors?.tokens[speaker.token];
    }
    if (!actor) {
      //actor = game.actors.get(speaker.actor); // Deprecated on 0.8.6
      actor = <Actor>Actors.instance.get(speaker.actor);
    }
    const forceNameSearch = ChatPortrait.settings.forceNameSearch;
    if (!actor && forceNameSearch) {
      actor = <Actor>game.actors?.find((a: Actor) => a.data.token.name === speaker.alias);
    }
    return actor;
  }

  static getActorFromActorID(actorID: string, tokenID: string): Actor | undefined {
    let actor = <Actor>game.actors?.get(actorID);
    if (!actor) {
      actor = <Actor>game.actors?.tokens[tokenID];
    }
    if (!actor) {
      //actor = game.actors.get(actorID); // Deprecated on 0.8.6
      actor = <Actor>Actors.instance.get(actorID);
    }
    // const forceNameSearch = ChatPortrait.settings.forceNameSearch;
    // if (!actor && forceNameSearch) {
    //     actor = game.actors?.find((a: Actor) => a.data.token.name === speaker.alias);
    // }
    return actor;
  }

  static getActorName = function (speaker) {
    const actor = ChatPortrait.getActor(speaker); //game.actors.get(speaker.actor);
    if (actor) {
      return actor.name;
    }
    return speaker.alias;
  };

  static getTokenName = function (speaker) {
    if (speaker.token) {
      const scene = speaker.scene ? speaker.scene : game.scenes?.current?.id;
      let token = <TokenDocument>ChatPortrait.getTokenFromScene(speaker.scene, speaker.token);
      if (!token) {
        token = <TokenDocument>ChatPortrait.getTokenFromId(speaker.token);
      }
      if (!token && speaker.actor) {
        token = <TokenDocument>ChatPortrait.getTokenFromActor(speaker.actor);
      }
      if (token) {
        return token.name;
      }
    }
    const actor = game.actors?.get(speaker.actor);
    if (actor) {
      if (actor.data.token) {
        return actor.data.token.name;
      }
      if (actor.hasPlayerOwner) {
        return actor.name;
      }
    }
    if (game.user?.isGM) {
      return speaker.alias;
    }
    return ChatPortrait.settings.displayUnknownPlaceHolderActorName; //'???';
  };

  static getTokenFromSpeaker = function (speaker): TokenDocument | null {
    let token = <TokenDocument>ChatPortrait.getTokenFromId(speaker.token);
    if (!token) {
      token = <TokenDocument>ChatPortrait.getTokenFromActor(speaker.actor);
    }
    return token;
  };

  static getTokenFromActor = function (actorID): TokenDocument | null {
    let token: TokenDocument | null = null;
    const scene = game.scenes?.get(<string>game.user?.viewedScene);
    if (scene) {
      const thisSceneToken = scene.data.tokens.find((tokenTmp) => {
        return <boolean>(tokenTmp.actor && tokenTmp.actor.id === actorID);
      });
      if (thisSceneToken) {
        token = <TokenDocument>ChatPortrait.getTokenFromId(thisSceneToken.id);
      }
    }
    return token;
  };

  static getTokenFromId = function (tokenId): TokenDocument | null {
    try {
      return <TokenDocument>canvas.tokens?.get(tokenId)?.document;
    } catch (e) {
      return null;
    }
  };

  static getTokenFromScene = function (sceneID, tokenID): TokenDocument | null {
    const specifiedScene = game.scenes?.get(sceneID);
    if (specifiedScene) {
      //return ChatPortrait.getTokenForScene(specifiedScene, tokenID);
      if (!specifiedScene) {
        return null;
      }
      const tokenDoc = <TokenDocument>specifiedScene.data.tokens.find((tokenTmp) => {
        return <boolean>(tokenTmp.id === tokenID);
      });
      return tokenDoc;
    }
    let foundToken: TokenDocument | null = null;
    game.scenes?.find((sceneTmp) => {
      //foundToken = ChatPortrait.getTokenForScene(scene, tokenID);
      if (!sceneTmp) {
        foundToken = null;
      }
      foundToken = <TokenDocument>sceneTmp.data.tokens.find((token) => {
        return token.id === tokenID;
      });
      return !!foundToken;
    });
    return foundToken;
  };

  // static getTokenForScene = function(scene, tokenID) {
  //   if (!scene) {
  //     return null;
  //   }
  //   return scene.data.tokens.find((token) => {
  //     return token.id === tokenID;
  //   });
  // }

  /**
   * Returns a list of selected (or owned, if no token is selected)
   * note: ex getSelectedOrOwnedToken
   */
  static getFirstSelectedToken = function (): Token | null {
    try {
      canvas;
    } catch (e) {
      // Canvas not ready
      return null;
    }
    // Get controlled token
    let token: Token | null = null;
    const controlled: Token[] = <Token[]>canvas.tokens?.controlled;
    // Do nothing if multiple tokens are selected
    if (controlled.length && controlled.length > 1) {
      token = <Token>controlled[0];
    }
    // If exactly one token is selected, take that
    return token;
  };

  /**
   * Returns a list of selected (or owned, if no token is selected)
   * note: ex getSelectedOrOwnedToken
   */
  static getFirstPlayerToken = function (): Token | null {
    try {
      canvas;
    } catch (e) {
      // Canvas not ready
      return null;
    }
    // Get controlled token
    let token: Token | null = ChatPortrait.getFirstSelectedToken();
    if (!token) {
      //if(!controlled.length || controlled.length == 0 ){
      // If no token is selected use the token of the users character
      //@ts-ignore
      token = canvas.tokens.placeables.find((token: Token) => token.data._id === game.user?.character?.data?._id);
      //}
      // If no token is selected use the first owned token of the users character you found and is not GM
      if (!token && !game.user?.isGM) {
        token = <Token>canvas.tokens?.ownedTokens[0];
      }
    }
    return token;
  };

  static isSpeakerGM = function (message) {
    if (message.user) {
      let user = game.users?.get(message.user);
      if (!user) {
        user = game.users?.get(message?.user?.id);
      }
      if (user) {
        return user.isGM;
      } else {
        return false;
      }
    }
    return false;
  };

  static isGMFromUserID = function (userID) {
    if (userID) {
      const user = game.users?.get(userID);
      if (user) {
        return user.isGM;
      } else {
        return false;
      }
    }
    return false;
  };

  static shouldOverrideMessageUnknown = function (message) {
    const speaker = message?.message?.speaker;
    let actor;
    let mytype;
    if (!speaker) {
      //@ts-ignore
      actor = game.users.get(message.user)?.character?.data;
      mytype = actor?.type;
    } else if (!speaker.token && !speaker.actor) {
      //@ts-ignore
      actor = game.users.get(message.user)?.character?.data;
      mytype = actor?.type;
    } else {
      actor = ChatPortrait.getActor(speaker);
      mytype = actor?.data?.type;
    }
    const setting = game.settings.get(CONSTANTS.MODULE_NAME, 'displayUnknown');
    if (setting !== 'none') {
      //const user = game.users.get(message.user);
      let user = game.users?.get(message.user);
      if (!user) {
        user = game.users?.get(message.user.id);
      }
      if (!user) {
        user = game.users?.get(message.document?.user?.id);
      }
      if (user) {
        const isSelf = user.data._id === game.user?.data._id;
        const isGM = user.isGM;

        if (
          setting === 'allCards' ||
          (setting === 'self' && isSelf) ||
          (setting === 'selfAndGM' && (isSelf || isGM)) ||
          (setting === 'gm' && isGM) ||
          (setting === 'player' && !isGM) ||
          (setting === 'onlyNpc' && mytype == 'npc' && !isGM)
        ) {
          return true;
        }
      } else {
        error('Impossibile to get message user');
      }
    }
    return false;
  };

  static shouldOverrideMessageStyling = function (message) {
    const setting = game.settings.get(CONSTANTS.MODULE_NAME, 'displaySetting');
    if (setting !== 'none') {
      //const user = game.users.get(message.user);
      let user = game.users?.get(message.user);
      if (!user) {
        user = game.users?.get(message.user?.id);
      }
      if (!user) {
        user = game.users?.get(message.document?.user?.id);
      }
      if (user) {
        const isSelf = user.data._id === game.user?.data._id;
        const isGM = user.isGM;

        if (
          setting === 'allCards' ||
          (setting === 'self' && isSelf) ||
          (setting === 'selfAndGM' && (isSelf || isGM)) ||
          (setting === 'gm' && isGM) ||
          (setting === 'player' && !isGM)
        ) {
          return true;
        }
      } else {
        error('Impossibile to get message user');
      }
    }
    return false;
  };

  static getUserColor = function (message): string | null {
    let user = game.users?.get(message.user);
    if (!user) {
      user = game.users?.get(message.user.id);
      if (user) {
        return <string>user.data.color;
      }
    }
    return '';
  };

  static getUserAvatarImage = function (message): string {
    let userId = '';
    if (message.document) {
      userId = message.document.user.id;
    }
    if (!userId) {
      userId = message.user;
    }
    if (!userId) {
      userId = message.user.id;
    }
    const user = game.users?.get(userId);
    if (user) {
      if (user.data && user.data.avatar) {
        // image path
        return user.data.avatar;
      }
    }
    return CONSTANTS.DEF_TOKEN_IMG_PATH;
  };

  static getUserAvatarImageFromUserID = function (userId: string): string {
    const user = game.users?.get(userId);
    if (user) {
      if (user.data && user.data.avatar) {
        // image path
        return user.data.avatar;
      }
    }
    return CONSTANTS.DEF_TOKEN_IMG_PATH;
  };

  static getUserName = function (message): string {
    let user = game.users?.get(message.user);
    if (!user) {
      user = game.users?.get(message.user.id);
    }
    if (user) {
      if (user.data && user.data.avatar) {
        // image path
        return user.data.name;
      }
    }
    return '';
  };

  static getUserNameFromUserID = function (userID: string): string {
    const user = game.users?.get(userID);
    if (user) {
      if (user.data && user.data.avatar) {
        // image path
        return user.data.name;
      }
    }
    return '';
  };

  static isWhisperToOther = function (speakerInfo) {
    const whisper = speakerInfo?.message?.whisper;
    //if (e.data.blind && e.data.whisper.find(element => element == game.userId) == undefined) return false;
    return whisper && whisper.length > 0 && whisper.indexOf(game.userId) === -1;
  };

  static replaceSenderWithTokenName = function (messageSenderElem, speakerInfo) {
    const speaker = speakerInfo;
    const actorName = (ChatPortrait.getActorName(speaker) || '').trim();
    const name = (ChatPortrait.getTokenName(speaker) || '').trim();
    if (actorName !== name) {
      ChatPortrait.replaceMatchingTextNodes(messageSenderElem[0], actorName, name);
    }
  };

  static replaceMatchingTextNodes = function (parent, match, replacement) {
    if (!parent || !parent.hasChildNodes()) {
      return;
    }
    for (const node of parent.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.wholeText.trim() === match) {
          node.parentNode.replaceChild(document.createTextNode(replacement), node);
        }
      } else {
        ChatPortrait.replaceMatchingTextNodes(node, match, replacement);
      }
    }
  };

  static appendPlayerName = function (messageSenderElem, author) {
    const playerName = author.name;
    const playerNameElem = document.createElement('span');
    playerNameElem.appendChild(document.createTextNode(playerName));
    if (!playerNameElem.classList.contains(CONSTANTS.MODULE_NAME + '-playerName')) {
      playerNameElem.classList.add(CONSTANTS.MODULE_NAME + '-playerName');
    }
    messageSenderElem.append(playerNameElem);
  };

  static getMessageTypeVisible = function (speakerInfo) {
    let messageType: number = speakerInfo.message?.type;
    if (speakerInfo.document) {
      messageType = speakerInfo.document?.data.type;
    }
    switch (messageType) {
      case CONST.CHAT_MESSAGE_TYPES.OTHER:
        return CONST.CHAT_MESSAGE_TYPES.OTHER;
      case CONST.CHAT_MESSAGE_TYPES.OOC:
        return CONST.CHAT_MESSAGE_TYPES.OOC;
      case CONST.CHAT_MESSAGE_TYPES.IC:
        return CONST.CHAT_MESSAGE_TYPES.IC;
      case CONST.CHAT_MESSAGE_TYPES.EMOTE:
        return CONST.CHAT_MESSAGE_TYPES.EMOTE;
      case CONST.CHAT_MESSAGE_TYPES.WHISPER:
        return CONST.CHAT_MESSAGE_TYPES.WHISPER;
      case CONST.CHAT_MESSAGE_TYPES.ROLL:
        return CONST.CHAT_MESSAGE_TYPES.ROLL;
      default:
        // "Unknown tab
        return;
    }
    //return; // if there is some future new message type, its probably better to default to be visible than to hide it.
  };

  static getImagesReplacerAsset(
    imageReplacer: ImageReplaceVoiceData[],
    innerText: string,
    elementItemContent: HTMLElement,
  ): ImageReplacerData {
    //let value:string[] = new Array();
    const value: ImageReplacerData = new ImageReplacerData();
    let innerTextTmp = innerText;
    //let betterRollLabelAttack = ($(elementItemContent).find(".br5e-roll-label")[0])?.innerText;
    //let betterRollLabelDamage = ($(elementItemContent).find(".br5e-roll-label")[1])?.innerText;
    const fullTextContent = $(elementItemContent)[0]?.innerText;
    const innerTextDamageTmp = fullTextContent; //Damage -Slashing
    if (innerTextTmp) {
      // Clean up the string for multisystem (D&D5, PF2, ecc.)
      //let text:string = "";
      innerTextTmp = innerTextTmp.toLowerCase().trim();
      const arr1 = innerTextTmp.split(/\r?\n/);
      for (let i = 0; i < arr1.length; i++) {
        let text = arr1[i];
        if (text) {
          text = text.replace(/\W/g, ' ');
          text = text.replace('skill', '');
          text = text.replace('check', '');
          text = text.replace('ability', '');
          text = text.replace(/[0-9]/g, '');
          text = text.toLowerCase().trim();
          for (const objKey in imageReplacer) {
            const obj = imageReplacer[objKey];
            if (obj) {
              const key = obj.name;
              const mykeyvalue = i18n(key);
              if (mykeyvalue) {
                //mykeyvalue = mykeyvalue.toLowerCase().trim();
                //let arr2 = mykeyvalue.split(/\r?\n/);
                //for (let j = 0; j < arr2.length; j++) {
                let keyValue = mykeyvalue; //arr2[j];
                if (keyValue) {
                  keyValue = keyValue.replace(/\W/g, ' ');
                  keyValue = keyValue.replace('skill', '');
                  keyValue = keyValue.replace('check', '');
                  keyValue = keyValue.replace('ability', '');
                  keyValue = keyValue.replace(/[0-9]/g, '');
                  keyValue = keyValue.toLowerCase().trim();
                  if (text.trim().indexOf(keyValue) !== -1) {
                    //value.push(imageReplacer[key]);
                    value.iconMainReplacer = obj.icon; //imageReplacer[key];
                    break;
                  }
                }
                //}
              }
            }
          }
        }
      }
    } // InnerTexTmp
    if (ChatPortrait.settings.useImageReplacerDamageType && innerTextDamageTmp) {
      const damageTypes: string[] = [];
      const arr4 = innerTextDamageTmp.split(/\r?\n/);
      for (let i = 0; i < arr4.length; i++) {
        let textDamage = arr4[i];
        if (textDamage) {
          textDamage = textDamage.replace(/\W/g, ' ');
          textDamage = textDamage.replace('skill', '');
          textDamage = textDamage.replace('check', '');
          textDamage = textDamage.replace('ability', '');
          textDamage = textDamage.replace(/[0-9]/g, '');
          textDamage = textDamage.toLowerCase().trim();
          for (const keydamageObjeKey in imageReplacerDamageType) {
            const keydamageObj = <ImageReplaceVoiceData>imageReplacerDamageType[keydamageObjeKey];
            const keydamage = keydamageObj.name;
            const mykeydamagevalue = i18n(keydamage);
            if (mykeydamagevalue) {
              //mykeydamagevalue = mykeydamagevalue.toLowerCase().trim();
              //let arr3 = mykeydamagevalue.split(/\r?\n/);
              //for (let x = 0; x < arr3.length; x++) {
              let damageValue = mykeydamagevalue; //arr3[x];
              if (damageValue) {
                damageValue = damageValue.replace(/\W/g, ' ');
                damageValue = damageValue.replace('skill', '');
                damageValue = damageValue.replace('check', '');
                damageValue = damageValue.replace('ability', '');
                damageValue = damageValue.replace(/[0-9]/g, '');
                damageValue = damageValue.toLowerCase().trim();
                damageValue = ' ' + damageValue;
                if (textDamage.toLowerCase().trim().indexOf(damageValue) !== -1) {
                  const srcdamageType = keydamageObj.icon; //imageReplacerDamageType[keydamage];
                  damageTypes.push(srcdamageType);
                  // Add all damage types
                }
              }
              //}
            }
          }
        }
        value.iconsDamageType = damageTypes;
      }
    }
    return value;
  }

  static useImageReplacer(html: JQuery<HTMLElement>) {
    if (ChatPortrait.settings.useImageReplacer) {
      // if (isMonkTokenBarXP(html)) {
      //   return false;
      // }
      return true;
    }
    return false;
  }

  static injectMessageTag(html, messageData: MessageRenderData) {
    const timestampTag = html.find('.message-timestamp');

    const indicatorElement = $('<span>');
    indicatorElement.addClass('chat-portrait-indicator');

    const whisperTargets = messageData.whisper;

    const isBlind = messageData.blind || false;
    const isWhisper = whisperTargets?.length > 0 || false;
    const isSelf = isWhisper && whisperTargets.length === 1 && whisperTargets[0] === messageData.user;
    const isRoll = messageData.roll !== undefined;

    // Inject tag to the left of the timestamp
    if (isBlind) {
      indicatorElement.text(game.i18n.localize('CHAT.RollBlind'));
      timestampTag.before(indicatorElement);
    } else if (isSelf && whisperTargets[0]) {
      indicatorElement.text(game.i18n.localize('CHAT.RollSelf'));
      timestampTag.before(indicatorElement);
    } else if (isRoll && isWhisper) {
      indicatorElement.text(game.i18n.localize('CHAT.RollPrivate'));
      timestampTag.before(indicatorElement);
    } else if (isWhisper) {
      indicatorElement.text(game.i18n.localize('chat-portrait.whisper'));
      timestampTag.before(indicatorElement);
    }
  }

  static injectWhisperParticipants(html, messageData) {
    const alias = messageData.alias;
    const whisperTargetString = messageData.whisperTo;
    const whisperTargetIds = messageData.whisper;
    const isWhisper = whisperTargetIds?.length > 0 || false;
    const isRoll = messageData.roll !== undefined;

    const authorId = messageData.user;
    const userId = game.user?.data._id;

    if (!isWhisper) return;
    if (userId !== authorId && !whisperTargetIds.includes(userId)) return;

    // remove the old whisper to content, if it exists
    html.find('.chat-portrait-whisper-to').detach();

    // if this is a roll
    if (isRoll) return;

    // add new content
    const messageHeader = html.find('.card-header'); // message-header

    const whisperParticipants = $('<span>');
    whisperParticipants.addClass('chat-portrait-whisper-to');

    const whisperFrom = $('<span>');
    whisperFrom.text(`${game.i18n.localize('chat-portrait.from')}: ${alias}`);

    const whisperTo = $('<span>');
    whisperTo.text(`${game.i18n.localize('CHAT.To')}: ${whisperTargetString}`);

    whisperParticipants.append(whisperFrom);
    whisperParticipants.append(whisperTo);
    messageHeader.append(whisperParticipants);
  }

  static getLogElement = function (chatLog) {
    const el = chatLog.element;
    const log = el.length ? el[0].querySelector('#chat-log') : null;
    return log;
  };

  static shouldScrollToBottom = function (log) {
    // If more than half chat log height above the actual bottom, don't do the scroll.
    const propOfClientHeightScrolled = (log.scrollHeight - log.clientHeight - log.scrollTop) / log.clientHeight;
    return propOfClientHeightScrolled <= 0.5;
  };

  static isWildcardImage(imgUrl) {
    try {
      const filename = imgUrl.split('/').pop();
      const baseFileName = filename.substr(0, filename.lastIndexOf('.'));
      return baseFileName == '*';
    } catch (e) {
      //TODO must check other systems
      return false;
    }
  }

  static loadImagePathForCombatTracker(
    tokenID: string,
    actorID: string,
    userID: string,
    sceneID: string,
    isOwnedFromPLayer: boolean,
  ): string {
    const imgFinal = CONSTANTS.DEF_TOKEN_IMG_PATH;
    //
    // CASE 1
    if ((!tokenID && !actorID) || ChatPortrait.settings.useAvatarImage) {
      if (userID && ChatPortrait.settings.useAvatarImage && !ChatPortrait.isGMFromUserID(userID)) {
        const imgAvatar: string = ChatPortrait.getUserAvatarImageFromUserID(userID);
        if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
          return imgAvatar;
        } else {
          warn(
            "No specific avatar player image found it for player '" + ChatPortrait.getUserNameFromUserID(userID) + "'",
          );
          return imgAvatar ? imgAvatar : imgFinal;
        }
      } else if (!tokenID && !actorID) {
        if (userID && ChatPortrait.settings.useAvatarImage) {
          const imgAvatar: string = ChatPortrait.getUserAvatarImageFromUserID(userID);
          if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
            return imgAvatar;
          } else {
            // This is just a partial solution....
            // const currentToken:Token = ChatPortrait.getFirstPlayerToken();
            // if(currentToken){
            //   speaker.token = currentToken;
            //   return currentToken.data.img;
            // }else{
            //warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
            //return imgAvatar ? imgAvatar : imgFinal;
            // }
          }
        } else {
          //warn("No message user is found");
          return imgFinal;
        }
      }
    }
    // It's a chat message associated with an actor
    let useTokenImage: boolean = ChatPortrait.settings.useTokenImage;
    const actor = ChatPortrait.getActorFromActorID(actorID, tokenID);
    const doNotUseTokenImageWithSpecificType: string[] = ChatPortrait.settings.doNotUseTokenImageWithSpecificType
      ? String(ChatPortrait.settings.doNotUseTokenImageWithSpecificType).split(',')
      : [];
    if (
      doNotUseTokenImageWithSpecificType.length > 0 &&
      doNotUseTokenImageWithSpecificType.includes(<string>actor?.type)
    ) {
      useTokenImage = false;
    }
    // Make sense only for player and for non GM
    if (actor?.type == 'character' && ChatPortrait.settings.useAvatarImage && !ChatPortrait.isGMFromUserID(userID)) {
      const imgAvatar: string = ChatPortrait.getUserAvatarImageFromUserID(userID);
      if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
        return imgAvatar;
      } else {
        //warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
      }
    }

    let token: TokenDocument;
    //@ts-ignore
    let tokenData: TokenData;
    if (tokenID) {
      token = <TokenDocument>ChatPortrait.getTokenFromScene(sceneID, tokenID);
      if (!token) {
        token = <TokenDocument>ChatPortrait.getTokenFromId(tokenID);
      }
      if (!token && actorID) {
        token = <TokenDocument>ChatPortrait.getTokenFromActor(actorID);
      }
      // THIS PIECE OF CODE IS PROBABLY NOT NECESSARY ANYMORE ??
      if (!token) {
        try {
          token = <TokenDocument>canvas?.tokens?.getDocuments().find((token: TokenDocument) => token.id === tokenID);
          //token = canvas?.tokens?.getDocuments().find(speaker.token);
        } catch (e) {
          // Do nothing
        }
        if (!token) {
          tokenData = game.scenes?.get(sceneID)?.data?.tokens?.find((t) => <string>t.id === tokenID); // Deprecated on 0.8.6
        } else {
          tokenData = token.data;
        }
      } else {
        tokenData = token.data;
      }

      let imgToken = '';
      if (tokenData) {
        if (useTokenImage) {
          if (tokenData?.img) {
            imgToken = tokenData.img;
          }

          if ((!imgToken || ChatPortrait.isWildcardImage(imgToken)) && tokenData?.data?.img) {
            imgToken = tokenData?.data?.img;
          }
        } else {
          if (tokenData?.actorData?.img) {
            imgToken = tokenData.actorData.img;
          }

          if ((!imgToken || ChatPortrait.isWildcardImage(imgToken)) && tokenData?.data?.actorData?.img) {
            imgToken = tokenData.data?.actorData.img;
          }
        }
        // if((!imgToken || ChatPortrait.isWildcardImage(imgToken)) || imgToken.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)){
        //return useTokenImage ? <string>actor?.data.token.img : <string>actor?.token?.data?.img; // actor?.img; // Deprecated on 0.8.6
        //return useTokenImage ? actor?.data?.token?.img : actor.data.img; // actor?.img; // Deprecated on 0.8.6
        //}

        if (imgToken && !ChatPortrait.isWildcardImage(imgToken) && !imgToken.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
          return imgToken;
        }
      }
    }

    // MOD COMBAT TRACKER NEED TOKEN RETRIEVE ANYWAY IF TOKEN IS NOT OWNED
    let imgToken = '';
    if (!useTokenImage && !isOwnedFromPLayer) {
      if (tokenData?.img) {
        imgToken = tokenData.img;
      }

      if ((!imgToken || ChatPortrait.isWildcardImage(imgToken)) && tokenData?.data?.img) {
        imgToken = tokenData?.data?.img;
      }

      if (imgToken && !ChatPortrait.isWildcardImage(imgToken) && !imgToken.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
        return imgToken;
      }
    }
    // END MOD COMBAT TRACKER IF TOKEN IS NOT OWNED

    let imgActor = '';
    if (actor) {
      if ((!imgActor || imgActor.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) && useTokenImage) {
        imgActor = <string>actor?.data.token.img;
        if (imgActor && ChatPortrait.isWildcardImage(imgActor)) {
          imgActor = '';
        }
      }
      if ((!imgActor || imgActor.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) && useTokenImage) {
        imgActor = <string>actor?.token?.data?.img;
        if (imgActor && ChatPortrait.isWildcardImage(imgActor)) {
          imgActor = '';
        }
      }
      if (!imgActor || imgActor.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
        imgActor = <string>actor?.data.img;
      }
      if (imgActor && !imgActor.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
        return imgActor;
      }
    }

    const imgAvatar = ChatPortrait.getUserAvatarImageFromUserID(userID);
    // if (isMonkTokenBarXP(html)) {
    //   return imgAvatar;
    // }else {
    if (imgAvatar && !imgAvatar.includes(CONSTANTS.DEF_TOKEN_IMG_NAME)) {
      return imgAvatar;
    } else {
      //warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
      return imgAvatar ? imgAvatar : CONSTANTS.INV_UNIDENTIFIED_BOOK;
    }
    // }
    //return  useTokenImage ? <string>actor?.data.token.img : <string>actor?.img;
    //return useTokenImage ? actor?.data?.token?.img : actor.data.img;
  }
}
