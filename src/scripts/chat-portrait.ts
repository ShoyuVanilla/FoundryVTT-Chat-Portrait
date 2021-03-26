export const MODULE_NAME = 'chat-portrait';

/**
 * Main class wrapper for all of our features.
 */
class ChatPortrait {

    /**
     * @param  {ChatMessage} chatMessage
     * @param  {JQuery} html
     * @param  {MessageRenderData} messageData
     */
    //@ts-ignore
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
            // @ts-ignore
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
                // @ts-ignore
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
     * Set the border color of the entire message to be the color for the author.
     * Only do so if
     *  - chatBorderColor setting is true AND
     *  - someone further up the chain hasn't already changed the color
     * @param  {JQuery} html
     * @param  {MessageRenderData} messageData
     * @param  {string} authorColor
     */
    //@ts-ignore
    static setChatMessageBorder(html: JQuery, messageData: MessageRenderData, authorColor: string) {
        const useUserBorderColor = this.settings.useUserColorAsChatBorderColor;

        // only override the border color if someone further up the chain hasn't already done so.
        if(useUserBorderColor && !messageData.borderColor) {
            html[0].style.borderColor = authorColor;
            messageData.borderColor = authorColor;
        }
    }

    static get settings(): ChatPortraitSettings {
        return mergeObject(this.defaultSettings, game.settings.get(MODULE_NAME, 'settings'));
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
    //             // @ts-ignore
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

interface ChatPortraitSettings {
    useTokenImage: boolean,
    portraitSize: number,
    borderShape: string,
    useUserColorAsBorderColor: boolean,
    borderColor: string,
    borderWidth: number,
    useUserColorAsChatBorderColor: boolean,
    flavorNextToPortrait: boolean,
    forceNameSearch: boolean
}


class ChatPortraitForm extends FormApplication {

    reset: boolean;
    //@ts-ignore
    static get defaultOptions(): FormApplicationOptions {
        return mergeObject(super.defaultOptions, {
            title: game.i18n.localize('chat-portrait.form-title'),
            id: 'chat-portrait-form',
            template: `modules/${MODULE_NAME}/templates/chat-portrait-form.html`,
            width: 500,
            closeOnSubmit: true
        })
    }

    getData(options: any) {
        return mergeObject({
                borderShapeList: {
                    'square': game.i18n.localize('chat-portrait.square'),
                    'circle': game.i18n.localize('chat-portrait.circle'),
                    'none': game.i18n.localize('chat-portrait.none')
                }
            },
            this.reset ? ChatPortrait.defaultSettings :
                mergeObject(ChatPortrait.defaultSettings, game.settings.get(MODULE_NAME, 'settings'))
        );
    }

    activateListeners(html: JQuery): void {
        super.activateListeners(html);

        this.toggleBorderShape();
        this.toggleUseUserColorAsBorderColor();

        html.find('select[name="borderShape"]').change(this.toggleBorderShape.bind(this));
        html.find('input[name="useUserColorAsBorderColor"]').change(this.toggleUseUserColorAsBorderColor.bind(this));
        html.find('button[name="reset"]').click(this.onReset.bind(this));

        this.reset = false;
    }

    toggleBorderShape() {
        const noneBorder = $('select[name="borderShape"]').val() === 'none';
        const useUserColor: boolean = ($('input[name="useUserColorAsBorderColor"]')[0] as HTMLInputElement).checked;
        $('input[name="useUserColorAsBorderColor"]').prop("disabled", noneBorder);
        $('input[name="borderColor"]').prop("disabled", noneBorder || useUserColor);
        $('input[name="borderColorSelector"]').prop("disabled", noneBorder || useUserColor);
        $('input[name="borderWidth"]').prop("disabled", noneBorder);
    }

    toggleUseUserColorAsBorderColor() {
        const noneBorder = $('select[name="borderShape"]').val() === 'none';
        const useUserColor: boolean = ($('input[name="useUserColorAsBorderColor"]')[0] as HTMLInputElement).checked;
        $('input[name="borderColor"]').prop("disabled", noneBorder || useUserColor);
        $('input[name="borderColorSelector"]').prop("disabled", noneBorder || useUserColor);
    }

    onReset() {
        this.reset = true;
        this.render();
    }

    async _updateObject(event: Event | JQuery.Event, formData: any): Promise<any> {
        let settings = mergeObject(ChatPortrait.settings, formData, { insertKeys: false, insertValues: false });
        await game.settings.set(MODULE_NAME, 'settings', settings);
    }

}

/**
 * These hooks register the following settings in the module settings.
 */
Hooks.once('init', () => {
    game.settings.registerMenu(MODULE_NAME, MODULE_NAME, {
        name: "chat-portrait.form",
        label: "chat-portrait.form-title",
        hint: "chat-portrait.form-hint",
        icon: "fas fa-portrait",
        type: ChatPortraitForm,
        restricted: true
    });

    game.settings.register(MODULE_NAME, "settings", {
        name: "Chat Portrait Settings",
        scope: "world",
        default: ChatPortrait.defaultSettings,
        type: Object,
        config: false,
        onChange: (x: any) => window.location.reload()
    });
});

/**
 * This line connects our method above with the chat rendering.
 * Note that this happens after the core code has already generated HTML.
 */
Hooks.on('renderChatMessage', ChatPortrait.onRenderChatMessage);
