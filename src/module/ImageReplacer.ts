import { CHAT_PORTRAIT_MODULE_NAME } from './settings';
import { i18n } from '../chat-portrait-main';
import { ImageReplaceVoiceData } from './ChatPortraitModels';

// export let ImageReplacerImpl: Record<string, string> = {};
// /**
//  * based on https://github.com/game-icons/icons/issues/516
//  */
// export const ImageReplacerInit = function (): Record<string, string> {
//   // if(game.i18n.lang=="en"){
//   //     ImageReplacerImpl = imageReplacerEn;
//   // }
//   // else if(game.i18n.lang=="ko"){
//   //     ImageReplacerImpl = imageReplacerKo;
//   // }
//   // // TODO OTHER LANGUAGE
//   // else{
//   //     ImageReplacerImpl = imageReplacerEn;
//   // }
//   ImageReplacerImpl = imageReplacerUniversal;
//   return ImageReplacerImpl;
// };

// export const imageReplacerUniversal: Record<string, string> = {
//   // =======================================================================
//   // dnd5e
//   // =======================================================================

//   'DND5E.DamageRoll': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/damage_roll.svg`, // https://game-icons.net/1x1/delapouite/dice-fire.html
//   'DND5E.AttackRoll': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/attack_roll.svg`, // https://game-icons.net/1x1/delapouite/dice-shield.html

//   'DND5E.AbilityStr': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/strength.svg`, // https://game-icons.net/1x1/delapouite/bear-head.html
//   'DND5E.AbilityDex': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/dexterity.svg`, // https://game-icons.net/1x1/delapouite/feline.html
//   'DND5E.AbilityCon': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/constitution.svg`, // https://game-icons.net/1x1/delapouite/weight-lifting-up.html
//   'DND5E.AbilityInt': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intelligence.svg`, // https://game-icons.net/1x1/lorc/fox-head.html
//   'DND5E.AbilityWis': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/wisdom.svg`, // https://game-icons.net/1x1/lorc/owl.html
//   'DND5E.AbilityCha': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/charisma.svg`, // https://game-icons.net/1x1/delapouite/eagle-head.html
//   'DND5E.Initiative': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/initiative.svg`, //https://game-icons.net/1x1/delapouite/acoustic-megaphone.html

//   'DND5E.SkillAcr': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/acrobatics.svg`, // https://game-icons.net/1x1/delapouite/contortionist.html
//   'DND5E.SkillAni': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/animal_handling.svg`, // https://game-icons.net/1x1/delapouite/cavalry.html
//   'DND5E.SkillArc': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/arcana.svg`, // https://game-icons.net/1x1/delapouite/spell-book.html
//   'DND5E.SkillAth': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/athletics.svg`, // https://game-icons.net/1x1/lorc/muscle-up.html
//   'DND5E.SkillDec': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/deception.svg`, // https://game-icons.net/1x1/delapouite/convince.html
//   'DND5E.SkillHis': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/history.svg`, // https://game-icons.net/1x1/delapouite/backward-time.html
//   'DND5E.SkillIns': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/insight.svg`, // https://game-icons.net/1x1/lorc/light-bulb.html
//   'DND5E.SkillItm': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intimidation.svg`, // https://game-icons.net/1x1/lorc/one-eyed.html
//   'DND5E.SkillInv': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/investigation.svg`, // https://game-icons.net/1x1/lorc/magnifying-glass.html
//   'DND5E.SkillMed': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/medicine.svg`, // https://game-icons.net/1x1/delapouite/first-aid-kit.html
//   'DND5E.SkillNat': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/nature.svg`, // https://game-icons.net/1x1/delapouite/forest.html
//   'DND5E.SkillPrc': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/perception.svg`, // https://game-icons.net/1x1/lorc/semi-closed-eye.htmlml
//   'DND5E.SkillPrf': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/performance.svg`, // https://game-icons.net/1x1/lorc/sing.html
//   'DND5E.SkillPer': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/persuasion.svg`, // https://game-icons.net/1x1/delapouite/public-speaker.html
//   'DND5E.SkillRel': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/religion.svg`, // https://game-icons.net/1x1/lorc/holy-grail.html
//   'DND5E.SkillSlt': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/sleight_of_hand.svg`, // https://game-icons.net/1x1/lorc/snatch.html
//   'DND5E.SkillSte': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/stealth.svg`, // https://game-icons.net/1x1/lorc/cloak-dagger.html
//   'DND5E.SkillSur': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/survival.svg`, // https://game-icons.net/1x1/delapouite/deer-track.html

