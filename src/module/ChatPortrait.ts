import { i18n } from './../main';
import { warn } from "../main";
import { ChatLink } from "./chatlink";
import { SettingsForm } from "./ChatPortraitForm";
import { ChatPortraitSettings } from "./ChatPortraitSettings";
import { imageReplacerDamageType, ImageReplacerImpl } from "./ImageReplacer";
import { MessageRenderData } from "./MessageRenderData";
import { INV_UNIDENTIFIED_BOOK, CHAT_PORTRAIT_MODULE_NAME, getGame, getCanvas } from "./settings";
import { ImageReplacerData } from './ImageReplacerData';
import { TokenDataProperties } from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/tokenData';

/**
 * Main class wrapper for all of our features.
 */
export class ChatPortrait {

    /**
     * @param  {ChatMessage} chatMessage
     * @param  {JQuery} html
     * @param  {MessageRenderData} messageData
     */
    static onRenderChatMessage(chatMessage: ChatMessage, html:JQuery, speakerInfo, imageReplacer): void {

      let doNotStyling = false;

      if(!ChatPortrait.shouldOverrideMessageStyling(speakerInfo)){
        // Do not style this
        doNotStyling = true;
      }

      if(!ChatPortrait.settings.displaySettingWhisperToOther && ChatPortrait.isWhisperToOther(speakerInfo)){
        // Don't update whispers that the current player isn't privy to
        doNotStyling = true;
      }

      let messageType = ChatPortrait.getMessageTypeVisible(speakerInfo);

      if(!ChatPortrait.settings.displaySettingOTHER && messageType == CONST.CHAT_MESSAGE_TYPES.OTHER){
        doNotStyling = true;
      }
      if(!ChatPortrait.settings.displaySettingOOC && messageType == CONST.CHAT_MESSAGE_TYPES.OOC){
        doNotStyling = true;
      }
      if(!ChatPortrait.settings.displaySettingIC && messageType == CONST.CHAT_MESSAGE_TYPES.IC){
        doNotStyling = true;
      }
      if(!ChatPortrait.settings.displaySettingEMOTE && messageType == CONST.CHAT_MESSAGE_TYPES.EMOTE){
        doNotStyling = true;
      }
      if(!ChatPortrait.settings.displaySettingWHISPER && messageType == CONST.CHAT_MESSAGE_TYPES.WHISPER){
        doNotStyling = true;
      }
      if(!ChatPortrait.settings.displaySettingROLL && messageType == CONST.CHAT_MESSAGE_TYPES.ROLL){
        doNotStyling = true;
      }

      let senderElement: HTMLElement;
      let elementItemImageList;
      let elementItemNameList;
      let elementItemContentList;
      let elementItemTextList;
      // GET Image, Text, Content of the item card by system used
      if (getGame().system.id === 'dnd5e') {
        senderElement = html.find('.message-sender')[0];
        // Bug fix plutonium
        senderElement.style.display = 'block';
        elementItemImageList = html.find('.item-card img');
        elementItemNameList = html.find('.item-card .item-name'); // work only with dnd5e
        //elementItemNameList = html.find('.item-card h3'); // work with more system ?
        elementItemContentList = html.find('.item-card .card-content');
        elementItemTextList = html.find('.message-header .flavor-text');
      }
      else if(getGame().system.id === 'shadowrun5e'){
        senderElement = html.find('.message-sender')[0];
        // Bug fix plutonium
        senderElement.style.display = 'block';
        elementItemImageList = html.find('.message-content img');
        elementItemNameList = html.find('.message-content h3'); // work with more system ?
        elementItemContentList = html.find('.message-content .card-main-content');
        elementItemTextList = html.find('.message-header .flavor-text');
      }
    //   else if (getGame().system.id === 'D35E') {
    //     // TODO

    //   }
    //   else if (getGame().system.id === 'pf2e') {
    //     // TODO
    //   }
      else {
        warn(`System ${getGame().system.id} have not been implemented and therefore might not work properly.`);
        // BY DEFAULT DND5e Style
        senderElement = html.find('.message-sender')[0];
        // Bug fix plutonium
        senderElement.style.display = 'block';
        elementItemImageList = html.find('.item-card img');
        elementItemNameList = html.find('.item-card .item-name'); // work only with dnd5e
        //elementItemNameList = html.find('.item-card h3'); // work with more system ?
        elementItemContentList = html.find('.item-card .card-content');
        elementItemTextList = html.find('message-header flavor-text');
      }
      if(doNotStyling){
        if(ChatPortrait.settings.displayPlayerName){
          ChatPortrait.appendPlayerName(senderElement, speakerInfo.author);
        }
        if(ChatPortrait.settings.displayMessageTag){
          ChatPortrait.injectMessageTag(html, speakerInfo);
          ChatPortrait.injectWhisperParticipants(html, speakerInfo);
        }
      }else{
        ChatPortrait.onRenderChatMessageInternal(chatMessage, html, speakerInfo, senderElement, elementItemImageList, elementItemNameList, elementItemContentList, elementItemTextList, imageReplacer);
      }
    }

