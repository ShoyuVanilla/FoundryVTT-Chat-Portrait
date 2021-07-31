import { debug, log, setDebugLevel, warn, i18n } from '../main';
import { ChatPortraitForm } from './ChatPortraitForm';
import { ChatPortrait } from './ChatPortrait';

export const CHAT_PORTRAIT_MODULE_NAME = 'chat-portrait';

export const INV_UNIDENTIFIED_BOOK = `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/inv-unidentified-book.png`

/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
 export function getCanvas(): Canvas {
  if (!(canvas instanceof Canvas) || !canvas.ready) {
    throw new Error("Canvas Is Not Initialized");
  }
  return canvas;
}
/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
export function getGame(): Game {
  if (!(game instanceof Game)) {
    throw new Error("Game Is Not Initialized");
  }
  return game;
}



export const registerSettings = function () {

  getGame().settings.registerMenu(CHAT_PORTRAIT_MODULE_NAME, CHAT_PORTRAIT_MODULE_NAME, {
      name: i18n(CHAT_PORTRAIT_MODULE_NAME+".form"),
      label: i18n(CHAT_PORTRAIT_MODULE_NAME+".form-title"),
      hint: i18n(CHAT_PORTRAIT_MODULE_NAME+".form-hint"),
      icon: "fas fa-portrait",
      type: ChatPortraitForm,
      restricted: true
  });

  // getGame().settings.register(MODULE_NAME, "settings", {
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

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'useTokenImage', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'useTokenName', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'useAvatarImage', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displayPlayerName', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'portraitSize', {
    scope: 'world',
    config: false,
    type: Number,
    default: 36
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'portraitSizeItem', {
    scope: 'world',
    config: false,
    type: Number,
    default: 36
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'borderShape', {
      scope: 'world',
      config: false,
      type: String,
      default: "square"
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsBorderColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: true
  });

  // new ColorSetting(MODULE_NAME, 'borderColor', {
  //     scope: "world",
  //     config: false,
  //     type: String,
  //     defaultColor: hexToRGBAString(0x000000, 1),
  //     default: '#000000'
  // });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'borderColor', {
    scope: 'world',
    config: false,
    type: String,
    default: '#000000'
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'borderWidth', {
    scope: 'world',
    config: false,
    type: Number,
    default: 2
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsChatBackgroundColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default:false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'useUserColorAsChatBorderColor', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'flavorNextToPortrait', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'forceNameSearch', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  // getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME,'hoverTooltip', {
  //   // name : getGame().i18n.localize('chat-portrait.settings.hoverTooltip.name'),
  //   // hint : getGame().i18n.localize('chat-portrait.settings.hoverTooltip.hint'),
  //   scope : 'world',
  //   config : false,
  //   type : Boolean,
  //   default : false,
  //   onChange: value => { ChatLink.updateSettings(); }
  // });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'textSizeName', {
    scope: 'world',
    config: false,
    type: Number,
    default: 0
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displayMessageTag', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'useImageReplacer', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: true
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'useImageReplacerDamageType', {
    scope: 'world',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displaySetting', {
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

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingOTHER', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingOOC', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingIC', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingEMOTE', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingWHISPER', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingROLL', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: true
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displaySettingWhisperToOther', {
    scope: 'client',
    config: false,
    type: Boolean,
    default: false
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknown', {
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

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderActorName', {
    scope: 'world',
    config: false,
    type: String,
    default: 'Unknown Actor'
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderItemName', {
    scope: 'world',
    config: false,
    type: String,
    default: 'Unknown Item'
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'displayUnknownPlaceHolderItemIcon', {
    scope: 'world',
    config: false,
    type: String,
    default: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/inv-unidentified.png`
  });

  getGame().settings.register(CHAT_PORTRAIT_MODULE_NAME, 'customStylingMessageText', {
    scope: 'world',
    config: false,
    type: String,
    default: ''
  });



}

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
// 		getGame().settings.register(templateSettings.name(), setting.name, options);
// 	});
// }