//   'DND5E.ToolArtisans': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/artisan_s_tools.svg`, // https://game-icons.net/1x1/lorc/hammer-nails.html
//   'DND5E.ToolDisguiseKit': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/disguise_kit.svg`, // https://game-icons.net/1x1/lorc/duality-mask.html
//   'DND5E.ToolForgeryKit': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/forgery_kit`, // https://game-icons.net/1x1/lorc/quill-ink.html
//   'DND5E.ToolGamingSet': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/gaming_set.svg`, // https://game-icons.net/1x1/delapouite/rolling-dice-cup.html
//   'DND5E.ToolHerbalismKit': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/herbalism_kit`, // https://game-icons.net/1x1/delapouite/herbs-bundle.html
//   'DND5E.ToolMusicalInstrument': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/musical_instrument.svg`, // https://game-icons.net/1x1/zajkonur/violin.html
//   'DND5E.ToolNavigators': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/navigator_s_tools.svg`, // https://game-icons.net/1x1/delapouite/sextant.html
//   'DND5E.ToolPoisonersKit': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/poisoner_s_kit.svg`, // https://game-icons.net/1x1/lorc/poison-bottle.html
//   'DND5E.ToolThieves': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thieves_tools.svg`, // https://game-icons.net/1x1/delapouite/lockpicks.html

//   'DND5E.ShortRest': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/short_rest.svg`, // https://game-icons.net/1x1/delapouite/wooden-chair.html
//   'DND5E.LongRest': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/long_rest.svg`, // https://game-icons.net/1x1/delapouite/person-in-bed.html
//   'DND5E.DeathSave': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/death_saves.svg`,

//   // TODO CONDITION I JUST DON'T KNOW HO CAN BE USEFUL

//   // "DND5E.ConBlinded": "Blinded",
//   // "DND5E.ConCharmed": "Charmed",
//   // "DND5E.ConDeafened": "Deafened",
//   // "DND5E.ConDiseased": "Diseased",
//   // "DND5E.ConExhaustion": "Exhaustion",
//   // "DND5E.ConFrightened": "Frightened",
//   // "DND5E.ConGrappled": "Grappled",
//   // "DND5E.ConImm": "Condition Immunities",
//   // "DND5E.ConIncapacitated": "Incapacitated",
//   // "DND5E.ConInvisible": "Invisible",
//   // "DND5E.ConParalyzed": "Paralyzed",
//   // "DND5E.ConPetrified": "Petrified",
//   // "DND5E.ConPoisoned": "Poisoned",
//   // "DND5E.ConProne": "Prone",
//   // "DND5E.ConRestrained": "Restrained",
//   // "DND5E.ConStunned": "Stunned",
//   // "DND5E.ConUnconscious": "Unconscious",
//   // "DND5E.Concentration": "Concentration",

//   // "PF2E.AbilityBoost": "Ability Boost",
//   // "PF2E.AbilityBoostLevels": "Ability Boost Levels",
//   'PF2E.AbilityCha': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/charisma.svg`,
//   'PF2E.AbilityCon': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/constitution.svg`,
//   'PF2E.AbilityDex': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/dexterity.svg`,
//   'PF2E.AbilityFlaw': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/flaw.svg`,
//   'PF2E.AbilityInt': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intelligence.svg`,
//   // "PF2E.AbilityModifierLabel": "Ability Modifier",
//   // "PF2E.AbilityScoresHeader": "Ability Scores",
//   'PF2E.AbilityFree': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/free.svg`,
//   'PF2E.AbilityStr': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/strength.svg`,
//   // "PF2E.AbilityTitle": "Ability",
//   'PF2E.AbilityWis': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/wisdom.svg`,

//   'PF2E.AbilityCheck.str': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/strength.svg`,
//   'PF2E.AbilityCheck.dex': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/dexterity.svg`,
//   'PF2E.AbilityCheck.con': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/constitution.svg`,
//   'PF2E.AbilityCheck.int': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intelligence.svg`,
//   'PF2E.AbilityCheck.wis': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/wisdom.svg`,
//   'PF2E.AbilityCheck.cha': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/charisma.svg`,

