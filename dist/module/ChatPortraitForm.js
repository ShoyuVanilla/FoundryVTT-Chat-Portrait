import { i18n } from "../main.js";
import { CHAT_PORTRAIT_MODULE_NAME, getGame } from "./settings.js";
export class ChatPortraitForm extends FormApplication {
    constructor(object, options = {}) {
        super(object, options);
        this.borderShapeListOptions = {
            'square': i18n(CHAT_PORTRAIT_MODULE_NAME + '.square'),
            'circle': i18n(CHAT_PORTRAIT_MODULE_NAME + '.circle'),
            'none': i18n(CHAT_PORTRAIT_MODULE_NAME + '.none')
        };
        this.displaySettingListOptions = {
            'allCards': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displaySetting.choice.allCards'),
            'selfAndGM': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displaySetting.choice.selfAndGM'),
            'self': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displaySetting.choice.self'),
            'gm': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displaySetting.choice.gm'),
            'player': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displaySetting.choice.player'),
            'none': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displaySetting.choice.none'), //"Don't affect any messages.",
        };
        this.displayUnknownListOptions = {
            'allCards': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displayUnknown.choice.allCards'),
            'selfAndGM': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displayUnknown.choice.selfAndGM'),
            'self': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displayUnknown.choice.self'),
            'gm': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displayUnknown.choice.gm'),
            'player': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displayUnknown.choice.player'),
            'none': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displayUnknown.choice.none'),
            'onlyNpc': i18n(CHAT_PORTRAIT_MODULE_NAME + '.displayUnknown.choice.onlyNpc'), //"Affect any messages done from a NPC (need a compatible system with the 'npc' type like D&D5)."
        };
    }
    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            title: i18n(CHAT_PORTRAIT_MODULE_NAME + '.form-title'),
            id: 'chat-portrait-form',
            template: `modules/${CHAT_PORTRAIT_MODULE_NAME}/templates/chat-portrait-form.html`,
            width: 500,
            closeOnSubmit: true,
            classes: ["sheet"]
        });
    }
    getData(options) {
        /*
        return mergeObject(super.getData(),{
                borderShapeList: {
                    'square': i18n(MODULE_NAME+'.square'),
                    'circle': i18n(MODULE_NAME+'.circle'),
                    'none': i18n(MODULE_NAME+'.none')
                }
            },
            this.reset ? ChatPortrait.defaultSettings :mergeObject(ChatPortrait.defaultSettings, getGame().settings.get(MODULE_NAME, 'settings'))
        );
        */
        let data;
        if (this.reset) {
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
                displayPlayerName: false,
                displayUnknownList: this.getSelectList(this.displayUnknownListOptions, 'none'),
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
            };
        }
        else {
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
                displayPlayerName: SettingsForm.getDisplayPlayerName(),
                displayUnknownList: this.getSelectList(this.displayUnknownListOptions, SettingsForm.getDisplayUnknown()),
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
        return data;
    }
    activateListeners(html) {
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
        const useUserColor = $('input[name="useUserColorAsBorderColor"]')[0].checked;
        $('input[name="useUserColorAsBorderColor"]').prop("disabled", noneBorder);
        $('input[name="useUserColorAsBackgroundColor"]').prop("disabled", noneBorder);
        $('input[name="borderColor"]').prop("disabled", noneBorder || useUserColor);
        $('input[name="borderColorSelector"]').prop("disabled", noneBorder || useUserColor);
        $('input[name="borderWidth"]').prop("disabled", noneBorder);
    }
    toggleUseUserColorAsBorderColor() {
        const noneBorder = $('select[name="borderShape"]').val() === 'none';
        const useUserColor = $('input[name="useUserColorAsBorderColor"]')[0].checked;
        $('input[name="borderColor"]').prop("disabled", noneBorder || useUserColor);
        $('input[name="borderColorSelector"]').prop("disabled", noneBorder || useUserColor);
    }
    toggleUseUserColorAsBackgroundColor() {
        const noneBorder = $('select[name="borderShape"]').val() === 'none';
        const useUserColor = $('input[name="useUserColorAsBackgroundColor"]')[0].checked;
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
    async _updateObject(event, formData) {
        // let settings = mergeObject(ChatPortrait.settings, formData,
        //     {
        //         insertKeys: false,
        //         insertValues: false
        //     });
        // await getGame().settings.set(MODULE_NAME, 'settings', settings);
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
        SettingsForm.setDisplayPlayerName(formData.displayPlayerName);
        SettingsForm.setDisplayUnknown(formData.displayUnknown);
        SettingsForm.setDisplayUnknownPlaceHolderActorName(formData.displayUnknownPlaceHolderActorName);
        SettingsForm.setDisplayUnknownPlaceHolderItemName(formData.displayUnknownPlaceHolderItemName);
        SettingsForm.setDisplayUnknownPlaceHolderItemIcon(formData.displayUnknownPlaceHolderItemIcon);
        SettingsForm.setDisplaySettingOTHER(formData.displaySettingOTHER);
        SettingsForm.setDisplaySettingOOC(formData.displaySettingOOC);
        SettingsForm.setDisplaySettingIC(formData.displaySettingIC);
        SettingsForm.setDisplaySettingEMOTE(formData.displaySettingEMOTE);
        SettingsForm.setDisplaySettingWHISPER(formData.displaySettingWHISPER);
        SettingsForm.setDisplaySettingROLL(formData.displaySettingROLL);
        SettingsForm.setDisplaySettingWhisperToOther(formData.displaySettingWhisperToOther);
        SettingsForm.setCustomStylingMessageText(formData.customStylingMessageText);
        SettingsForm.setDisplayMessageTag(formData.displayMessageTag);
        SettingsForm.setUseImageReplacer(formData.useImageReplacer);
        SettingsForm.setUseImageReplacerDamageType(formData.useImageReplacerDamageType);
    }
    getSelectList(myselectslist, selected) {
        let options = [];
        Object.keys(myselectslist).forEach((x, i) => {
            options.push({ value: x, selected: x == selected });
        });
        return options;
    }
}
/**
 * Provides functionality for interaction with module settings
 */
