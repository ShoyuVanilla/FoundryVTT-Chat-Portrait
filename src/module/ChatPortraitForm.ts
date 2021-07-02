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

    getData(options?:any):any {
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

        let data;
        if(this.reset){
            data = {
                borderShapeList: this.getSelectList(this.borderShapeListOptions, 'square'),
                useTokenImage: false,
                useTokenName: false,
                portraitSize: 36,
                portraitSizeItem: 36,
                //borderShape: 'square',
                useUserColorAsBorderColor: true,
                borderColor: '#000000',
                borderWidth: 2,
                useUserColorAsChatBackgroundColor: false,
                useUserColorAsChatBorderColor: false,
                flavorNextToPortrait: false,
                forceNameSearch: false,
                hoverTooltip: false,
                textSizeName: 0,
                displaySettingList: this.getSelectList(this.displaySettingListOptions, 'allCards'),
                useAvatarImage: false,
                displayUnknownList: this.getSelectList(this.displayUnknownListOptions, 'none'),
            };
        }else{
            data = {
                borderShapeList: this.getSelectList(this.borderShapeListOptions, SettingsForm.getBorderShape()),
                useTokenImage: SettingsForm.getUseTokenImage(),
                useTokenName: SettingsForm.getUseTokenName(),
                portraitSize: SettingsForm.getPortraitSize(),
                portraitSizeItem: SettingsForm.getPortraitSizeItem(),
                //borderShape: this.getSelectList(borderShapeListOptions, Settings.getBorderShapeList()),
                useUserColorAsBorderColor: SettingsForm.getUseUserColorAsBorderColor(),
                borderColor: SettingsForm.getBorderColor(),
                borderWidth: SettingsForm.getBorderWidth(),
                useUserColorAsChatBackgroundColor: SettingsForm.getUseUserColorAsChatBackgroundColor(),
                useUserColorAsChatBorderColor: SettingsForm.getUseUserColorAsChatBorderColor(),
                flavorNextToPortrait: SettingsForm.getFlavorNextToPortrait(),
                forceNameSearch: SettingsForm.getForceNameSearch(),
                hoverTooltip: SettingsForm.getHoverTooltip(),
                textSizeName: SettingsForm.getTextSizeName(),
                displaySettingList: this.getSelectList(this.displaySettingListOptions, SettingsForm.getDisplaySetting()),
                useAvatarImage: SettingsForm.getUseAvatarImage(),
                displayUnknownList: this.getSelectList(this.displayUnknownListOptions, SettingsForm.getDisplayUnknown()),
            };
        }

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
        // let settings = mergeObject(ChatPortrait.settings, formData,
        //     {
        //         insertKeys: false,
        //         insertValues: false
        //     });
        // await game.settings.set(MODULE_NAME, 'settings', settings);

        SettingsForm.setUseTokenImage(formData.useTokenImage);
        SettingsForm.setUseTokenName(formData.useTokenName);
        SettingsForm.setPortraitSize(formData.portraitSize);
        SettingsForm.setPortraitSizeItem(formData.portraitSizeItem);
        SettingsForm.setBorderShape(formData.borderShape);
        SettingsForm.setUseUserColorAsBorderColor(formData.useUserColorAsBorderColor);
        SettingsForm.setBorderColor(formData.borderColor);
        SettingsForm.setBorderWidth(formData.borderWidth);
        SettingsForm.setUseUserColorAsChatBackgroundColor(formData.useUserColorAsChatBackgroundColor);
        SettingsForm.setUseUserColorAsChatBorderColor(formData.useUserColorAsChatBorderColor);
        SettingsForm.setFlavorNextToPortrait(formData.flavorNextToPortrait);
        SettingsForm.setForceNameSearch(formData.forceNameSearch);
        SettingsForm.setHoverTooltip(formData.hoverTooltip);
        SettingsForm.setTextSizeName(formData.textSizeName);
        SettingsForm.setDisplaySetting(formData.displaySetting);
        SettingsForm.setUseAvatarImage(formData.useAvatarImage);
        SettingsForm.setDisplayUnknown(formData.displayUnknown);
    }

    getSelectList(myselectslist, selected) {
        let options = [];
        Object.keys(myselectslist).forEach((x, i) => {
            options.push({ value: x, selected: x == selected });
        });
        return options;
    }

    borderShapeListOptions:Record<string, string>  = {
        'square': i18n(MODULE_NAME+'.square'),
        'circle': i18n(MODULE_NAME+'.circle'),
        'none': i18n(MODULE_NAME+'.none')
    }

    displaySettingListOptions:Record<string, string>  = {
        'allCards': i18n(MODULE_NAME+'.displaySetting.choice.allCards'),//"Affect every message.",
        'selfAndGM': i18n(MODULE_NAME+'.displaySetting.choice.selfAndGM'),//"Affect own messages and GM messages.",
        'self': i18n(MODULE_NAME+'.displaySetting.choice.self'),//"Only affect own messages.",
        'gm': i18n(MODULE_NAME+'.displaySetting.choice.gm'),//"Only affect GM messages.",
        'player': i18n(MODULE_NAME+'.displaySetting.choice.player'),//"Only affect player messages.",
        'none': i18n(MODULE_NAME+'.displaySetting.choice.none'),//"Don't affect any messages.",
    }

    displayUnknownListOptions:Record<string, string>  = {
      'allCards': i18n(MODULE_NAME+'.displayUnknown.choice.allCards'),//"Affect every message.",
      'selfAndGM': i18n(MODULE_NAME+'.displayUnknown.choice.selfAndGM'),//"Affect own messages and GM messages.",
      'self': i18n(MODULE_NAME+'.displayUnknown.choice.self'),//"Only affect own messages.",
      'gm': i18n(MODULE_NAME+'.displayUnknown.choice.gm'),//"Only affect GM messages.",
      'player': i18n(MODULE_NAME+'.displayUnknown.choice.player'),//"Only affect player messages.",
      'none': i18n(MODULE_NAME+'.displayUnknown.choice.none'),//"Don't affect any messages.",
      'onlyNpc': i18n(MODULE_NAME+'.displayUnknown.choice.onlyNpc'),//"Affect any messages done from a NPC (need a compatible system with the 'npc' type like D&D5)."
    }
}



