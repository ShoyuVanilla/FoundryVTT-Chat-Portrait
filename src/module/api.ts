import type { ImageReplaceVoiceData } from './ChatPortraitModels';
import CONSTANTS from './constants';
import { error } from './lib/lib';
import { SYSTEMS } from './systems';

const API = {
  /**
   * The attributes used to track dynamic attributes in this system
   *
   * @returns {array}
   */
  get imageReplacerDamageType(): ImageReplaceVoiceData[] {
    let arr = <ImageReplaceVoiceData[]>game.settings.get(CONSTANTS.MODULE_NAME, 'imageReplacerDamageType') || [];
    if (arr.length <= 0) {
      arr = <ImageReplaceVoiceData[]>SYSTEMS.DATA?.imageReplacerDamageType;
    }
    return arr;
  },

  /**
   * Sets the inAttribute used to track the passive perceptions in this system
   *
   * @param {String} inAttribute
   * @returns {Promise}
   */
  async setImageReplacerDamageType(inAttribute) {
    if (typeof inAttribute !== 'string') {
      throw error('setImageReplacerDamageType | inAttribute must be of type string');
    }
    await game.settings.set(CONSTANTS.MODULE_NAME, 'preconfiguredSystem', true);
    return game.settings.set(CONSTANTS.MODULE_NAME, 'imageReplacerDamageType', inAttribute);
  },

  /**
   * The attributes used to track dynamic attributes in this system
   *
   * @returns {array}
   */
  get imageReplacerWeaponProperties(): ImageReplaceVoiceData[] {
    let arr = <ImageReplaceVoiceData[]>game.settings.get(CONSTANTS.MODULE_NAME, 'imageReplacerWeaponProperties') || [];
    if (arr.length <= 0) {
      arr = <ImageReplaceVoiceData[]>SYSTEMS.DATA?.imageReplacerDamageType;
    }
    return arr;
  },

  /**
   * Sets the inAttribute used to track the passive perceptions in this system
   *
   * @param {String} inAttribute
   * @returns {Promise}
   */
  async setImageReplacerWeaponProperties(inAttribute) {
    if (typeof inAttribute !== 'string') {
      throw error('setImageReplacerWeaponProperties | inAttribute must be of type string');
    }
    await game.settings.set(CONSTANTS.MODULE_NAME, 'preconfiguredSystem', true);
    return game.settings.set(CONSTANTS.MODULE_NAME, 'imageReplacerWeaponProperties', inAttribute);
  },

  /**
   * The attributes used to track dynamic attributes in this system
   *
   * @returns {array}
   */
  get imageReplacerIconizer(): ImageReplaceVoiceData[] {
    let arr = <ImageReplaceVoiceData[]>game.settings.get(CONSTANTS.MODULE_NAME, 'imageReplacerIconizer') || [];
    if (arr.length <= 0) {
      arr = <ImageReplaceVoiceData[]>SYSTEMS.DATA?.imageReplacerDamageType;
    }
    return arr;
  },

  /**
   * Sets the inAttribute used to track the passive perceptions in this system
   *
   * @param {String} inAttribute
   * @returns {Promise}
   */
  async setImageReplacerIconizer(inAttribute) {
    if (typeof inAttribute !== 'string') {
      throw error('setImageReplacerIconizer | inAttribute must be of type string');
    }
    await game.settings.set(CONSTANTS.MODULE_NAME, 'preconfiguredSystem', true);
    return game.settings.set(CONSTANTS.MODULE_NAME, 'imageReplacerIconizer', inAttribute);
  },

  retrieveSystemId(): string {
    const sys = SYSTEMS.DATA?.SYSTEM_ID;
    if (sys && game.system.id === sys) {
      return sys;
    } else {
      return 'generic';
    }
  },
};

export default API;