    /**
     * @param  {ChatMessage} chatMessage
     * @param  {JQuery} html
     * @param  {MessageRenderData} messageData
     */
    static onRenderChatMessageInternal(chatMessage: ChatMessage, html:JQuery, speakerInfo, senderElement:HTMLElement, elementItemImageList, elementItemNameList, elementItemContentList, elementItemTextList, imageReplacer): void {
        const messageData:MessageRenderData = speakerInfo;
        let imgPath: string;
        const authorColor = messageData.author ? <string>messageData.author.data.color : 'black';
        //const speaker = speakerInfo.message.speaker;
        const useTokenName: boolean = ChatPortrait.settings.useTokenName;
        if(useTokenName){
          ChatPortrait.replaceSenderWithTokenName(senderElement, speakerInfo);
        }

        if(ChatPortrait.shouldOverrideMessageUnknown(messageData)){
            imgPath = "icons/svg/mystery-man.svg";
        }else{
            imgPath = ChatPortrait.loadActorImagePathForChatMessage(speakerInfo);
        }
        ChatPortrait.generatePortraitImageElement(imgPath).then((imgElement)=>{


            // Very very rare use case ????
            if(!imgElement){
              imgElement = document.createElement('img');
              const size: number = ChatPortrait.settings.portraitSize;
              if(size && size > 0){
                imgElement.width = size;
                imgElement.height = size;
              }
              imgElement.src = INV_UNIDENTIFIED_BOOK;
              imgElement.classList.add("message-portrait");
            }

            ChatPortrait.setImageBorder(imgElement, authorColor);
            // Place the image to left of the header by injecting the HTML
            const element: HTMLElement = html.find('.message-header')[0];
            element.prepend(imgElement);

            if (messageData.message.flavor && ChatPortrait.settings.flavorNextToPortrait) {
              const flavorElement: JQuery = html.find('.flavor-text');
              if(flavorElement.length > 0){
                  const copiedElement: Node = flavorElement[0].cloneNode(true);
                  flavorElement.remove();
                  const brElement: HTMLElement = document.createElement('br');
                  const senderElement: HTMLElement = html.find('.message-sender')[0];
                  senderElement.appendChild(brElement);
                  senderElement.appendChild(copiedElement);
              }
            }

            // Default style
            if(!senderElement.classList.contains("chat-portrait-text-size-name")){
              senderElement.classList.add("chat-portrait-text-size-name");
            }

            // Update size text name by settings
            if(ChatPortrait.settings.textSizeName > 0){
                const size: number = ChatPortrait.settings.textSizeName;
                senderElement.style.fontSize = size + 'px';
                if(ChatPortrait.shouldOverrideMessageUnknown(messageData)){
                    senderElement.innerText = ChatPortrait.settings.displayUnknownPlaceHolderActorName; //'Unknown Actor';
                }
            }else if(ChatPortrait.shouldOverrideMessageUnknown(messageData)){
                senderElement.innerText = ChatPortrait.settings.displayUnknownPlaceHolderActorName; //'Unknown Actor';
            }

            // Add click listener to image and text
            ChatLink.prepareEventImage(chatMessage, html, speakerInfo);

            // Update size item image by settings
            if(elementItemImageList.length > 0 && ChatPortrait.settings.portraitSizeItem != 36 && ChatPortrait.settings.portraitSizeItem > 0){
                for(let i = 0; i < elementItemImageList.length; i++){
                    const elementItemImage:HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
                    const size: number = ChatPortrait.settings.portraitSizeItem;
                    if(size && size > 0){
                      elementItemImage.width = size;
                      elementItemImage.height = size;
                    }
                    if(ChatPortrait.shouldOverrideMessageUnknown(messageData)){
                        elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon; //`/modules/${MODULE_NAME}/assets/inv-unidentified.png`;
                    }
                    if(!elementItemImage.classList.contains("message-portrait")){
                      elementItemImage.classList.add("message-portrait");
                    }
                }
            }else if(ChatPortrait.shouldOverrideMessageUnknown(messageData)){
                for(let i = 0; i < elementItemImageList.length; i++){
                    const elementItemImage:HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
                    elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon; //`/modules/${MODULE_NAME}/assets/inv-unidentified.png`;
                    const size: number = ChatPortrait.settings.portraitSizeItem;
                    if(size && size > 0){
                      elementItemImage.width = size;
                      elementItemImage.height = size;
                    }
                    if(!elementItemImage.classList.contains("message-portrait")){
                      elementItemImage.classList.add("message-portrait");
                    }
                }
            }

            // Update hide info about the weapon
            if(ChatPortrait.shouldOverrideMessageUnknown(messageData)){

                for(let i = 0; i < elementItemNameList.length; i++){
                    const elementItemName:HTMLElement = <HTMLElement>elementItemNameList[i];
                    elementItemName.innerText = ChatPortrait.settings.displayUnknownPlaceHolderItemName; //'Unknown Weapon';
                }

                for(let i = 0; i < elementItemContentList.length; i++){
                    const elementItemContent:HTMLElement = <HTMLElement>elementItemContentList[i];
                    elementItemContent.innerText = ChatPortrait.settings.displayUnknownPlaceHolderItemName; //'Unknown Weapon';
                }

            }
            // Check for Ability/Skills/Tools/Saving Throw for avoid the double portrait
            if(elementItemNameList.length > 0){
                for(let i = 0; i < elementItemNameList.length; i++){
                    const elementItemName:HTMLElement = <HTMLElement>elementItemNameList[i];
                    if(!elementItemName.classList.contains("chat-portrait-text-size-name")){
                      elementItemName.classList.add("chat-portrait-text-size-name");
                    }
                    if(elementItemName){
                        let value: string = "";
                        let images:ImageReplacerData = { iconMain:"", iconsDamageType:[] };
                        if(ChatPortrait.settings.useImageReplacer){
                          images = ChatPortrait.getImagesReplacerAsset(imageReplacer, elementItemName.innerText);
                          if(images && images.iconMain){
                            value = images.iconMain;
                          }
                        }
                        if(value){
                            if(elementItemImageList.length > 0){
                                const elementItemImage:HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
                                const size: number = ChatPortrait.settings.portraitSizeItem;
                                if(size && size > 0){
                                  elementItemImage.width = size;
                                  elementItemImage.height = size;
                                }
                                // Just ignore if a image is provided
                                //if(!elementItemImage.src || elementItemImage.src?.includes("mystery-man")){
                                  elementItemImage.src = value;
                                //}
                                if(!elementItemImage.classList.contains("message-portrait")){
                                  elementItemImage.classList.add("message-portrait");
                                }
                                elementItemName.prepend(elementItemImage);
                                // DAMAGE TYPES
                                if(images && images.iconsDamageType.length>0 && ChatPortrait.settings.useImageReplacerDamageType){
                                  const elementItemContainerDamageTypes:HTMLImageElement = <HTMLImageElement> document.createElement("div");
                                  for (var [index, item] of images.iconsDamageType.entries()) {

                                    const elementItemImage2:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                                    const size: number = ChatPortrait.settings.portraitSizeItem;
                                    if(size && size > 0){
                                      elementItemImage2.width = size;
                                      elementItemImage2.height = size;
                                    }
                                    // Just ignore if a image is provided
                                    elementItemImage2.src = item;//images[1];
                                    if(!elementItemImage2.classList.contains("message-portrait")){
                                      elementItemImage2.classList.add("message-portrait");
                                    }
                                    elementItemContainerDamageTypes.appendChild(elementItemImage2);

                                  }
                                  // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                                  // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                                  // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                                  elementItemName.parentNode?.insertBefore(elementItemContainerDamageTypes, elementItemName.nextSibling);
                                }
                            }else{
                                if(ChatPortrait.settings.useImageReplacer){
                                  const elementItemImage:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                                  const size: number = ChatPortrait.settings.portraitSizeItem;
                                  if(size && size > 0){
                                    elementItemImage.width = size;
                                    elementItemImage.height = size;
                                  }
                                  // Just ignore if a image is provided
                                  //if(!elementItemImage.src || elementItemImage.src?.includes("mystery-man")){
                                    elementItemImage.src = value;
                                  //}
                                  if(!elementItemImage.classList.contains("message-portrait")){
                                    elementItemImage.classList.add("message-portrait");
                                  }
                                  elementItemName.prepend(elementItemImage);
                                  // DAMAGE TYPES
                                  if(images && images.iconsDamageType.length>0 && ChatPortrait.settings.useImageReplacerDamageType){
                                    const elementItemContainerDamageTypes:HTMLImageElement = <HTMLImageElement> document.createElement("div");
                                    for (var [index, item] of images.iconsDamageType.entries()) {

                                      const elementItemImage2:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                                      const size: number = ChatPortrait.settings.portraitSizeItem;
                                      if(size && size > 0){
                                        elementItemImage2.width = size;
                                        elementItemImage2.height = size;
                                      }
                                      // Just ignore if a image is provided
                                      elementItemImage2.src = item;//images[1];
                                      if(!elementItemImage2.classList.contains("message-portrait")){
                                        elementItemImage2.classList.add("message-portrait");
                                      }
                                      elementItemContainerDamageTypes.appendChild(elementItemImage2);

                                    }
                                    // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                                    // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                                    // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                                    elementItemName.parentNode?.insertBefore(elementItemContainerDamageTypes, elementItemName.nextSibling);
                                  }
                                }
                            }
                        }else{
                          if(elementItemImageList.length > 0){
                              const elementItemImage:HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
                              const size: number = ChatPortrait.settings.portraitSizeItem;
                              if(size && size > 0){
                                elementItemImage.width = size;
                                elementItemImage.height = size;
                              }
                              if(!elementItemImage.src || elementItemImage.src?.includes("mystery-man")){
                                elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon;
                              }
                              if(!elementItemImage.classList.contains("message-portrait")){
                                elementItemImage.classList.add("message-portrait");
                              }
                              elementItemName.prepend(elementItemImage);
                          }else{
                              if(ChatPortrait.settings.useImageReplacer){
                                const elementItemImage:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                                const size: number = ChatPortrait.settings.portraitSizeItem;
                                if(size && size > 0){
                                  elementItemImage.width = size;
                                  elementItemImage.height = size;
                                }
                                if(!elementItemImage.src || elementItemImage.src?.includes("mystery-man")){
                                  elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon;
                                }
                                if(!elementItemImage.classList.contains("message-portrait")){
                                  elementItemImage.classList.add("message-portrait");
                                }
                                elementItemName.prepend(elementItemImage);
                              }
                          }
                        }
                    }
                }
            }else{
                for(let i = 0; i <  elementItemTextList.length; i++){
                    const elementItemText:HTMLElement = <HTMLElement>elementItemTextList[i];
                    if(!elementItemText.classList.contains("chat-portrait-text-size-name")){
                      elementItemText.classList.add("chat-portrait-text-size-name");
                    }
                    let value:string = "";
                    let images:ImageReplacerData = { iconMain:"", iconsDamageType:[] };
                    if(ChatPortrait.settings.useImageReplacer){
                      images = ChatPortrait.getImagesReplacerAsset(imageReplacer, elementItemText.innerText);
                      if(images && images.iconMain){
                        value = images.iconMain;
                      }
                    }
                    if(value){
                        if(elementItemImageList.length > 0){
                            const elementItemImage:HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
                            const size: number = ChatPortrait.settings.portraitSizeItem;
                            if(size && size > 0){
                              elementItemImage.width = size;
                              elementItemImage.height = size;
                            }
                            // Just ignore if a image is provided
                            //if(!elementItemImage.src || elementItemImage.src?.includes("mystery-man")){
                              elementItemImage.src = value;
                            //}
                            if(!elementItemImage.classList.contains("message-portrait")){
                              elementItemImage.classList.add("message-portrait");
                            }
                            elementItemText.prepend(elementItemImage);
                            // DAMAGE TYPES
                            if(images && images.iconsDamageType.length>0 && ChatPortrait.settings.useImageReplacerDamageType){
                              const elementItemContainerDamageTypes:HTMLImageElement = <HTMLImageElement> document.createElement("div");
                              for (var [index, item] of images.iconsDamageType.entries()) {

                                const elementItemImage2:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                                const size: number = ChatPortrait.settings.portraitSizeItem;
                                if(size && size > 0){
                                  elementItemImage2.width = size;
                                  elementItemImage2.height = size;
                                }
                                // Just ignore if a image is provided
                                elementItemImage2.src = item;//images[1];
                                if(!elementItemImage2.classList.contains("message-portrait")){
                                  elementItemImage2.classList.add("message-portrait");
                                }
                                elementItemContainerDamageTypes.appendChild(elementItemImage2);

                              }
                              // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                              // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                              // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                              elementItemText.parentNode?.insertBefore(elementItemContainerDamageTypes, elementItemText.nextSibling);
                            }
                        }else{
                            if(ChatPortrait.settings.useImageReplacer){
                              const elementItemImage:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                              const size: number = ChatPortrait.settings.portraitSizeItem;
                              if(size && size > 0){
                                elementItemImage.width = size;
                                elementItemImage.height = size;
                              }
                              // Just ignore if a image is provided
                              //if(!elementItemImage.src || elementItemImage.src?.includes("mystery-man")){
                                elementItemImage.src = value;
                              //}
                              if(!elementItemImage.classList.contains("message-portrait")){
                                elementItemImage.classList.add("message-portrait");
                              }
                              elementItemText.prepend(elementItemImage);
                              // DAMAGE TYPES
                              if(images && images.iconsDamageType.length>0 && ChatPortrait.settings.useImageReplacerDamageType){
                                const elementItemContainerDamageTypes:HTMLImageElement = <HTMLImageElement> document.createElement("div");
                                for (var [index, item] of images.iconsDamageType.entries()) {

                                  const elementItemImage2:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                                  const size: number = ChatPortrait.settings.portraitSizeItem;
                                  if(size && size > 0){
                                    elementItemImage2.width = size;
                                    elementItemImage2.height = size;
                                  }
                                  // Just ignore if a image is provided
                                  elementItemImage2.src = item;//images[1];
                                  if(!elementItemImage2.classList.contains("message-portrait")){
                                    elementItemImage2.classList.add("message-portrait");
                                  }
                                  elementItemContainerDamageTypes.appendChild(elementItemImage2);

                                }
                                // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
                                // If elementItemText does not have a next sibling, then it must be the last child — elementItemText.nextSibling returns null,
                                // and elementItemContainerDamageTypes is inserted at the end of the child node list (immediately after elementItemText).
                                elementItemText.parentNode?.insertBefore(elementItemContainerDamageTypes, elementItemText.nextSibling);
                              }
                            }
                        }
                    }else{
                      if(elementItemImageList.length > 0){
                          const elementItemImage:HTMLImageElement = <HTMLImageElement>elementItemImageList[i];
                          const size: number = ChatPortrait.settings.portraitSizeItem;
                          if(size && size > 0){
                            elementItemImage.width = size;
                            elementItemImage.height = size;
                          }
                          if(!elementItemImage.src || elementItemImage.src?.includes("mystery-man")){
                            elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon;
                          }
                          if(!elementItemImage.classList.contains("message-portrait")){
                            elementItemImage.classList.add("message-portrait");
                          }
                          elementItemText.prepend(elementItemImage);
                      }else{
                          if(ChatPortrait.settings.useImageReplacer){
                            const elementItemImage:HTMLImageElement = <HTMLImageElement> document.createElement("img");
                            const size: number = ChatPortrait.settings.portraitSizeItem;
                            if(size && size > 0){
                              elementItemImage.width = size;
                              elementItemImage.height = size;
                            }
                            if(!elementItemImage.src || elementItemImage.src?.includes("mystery-man")){
                              elementItemImage.src = ChatPortrait.settings.displayUnknownPlaceHolderItemIcon;
                            }
                            if(!elementItemImage.classList.contains("message-portrait")){
                              elementItemImage.classList.add("message-portrait");
                            }
                            elementItemText.prepend(elementItemImage);
                          }
                      }
                    }
                    if(ChatPortrait.shouldOverrideMessageUnknown(messageData)){
                      elementItemText.innerText = ChatPortrait.settings.displayUnknownPlaceHolderItemName;
                    }
                }

            }

            ChatPortrait.setCustomStylingText(html, messageData, authorColor);
            ChatPortrait.setChatMessageBackground(html, messageData, authorColor);
            ChatPortrait.setChatMessageBorder(html, messageData, authorColor);
            if(ChatPortrait.settings.displayPlayerName){
              ChatPortrait.appendPlayerName(senderElement, speakerInfo.author);
            }
            if(ChatPortrait.settings.displayMessageTag){
              ChatPortrait.injectMessageTag(html, messageData);
              ChatPortrait.injectWhisperParticipants(html, messageData);
            }
        });
    }

