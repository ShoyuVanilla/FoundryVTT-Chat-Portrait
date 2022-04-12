import { i18n } from './lib/lib';
import CONSTANTS from './constants';

export class ChatPortraitForm extends FormApplication<FormApplicationOptions, object, any> {
  reset: boolean;

  // constructor(object, options = {}) {
  //   super(object, options);
  // }

  constructor(...args) {
    //@ts-ignore
    super(...args);
  }

  /**
   * Default Options for this FormApplication
   */
  static get defaultOptions(): FormApplicationOptions {
    return mergeObject(super.defaultOptions, {
      title: i18n(CONSTANTS.MODULE_NAME + '.form-title'),
      id: 'chat-portrait-form',
      template: `modules/${CONSTANTS.MODULE_NAME}/templates/chat-portrait-form.html`,
      width: 500,
      closeOnSubmit: true,
      classes: ['sheet'],
    });
  }

  getData(options?: any): any {
    /*
        return mergeObject(super.getData(),{
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
    if (this.reset) {
      data = {
        borderShapeList: this.getSelectList(this.borderShapeListOptions, 'square'),
        useTokenImage: false,
        doNotUseTokenImageWithSpecificType: '',
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
        // hoverTooltip: false,
        textSizeName: 0,
        displaySettingList: this.getSelectList(this.displaySettingListOptions, 'allCards'),
        useAvatarImage: false,
        displayPlayerName: false,
        displayUnknownList: this.getSelectList(this.displayUnknownListOptions, 'none'),
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
    } else {
      data = {
        borderShapeList: this.getSelectList(this.borderShapeListOptions, SettingsForm.getBorderShape()),
        useTokenImage: SettingsForm.getUseTokenImage(),
        doNotUseTokenImageWithSpecificType: SettingsForm.getDoNotUseTokenImageWithSpecificType(),
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
        // hoverTooltip: SettingsForm.getHoverTooltip(),
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

    return data;
  }

  activateListeners(html: JQuery): void {
    super.activateListeners(html);

    this.toggleBorderShape();
    this.toggleUseUserColorAsBorderColor();

    html.find('select[name="borderShape"]').change(this.toggleBorderShape.bind(this));
    html.find('input[name="useUserColorAsBorderColor"]').change(this.toggleUseUserColorAsBorderColor.bind(this));
    html
      .find('input[name="useUserColorAsBackgroundColor"]')
      .change(this.toggleUseUserColorAsBackgroundColor.bind(this));
    html.find('button[name="reset"]').click(this.onReset.bind(this));

    this.reset = false;
  }

  toggleBorderShape() {
    const noneBorder = $('select[name="borderShape"]').val() === 'none';
    const useUserColor: boolean = ($('input[name="useUserColorAsBorderColor"]')[0] as HTMLInputElement).checked;
    $('input[name="useUserColorAsBorderColor"]').prop('disabled', noneBorder);
    $('input[name="useUserColorAsBackgroundColor"]').prop('disabled', noneBorder);
    $('input[name="borderColor"]').prop('disabled', noneBorder || useUserColor);
    $('input[name="borderColorSelector"]').prop('disabled', noneBorder || useUserColor);
    $('input[name="borderWidth"]').prop('disabled', noneBorder);
  }

  toggleUseUserColorAsBorderColor() {
    const noneBorder = $('select[name="borderShape"]').val() === 'none';
    const useUserColor: boolean = ($('input[name="useUserColorAsBorderColor"]')[0] as HTMLInputElement).checked;
    $('input[name="borderColor"]').prop('disabled', noneBorder || useUserColor);
    $('input[name="borderColorSelector"]').prop('disabled', noneBorder || useUserColor);
  }

  toggleUseUserColorAsBackgroundColor() {
    const noneBorder = $('select[name="borderShape"]').val() === 'none';
    const useUserColor: boolean = ($('input[name="useUserColorAsBackgroundColor"]')[0] as HTMLInputElement).checked;
    $('input[name="borderColor"]').prop('disabled', noneBorder || useUserColor);
    $('input[name="borderColorSelector"]').prop('disabled', noneBorder || useUserColor);
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
    SettingsForm.setDoNotUseTokenImageWithSpecificType(formData.doNotUseTokenImageWithSpecificType);
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
    // SettingsForm.setHoverTooltip(formData.hoverTooltip);
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
    SettingsForm.setCustomStylingMessageSystem(formData.customStylingMessageSystem);
    SettingsForm.setCustomStylingMessageText(formData.customStylingMessageText);
    SettingsForm.setCustomStylingMessageImage(formData.customStylingMessageImage);
    SettingsForm.setDisplayMessageTag(formData.displayMessageTag);
    SettingsForm.setUseImageReplacer(formData.useImageReplacer);
    SettingsForm.setUseImageReplacerDamageType(formData.useImageReplacerDamageType);
    SettingsForm.setApplyOnCombatTracker(formData.applyOnCombatTracker);
    SettingsForm.setApplyPreCreateChatMessagePatch(formData.applyPreCreateChatMessagePatch);
    SettingsForm.setDisablePortraitForAliasGmMessage(formData.disablePortraitForAliasGmMessage);
    SettingsForm.setSetUpPortraitForAliasGmMessage(formData.setUpPortraitForAliasGmMessage);
  }

  getSelectList(myselectslist, selected) {
    const options: any[] = [];
    Object.keys(myselectslist).forEach((x, i) => {
      options.push({ value: x, selected: x == selected });
    });
    return options;
  }

  borderShapeListOptions: Record<string, string> = {
    square: i18n(CONSTANTS.MODULE_NAME + '.square'),
    circle: i18n(CONSTANTS.MODULE_NAME + '.circle'),
    none: i18n(CONSTANTS.MODULE_NAME + '.none'),
  };

  displaySettingListOptions: Record<string, string> = {
    allCards: i18n(CONSTANTS.MODULE_NAME + '.displaySetting.choice.allCards'), //"Affect every message.",
    selfAndGM: i18n(CONSTANTS.MODULE_NAME + '.displaySetting.choice.selfAndGM'), //"Affect own messages and GM messages.",
    self: i18n(CONSTANTS.MODULE_NAME + '.displaySetting.choice.self'), //"Only affect own messages.",
    gm: i18n(CONSTANTS.MODULE_NAME + '.displaySetting.choice.gm'), //"Only affect GM messages.",
    player: i18n(CONSTANTS.MODULE_NAME + '.displaySetting.choice.player'), //"Only affect player messages.",
    none: i18n(CONSTANTS.MODULE_NAME + '.displaySetting.choice.none'), //"Don't affect any messages.",
  };

  displayUnknownListOptions: Record<string, string> = {
    allCards: i18n(CONSTANTS.MODULE_NAME + '.displayUnknown.choice.allCards'), //"Affect every message.",
    selfAndGM: i18n(CONSTANTS.MODULE_NAME + '.displayUnknown.choice.selfAndGM'), //"Affect own messages and GM messages.",
    self: i18n(CONSTANTS.MODULE_NAME + '.displayUnknown.choice.self'), //"Only affect own messages.",
    gm: i18n(CONSTANTS.MODULE_NAME + '.displayUnknown.choice.gm'), //"Only affect GM messages.",
    player: i18n(CONSTANTS.MODULE_NAME + '.displayUnknown.choice.player'), //"Only affect player messages.",
    none: i18n(CONSTANTS.MODULE_NAME + '.displayUnknown.choice.none'), //"Don't affect any messages.",
    onlyNpc: i18n(CONSTANTS.MODULE_NAME + '.displayUnknown.choice.onlyNpc'), //"Affect any messages done from a NPC (need a compatible system with the 'npc' type like D&D5)."
  };
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
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'useTokenImage');
  }
  static setUseTokenImage(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'useTokenImage', value);
  }
  static getDoNotUseTokenImageWithSpecificType() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'doNotUseTokenImageWithSpecificType');
  }
  static setDoNotUseTokenImageWithSpecificType(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'doNotUseTokenImageWithSpecificType', value);
  }
  static getUseTokenName() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'useTokenName');
  }
  static setUseTokenName(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'useTokenName', value);
  }
  static getPortraitSize() {
    return <number>game.settings.get(CONSTANTS.MODULE_NAME, 'portraitSize');
  }
  static setPortraitSize(value: number) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'portraitSize', value);
  }
  static getPortraitSizeItem() {
    return <number>game.settings.get(CONSTANTS.MODULE_NAME, 'portraitSizeItem');
  }
  static setPortraitSizeItem(value: number) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'portraitSizeItem', value);
  }
  static getBorderShape() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'borderShape');
  }
  static setBorderShape(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'borderShape', value);
  }
  static getUseUserColorAsBorderColor() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'useUserColorAsBorderColor');
  }
  static setUseUserColorAsBorderColor(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'useUserColorAsBorderColor', value);
  }
  static getBorderColor() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'borderColor');
  }
  static setBorderColor(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'borderColor', value);
  }
  static getBorderWidth() {
    return <number>game.settings.get(CONSTANTS.MODULE_NAME, 'borderWidth');
  }
  static setBorderWidth(value: number) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'borderWidth', value);
  }
  static getUseUserColorAsChatBackgroundColor() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'useUserColorAsChatBackgroundColor');
  }
  static setUseUserColorAsChatBackgroundColor(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'useUserColorAsChatBackgroundColor', value);
  }
  static getUseUserColorAsChatBorderColor() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'useUserColorAsChatBorderColor');
  }
  static setUseUserColorAsChatBorderColor(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'useUserColorAsChatBorderColor', value);
  }
  static getFlavorNextToPortrait() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'flavorNextToPortrait');
  }
  static setFlavorNextToPortrait(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'flavorNextToPortrait', value);
  }
  static getForceNameSearch() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'forceNameSearch');
  }
  static setForceNameSearch(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'forceNameSearch', value);
  }
  // static getHoverTooltip() {
  //     return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'hoverTooltip');
  // }
  // static setHoverTooltip(value:boolean) {
  //     game.settings.set(CONSTANTS.MODULE_NAME,'hoverTooltip',value);
  // }
  static getTextSizeName() {
    return <number>game.settings.get(CONSTANTS.MODULE_NAME, 'textSizeName');
  }
  static setTextSizeName(value: number) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'textSizeName', value);
  }
  static getDisplaySetting() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'displaySetting');
  }
  static setDisplaySetting(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displaySetting', value);
  }
  static getUseAvatarImage() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'useAvatarImage');
  }
  static setUseAvatarImage(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'useAvatarImage', value);
  }
  static getDisplayPlayerName() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displayPlayerName');
  }
  static setDisplayPlayerName(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displayPlayerName', value);
  }
  static getDisplayUnknown() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'displayUnknown');
  }
  static setDisplayUnknown(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displayUnknown', value);
  }

  static getDisplayUnknownPlaceHolderActorName() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderActorName');
  }
  static setDisplayUnknownPlaceHolderActorName(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderActorName', value);
  }
  static getDisplayUnknownPlaceHolderItemName() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderItemName');
  }
  static setDisplayUnknownPlaceHolderItemName(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderItemName', value);
  }
  static getDisplayUnknownPlaceHolderItemIcon() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderItemIcon');
  }
  static setDisplayUnknownPlaceHolderItemIcon(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderItemIcon', value);
  }

  static getDisplaySettingOTHER() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displaySettingOTHER');
  }
  static setDisplaySettingOTHER(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displaySettingOTHER', value);
  }
  static getDisplaySettingOOC() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displaySettingOOC');
  }
  static setDisplaySettingOOC(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displaySettingOOC', value);
  }
  static getDisplaySettingIC() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displaySettingIC');
  }
  static setDisplaySettingIC(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displaySettingIC', value);
  }
  static getDisplaySettingEMOTE() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displaySettingEMOTE');
  }
  static setDisplaySettingEMOTE(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displaySettingEMOTE', value);
  }
  static getDisplaySettingWHISPER() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displaySettingWHISPER');
  }
  static setDisplaySettingWHISPER(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displaySettingWHISPER', value);
  }
  static getDisplaySettingROLL() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displaySettingROLL');
  }
  static setDisplaySettingROLL(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displaySettingROLL', value);
  }
  static getDisplaySettingWhisperToOther() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displaySettingWhisperToOther');
  }
  static setDisplaySettingWhisperToOther(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displaySettingWhisperToOther', value);
  }
  static getCustomStylingMessageSystem() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem');
  }
  static setCustomStylingMessageSystem(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem', value);
  }
  static getCustomStylingMessageText() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'customStylingMessageText');
  }
  static setCustomStylingMessageText(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'customStylingMessageText', value);
  }
  static getCustomStylingMessageImage() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'customStylingMessageImage');
  }
  static setCustomStylingMessageImage(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'customStylingMessageImage', value);
  }
  static getDisplayMessageTag() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'displayMessageTag');
  }
  static setDisplayMessageTag(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'displayMessageTag', value);
  }
  static getUseImageReplacer() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'useImageReplacer');
  }
  static setUseImageReplacer(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'useImageReplacer', value);
  }
  static getUseImageReplacerDamageType() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'useImageReplacerDamageType');
  }
  static setUseImageReplacerDamageType(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'useImageReplacerDamageType', value);
  }
  static getApplyOnCombatTracker() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'applyOnCombatTracker');
  }
  static setApplyOnCombatTracker(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'applyOnCombatTracker', value);
  }
  static getApplyPreCreateChatMessagePatch() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'applyPreCreateChatMessagePatch');
  }
  static setApplyPreCreateChatMessagePatch(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'applyPreCreateChatMessagePatch', value);
  }
  static getDisablePortraitForAliasGmMessage() {
    return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'disablePortraitForAliasGmMessage');
  }
  static setDisablePortraitForAliasGmMessage(value: boolean) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'disablePortraitForAliasGmMessage', value);
  }
  static getSetUpPortraitForAliasGmMessage() {
    return <string>game.settings.get(CONSTANTS.MODULE_NAME, 'setUpPortraitForAliasGmMessage');
  }
  static setSetUpPortraitForAliasGmMessage(value: string) {
    game.settings.set(CONSTANTS.MODULE_NAME, 'setUpPortraitForAliasGmMessage', value);
  }
}