//   'PF2E.ActionsCheck.acrobatics': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/acrobatics.svg`,
//   'PF2E.ActionsCheck.arcana': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/arcana.svg`,
//   'PF2E.ActionsCheck.athletics': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/athletics.svg`,
//   'PF2E.ActionsCheck.crafting': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/crafting.svg`,
//   'PF2E.ActionsCheck.deception': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/deception.svg`,
//   'PF2E.ActionsCheck.diplomacy': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/diplomacy.svg`,
//   'PF2E.ActionsCheck.intimidation': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intimidation.svg`,
//   'PF2E.ActionsCheck.medicine': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/medicine.svg`,
//   'PF2E.ActionsCheck.nature': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/nature.svg`,
//   'PF2E.ActionsCheck.occultism': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/occultism.svg`,
//   'PF2E.ActionsCheck.perception': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/perception.svg`,
//   'PF2E.ActionsCheck.performance': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/performance.svg`,
//   'PF2E.ActionsCheck.religion': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/religion.svg`,
//   'PF2E.ActionsCheck.society': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/society.svg`,
//   'PF2E.ActionsCheck.stealth': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/stealth.svg`,
//   'PF2E.ActionsCheck.survival': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/survival.svg`,
//   'PF2E.ActionsCheck.thievery': `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thievery.svg`,
// };

export const imageReplacerDamageType: ImageReplaceVoiceData[] = [
  { name: 'DND5E.DamageAcid', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/acid.svg` },
  { name: 'DND5E.DamageBludgeoning', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/bludgeoning.svg` },
  { name: 'DND5E.DamageCold', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/cold.svg` },
  { name: 'DND5E.DamageFire', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/fire.svg` },
  { name: 'DND5E.DamageForce', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/force.svg` },
  { name: 'DND5E.DamageLightning', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/lightning.svg` },
  { name: 'DND5E.DamageNecrotic', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/necrotic.svg` },
  { name: 'DND5E.DamagePiercing', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/piercing.svg` },
  { name: 'DND5E.DamagePhysical', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/non_magical_physical.svg` },
  { name: 'DND5E.DamagePoison', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/poison.svg` },
  { name: 'DND5E.DamagePsychic', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/psychic.svg` },
  { name: 'DND5E.DamageRadiant', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/radiant.svg` },
  { name: 'DND5E.DamageSlashing', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/slashing.svg` },
  { name: 'DND5E.DamageThunder', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thunder.svg` },
];

