import { ChatLink } from "./chatlink";
import { SettingsForm } from "./ChatPortraitForm";
import { ChatPortraitSettings } from "./ChatPortraitSettings";
import { MessageRenderData } from "./MessageRenderData";
import { getCanvas, MODULE_NAME } from "./settings";

/**
 * Main class wrapper for all of our features.
 */
export class ChatPortrait {

    /**
     * @param  {ChatMessage} chatMessage
     * @param  {JQuery} html
     * @param  {MessageRenderData} messageData
     */
    static onRenderChatMessage(chatMessage: ChatMessage, html:JQuery, speakerInfo): void {
        const messageData:MessageRenderData = speakerInfo;

        // const speaker: {
        //     scene?: string;
        //     actor?: string;
        //     token?: string;
        //     alias?: string;
        // } = messageData.message.speaker;
        // const imgPath: string = ChatPortrait.loadActorImagePathForChatMessage(speaker);
            let imgPath: string;
            const authorColor: string = messageData.author ? messageData.author.data.color : 'black';
            
            if(!ChatPortrait.shouldOverrideMessage(messageData)){
                imgPath = "icons/svg/mystery-man.svg";
            }else{
                imgPath = ChatPortrait.loadActorImagePathForChatMessage(speakerInfo.message);            
            }
        //if (imgPath) {
            
            const imgElement: HTMLImageElement = ChatPortrait.generatePortraitImageElement(imgPath);

            ChatPortrait.setImageBorder(imgElement, authorColor);

            // Place the image to left of the header by injecting the HTML
            const element: HTMLElement = html.find('.message-header')[0];
            element.prepend(imgElement);

            if (messageData.message.flavor && ChatPortrait.settings.flavorNextToPortrait) {
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
            }

            // Update size text name by settings     
            const senderElement: HTMLElement = html.find('.message-sender')[0];  
            // Bug fix plutonium 
            senderElement.style.display = 'block';    
            if(ChatPortrait.settings.textSizeName > 0){
                const size: number = ChatPortrait.settings.textSizeName;
                senderElement.style.fontSize = size + 'px';                
                if(!ChatPortrait.shouldOverrideMessage(messageData)){
                    senderElement.innerText = 'Unknown Actor';
                }           
            }else if(!ChatPortrait.shouldOverrideMessage(messageData)){
                const senderElement: HTMLElement = html.find('.message-sender')[0];
                senderElement.innerText = 'Unknown Actor';
            }

            // Add click listener to image
            ChatLink.prepareEventImage(chatMessage, html, speakerInfo);

            // Update size item image by settings
            const elementItemList = html.find('.item-card img');
            if(elementItemList.length > 0 && ChatPortrait.settings.portraitSizeItem != 36){
                for(let i = 0; i < elementItemList.length; i++){
                    const elementItemImage:HTMLImageElement = <HTMLImageElement>elementItemList[i];
                    const size: number = ChatPortrait.settings.portraitSizeItem;
                    elementItemImage.width = size;
                    elementItemImage.height = size;
                    if(!ChatPortrait.shouldOverrideMessage(messageData)){
                        elementItemImage.src = `/modules/${MODULE_NAME}/assets/inv-unidentified.png`;
                    }
                }
            }else if(!ChatPortrait.shouldOverrideMessage(messageData)){
                for(let i = 0; i < elementItemList.length; i++){
                    const elementItemImage:HTMLImageElement = <HTMLImageElement>elementItemList[i];
                    elementItemImage.src = `/modules/${MODULE_NAME}/assets/inv-unidentified.png`;
                }
            }

            if(!ChatPortrait.shouldOverrideMessage(messageData)){
                const elementItemNameList = html.find('.item-card .item-name');
                for(let i = 0; i < elementItemNameList.length; i++){
                    const elementItemName:HTMLElement = <HTMLElement>elementItemNameList[i];
                    elementItemName.innerText = 'Unknown Weapon';
                }
            }

            ChatPortrait.setChatMessageBackground(html, messageData, authorColor);
            ChatPortrait.setChatMessageBorder(html, messageData, authorColor);
        //}
    }

    /**
     * Load the appropriate actor image path for a given message, leveraging token or actor or actor search.
     * @param  {{scene?:string;actor?:string;token?:string;alias?:string;}} speaker
     * @returns string
     */
    //static loadActorImagePathForChatMessage(speaker: {scene?: string;actor?: string;token?: string;alias?: string; }): string {
    static loadActorImagePathForChatMessage(message): string {
      const speaker = message.speaker;

      if (speaker) {
        if (!speaker.token && !speaker.actor){
          return "icons/svg/mystery-man.svg";
        }
        const useTokenImage: boolean = this.settings.useTokenImage;
        let actor: Actor;
        if (speaker.token) {
            actor = game.actors.tokens[speaker.token];
            if (!actor) {
                //const tokenData = game.scenes.get(speaker.scene)?.data?.tokens?.find(t => t._id === speaker.token); // Deprecated on 0.8.6
                //@ts-ignore
                const token = getCanvas()?.tokens?.getDocuments().get(speaker.token);
                const tokenData = token.data;
                if (useTokenImage && tokenData?.img) {
                    return tokenData.img;
                } else if (!useTokenImage && tokenData?.actorData?.img) {
                    return tokenData.actorData.img;
                }
            }
        }
        if (!actor) {
            //actor = game.actors.get(speaker.actor); // Deprecated on 0.8.6
            actor = Actors.instance.get(speaker.actor);
        }
        const forceNameSearch = this.settings.forceNameSearch;
        if (!actor && forceNameSearch) {
            actor = game.actors.find((a: Actor) => a.name === speaker.alias);
        }
        return useTokenImage ? actor?.data?.token?.img : actor.data.img; // actor?.img; // Deprecated on 0.8.6
      }
      return "icons/svg/mystery-man.svg";
    }

