import { ChatPortraitForm } from './ChatPortraitForm';
import { ChatPortrait } from './ChatPortrait';
import CONSTANTS from './constants';
import { i18n } from './lib/lib';

// export const CONSTANTS.MODULE_NAME = 'chat-portrait';

// export const INV_UNIDENTIFIED_BOOK = `/modules/${CONSTANTS.MODULE_NAME}/assets/inv-unidentified-book.png`;

// export const CHAT_PORTRAIT_DEF_TOKEN_IMG_NAME = 'mystery-man';

export const registerSettings = function () {
  game.settings.registerMenu(CONSTANTS.MODULE_NAME, CONSTANTS.MODULE_NAME, {
    name: i18n(CONSTANTS.MODULE_NAME + '.form'),
    label: i18n(CONSTANTS.MODULE_NAME + '.form-title'),
    hint: i18n(CONSTANTS.MODULE_NAME + '.form-hint'),
    icon: 'fas fa-portrait',
    type: ChatPortraitForm,
    restricted: true,
  });

  // game.settings.register(MODULE_NAME, "settings", {
  //     name: "Chat Portrait Settings",
  //     scope: "world",
  //     default: ChatPortrait.defaultSettings,
  //     type: Object,
  //     config: false,
  //     onChange: (x: any) => {
  //       window.location.reload();
  //     }
  // });

  // Form setitngs

  game.settings.register(CONSTANTS.MODULE_NAME, 'useTokenImage', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'doNotUseTokenImageWithSpecificType', {
    scope: 'world',
    config: false,
    type: String,
    default: '',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useTokenName', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useAvatarImage', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayPlayerName', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'portraitSize', {
    scope: 'world',
    config: false,
    type: Number,
    default: 36,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'portraitSizeItem', {
    scope: 'world',
    config: false,
    type: Number,
    default: 36,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'borderShape', {
    scope: 'world',
    config: false,
    type: String,
    default: 'square',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useUserColorAsBorderColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: true,
  });

  // new ColorSetting(MODULE_NAME, 'borderColor', {
  //     scope: "world",
  //     config: false,
  //     type: String,
  //     defaultColor: hexToRGBAString(0x000000, 1),
  //     default: '#000000'
  // });

  game.settings.register(CONSTANTS.MODULE_NAME, 'borderColor', {
    scope: 'world',
    config: false,
    type: String,
    default: '#000000',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'borderWidth', {
    scope: 'world',
    config: false,
    type: Number,
    default: 2,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useUserColorAsChatBackgroundColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useUserColorAsChatBorderColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'flavorNextToPortrait', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'forceNameSearch', {
    scope: 'world',
    config: false,
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
    scope: 'world',
    config: false,
    type: Number,
    default: 0,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayMessageTag', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useImageReplacer', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'useImageReplacerDamageType', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'applyOnCombatTracker', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'applyPreCreateChatMessagePatch', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySetting', {
    //name: "Display setting",
    //hint: "Configure which cards should receive custom styling, and which ones should be left as default. Changing this may require you to refresh your window.",
    scope: 'world',
    config: false,
    default: 'allCards',
    type: String,
    // choices: {
    //     "allCards": "Affect every message.",
    //     "selfAndGM": "Affect own messages and GM messages.",
    //     "self": "Only affect own messages.",
    //     "gm": "Only affect GM messages.",
    //     "player": "Only affect player messages.",
    //     "none": "Don't affect any messages."
    // }
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingOTHER', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingOOC', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingIC', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingEMOTE', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingWHISPER', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingROLL', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displaySettingWhisperToOther', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayUnknown', {
    //name: "Display setting",
    //hint: "Configure which cards should receive custom styling, and which ones should be left as default. Changing this may require you to refresh your window.",
    scope: 'world',
    config: false,
    default: 'none',
    type: String,
    // choices: {
    //     "allCards": "Affect every message.",
    //     "selfAndGM": "Affect own messages and GM messages.",
    //     "self": "Only affect own messages.",
    //     "gm": "Only affect GM messages.",
    //     "player": "Only affect player messages.",
    //     "none": "Don't affect any messages."
    // }
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderActorName', {
    scope: 'world',
    config: false,
    type: String,
    default: 'Unknown Actor',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderItemName', {
    scope: 'world',
    config: false,
    type: String,
    default: 'Unknown Item',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'displayUnknownPlaceHolderItemIcon', {
    scope: 'world',
    config: false,
    type: String,
    default: `/modules/${CONSTANTS.MODULE_NAME}/assets/inv-unidentified.png`,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'customStylingMessageSystem', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: true,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'customStylingMessageText', {
    scope: 'world',
    config: false,
    type: String,
    default: '',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'customStylingMessageImage', {
    scope: 'world',
    config: false,
    type: String,
    default: '',
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'disablePortraitForAliasGmMessage', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_NAME, 'setUpPortraitForAliasGmMessage', {
    scope: 'world',
    config: false,
    type: String,
    default: '',
  });
};

// function setup(templateSettings) {
// 	templateSettings.settings().forEach(setting => {
// 		let options = {
// 			name: i18n(templateSettings.name()+"."+setting.name+'.Name'),
// 			hint: i18n(`${templateSettings.name()}.${setting.name}.Hint`),
// 			scope: setting.scope,
// 			config: true,
// 			default: setting.default,
// 			type: setting.type,
// 			choices: {}
// 		};
// 		if (setting.choices) options.choices = setting.choices;
// 		game.settings.register(templateSettings.name(), setting.name, options);
// 	});
// }