/**
 * Provides functionality for interaction with module settings
 */
export class SettingsForm {

    //#region getters and setters
    // static getBorderShapeList() {
    //     return game.settings.get(MODULE_NAME, 'borderShapeList');
    // }

    static getUseTokenImage() {
        return <boolean>game.settings.get(MODULE_NAME, 'useTokenImage');
    }
    static setUseTokenImage(value:boolean) {
        game.settings.set(MODULE_NAME, 'useTokenImage',value);
    }
    static getUseTokenName() {
      return <boolean>game.settings.get(MODULE_NAME, 'useTokenName');
    }
    static setUseTokenName(value:boolean) {
        game.settings.set(MODULE_NAME, 'useTokenName',value);
    }
    static getPortraitSize() {
        return <number>game.settings.get(MODULE_NAME, 'portraitSize');
    }
    static setPortraitSize(value:number) {
        game.settings.set(MODULE_NAME, 'portraitSize',value);
    }
    static getPortraitSizeItem() {
        return <number>game.settings.get(MODULE_NAME, 'portraitSizeItem');
    }
    static setPortraitSizeItem(value:number) {
        game.settings.set(MODULE_NAME, 'portraitSizeItem',value);
    }
    static getBorderShape() {
        return <string>game.settings.get(MODULE_NAME, 'borderShape');
    }
    static setBorderShape(value:string) {
        game.settings.set(MODULE_NAME, 'borderShape',value);
    }
    static getUseUserColorAsBorderColor() {
        return <boolean>game.settings.get(MODULE_NAME, 'useUserColorAsBorderColor');
    }
    static setUseUserColorAsBorderColor(value:boolean) {
        game.settings.set(MODULE_NAME, 'useUserColorAsBorderColor',value);
    }
    static getBorderColor() {
        return <string>game.settings.get(MODULE_NAME, 'borderColor');
    }
    static setBorderColor(value:string) {
        game.settings.set(MODULE_NAME, 'borderColor',value);
    }
    static getBorderWidth() {
        return <number>game.settings.get(MODULE_NAME, 'borderWidth');
    }
    static setBorderWidth(value:number) {
        game.settings.set(MODULE_NAME, 'borderWidth',value);
    }
    static getUseUserColorAsChatBackgroundColor() {
        return <boolean>game.settings.get(MODULE_NAME, 'useUserColorAsChatBackgroundColor');
    }
    static setUseUserColorAsChatBackgroundColor(value:boolean) {
        game.settings.set(MODULE_NAME, 'useUserColorAsChatBackgroundColor',value);
    }
    static getUseUserColorAsChatBorderColor() {
        return <boolean>game.settings.get(MODULE_NAME, 'useUserColorAsChatBorderColor');
    }
    static setUseUserColorAsChatBorderColor(value:boolean) {
        game.settings.set(MODULE_NAME, 'useUserColorAsChatBorderColor',value);
    }
    static getFlavorNextToPortrait() {
        return <boolean>game.settings.get(MODULE_NAME, 'flavorNextToPortrait');
    }
    static setFlavorNextToPortrait(value:boolean) {
        game.settings.set(MODULE_NAME, 'flavorNextToPortrait',value);
    }
    static getForceNameSearch() {
        return <boolean>game.settings.get(MODULE_NAME, 'forceNameSearch');
    }
    static setForceNameSearch(value:boolean) {
        game.settings.set(MODULE_NAME, 'forceNameSearch',value);
    }
    static getHoverTooltip() {
        return <boolean>game.settings.get(MODULE_NAME, 'hoverTooltip');
    }
    static setHoverTooltip(value:boolean) {
        game.settings.set(MODULE_NAME,'hoverTooltip',value);
    }
    static getTextSizeName() {
        return <number>game.settings.get(MODULE_NAME, 'textSizeName');
    }
    static setTextSizeName(value:number) {
        game.settings.set(MODULE_NAME,'textSizeName',value);
    }
    static getDisplaySetting() {
        return <string>game.settings.get(MODULE_NAME, 'displaySetting');
    }
    static setDisplaySetting(value:string) {
        game.settings.set(MODULE_NAME, 'displaySetting',value);
    }
    static getUseAvatarImage() {
        return <boolean>game.settings.get(MODULE_NAME, 'useAvatarImage');
    }
    static setUseAvatarImage(value:boolean) {
        game.settings.set(MODULE_NAME, 'useAvatarImage',value);
    }
    static getDisplayUnknown() {
      return <string>game.settings.get(MODULE_NAME, 'displayUnknown');
    }
    static setDisplayUnknown(value:string) {
        game.settings.set(MODULE_NAME, 'displayUnknown',value);
    }
}