    /**
     * Generate portrait HTML Image Element to insert into chat messages.
     * @param  {string} imgPath
     * @returns HTMLImageElement
     */
    static generatePortraitImageElement(imgPath: string): HTMLImageElement {
        if (!imgPath){
            return;
        }
        const img: HTMLImageElement = document.createElement('img');
        img.src = imgPath;
        const size: number = this.settings.portraitSize;
        img.width = size;
        img.height = size;
        img.classList.add("message-portrait");
        return img;
    }

    /**
     * Set portrait image border shape
     * @param  {HTMLImageElement} img
     * @param  {string} authorColor
     */
    static setImageBorder(img: HTMLImageElement, authorColor: string) {
        const borderShape: string = this.settings.borderShape;
        const borderWidth: number = this.settings.borderWidth;
        const borderColor: string = this.settings.useUserColorAsBorderColor ? authorColor : this.settings.borderColor;
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

    /**
     * Set the background color of the entire message to be the color for the author.
     * Only do so if
     *  - chatBackgroundColor setting is true AND
     * @param  {JQuery} html
     * @param  {MessageRenderData} messageData
     * @param  {string} authorColor
     */
    static setChatMessageBackground(html: JQuery, messageData: MessageRenderData, authorColor: string) {
        const useUserBackgroundColor = this.settings.useUserColorAsChatBackgroundColor;
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
        const useUserBorderColor = this.settings.useUserColorAsChatBorderColor;

        // only override the border color if someone further up the chain hasn't already done so.
        if(useUserBorderColor && !messageData.borderColor) {
            html[0].style.borderColor = authorColor;
            messageData.borderColor = authorColor;
        }
    }

    static get settings(): ChatPortraitSettings {
        //return mergeObject(this.defaultSettings, <ChatPortraitSettings>game.settings.get(MODULE_NAME, 'settings'));
        //return mergeObject(this.defaultSettings,{
        return {
            //borderShapeList: Settings.getBorderShapeList(),
            useTokenImage: SettingsForm.getUseTokenImage(),
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
        };
    }

    /**
     * Get default settings object.
     * @returns ChatPortraitSetting
     */
    static get defaultSettings(): ChatPortraitSettings {
        return {
            useTokenImage: false,
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
    //     const useTokenImage: boolean = this.settings.useTokenImage;
    //     let item: Item;
    //     if (speaker.token) {
    //         item = game.actors.tokens[speaker.token];
    //         if (!item) {
    //             const tokenData = game.scenes.get(speaker.scene)?.data?.tokens?.find(t => t._id === speaker.token);
    //             if (useTokenImage && tokenData?.img) {
    //                 return tokenData.img;
    //             } else if (!useTokenImage && tokenData?.actorData?.img) {
    //                 return tokenData.actorData.img;
    //             }
    //         }
    //     }
    //     if (!item) {
    //         item  = game.actors.get(speaker.actor);
    //     }
    //     const forceNameSearch = this.settings.forceNameSearch;
    //     if (!item  && forceNameSearch) {
    //         item  = game.actors.find((a: Item) => a.name === speaker.alias);
    //     }
    //     return useTokenImage ? item?.data?.token?.img : item?.img;
    // }

    // static getSpeakerImage = function (message):string {
    //   const speaker = message.speaker;
    //   if (speaker) {
    //       if (speaker.token && this.settings.useTokenImage) {
    //           //@ts-ignore
    //           const token = getCanvas()?.tokens?.getDocuments().get(speaker.token);
    //           if (token) {
    //               return token.data.img;
    //           }
    //       }

    //       if (speaker.actor && !this.settings.useTokenImage) {
    //           const actor = Actors.instance.get(speaker.actor);
    //           if (actor) {
    //             //@ts-ignore
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
    //     if (speaker.token && this.settings.useTokenImage) {
    //         //@ts-ignore
    //         const token = getCanvas()?.tokens?.getDocuments().get(speaker.token);
    //         if (token) {
    //             bHasImage = bHasImage || token.data.img != null;
    //         }
    //     }

    //     if (speaker.actor) {
    //         const actor = Actors.instance.get(speaker.actor);
    //         if (actor) {
    //             //@ts-ignore
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

    static shouldOverrideMessage = function(message) {
        const setting = game.settings.get(MODULE_NAME, "displaySetting");
        if (setting !== "none") {
            let user = game.users.get(message.user);
            if(!user){
                user = game.users.get(message.user.id);
            }
            if (user) {
                const isSelf = user.data._id === game.user.data._id;
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
    
    static getUserColor = function(message){
        if (ChatPortrait.shouldOverrideMessage(message)) {
            const user = game.users.get(message.user);
            return user.data.color;
        }
        return "";
    }
    
}