    /**
     * Load the appropriate actor image path for a given message, leveraging token or actor or actor search.
     * @param  {{scene?:string;actor?:string;token?:string;alias?:string;}} speaker
     * @returns string
     */
    //static loadActorImagePathForChatMessage(speaker: {scene?: string;actor?: string;token?: string;alias?: string; }): string {
    static loadActorImagePathForChatMessage(speakerInfo): string {
      const message = speakerInfo.message;
      const speaker = message.speaker;
      const isOOC = ChatPortrait.getMessageTypeVisible(speakerInfo) === CONST.CHAT_MESSAGE_TYPES.OOC;
      if(message.user && isOOC){
        const imgAvatar:string = ChatPortrait.getUserAvatar(message);
        if(imgAvatar && !imgAvatar.includes("mystery-man")){
          return imgAvatar;
        }else{
          warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
          return imgAvatar ? imgAvatar : "icons/svg/mystery-man.svg";
        }
      }
      if (speaker) {
        if (!speaker.token && !speaker.actor){
          if(message.user && ChatPortrait.settings.useAvatarImage && !ChatPortrait.isSpeakerGM(message)){
            const imgAvatar:string = ChatPortrait.getUserAvatar(message);
            if(imgAvatar && !imgAvatar.includes("mystery-man")){
              return imgAvatar;
            }else{
              warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
              return imgAvatar ? imgAvatar : "icons/svg/mystery-man.svg";
            }
          }else{
            if(message.user){
              const imgAvatar:string = ChatPortrait.getUserAvatar(message);
              if(imgAvatar && !imgAvatar.includes("mystery-man")){
                return imgAvatar;
              }else{
                // This is just a partial solution....
                // const currentToken:Token = ChatPortrait.getFirstPlayerToken();
                // if(currentToken){
                //   speaker.token = currentToken;
                //   return currentToken.data.img;
                // }else{
                
                //warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");              
                //return imgAvatar ? imgAvatar : "icons/svg/mystery-man.svg";

                // }
              }
            }else{
              //warn("No message user is found");
              return "icons/svg/mystery-man.svg";
            }
          }
        }
        // It's a chat message associated with an actor
        const useTokenImage: boolean = ChatPortrait.settings.useTokenImage;
        const actor = ChatPortrait.getActor(speaker);
        // Make sense only for player and for non GM
        if(actor?.type == "character" && ChatPortrait.settings.useAvatarImage && !ChatPortrait.isSpeakerGM(message)){
            const imgAvatar:string = ChatPortrait.getUserAvatar(message);
            if(imgAvatar && !imgAvatar.includes("mystery-man")){
              return imgAvatar;
            }else{
              //warn("No specific avatar player image found it for player '"+ChatPortrait.getUserName(message)+"'");
              return imgAvatar ? imgAvatar : "icons/svg/mystery-man.svg";
            }
        }
        let token:TokenDocument;
        let tokenData:any;
        if (speaker.token) {
            token = ChatPortrait.getToken(speaker.scene, speaker.token);
            // THIS PIECE OF CODE IS PROBABLY NOT NECESSARY ANYMORE ??
            if (!token) {
              try{
                token = <TokenDocument>getCanvas()?.tokens?.getDocuments().find((token:TokenDocument) => token.id === speaker.token);
                //token = getCanvas()?.tokens?.getDocuments().find(speaker.token);
              }catch(e){
                // Do nothing
              }
              if(!token){
                tokenData = getGame().scenes?.get(speaker.scene)?.data?.tokens?.find(t => t._id === speaker.token); // Deprecated on 0.8.6
              }else{
                tokenData = token.data;
              }
            }else{
              tokenData = token.data;
            }           
        }
        if(tokenData){
          if (useTokenImage && tokenData?.img) {
              return tokenData.img;
          } else if (!useTokenImage && tokenData?.actorData?.img) {
              return tokenData.actorData.img;
          }else{
            return useTokenImage ? <string>actor?.data.token.img : <string>actor?.token?.data?.img; // actor?.img; // Deprecated on 0.8.6
            //return useTokenImage ? actor?.data?.token?.img : actor.data.img; // actor?.img; // Deprecated on 0.8.6
          } 
        }else{
          return useTokenImage ? <string>actor?.data.token.img : <string>actor?.img;
          //return useTokenImage ? actor?.data?.token?.img : actor.data.img;
        } 
      }
     
      return "icons/svg/mystery-man.svg";
      
    } 
    /**
     * Generate portrait HTML Image Element to insert into chat messages.
     * @param  {string} imgPath
     * @returns HTMLImageElement
     */
    static async generatePortraitImageElement(imgPath: string): Promise<HTMLImageElement|undefined> {
        if (!imgPath){
            return;
        }
        const img: HTMLImageElement = document.createElement('img');
        const size: number = ChatPortrait.settings.portraitSize;
        // Support for video or webm file
        //let thumb = diff.img;
        //if (VideoHelper.hasVideoExtension(diff.img))
        //    thumb = await ImageHelper.createThumbnail(diff.img, { width: 48, height: 48 });
        //let thumb = 'icons/svg/mystery-man.svg';
        try {
            let imgThumb = await ImageHelper.createThumbnail(imgPath, { width: size, height: size });
            if( imgPath.endsWith("webm")){
                img.src = imgThumb.thumb;
                // If a url we need these anyway
                if(size && size > 0){
                  img.width = size;
                  img.height = size;
                }
            }else{
                img.src = <string>imgThumb.src;
                if(size && size > 0){
                  // If a url we need these anyway
                  img.width = size;
                  img.height = size;
                }
            }
        } catch {
            img.src = imgPath;
            img.width = size;
            img.height = size;
        }
        img.classList.add("message-portrait");
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
        const borderColor: string = ChatPortrait.settings.useUserColorAsBorderColor ? authorColor : ChatPortrait.settings.borderColor;
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
      for(let i = 0; i <  elementItemTextList.length; i++){
        const elementItemText:HTMLElement = <HTMLElement>elementItemTextList[i];
        if(ChatPortrait.settings.customStylingMessageText){
          elementItemText.style.cssText = ChatPortrait.settings.customStylingMessageText;
        }
        // You need this anyway
        //elementItemText.style.display = 'flex';
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
        if(useUserBackgroundColor) {
            html[0].setAttribute('style','background-color:' + authorColor + ';background-blend-mode:screen;');
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
        if(useUserBorderColor && !messageData.borderColor) {
            html[0].style.borderColor = authorColor;
            messageData.borderColor = authorColor;
        }
    }

    static get settings(): ChatPortraitSettings {
        //return mergeObject(this.defaultSettings, <ChatPortraitSettings>getGame().settings.get(MODULE_NAME, 'settings'));
        //return mergeObject(this.defaultSettings,{
        return {
            //borderShapeList: Settings.getBorderShapeList(),
            useTokenImage: SettingsForm.getUseTokenImage(),
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
            hoverTooltip: SettingsForm.getHoverTooltip(),
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
            customStylingMessageText: SettingsForm.getCustomStylingMessageText(),
            displayMessageTag: SettingsForm.getDisplayMessageTag(),
            useImageReplacer: SettingsForm.getUseImageReplacer(),
            useImageReplacerDamageType: SettingsForm.getUseImageReplacerDamageType(),
        };
    }

    /**
     * Get default settings object.
     * @returns ChatPortraitSetting
     */
    static get defaultSettings(): ChatPortraitSettings {
        return {
            useTokenImage: false,
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
            hoverTooltip: false,
            textSizeName: 0,
            displaySetting: 'allCards',
            useAvatarImage: false,
            displayPlayerName: false,
            displayUnknown: 'none',
            displayUnknownPlaceHolderActorName: 'Unknown Actor',
            displayUnknownPlaceHolderItemName: 'Unknown Item',
            displayUnknownPlaceHolderItemIcon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/inv-unidentified.png`,
            displaySettingOTHER: true,
            displaySettingOOC: true,
            displaySettingIC: true,
            displaySettingEMOTE: true,
            displaySettingWHISPER: true,
            displaySettingROLL: true,
            displaySettingWhisperToOther: false,
            customStylingMessageText: '',
            displayMessageTag: false,
            useImageReplacer: true,
            useImageReplacerDamageType: true
        }
    }

    // /**
    //  * Load the appropriate actor image path for a given message, leveraging token or actor or actor search.
    //  * @param  {{scene?:string;actor?:string;token?:string;alias?:string;}} speaker
    //  * @returns string
    //  */
    //  static loadItemImagePathForChatMessage(speaker: {
    //   scene?: string;
    //   item?: string;
    //   token?: string;
    //   alias?: string;
    // }): string {
    //     if (!speaker.token && !speaker.actor) return;
    //     const useTokenImage: boolean = ChatPortrait.settings.useTokenImage;
    //     let item: Item;
    //     if (speaker.token) {
    //         item = getGame().actors.tokens[speaker.token];
    //         if (!item) {
    //             const tokenData = getGame().scenes.get(speaker.scene)?.data?.tokens?.find(t => t._id === speaker.token);
    //             if (useTokenImage && tokenData?.img) {
    //                 return tokenData.img;
    //             } else if (!useTokenImage && tokenData?.actorData?.img) {
    //                 return tokenData.actorData.img;
    //             }
    //         }
    //     }
    //     if (!item) {
    //         item  = getGame().actors.get(speaker.actor);
    //     }
    //     const forceNameSearch = ChatPortrait.settings.forceNameSearch;
    //     if (!item  && forceNameSearch) {
    //         item  = getGame().actors.find((a: Item) => a.name === speaker.alias);
    //     }
    //     return useTokenImage ? item?.data?.token?.img : item?.img;
    // }

    // static getSpeakerImage = function (message):string {
    //   const speaker = message.speaker;
    //   if (speaker) {
    //       if (speaker.token && ChatPortrait.settings.useTokenImage) {
    //           const token = getCanvas()?.tokens?.getDocuments().get(speaker.token);
    //           if (token) {
    //               return token.data.img;
    //           }
    //       }

    //       if (speaker.actor && !ChatPortrait.settings.useTokenImage) {
    //           const actor = Actors.instance.get(speaker.actor);
    //           if (actor) {
    //             return actor.data.img;
    //           }
    //       }
    //   }

    //   return "icons/svg/mystery-man.svg";
    // }

    // static showSpeakerImage = function (message):boolean {
    //   const speaker = message.speaker;
    //   if (!speaker) {
    //       return false;
    //   } else {
    //     let bHasImage = false;
    //     if (speaker.token && ChatPortrait.settings.useTokenImage) {
    //         const token = getCanvas()?.tokens?.getDocuments().get(speaker.token);
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

    static getActor(speaker):Actor|undefined{
        let actor =  getGame().actors?.get(speaker.actor);
        if(!actor){
          actor = getGame().actors?.tokens[speaker.token];
        }
        if (!actor) {
            //actor = getGame().actors.get(speaker.actor); // Deprecated on 0.8.6
            actor = Actors.instance.get(speaker.actor);
        }
        const forceNameSearch = ChatPortrait.settings.forceNameSearch;
        if (!actor && forceNameSearch) {
            actor = getGame().actors?.find((a: Actor) => a.data.token.name === speaker.alias);
        }
        return actor;
    }

    static getActorName = function(speaker) {
      const actor = ChatPortrait.getActor(speaker);//getGame().actors.get(speaker.actor);
      if (actor) {
        return actor.name;
      }
      return speaker.alias;
    }

    static getTokenName = function(speaker) {
      if (speaker.token) {
        const scene = speaker.scene ? speaker.scene : getGame().scenes?.current?.id;
        const token = ChatPortrait.getToken(speaker.scene, speaker.token);
        if (token) {
          return token.name;
        }
      }
      const actor = getGame().actors?.get(speaker.actor);
      if (actor) {
        if (actor.data.token) {
          return actor.data.token.name;
        }
        if (actor.hasPlayerOwner) {
          return actor.name;
        }
      }
      if (getGame().user?.isGM) {
        return speaker.alias;
      }
      return ChatPortrait.settings.displayUnknownPlaceHolderActorName; //'???';
    }

    static getToken = function(sceneID, tokenID) {
      const specifiedScene = getGame().scenes?.get(sceneID);
      if (specifiedScene) {
        return ChatPortrait.getTokenForScene(specifiedScene, tokenID);
      }
      let foundToken = null;
      getGame().scenes?.find((scene) => {
        foundToken = ChatPortrait.getTokenForScene(scene, tokenID);
        return !!foundToken;
      });
      return foundToken;
    }

    static getTokenForScene = function(scene, tokenID) {
      if (!scene) {
        return null;
      }
      return scene.data.tokens.find((token) => {
        return token.id === tokenID;
      });
    }

    /**
     * Returns a list of selected (or owned, if no token is selected)
     * note: ex getSelectedOrOwnedToken
     */
     static getFirstSelectedToken = function():Token|null
     {
       try{
         getCanvas();
       }catch(e){
         // Canvas not ready
         return null;
       }
       // Get controlled token
       let token:Token|null = null;
       let controlled:Token[] = <Token[]>getCanvas().tokens?.controlled;
       // Do nothing if multiple tokens are selected
       if (controlled.length && controlled.length > 1) {
         token = <Token>controlled[0];
       }
       // If exactly one token is selected, take that
       return token;
     }

    /**
     * Returns a list of selected (or owned, if no token is selected)
     * note: ex getSelectedOrOwnedToken
     */
    static getFirstPlayerToken = function():Token|null
    {
      try{
        getCanvas();
      }catch(e){
        // Canvas not ready
        return null;
      }
      // Get controlled token
      let token:Token|null = ChatPortrait.getFirstSelectedToken();
      if(!token){
          //if(!controlled.length || controlled.length == 0 ){
            // If no token is selected use the token of the users character
            //@ts-ignore
            token = getCanvas().tokens.placeables.find((token:Token) => token.data._id === getGame().user.character?.data?._id);
          //}
          // If no token is selected use the first owned token of the users character you found and is not GM
          if(!token && !getGame().user?.isGM){
            token = <Token>getCanvas().tokens?.ownedTokens[0];
          }
      }
      return token;
    }

    static isSpeakerGM = function(message){
      if(message.user){
        let user = getGame().users?.get(message.user);
        if(!user){
            user = getGame().users?.get(message?.user?.id);
        }
        if (user) {
          return user.isGM;
        }else{
          return false;
        }
      }
      return false;
    }

    static shouldOverrideMessageUnknown = function(message) {
        const speaker = message?.message?.speaker;
        let actor;
        let mytype;
        if(!speaker){
          //@ts-ignore
          actor = getGame().users.get(message.user)?.character?.data;
          mytype = actor?.type;
        }
        else if(!speaker.token && !speaker.actor){
          //@ts-ignore
          actor = getGame().users.get(message.user)?.character?.data;
          mytype = actor?.type;
        }
        else{
          actor = ChatPortrait.getActor(speaker);
          mytype = actor?.data?.type;
        }
        const setting = getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, "displayUnknown");
        if (setting !== "none") {
            //const user = getGame().users.get(message.user);
            let user = getGame().users?.get(message.user);
            if(!user){
                user = getGame().users?.get(message.user.id);
            }
            if (user) {
                const isSelf = user.data._id === getGame().user?.data._id;
                const isGM = user.isGM;

                if ((setting === "allCards")
                    || (setting === "self" && isSelf)
                    || (setting === "selfAndGM" && (isSelf || isGM))
                    || (setting === "gm" && isGM)
                    || (setting === "player" && !isGM)
                    || (setting === "onlyNpc" && mytype == "npc" && !isGM)
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    static shouldOverrideMessageStyling = function(message) {
      const setting = getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, "displaySetting");
      if (setting !== "none") {
          //const user = getGame().users.get(message.user);
          let user = getGame().users?.get(message.user);
          if(!user){
              user = getGame().users?.get(message.user.id);
          }
          if (user) {
              const isSelf = user.data._id === getGame().user?.data._id;
              const isGM = user.isGM;

              if ((setting === "allCards")
                  || (setting === "self" && isSelf)
                  || (setting === "selfAndGM" && (isSelf || isGM))
                  || (setting === "gm" && isGM)
                  || (setting === "player" && !isGM)
              ) {
                  return true;
              }
          }
      }
      return false;
  }

    static getUserColor = function(message):string|null{
      let user = getGame().users?.get(message.user);
      if(!user){
          user = getGame().users?.get(message.user.id);
          if(user){
            return user.data.color;
          }
      }
      return "";
    }

    static getUserAvatar = function(message):string{
      let user = getGame().users?.get(message.user);
      if(!user){
          user = getGame().users?.get(message.user.id);
      }
      if(user){
        if(user.data && user.data.avatar){ // image path
            return user.data.avatar;
        }
      }
      return "";
    }

    static getUserName = function(message):string{
      let user = getGame().users?.get(message.user);
      if(!user){
          user = getGame().users?.get(message.user.id);
      }
      if(user){
        if(user.data && user.data.avatar){ // image path
            return user.data.name;
        }
      }
      return "";
    }

    static isWhisperToOther = function(speakerInfo) {
        const whisper = speakerInfo.message.whisper;
        //if (e.data.blind && e.data.whisper.find(element => element == getGame().userId) == undefined) return false;
        return whisper && whisper.length > 0 && whisper.indexOf(getGame().userId) === -1;
    }

    static replaceSenderWithTokenName = function(messageSenderElem, speakerInfo) {
      const speaker = speakerInfo.message.speaker;
      const actorName = (ChatPortrait.getActorName(speaker) || '').trim();
      const name = (ChatPortrait.getTokenName(speaker) || '').trim();
      if(actorName !== name) {
        ChatPortrait.replaceMatchingTextNodes(messageSenderElem[0], actorName, name);
      }
    }

    static replaceMatchingTextNodes = function(parent, match, replacement) {
      if(!parent || !parent.hasChildNodes()) {
        return;
      }
      for ( let node of parent.childNodes ) {
        if(node.nodeType === Node.TEXT_NODE) {
          if(node.wholeText.trim() === match) {
            node.parentNode.replaceChild(document.createTextNode(replacement), node);
          }
        } else {
          ChatPortrait.replaceMatchingTextNodes(node, match, replacement);
        }
      }
    }

    static appendPlayerName = function(messageSenderElem, author) {
      const playerName = author.name;
      const playerNameElem = document.createElement('span');
      playerNameElem.appendChild(document.createTextNode(playerName));
      playerNameElem.classList.add(CHAT_PORTRAIT_MODULE_NAME + '-playerName');
      messageSenderElem.append(playerNameElem);
    }

    static getMessageTypeVisible = function(speakerInfo) {
      const messageType = speakerInfo.message.type;
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
      return; // if there is some future new message type, its probably better to default to be visible than to hide it.
    }

    static getImagesReplacerAsset(imageReplacer:Record<string,string>, text:string):ImageReplacerData{
      //let value:string[] = new Array();
      let value:ImageReplacerData = new ImageReplacerData();
      if(text){
        for (let key in imageReplacer) {
          if(key){
            const mykeyvalue = i18n(key);
            if(mykeyvalue && text.toLowerCase().trim().indexOf(mykeyvalue.toLowerCase().trim()) !== -1 ){
              //value.push(imageReplacer[key]);
              value.iconMain = imageReplacer[key];
              let damageTypes:string[] = new Array();
              // Special case
              if(key == "DND5E.DamageRoll"){
                for (let keydamage in imageReplacerDamageType) {
                  const mykeydamagevalue = i18n(keydamage);
                  if(mykeydamagevalue && text.toLowerCase().trim().indexOf(mykeydamagevalue.toLowerCase().trim()) !== -1 ){
                    const srcdamageType = imageReplacerDamageType[keydamage];
                    damageTypes.push(srcdamageType);
                    // Add all damage types
                  }
                }
              }
              value.iconsDamageType = damageTypes;
              break;
            }
          }
        }
      }
      return value;
    }

    static injectMessageTag(html, messageData:MessageRenderData) {
      const timestampTag = html.find(".message-timestamp");

      const indicatorElement = $("<span>");
      indicatorElement.addClass("chat-portrait-indicator");

      const whisperTargets = messageData.message.whisper;

      const isBlind = messageData.message.blind || false;
      const isWhisper = whisperTargets?.length > 0 || false;
      const isSelf = isWhisper && whisperTargets.length === 1 && whisperTargets[0] === messageData.message.user;
      const isRoll = messageData.message.roll !== undefined;

      // Inject tag to the left of the timestamp
      if (isBlind) {
          indicatorElement.text(getGame().i18n.localize("CHAT.RollBlind"));
          timestampTag.before(indicatorElement);
      } else if (isSelf && whisperTargets[0]) {
          indicatorElement.text(getGame().i18n.localize("CHAT.RollSelf"));
          timestampTag.before(indicatorElement);
      } else if (isRoll && isWhisper) {
          indicatorElement.text(getGame().i18n.localize("CHAT.RollPrivate"));
          timestampTag.before(indicatorElement);
      } else if (isWhisper) {
          indicatorElement.text(getGame().i18n.localize("chat-portrait.whisper"));
          timestampTag.before(indicatorElement);
      }
  }

  static injectWhisperParticipants(html, messageData) {
      const alias = messageData.alias;
      const whisperTargetString = messageData.whisperTo;
      const whisperTargetIds = messageData.message.whisper;
      const isWhisper = whisperTargetIds?.length > 0 || false;
      const isRoll = messageData.message.roll !== undefined;

      const authorId = messageData.message.user;
      const userId = getGame().user?.data._id;

      if (!isWhisper) return;
      if (userId !== authorId && !whisperTargetIds.includes(userId) ) return;

      // remove the old whisper to content, if it exists
      html.find(".chat-portrait-whisper-to").detach();

      // if this is a roll
      if (isRoll) return;

      // add new content
      const messageHeader = html.find(".message-header");

      const whisperParticipants = $("<span>");
      whisperParticipants.addClass("chat-portrait-whisper-to");

      const whisperFrom = $("<span>");
      whisperFrom.text(`${getGame().i18n.localize("chat-portrait.from")}: ${alias}`);

      const whisperTo = $("<span>");
      whisperTo.text(`${getGame().i18n.localize("CHAT.To")}: ${whisperTargetString}`);

      whisperParticipants.append(whisperFrom);
      whisperParticipants.append(whisperTo);
      messageHeader.append(whisperParticipants);
  }

  static getLogElement = function(chatLog){
    const el = chatLog.element;
    const log = el.length ? el[0].querySelector("#chat-log") : null;
    return log;
  }

  static shouldScrollToBottom = function(log){
    // If more than half chat log height above the actual bottom, don't do the scroll.
    const propOfClientHeightScrolled = (log.scrollHeight - log.clientHeight - log.scrollTop) / log.clientHeight;
    return propOfClientHeightScrolled <= 0.5;
  }

}
