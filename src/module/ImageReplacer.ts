import { CHAT_PORTRAIT_MODULE_NAME } from "./settings";
import { i18n } from '../main';

export let ImageReplacerImpl:Record<string, string> = {};
/**
 * based on https://github.com/game-icons/icons/issues/516
 */
export const ImageReplacerInit = function():Record<string, string> {
    // if(game.i18n.lang=="en"){
    //     ImageReplacerImpl = imageReplacerEn;
    // }
    // else if(game.i18n.lang=="ko"){
    //     ImageReplacerImpl = imageReplacerKo;
    // }
    // // TODO OTHER LANGUAGE
    // else{
    //     ImageReplacerImpl = imageReplacerEn;
    // }
    ImageReplacerImpl = imageReplacerUniversal;
    return ImageReplacerImpl;
}

export const imageReplacerUniversal:Record<string, string> =
{

    // =======================================================================
    // dnd5e
    // =======================================================================

    "DND5E.DamageRoll": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/damage_roll.svg`, // https://game-icons.net/1x1/delapouite/dice-fire.html
    "DND5E.AttackRoll": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/attack_roll.svg`, // https://game-icons.net/1x1/delapouite/dice-shield.html

    "DND5E.AbilityStr": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/strength.svg`, // https://game-icons.net/1x1/delapouite/bear-head.html
    "DND5E.AbilityDex": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/dexterity.svg`, // https://game-icons.net/1x1/delapouite/feline.html
    "DND5E.AbilityCon": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/constitution.svg`, // https://game-icons.net/1x1/delapouite/weight-lifting-up.html
    "DND5E.AbilityInt": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intelligence.svg`, // https://game-icons.net/1x1/lorc/fox-head.html
    "DND5E.AbilityWis": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/wisdom.svg`, // https://game-icons.net/1x1/lorc/owl.html
    "DND5E.AbilityCha": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/charisma.svg`, // https://game-icons.net/1x1/delapouite/eagle-head.html
    "DND5E.Initiative": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/initiative.svg`, //https://game-icons.net/1x1/delapouite/acoustic-megaphone.html

    "DND5E.SkillAcr": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/acrobatics.svg`, // https://game-icons.net/1x1/delapouite/contortionist.html
    "DND5E.SkillAni": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/animal_handling.svg`, // https://game-icons.net/1x1/delapouite/cavalry.html
    "DND5E.SkillArc": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/arcana.svg`, // https://game-icons.net/1x1/delapouite/spell-book.html
    "DND5E.SkillAth": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/athletics.svg`, // https://game-icons.net/1x1/lorc/muscle-up.html
    "DND5E.SkillDec": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/deception.svg`, // https://game-icons.net/1x1/delapouite/convince.html
    "DND5E.SkillHis": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/history.svg`, // https://game-icons.net/1x1/delapouite/backward-time.html
    "DND5E.SkillIns": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/insight.svg`, // https://game-icons.net/1x1/lorc/light-bulb.html
    "DND5E.SkillItm": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/intimidation.svg`, // https://game-icons.net/1x1/lorc/one-eyed.html
    "DND5E.SkillInv": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/investigation.svg`, // https://game-icons.net/1x1/lorc/magnifying-glass.html
    "DND5E.SkillMed": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/medicine.svg`, // https://game-icons.net/1x1/delapouite/first-aid-kit.html
    "DND5E.SkillNat": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/nature.svg`, // https://game-icons.net/1x1/delapouite/forest.html
    "DND5E.SkillPrc": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/perception.svg`, // https://game-icons.net/1x1/lorc/semi-closed-eye.htmlml
    "DND5E.SkillPrf": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/performance.svg`, // https://game-icons.net/1x1/lorc/sing.html
    "DND5E.SkillPer": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/persuasion.svg`, // https://game-icons.net/1x1/delapouite/public-speaker.html
    "DND5E.SkillRel": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/religion.svg`, // https://game-icons.net/1x1/lorc/holy-grail.html
    "DND5E.SkillSlt": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/sleight_of_hand.svg`, // https://game-icons.net/1x1/lorc/snatch.html
    "DND5E.SkillSte": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/stealth.svg`, // https://game-icons.net/1x1/lorc/cloak-dagger.html
    "DND5E.SkillSur": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/survival.svg`, // https://game-icons.net/1x1/delapouite/deer-track.html

    "DND5E.ToolArtisans": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/artisan_s_tools.svg`, // https://game-icons.net/1x1/lorc/hammer-nails.html
    "DND5E.ToolDisguiseKit": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/disguise_kit.svg`, // https://game-icons.net/1x1/lorc/duality-mask.html
    "DND5E.ToolForgeryKit": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/forgery_kit`, // https://game-icons.net/1x1/lorc/quill-ink.html
    "DND5E.ToolGamingSet": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/gaming_set.svg`, // https://game-icons.net/1x1/delapouite/rolling-dice-cup.html
    "DND5E.ToolHerbalismKit": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/herbalism_kit`, // https://game-icons.net/1x1/delapouite/herbs-bundle.html
    "DND5E.ToolMusicalInstrument": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/musical_instrument.svg`, // https://game-icons.net/1x1/zajkonur/violin.html
    "DND5E.ToolNavigators": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/navigator_s_tools.svg`, // https://game-icons.net/1x1/delapouite/sextant.html
    "DND5E.ToolPoisonersKit": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/poisoner_s_kit.svg`, // https://game-icons.net/1x1/lorc/poison-bottle.html
    "DND5E.ToolThieves": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thieves_tools.svg`, // https://game-icons.net/1x1/delapouite/lockpicks.html

    "DND5E.ShortRest": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/short_rest.svg`, // https://game-icons.net/1x1/delapouite/wooden-chair.html
    "DND5E.LongRest": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/long_rest.svg`, // https://game-icons.net/1x1/delapouite/person-in-bed.html
    "DND5E.DeathSave": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/death_saves.svg`,

    // TODO CONDITION I JUST DON'T KNOW HO CAN BE USEFUL

    // "DND5E.ConBlinded": "Blinded",
    // "DND5E.ConCharmed": "Charmed",
    // "DND5E.ConDeafened": "Deafened",
    // "DND5E.ConDiseased": "Diseased",
    // "DND5E.ConExhaustion": "Exhaustion",
    // "DND5E.ConFrightened": "Frightened",
    // "DND5E.ConGrappled": "Grappled",
    // "DND5E.ConImm": "Condition Immunities",
    // "DND5E.ConIncapacitated": "Incapacitated",
    // "DND5E.ConInvisible": "Invisible",
    // "DND5E.ConParalyzed": "Paralyzed",
    // "DND5E.ConPetrified": "Petrified",
    // "DND5E.ConPoisoned": "Poisoned",
    // "DND5E.ConProne": "Prone",
    // "DND5E.ConRestrained": "Restrained",
    // "DND5E.ConStunned": "Stunned",
    // "DND5E.ConUnconscious": "Unconscious",
    // "DND5E.Concentration": "Concentration",

}

export const imageReplacerDamageType:Record<string, string> =
{
  "DND5E.DamageAcid": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/acid.svg`,
  "DND5E.DamageBludgeoning": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/bludgeoning.svg`,
  "DND5E.DamageCold": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/cold.svg`,
  "DND5E.DamageFire": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/fire.svg`,
  "DND5E.DamageForce": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/force.svg`,
  "DND5E.DamageLightning": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/lightning.svg`,
  "DND5E.DamageNecrotic": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/necrotic.svg`,
  "DND5E.DamagePiercing": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/piercing.svg`,
  "DND5E.DamagePhysical": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/non_magical_physical.svg`,
  "DND5E.DamagePoison": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/poison.svg`,
  "DND5E.DamagePsychic": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/psychic.svg`,
  "DND5E.DamageRadiant": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/radiant.svg`,
  "DND5E.DamageSlashing": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/slashing.svg`,
  "DND5E.DamageThunder": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thunder.svg`,
}

export const imageReplacerWeaponProperties:Record<string, string> =
{
  "DND5E.WeaponPropertiesAda": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/adamantine.svg`,
  "DND5E.WeaponPropertiesAmm": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/ammunition.svg`,
  "DND5E.WeaponPropertiesFin": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/finesse.svg`,
  "DND5E.WeaponPropertiesFir": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/firearm.svg`,
  "DND5E.WeaponPropertiesFoc": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/focus.svg`,
  "DND5E.WeaponPropertiesHvy": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/heavy.svg`,
  "DND5E.WeaponPropertiesLgt": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/light.svg`,
  "DND5E.WeaponPropertiesLod": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/loading.svg`,
  "DND5E.WeaponPropertiesMgc": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/magical.svg`,
  "DND5E.WeaponPropertiesRch": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/reach.svg`,
  "DND5E.WeaponPropertiesRel": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/reload.svg`,
  "DND5E.WeaponPropertiesRet": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/returning.svg`,
  "DND5E.WeaponPropertiesSil": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/silvered.svg`,
  "DND5E.WeaponPropertiesSpc": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/special.svg`,
  "DND5E.WeaponPropertiesThr": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/thrown.svg`,
  "DND5E.WeaponPropertiesTwo": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/two-Handed.svg`,
  "DND5E.WeaponPropertiesVer": `/modules/${CHAT_PORTRAIT_MODULE_NAME}/assets/versatile.svg`,
}
