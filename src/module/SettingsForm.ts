import CONSTANTS from './constants';

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
  // static getCustomStylingMessageSystem() {
  //   return <boolean>game.settings.get(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem');
  // }
  // static setCustomStylingMessageSystem(value: boolean) {
  //   game.settings.set(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem', value);
  // }
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