export const imageReplacerWeaponProperties: ImageReplaceVoiceData[] = [
  { name: 'DND5E.WeaponPropertiesAda', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/adamantine.svg` },
  { name: 'DND5E.WeaponPropertiesAmm', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/ammunition.svg` },
  { name: 'DND5E.WeaponPropertiesFin', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/finesse.svg` },
  { name: 'DND5E.WeaponPropertiesFir', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/firearm.svg` },
  { name: 'DND5E.WeaponPropertiesFoc', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/focus.svg` },
  { name: 'DND5E.WeaponPropertiesHvy', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/heavy.svg` },
  { name: 'DND5E.WeaponPropertiesLgt', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/light.svg` },
  { name: 'DND5E.WeaponPropertiesLod', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/loading.svg` },
  { name: 'DND5E.WeaponPropertiesMgc', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/magical.svg` },
  { name: 'DND5E.WeaponPropertiesRch', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/reach.svg` },
  { name: 'DND5E.WeaponPropertiesRel', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/reload.svg` },
  { name: 'DND5E.WeaponPropertiesRet', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/returning.svg` },
  { name: 'DND5E.WeaponPropertiesSil', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/silvered.svg` },
  { name: 'DND5E.WeaponPropertiesSpc', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/special.svg` },
  { name: 'DND5E.WeaponPropertiesThr', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thrown.svg` },
  { name: 'DND5E.WeaponPropertiesTwo', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/two-Handed.svg` },
  { name: 'DND5E.WeaponPropertiesVer', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/versatile.svg` },
];

/**
 * based on https://github.com/game-icons/icons/issues/516
 */
export const imageReplacerIconizer: ImageReplaceVoiceData[] = [
  // =======================================================================
  // dnd5e
  // =======================================================================

  { name: 'DND5E.DamageRoll', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/damage_roll.svg` }, // https://game-icons.net/1x1/delapouite/dice-fire.html
  { name: 'DND5E.AttackRoll', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/attack_roll.svg` }, // https://game-icons.net/1x1/delapouite/dice-shield.html

  { name: 'DND5E.AbilityStr', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/strength.svg` }, // https://game-icons.net/1x1/delapouite/bear-head.html
  { name: 'DND5E.AbilityDex', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/dexterity.svg` }, // https://game-icons.net/1x1/delapouite/feline.html
  { name: 'DND5E.AbilityCon', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/constitution.svg` }, // https://game-icons.net/1x1/delapouite/weight-lifting-up.html
  { name: 'DND5E.AbilityInt', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intelligence.svg` }, // https://game-icons.net/1x1/lorc/fox-head.html
  { name: 'DND5E.AbilityWis', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/wisdom.svg` }, // https://game-icons.net/1x1/lorc/owl.html
  { name: 'DND5E.AbilityCha', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/charisma.svg` }, // https://game-icons.net/1x1/delapouite/eagle-head.html
  { name: 'DND5E.Initiative', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/initiative.svg` }, //https://game-icons.net/1x1/delapouite/acoustic-megaphone.html

  { name: 'DND5E.SkillAcr', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/acrobatics.svg` }, // https://game-icons.net/1x1/delapouite/contortionist.html
  { name: 'DND5E.SkillAni', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/animal_handling.svg` }, // https://game-icons.net/1x1/delapouite/cavalry.html
  { name: 'DND5E.SkillArc', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/arcana.svg` }, // https://game-icons.net/1x1/delapouite/spell-book.html
  { name: 'DND5E.SkillAth', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/athletics.svg` }, // https://game-icons.net/1x1/lorc/muscle-up.html
  { name: 'DND5E.SkillDec', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/deception.svg` }, // https://game-icons.net/1x1/delapouite/convince.html
  { name: 'DND5E.SkillHis', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/history.svg` }, // https://game-icons.net/1x1/delapouite/backward-time.html
  { name: 'DND5E.SkillIns', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/insight.svg` }, // https://game-icons.net/1x1/lorc/light-bulb.html
  { name: 'DND5E.SkillItm', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intimidation.svg` }, // https://game-icons.net/1x1/lorc/one-eyed.html
  { name: 'DND5E.SkillInv', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/investigation.svg` }, // https://game-icons.net/1x1/lorc/magnifying-glass.html
  { name: 'DND5E.SkillMed', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/medicine.svg` }, // https://game-icons.net/1x1/delapouite/first-aid-kit.html
  { name: 'DND5E.SkillNat', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/nature.svg` }, // https://game-icons.net/1x1/delapouite/forest.html
  { name: 'DND5E.SkillPrc', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/perception.svg` }, // https://game-icons.net/1x1/lorc/semi-closed-eye.htmlml
  { name: 'DND5E.SkillPrf', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/performance.svg` }, // https://game-icons.net/1x1/lorc/sing.html
  { name: 'DND5E.SkillPer', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/persuasion.svg` }, // https://game-icons.net/1x1/delapouite/public-speaker.html
  { name: 'DND5E.SkillRel', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/religion.svg` }, // https://game-icons.net/1x1/lorc/holy-grail.html
  { name: 'DND5E.SkillSlt', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/sleight_of_hand.svg` }, // https://game-icons.net/1x1/lorc/snatch.html
  { name: 'DND5E.SkillSte', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/stealth.svg` }, // https://game-icons.net/1x1/lorc/cloak-dagger.html
  { name: 'DND5E.SkillSur', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/survival.svg` }, // https://game-icons.net/1x1/delapouite/deer-track.html

  { name: 'DND5E.ToolArtisans', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/artisan_s_tools.svg` }, // https://game-icons.net/1x1/lorc/hammer-nails.html
  { name: 'DND5E.ToolDisguiseKit', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/disguise_kit.svg` }, // https://game-icons.net/1x1/lorc/duality-mask.html
  { name: 'DND5E.ToolForgeryKit', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/forgery_kit` }, // https://game-icons.net/1x1/lorc/quill-ink.html
  { name: 'DND5E.ToolGamingSet', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/gaming_set.svg` }, // https://game-icons.net/1x1/delapouite/rolling-dice-cup.html
  { name: 'DND5E.ToolHerbalismKit', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/herbalism_kit` }, // https://game-icons.net/1x1/delapouite/herbs-bundle.html
  { name: 'DND5E.ToolMusicalInstrument', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/musical_instrument.svg` }, // https://game-icons.net/1x1/zajkonur/violin.html
  { name: 'DND5E.ToolNavigators', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/navigator_s_tools.svg` }, // https://game-icons.net/1x1/delapouite/sextant.html
  { name: 'DND5E.ToolPoisonersKit', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/poisoner_s_kit.svg` }, // https://game-icons.net/1x1/lorc/poison-bottle.html
  { name: 'DND5E.ToolThieves', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thieves_tools.svg` }, // https://game-icons.net/1x1/delapouite/lockpicks.html

  { name: 'DND5E.ShortRest', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/short_rest.svg` }, // https://game-icons.net/1x1/delapouite/wooden-chair.html
  { name: 'DND5E.LongRest', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/long_rest.svg` }, // https://game-icons.net/1x1/delapouite/person-in-bed.html
  { name: 'DND5E.DeathSave', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/death_saves.svg` },

  // TODO CONDITION I JUST DON'T KNOW HO CAN BE USEFUL

  // { name : 'DND5E.ConBlinded', icon : `Blinded",
  // { name : 'DND5E.ConCharmed', icon : `Charmed",
  // { name : 'DND5E.ConDeafened', icon : `Deafened",
  // { name : 'DND5E.ConDiseased', icon : `Diseased",
  // { name : 'DND5E.ConExhaustion', icon : `Exhaustion",
  // { name : 'DND5E.ConFrightened', icon : `Frightened",
  // { name : 'DND5E.ConGrappled', icon : `Grappled",
  // { name : 'DND5E.ConImm', icon : `Condition Immunities",
  // { name : 'DND5E.ConIncapacitated', icon : `Incapacitated",
  // { name : 'DND5E.ConInvisible', icon : `Invisible",
  // { name : 'DND5E.ConParalyzed', icon : `Paralyzed",
  // { name : 'DND5E.ConPetrified', icon : `Petrified",
  // { name : 'DND5E.ConPoisoned', icon : `Poisoned",
  // { name : 'DND5E.ConProne', icon : `Prone",
  // { name : 'DND5E.ConRestrained', icon : `Restrained",
  // { name : 'DND5E.ConStunned', icon : `Stunned",
  // { name : 'DND5E.ConUnconscious', icon : `Unconscious",
  // { name : 'DND5E.Concentration', icon : `Concentration",

  // { name : 'PF2E.AbilityBoost', icon : `Ability Boost",
  // { name : 'PF2E.AbilityBoostLevels', icon : `Ability Boost Levels",
  { name: 'PF2E.AbilityCha', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/charisma.svg` },
  { name: 'PF2E.AbilityCon', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/constitution.svg` },
  { name: 'PF2E.AbilityDex', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/dexterity.svg` },
  { name: 'PF2E.AbilityFlaw', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/flaw.svg` },
  { name: 'PF2E.AbilityInt', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intelligence.svg` },
  // { name : 'PF2E.AbilityModifierLabel', icon : `Ability Modifier",
  // { name : 'PF2E.AbilityScoresHeader', icon : `Ability Scores",
  { name: 'PF2E.AbilityFree', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/free.svg` },
  { name: 'PF2E.AbilityStr', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/strength.svg` },
  // { name : 'PF2E.AbilityTitle', icon : `Ability",
  { name: 'PF2E.AbilityWis', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/wisdom.svg` },

  { name: 'PF2E.AbilityCheck.str', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/strength.svg` },
  { name: 'PF2E.AbilityCheck.dex', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/dexterity.svg` },
  { name: 'PF2E.AbilityCheck.con', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/constitution.svg` },
  { name: 'PF2E.AbilityCheck.int', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intelligence.svg` },
  { name: 'PF2E.AbilityCheck.wis', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/wisdom.svg` },
  { name: 'PF2E.AbilityCheck.cha', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/charisma.svg` },

  { name: 'PF2E.ActionsCheck.acrobatics', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/acrobatics.svg` },
  { name: 'PF2E.ActionsCheck.arcana', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/arcana.svg` },
  { name: 'PF2E.ActionsCheck.athletics', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/athletics.svg` },
  { name: 'PF2E.ActionsCheck.crafting', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/crafting.svg` },
  { name: 'PF2E.ActionsCheck.deception', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/deception.svg` },
  { name: 'PF2E.ActionsCheck.diplomacy', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/diplomacy.svg` },
  { name: 'PF2E.ActionsCheck.intimidation', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intimidation.svg` },
  { name: 'PF2E.ActionsCheck.medicine', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/medicine.svg` },
  { name: 'PF2E.ActionsCheck.nature', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/nature.svg` },
  { name: 'PF2E.ActionsCheck.occultism', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/occultism.svg` },
  { name: 'PF2E.ActionsCheck.perception', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/perception.svg` },
  { name: 'PF2E.ActionsCheck.performance', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/performance.svg` },
  { name: 'PF2E.ActionsCheck.religion', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/religion.svg` },
  { name: 'PF2E.ActionsCheck.society', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/society.svg` },
  { name: 'PF2E.ActionsCheck.stealth', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/stealth.svg` },
  { name: 'PF2E.ActionsCheck.survival', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/survival.svg` },
  { name: 'PF2E.ActionsCheck.thievery', icon: `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thievery.svg` },
];
