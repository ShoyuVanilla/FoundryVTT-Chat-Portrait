// import { ChatPortraitForm } from './ChatPortraitForm';
import CONSTANTS from './constants';
import { dialogWarning, i18n, warn } from './lib/lib';
import { SYSTEMS } from './systems';

// export const CONSTANTS.MODULE_NAME = 'chat-portrait';

// export const INV_UNIDENTIFIED_BOOK = `/modules/${CONSTANTS.MODULE_NAME}/assets/inv-unidentified-book.png`;

// export const CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME = 'mystery-man';

export const registerSettings = function () {
  game.settings.registerMenu(CONSTANTS.MODULE_NAME, 'resetAllSettings', {
    name: `${CONSTANTS.MODULE_NAME}.setting.reset.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.reset.hint`,
    icon: 'fas fa-coins',
    type: ResetSettingsDialog,
    restricted: true,
  });

  // =====================================================================

  // game.settings.registerMenu(CONSTANTS.MODULE_NAME, CONSTANTS.MODULE_NAME, {
  //   name: i18n(CONSTANTS.MODULE_NAME + '.form'),
  //   label: i18n(CONSTANTS.MODULE_NAME + '.form-title'),
  //   hint: i18n(CONSTANTS.MODULE_NAME + '.form-hint'),
  //   icon: 'fas fa-portrait',
  //   type: ChatPortraitForm,
  //   restricted: true,
  // });

  // Form setitngs

  game.settings.register(CONSTANTS.MODULE_NAME, 'useTokenImage', {
    name: `${CONSTANTS.MODULE_NAME}.settings.useTokenImage.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.useTokenImage.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'doNotUseTokenImageWithSpecificType', {
    name: `${CONSTANTS.MODULE_NAME}.settings.doNotUseTokenImageWithSpecificType.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.doNotUseTokenImageWithSpecificType.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: '',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useTokenName', {
    name: `${CONSTANTS.MODULE_NAME}.settings.useTokenName.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.useTokenName.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useAvatarImage', {
    name: `${CONSTANTS.MODULE_NAME}.settings.useAvatarImage.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.useAvatarImage.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayPlayerName', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displayPlayerName.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displayPlayerName.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'portraitSize', {
    name: `${CONSTANTS.MODULE_NAME}.settings.portraitSize.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.portraitSize.hint`,
    scope: 'client',
    config: true,
    type: Number,
    default: 36,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'portraitSizeItem', {
    name: `${CONSTANTS.MODULE_NAME}.settings.portraitSizeItem.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.portraitSizeItem.hint`,
    scope: 'client',
    config: true,
    type: Number,
    default: 36,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'borderShape', {
    name: `${CONSTANTS.MODULE_NAME}.settings.borderShape.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.borderShape.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: 'square',
    choices: <any>{
      square: i18n(`${CONSTANTS.MODULE_NAME}.settings.borderShape.choice.square`),
      circle: i18n(`${CONSTANTS.MODULE_NAME}.settings.borderShape.choice.circle`),
      none: i18n(`${CONSTANTS.MODULE_NAME}.settings.borderShape.choice.none`),
    },
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useUserColorAsBorderColor', {
    name: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsBorderColor.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsBorderColor.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'borderColor', {
    name: `${CONSTANTS.MODULE_NAME}.settings.borderColor.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.borderColor.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: '#000000',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'borderWidth', {
    name: `${CONSTANTS.MODULE_NAME}.settings.borderWidth.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.borderWidth.hint`,
    scope: 'world',
    config: true,
    type: Number,
    default: 2,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useUserColorAsChatBackgroundColor', {
    name: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsChatBackgroundColor.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsChatBackgroundColor.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useUserColorAsChatBorderColor', {
    name: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsChatBorderColor.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsChatBorderColor.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'flavorNextToPortrait', {
    name: `${CONSTANTS.MODULE_NAME}.settings.flavorNextToPortrait.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.flavorNextToPortrait.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'forceNameSearch', {
    name: `${CONSTANTS.MODULE_NAME}.settings.forceNameSearch.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.forceNameSearch.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  // game.settings.register(CONSTANTS.MODULE_NAME,'hoverTooltip', {
  //   // name : game.i18n.localize('chat-portrait.settings.hoverTooltip.name'),
  //   // hint : game.i18n.localize('chat-portrait.settings.hoverTooltip.hint'),
  //   scope : 'world',
  //   config : false,
  //   type : Boolean,
  //   default : false,
  //   onChange: value => { ChatLink.updateSettings(); }
  // });

  game.settings.register(CONSTANTS.MODULE_NAME, 'textSizeName', {
    name: `${CONSTANTS.MODULE_NAME}.settings.textSizeName.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.textSizeName.hint`,
    scope: 'world',
    config: true,
    type: Number,
    default: 0,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayMessageTag', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displayMessageTag.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displayMessageTag.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useImageReplacer', {
    name: `${CONSTANTS.MODULE_NAME}.settings.useImageReplacer.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.useImageReplacer.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useImageReplacerDamageType', {
    name: `${CONSTANTS.MODULE_NAME}.settings.useImageReplacerDamageType.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.useImageReplacerDamageType.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'applyOnCombatTracker', {
    name: `${CONSTANTS.MODULE_NAME}.settings.applyOnCombatTracker.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.applyOnCombatTracker.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'applyPreCreateChatMessagePatch', {
    name: `${CONSTANTS.MODULE_NAME}.settings.applyPreCreateChatMessagePatch.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.applyPreCreateChatMessagePatch.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySetting', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displaySetting.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displaySetting.hint`,
    scope: 'world',
    config: true,
    default: 'allCards',
    type: String,
    choices: <any>{
      allCards: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.allCards`),
      selfAndGM: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.selfAndGM`),
      self: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.self`),
      gm: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.gm`),
      player: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.player`),
      none: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.none`),
    },
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingOTHER', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingOTHER.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingOTHER.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingOOC', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingOOC.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingOOC.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingIC', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingIC.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingIC.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingEMOTE', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingEMOTE.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingEMOTE.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingWHISPER', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingWHISPER.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingWHISPER.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingROLL', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingROLL.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingROLL.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingWhisperToOther', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingWhisperToOther.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingWhisperToOther.hint`,
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayUnknown', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displayUnknown.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displayUnknown.hint`,
    scope: 'world',
    config: true,
    default: 'none',
    type: String,
    choices: <any>{
      allCards: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.allCards`),
      selfAndGM: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.selfAndGM`),
      self: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.self`),
      gm: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.gm`),
      player: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.player`),
      none: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.none`),
      onlyNpc: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.onlyNpc`),
    },
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderActorName', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderActorName.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderActorName.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: 'Unknown Actor',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderItemName', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderItemName.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderItemName.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: 'Unknown Item',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderItemIcon', {
    name: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderItemIcon.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderItemIcon.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: `/modules/${CONSTANTS.MODULE_NAME}/assets/inv-unidentified.png`,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem', {
    name: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageSystem.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageSystem.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'customStylingMessageText', {
    name: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageText.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageText.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: '',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'customStylingMessageImage', {
    name: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageImage.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageImage.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: '',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'disablePortraitForAliasGmMessage', {
    name: `${CONSTANTS.MODULE_NAME}.settings.disablePortraitForAliasGmMessage.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.disablePortraitForAliasGmMessage.hint`,
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'setUpPortraitForAliasGmMessage', {
    name: `${CONSTANTS.MODULE_NAME}.settings.setUpPortraitForAliasGmMessage.name`,
    hint: `${CONSTANTS.MODULE_NAME}.settings.setUpPortraitForAliasGmMessage.hint`,
    scope: 'world',
    config: true,
    type: String,
    default: '',
  });

  // ========================================================================

  game.settings.register(CONSTANTS.MODULE_NAME, 'debug', {
    name: `${CONSTANTS.MODULE_NAME}.setting.debug.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.debug.hint`,
    scope: 'client',
    config: true,
    default: false,
    type: Boolean,
  });

  // game.settings.register(CONSTANTS.MODULE_NAME, 'debugHooks', {
  //   scope: 'world',
  //   config: false,
  //   default: false,
  //   type: Boolean,
  // });

  game.settings.register(CONSTANTS.MODULE_NAME, 'systemFound', {
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown', {
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'preconfiguredSystem', {
    name: `${CONSTANTS.MODULE_NAME}.setting.preconfiguredSystem.name`,
    hint: `${CONSTANTS.MODULE_NAME}.setting.preconfiguredSystem.hint`,
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });

  const settings = defaultSettings();
  for (const [name, data] of Object.entries(settings)) {
    game.settings.register(CONSTANTS.MODULE_NAME, name, <any>data);
  }

  // for (const [name, data] of Object.entries(otherSettings)) {
  //     game.settings.register(CONSTANTS.MODULE_NAME, name, data);
  // }
};

class ResetSettingsDialog extends FormApplication<FormApplicationOptions, object, any> {
  constructor(...args) {
    //@ts-ignore
    super(...args);
    //@ts-ignore
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.title`),
      content:
        '<p style="margin-bottom:1rem;">' +
        game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.content`) +
        '</p>',
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.confirm`),
          callback: async () => {
            await applyDefaultSettings(true);
            window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.resetsettings.cancel`),
        },
      },
      default: 'cancel',
    });
  }

  async _updateObject(event: Event, formData?: object): Promise<any> {
    // do nothing
  }
}

async function applyDefaultSettings(explicit:boolean) {
  const settings = defaultSettings(true);
  for (const [name, data] of Object.entries(settings)) {
    await game.settings.set(CONSTANTS.MODULE_NAME, name, data.default);
  }
  if(explicit){
    const settings2 = otherSettings(true);
    for (const [name, data] of Object.entries(settings2)) {
      //@ts-ignore
      await game.settings.set(CONSTANTS.MODULE_NAME, name, data.default);
    }
  }
}

function defaultSettings(apply = false) {
  return {
    imageReplacerDamageType: {
      name: `${CONSTANTS.MODULE_NAME}.setting.imageReplacerDamageType.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.imageReplacerDamageType.hint`,
      scope: 'world',
      config: false,
      default: apply && SYSTEMS.DATA ? SYSTEMS.DATA.imageReplacerDamageType : [],
      type: Array,
    },
    imageReplacerWeaponProperties: {
      name: `${CONSTANTS.MODULE_NAME}.setting.imageReplacerWeaponProperties.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.imageReplacerWeaponProperties.hint`,
      scope: 'world',
      config: false,
      default: apply && SYSTEMS.DATA ? SYSTEMS.DATA.imageReplacerWeaponProperties : [],
      type: Array,
    },
    imageReplacerIconizer: {
      name: `${CONSTANTS.MODULE_NAME}.setting.imageReplacerIconizer.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.imageReplacerIconizer.hint`,
      scope: 'world',
      config: false,
      default: apply && SYSTEMS.DATA ? SYSTEMS.DATA.imageReplacerIconizer : [],
      type: Array,
    },
  };
}

function otherSettings(apply = false) {
  return {
    useTokenImage: {
      name: `${CONSTANTS.MODULE_NAME}.settings.useTokenImage.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.useTokenImage.hint`,
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
    },

    doNotUseTokenImageWithSpecificType: {
      name: `${CONSTANTS.MODULE_NAME}.settings.doNotUseTokenImageWithSpecificType.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.doNotUseTokenImageWithSpecificType.hint`,
      scope: 'world',
      config: true,
      type: String,
      default: '',
    },

    useTokenName: {
      name: `${CONSTANTS.MODULE_NAME}.settings.useTokenName.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.useTokenName.hint`,
      scope: 'client',
      config: true,
      type: Boolean,
      default: false,
    },

    useAvatarImage: {
      name: `${CONSTANTS.MODULE_NAME}.settings.useAvatarImage.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.useAvatarImage.hint`,
      scope: 'client',
      config: true,
      type: Boolean,
      default: false,
    },

    displayPlayerName: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displayPlayerName.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displayPlayerName.hint`,
      scope: 'client',
      config: true,
      type: Boolean,
      default: false,
    },

    portraitSize: {
      name: `${CONSTANTS.MODULE_NAME}.settings.portraitSize.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.portraitSize.hint`,
      scope: 'client',
      config: false,
      type: Number,
      default: 36,
    },

    portraitSizeItem: {
      name: `${CONSTANTS.MODULE_NAME}.settings.portraitSizeItem.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.portraitSizeItem.hint`,
      scope: 'client',
      config: false,
      type: Number,
      default: 36,
    },

    borderShape: {
      name: `${CONSTANTS.MODULE_NAME}.settings.borderShape.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.borderShape.hint`,
      scope: 'world',
      config: false,
      type: String,
      default: 'square',
      choices: <any>{
        square: i18n(`${CONSTANTS.MODULE_NAME}.settings.borderShape.choice.square`),
        circle: i18n(`${CONSTANTS.MODULE_NAME}.settings.borderShape.choice.circle`),
        none: i18n(`${CONSTANTS.MODULE_NAME}.settings.borderShape.choice.none`),
      },
    },

    useUserColorAsBorderColor: {
      name: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsBorderColor.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsBorderColor.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: true,
    },

    borderColor: {
      name: `${CONSTANTS.MODULE_NAME}.settings.borderColor.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.borderColor.hint`,
      scope: 'world',
      config: false,
      type: String,
      default: '#000000',
    },

    borderWidth: {
      name: `${CONSTANTS.MODULE_NAME}.settings.borderWidth.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.borderWidth.hint`,
      scope: 'world',
      config: false,
      type: Number,
      default: 2,
    },

    useUserColorAsChatBackgroundColor: {
      name: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsChatBackgroundColor.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsChatBackgroundColor.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    useUserColorAsChatBorderColor: {
      name: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsChatBorderColor.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.useUserColorAsChatBorderColor.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    flavorNextToPortrait: {
      name: `${CONSTANTS.MODULE_NAME}.settings.flavorNextToPortrait.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.flavorNextToPortrait.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    forceNameSearch: {
      name: `${CONSTANTS.MODULE_NAME}.settings.forceNameSearch.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.forceNameSearch.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    // game.settings.register(CONSTANTS.MODULE_NAME,'hoverTooltip: {
    //   // name : game.i18n.localize('chat-portrait.settings.hoverTooltip.name'),
    //   // hint : game.i18n.localize('chat-portrait.settings.hoverTooltip.hint'),
    //   scope : 'world',
    //   config : false,
    //   type : Boolean,
    //   default : false,
    //   onChange: value => { ChatLink.updateSettings(); }
    // },

    textSizeName: {
      name: `${CONSTANTS.MODULE_NAME}.settings.textSizeName.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.textSizeName.hint`,
      scope: 'world',
      config: false,
      type: Number,
      default: 0,
    },

    displayMessageTag: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displayMessageTag.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displayMessageTag.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    useImageReplacer: {
      name: `${CONSTANTS.MODULE_NAME}.settings.useImageReplacer.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.useImageReplacer.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: true,
    },

    useImageReplacerDamageType: {
      name: `${CONSTANTS.MODULE_NAME}.settings.useImageReplacerDamageType.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.useImageReplacerDamageType.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    applyOnCombatTracker: {
      name: `${CONSTANTS.MODULE_NAME}.settings.applyOnCombatTracker.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.applyOnCombatTracker.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    applyPreCreateChatMessagePatch: {
      name: `${CONSTANTS.MODULE_NAME}.settings.applyPreCreateChatMessagePatch.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.applyPreCreateChatMessagePatch.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    displaySetting: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displaySetting.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displaySetting.hint`,
      scope: 'world',
      config: false,
      default: 'allCards',
      type: String,
      choices: <any>{
        allCards: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.allCards`),
        selfAndGM: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.selfAndGM`),
        self: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.self`),
        gm: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.gm`),
        player: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.player`),
        none: i18n(`${CONSTANTS.MODULE_NAME}.settings.displaySetting.choice.none`),
      },
    },

    displaySettingOTHER: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingOTHER.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingOTHER.hint`,
      scope: 'client',
      config: false,
      type: Boolean,
      default: true,
    },

    displaySettingOOC: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingOOC.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingOOC.hint`,
      scope: 'client',
      config: false,
      type: Boolean,
      default: true,
    },

    displaySettingIC: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingIC.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingIC.hint`,
      scope: 'client',
      config: false,
      type: Boolean,
      default: true,
    },

    displaySettingEMOTE: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingEMOTE.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingEMOTE.hint`,
      scope: 'client',
      config: false,
      type: Boolean,
      default: true,
    },

    displaySettingWHISPER: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingWHISPER.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingWHISPER.hint`,
      scope: 'client',
      config: false,
      type: Boolean,
      default: true,
    },

    displaySettingROLL: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingROLL.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingROLL.hint`,
      scope: 'client',
      config: false,
      type: Boolean,
      default: true,
    },

    displaySettingWhisperToOther: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displaySettingWhisperToOther.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displaySettingWhisperToOther.hint`,
      scope: 'client',
      config: false,
      type: Boolean,
      default: false,
    },

    displayUnknown: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displayUnknown.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displayUnknown.hint`,
      scope: 'world',
      config: false,
      default: 'none',
      type: String,
      choices: <any>{
        allCards: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.allCards`),
        selfAndGM: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.selfAndGM`),
        self: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.self`),
        gm: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.gm`),
        player: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.player`),
        none: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.none`),
        onlyNpc: i18n(`${CONSTANTS.MODULE_NAME}.settings.displayUnknown.choice.onlyNpc`),
      },
    },

    displayUnknownPlaceHolderActorName: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderActorName.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderActorName.hint`,
      scope: 'world',
      config: false,
      type: String,
      default: 'Unknown Actor',
    },

    displayUnknownPlaceHolderItemName: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderItemName.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderItemName.hint`,
      scope: 'world',
      config: false,
      type: String,
      default: 'Unknown Item',
    },

    displayUnknownPlaceHolderItemIcon: {
      name: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderItemIcon.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.displayUnknownPlaceHolderItemIcon.hint`,
      scope: 'world',
      config: false,
      type: String,
      default: `/modules/${CONSTANTS.MODULE_NAME}/assets/inv-unidentified.png`,
    },

    customStylingMessageSystem: {
      name: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageSystem.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageSystem.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: true,
    },

    customStylingMessageText: {
      name: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageText.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageText.hint`,
      scope: 'world',
      config: false,
      type: String,
      default: '',
    },

    customStylingMessageImage: {
      name: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageImage.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.customStylingMessageImage.hint`,
      scope: 'world',
      config: false,
      type: String,
      default: '',
    },

    disablePortraitForAliasGmMessage: {
      name: `${CONSTANTS.MODULE_NAME}.settings.disablePortraitForAliasGmMessage.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.disablePortraitForAliasGmMessage.hint`,
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },

    setUpPortraitForAliasGmMessage: {
      name: `${CONSTANTS.MODULE_NAME}.settings.setUpPortraitForAliasGmMessage.name`,
      hint: `${CONSTANTS.MODULE_NAME}.settings.setUpPortraitForAliasGmMessage.hint`,
      scope: 'world',
      config: false,
      type: String,
      default: '',
    },

    // ========================================

    debug: {
      name: `${CONSTANTS.MODULE_NAME}.setting.debug.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.debug.hint`,
      scope: 'client',
      config: true,
      default: false,
      type: Boolean,
    },

    // debugHooks: {
    //   name: `${CONSTANTS.MODULE_NAME}.setting.debugHooks.name`,
    //   hint: `${CONSTANTS.MODULE_NAME}.setting.debugHooks.hint`,
    //   scope: 'world',
    //   config: false,
    //   default: false,
    //   type: Boolean,
    // },

    systemFound: {
      name: `${CONSTANTS.MODULE_NAME}.setting.systemFound.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.systemFound.hint`,
      scope: 'world',
      config: false,
      default: false,
      type: Boolean,
    },

    systemNotFoundWarningShown: {
      name: `${CONSTANTS.MODULE_NAME}.setting.systemNotFoundWarningShown.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.systemNotFoundWarningShown.hint`,
      scope: 'world',
      config: false,
      default: false,
      type: Boolean,
    },

    preconfiguredSystem: {
      name: `${CONSTANTS.MODULE_NAME}.setting.preconfiguredSystem.name`,
      hint: `${CONSTANTS.MODULE_NAME}.setting.preconfiguredSystem.hint`,
      scope: 'world',
      config: false,
      default: false,
      type: Boolean,
    },

    // =======================================
  };
}


export async function checkSystem() {
  // if (!SYSTEMS.DATA) {
  //   if (game.settings.get(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown')) return;

  //   await game.settings.set(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown', true);

  //   return Dialog.prompt({
  //     title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.nosystemfound.title`),
  //     content: dialogWarning(game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.nosystemfound.content`)),
  //     callback: () => {
  //       //
  //     },
  //   });
  // }

  // if (game.settings.get(CONSTANTS.MODULE_NAME, 'systemFound')) return;

  // game.settings.set(CONSTANTS.MODULE_NAME, 'systemFound', true);

  // if (game.settings.get(CONSTANTS.MODULE_NAME, 'systemNotFoundWarningShown')) {
  //   return new Dialog({
  //     title: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.systemfound.title`),
  //     content: warn(game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.systemfound.content`), true),
  //     buttons: {
  //       confirm: {
  //         icon: '<i class="fas fa-check"></i>',
  //         label: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.dialogs.systemfound.confirm`),
  //         callback: () => {
  //           applyDefaultSettings();
  //         },
  //       },
  //       cancel: {
  //         icon: '<i class="fas fa-times"></i>',
  //         label: game.i18n.localize('No'),
  //       },
  //     },
  //     default: 'cancel',
  //   }).render(true);
  // }

  return applyDefaultSettings(false);
}
