import { ChatPortraitSettings } from "./ChatPortraitSettings";
import { MessageRenderData } from "./MessageRenderData";

export const MODULE_NAME = 'foundryvtt-chat-portrait';

/**
 * Main class wrapper for all of our features.
 */
export class ChatPortrait {

    /**
     * @param  {ChatMessage} chatMessage
     * @param  {JQuery} html
     * @param  {MessageRenderData} messageData
     */
    static onRenderChatMessage(chatMessage: ChatMessage, html:JQuery, messageData:MessageRenderData): void {
        const speaker: {
            scene?: string;
            actor?: string;
            token?: string;
            alias?: string;
        } = messageData.message.speaker;
        const imgPath: string = ChatPortrait.loadActorImagePathForChatMessage(speaker);

        if (imgPath) {
            const imgElement: HTMLImageElement = ChatPortrait.generatePortraitImageElement(imgPath);
            const authorColor: string = messageData.author ? messageData.author.data.color : 'black';

            ChatPortrait.setImageBorder(imgElement, authorColor);

            // Place the image to left of the header by injecting the HTML
            const element: HTMLElement = html.find('.message-header')[0];
            element.prepend(imgElement);

            if (messageData.message.flavor && ChatPortrait.settings.flavorNextToPortrait) {
                if (messageData.message.flavor && ChatPortrait.settings.flavorNextToPortrait) {
                    const flavorElement: JQuery = html.find('.flavor-text');
                    const copiedElement: Node = flavorElement[0].cloneNode(true);
                    flavorElement.remove();
                    const brElement: HTMLElement = document.createElement('br');
                    const senderElement: HTMLElement = html.find('.message-sender')[0];
                    senderElement.appendChild(brElement);
                    senderElement.appendChild(copiedElement);
                }
            }
            ChatPortrait.setChatMessageBackground(html, messageData, authorColor);
            ChatPortrait.setChatMessageBorder(html, messageData, authorColor);
        }
    }

    /**
     * Load the appropriate actor image path for a given message, leveraging token or actor or actor search.
     * @param  {{scene?:string;actor?:string;token?:string;alias?:string;}} speaker
     * @returns string
     */
    static loadActorImagePathForChatMessage(speaker: {
        scene?: string;
        actor?: string;
        token?: string;
        alias?: string;
    }): string {
        if (!speaker.token && !speaker.actor) return;
        const useTokenImage: boolean = this.settings.useTokenImage;
        let actor: Actor;
        if (speaker.token) {
            actor = game.actors.tokens[speaker.token];
            if (!actor) {
                const tokenData = game.scenes.get(speaker.scene)?.data?.tokens?.find(t => t._id === speaker.token);
                if (useTokenImage && tokenData?.img) {
                    return tokenData.img;
                } else if (!useTokenImage && tokenData?.actorData?.img) {
                    return tokenData.actorData.img;
                }
            }
        }
        if (!actor) {
            actor = game.actors.get(speaker.actor);
        }
        const forceNameSearch = this.settings.forceNameSearch;
        if (!actor && forceNameSearch) {
            actor = game.actors.find((a: Actor) => a.name === speaker.alias);
        }
        return useTokenImage ? actor?.data?.token?.img : actor?.img;
    }

    /**
     * Generate portrait HTML Image Element to insert into chat messages.
     * @param  {string} imgPath
     * @returns HTMLImageElement
     */
    static generatePortraitImageElement(imgPath: string): HTMLImageElement {
        if (!imgPath)
            return;
        const img: HTMLImageElement = document.createElement('img');
        img.src = imgPath;
        const size: number = this.settings.portraitSize;
        img.width = size;
        img.height = size;
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
        return mergeObject(this.defaultSettings, <ChatPortraitSettings>game.settings.get(MODULE_NAME, 'settings'));
    }

    /**
     * Get default settings object.
     * @returns ChatPortraitSetting
     */
    static get defaultSettings(): ChatPortraitSettings {
        return {
            useTokenImage: false,
            portraitSize: 36,
            borderShape: 'square',
            useUserColorAsBorderColor: true,
            borderColor: '#000000',
            borderWidth: 2,
            useUserColorAsChatBackgroundColor: false,
            useUserColorAsChatBorderColor: false,
            flavorNextToPortrait: false,
            forceNameSearch: false
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

}