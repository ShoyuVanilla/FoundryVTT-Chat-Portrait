import { SimpleRope } from "pixi.js";
import { i18n } from "../main";
import { ChatPortrait } from "./ChatPortrait";
import { MODULE_NAME } from "./settings";

export class ChatPortraitForm extends FormApplication {

    reset: boolean;

    constructor(){
        super();
    }
    
    static get defaultOptions(): FormApplication.Options {
        return mergeObject(super.defaultOptions, {
            title: i18n(MODULE_NAME+'.form-title'),
            id: 'chat-portrait-form',
            template: `modules/${MODULE_NAME}/templates/chat-portrait-form.html`,
            width: 500,
            closeOnSubmit: true
        });
    }

    getData(options?:any) {
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