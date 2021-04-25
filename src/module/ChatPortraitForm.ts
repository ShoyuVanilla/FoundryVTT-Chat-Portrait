import { SimpleRope } from "pixi.js";
import { i18n } from "../main";
import { ChatPortrait } from "./ChatPortrait";
import { MODULE_NAME } from "./settings";

export class ChatPortraitForm extends FormApplication {

    reset: boolean;

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions(): FormApplication.Options {
        //@ts-ignore
        return mergeObject(super.defaultOptions, {
            title: i18n(MODULE_NAME+'.form-title'),
            id: 'chat-portrait-form',
            template: `modules/${MODULE_NAME}/templates/chat-portrait-form.html`,
            width: 500,
            closeOnSubmit: true,
            classes: ["sheet"]
        });
    }

    getData(options?:any) {
        //@ts-ignore
        /*
        return mergeObject(super.getData(),{
                //@ts-ignore
                borderShapeList: {
                    'square': i18n(MODULE_NAME+'.square'),
                    'circle': i18n(MODULE_NAME+'.circle'),
                    'none': i18n(MODULE_NAME+'.none')
                }
            },
            this.reset ? ChatPortrait.defaultSettings :mergeObject(ChatPortrait.defaultSettings, game.settings.get(MODULE_NAME, 'settings'))
        );
        */
        const data = {
            borderShapeList: this.getSelectList(borderShapeListOptions, Settings.getBorderShapeList()),
            // ChatPortrait.defaultSettings
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
        };

        return data;

    }

    activateListeners(html: JQuery): void {
        super.activateListeners(html);

        this.toggleBorderShape();
        this.toggleUseUserColorAsBorderColor();

        html.find('select[name="borderShape"]').change(this.toggleBorderShape.bind(this));
        html.find('input[name="useUserColorAsBorderColor"]').change(this.toggleUseUserColorAsBorderColor.bind(this));
        html.find('input[name="useUserColorAsBackgroundColor"]').change(this.toggleUseUserColorAsBackgroundColor.bind(this));
        html.find('button[name="reset"]').click(this.onReset.bind(this));

        this.reset = false;
    }

    toggleBorderShape() {
        const noneBorder = $('select[name="borderShape"]').val() === 'none';
        const useUserColor: boolean = ($('input[name="useUserColorAsBorderColor"]')[0] as HTMLInputElement).checked;
        $('input[name="useUserColorAsBorderColor"]').prop("disabled", noneBorder);
        $('input[name="useUserColorAsBackgroundColor"]').prop("disabled", noneBorder);
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

    toggleUseUserColorAsBackgroundColor() {
        const noneBorder = $('select[name="borderShape"]').val() === 'none';
        const useUserColor: boolean = ($('input[name="useUserColorAsBackgroundColor"]')[0] as HTMLInputElement).checked;
        $('input[name="borderColor"]').prop("disabled", noneBorder || useUserColor);
        $('input[name="borderColorSelector"]').prop("disabled", noneBorder || useUserColor);
    }

    onReset() {
        this.reset = true;
        this.render();
    }

     /**
     * Executes on form submission.
     * @param {Object} event - the form submission event
     * @param {Object} formData - the form data
     */
    async _updateObject(event: Event | JQuery.Event, formData: any): Promise<any> {
        let settings = mergeObject(ChatPortrait.settings, formData, 
            { 
                insertKeys: false, 
                insertValues: false 
            });
        await game.settings.set(MODULE_NAME, 'settings', settings);
    }

    getSelectList(myselectslist, selected) {
        let options = [];
        Object.keys(myselectslist).forEach((x, i) => {
            options.push({ value: x, selected: i == selected });
        });
        return options;
    }

}

export const borderShapeListOptions = {
    'square': i18n(MODULE_NAME+'.square'),
    'circle': i18n(MODULE_NAME+'.circle'),
    'none': i18n(MODULE_NAME+'.none')
}

/**
 * Provides functionality for interaction with module settings
 */
class Settings {

    //#region getters and setters
    static getBorderShapeList() {
        return game.settings.get(MODULE_NAME, 'borderShapeList');
    }

    
}