export class SettingsForm {
    //#region getters and setters
    // static getBorderShapeList() {
    //     return getGame().settings.get(MODULE_NAME, 'borderShapeList');
    // }
    static getUseTokenImage() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'useTokenImage');
    }
    static setUseTokenImage(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'useTokenImage', value);
    }
    static getUseTokenName() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'useTokenName');
    }
    static setUseTokenName(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'useTokenName', value);
    }
    static getPortraitSize() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'portraitSize');
    }
    static setPortraitSize(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'portraitSize', value);
    }
    static getPortraitSizeItem() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'portraitSizeItem');
    }
    static setPortraitSizeItem(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'portraitSizeItem', value);
    }
    static getBorderShape() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'borderShape');
    }
    static setBorderShape(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'borderShape', value);
    }
    static getUseUserColorAsBorderColor() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsBorderColor');
    }
    static setUseUserColorAsBorderColor(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsBorderColor', value);
    }
    static getBorderColor() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'borderColor');
    }
    static setBorderColor(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'borderColor', value);
    }
    static getBorderWidth() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'borderWidth');
    }
    static setBorderWidth(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'borderWidth', value);
    }
    static getUseUserColorAsChatBackgroundColor() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsChatBackgroundColor');
    }
    static setUseUserColorAsChatBackgroundColor(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsChatBackgroundColor', value);
    }
    static getUseUserColorAsChatBorderColor() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsChatBorderColor');
    }
    static setUseUserColorAsChatBorderColor(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsChatBorderColor', value);
    }
    static getFlavorNextToPortrait() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'flavorNextToPortrait');
    }
    static setFlavorNextToPortrait(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'flavorNextToPortrait', value);
    }
    static getForceNameSearch() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'forceNameSearch');
    }
    static setForceNameSearch(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'forceNameSearch', value);
    }
    static getHoverTooltip() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'hoverTooltip');
    }
    static setHoverTooltip(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'hoverTooltip', value);
    }
    static getTextSizeName() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'textSizeName');
    }
    static setTextSizeName(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'textSizeName', value);
    }
    static getDisplaySetting() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displaySetting');
    }
    static setDisplaySetting(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displaySetting', value);
    }
    static getUseAvatarImage() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'useAvatarImage');
    }
    static setUseAvatarImage(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'useAvatarImage', value);
    }
    static getDisplayPlayerName() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displayPlayerName');
    }
    static setDisplayPlayerName(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displayPlayerName', value);
    }
    static getDisplayUnknown() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknown');
    }
    static setDisplayUnknown(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknown', value);
    }
    static getDisplayUnknownPlaceHolderActorName() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderActorName');
    }
    static setDisplayUnknownPlaceHolderActorName(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderActorName', value);
    }
    static getDisplayUnknownPlaceHolderItemName() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderItemName');
    }
    static setDisplayUnknownPlaceHolderItemName(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderItemName', value);
    }
    static getDisplayUnknownPlaceHolderItemIcon() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderItemIcon');
    }
    static setDisplayUnknownPlaceHolderItemIcon(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderItemIcon', value);
    }
    static getDisplaySettingOTHER() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingOTHER');
    }
    static setDisplaySettingOTHER(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingOTHER', value);
    }
    static getDisplaySettingOOC() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingOOC');
    }
    static setDisplaySettingOOC(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingOOC', value);
    }
    static getDisplaySettingIC() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingIC');
    }
    static setDisplaySettingIC(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingIC', value);
    }
    static getDisplaySettingEMOTE() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingEMOTE');
    }
    static setDisplaySettingEMOTE(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingEMOTE', value);
    }
    static getDisplaySettingWHISPER() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingWHISPER');
    }
    static setDisplaySettingWHISPER(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingWHISPER', value);
    }
    static getDisplaySettingROLL() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingROLL');
    }
    static setDisplaySettingROLL(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingROLL', value);
    }
    static getDisplaySettingWhisperToOther() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingWhisperToOther');
    }
    static setDisplaySettingWhisperToOther(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingWhisperToOther', value);
    }
    static getCustomStylingMessageText() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'customStylingMessageText');
    }
    static setCustomStylingMessageText(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'customStylingMessageText', value);
    }
    static getDisplayMessageTag() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'displayMessageTag');
    }
    static setDisplayMessageTag(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'displayMessageTag', value);
    }
    static getUseImageReplacer() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'useImageReplacer');
    }
    static setUseImageReplacer(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'useImageReplacer', value);
    }
    static getUseImageReplacerDamageType() {
        return getGame().settings.get(CHAT_PORTRAIT_MODULE_NAME, 'useImageReplacerDamageType');
    }
    static setUseImageReplacerDamageType(value) {
        getGame().settings.set(CHAT_PORTRAIT_MODULE_NAME, 'useImageReplacerDamageType', value);
    }
}
