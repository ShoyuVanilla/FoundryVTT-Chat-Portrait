import { MODULE_NAME } from "./settings";
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

    "DND5E.DamageRoll": `/modules/${MODULE_NAME}/assets/damage_roll.svg`, // https://game-icons.net/1x1/delapouite/dice-fire.html
    "DND5E.AttackRoll": `/modules/${MODULE_NAME}/assets/attack_roll.svg`, // https://game-icons.net/1x1/delapouite/dice-shield.html

    "DND5E.AbilityStr": `/modules/${MODULE_NAME}/assets/strength.svg`, // https://game-icons.net/1x1/delapouite/bear-head.html
    "DND5E.AbilityDex": `/modules/${MODULE_NAME}/assets/dexterity.svg`, // https://game-icons.net/1x1/delapouite/feline.html
    "DND5E.AbilityCon": `/modules/${MODULE_NAME}/assets/constitution.svg`, // https://game-icons.net/1x1/delapouite/weight-lifting-up.html
    "DND5E.AbilityInt": `/modules/${MODULE_NAME}/assets/intelligence.svg`, // https://game-icons.net/1x1/lorc/fox-head.html
    "DND5E.AbilityWis": `/modules/${MODULE_NAME}/assets/wisdom.svg`, // https://game-icons.net/1x1/lorc/owl.html
    "DND5E.AbilityCha": `/modules/${MODULE_NAME}/assets/charisma.svg`, // https://game-icons.net/1x1/delapouite/eagle-head.html
    "DND5E.Initiative": `/modules/${MODULE_NAME}/assets/initiative.svg`, //https://game-icons.net/1x1/delapouite/acoustic-megaphone.html

    "DND5E.SkillAcr": `/modules/${MODULE_NAME}/assets/acrobatics.svg`, // https://game-icons.net/1x1/delapouite/contortionist.html
    "DND5E.SkillAni": `/modules/${MODULE_NAME}/assets/animal_handling.svg`, // https://game-icons.net/1x1/delapouite/cavalry.html
    "DND5E.SkillArc": `/modules/${MODULE_NAME}/assets/arcana.svg`, // https://game-icons.net/1x1/delapouite/spell-book.html
    "DND5E.SkillAth": `/modules/${MODULE_NAME}/assets/athletics.svg`, // https://game-icons.net/1x1/lorc/muscle-up.html
    "DND5E.SkillDec": `/modules/${MODULE_NAME}/assets/deception.svg`, // https://game-icons.net/1x1/delapouite/convince.html
    "DND5E.SkillHis": `/modules/${MODULE_NAME}/assets/history.svg`, // https://game-icons.net/1x1/delapouite/backward-time.html
    "DND5E.SkillIns": `/modules/${MODULE_NAME}/assets/insight.svg`, // https://game-icons.net/1x1/lorc/light-bulb.html
    "DND5E.SkillItm": `/modules/${MODULE_NAME}/assets/intimidation.svg`, // https://game-icons.net/1x1/lorc/one-eyed.html
    "DND5E.SkillInv": `/modules/${MODULE_NAME}/assets/investigation.svg`, // https://game-icons.net/1x1/lorc/magnifying-glass.html
    "DND5E.SkillMed": `/modules/${MODULE_NAME}/assets/medicine.svg`, // https://game-icons.net/1x1/delapouite/first-aid-kit.html
    "DND5E.SkillNat": `/modules/${MODULE_NAME}/assets/nature.svg`, // https://game-icons.net/1x1/delapouite/forest.html
    "DND5E.SkillPrc": `/modules/${MODULE_NAME}/assets/perception.svg`, // https://game-icons.net/1x1/lorc/semi-closed-eye.htmlml
    "DND5E.SkillPrf": `/modules/${MODULE_NAME}/assets/performance.svg`, // https://game-icons.net/1x1/lorc/sing.html
    "DND5E.SkillPer": `/modules/${MODULE_NAME}/assets/persuasion.svg`, // https://game-icons.net/1x1/delapouite/public-speaker.html
    "DND5E.SkillRel": `/modules/${MODULE_NAME}/assets/religion.svg`, // https://game-icons.net/1x1/lorc/holy-grail.html
    "DND5E.SkillSlt": `/modules/${MODULE_NAME}/assets/sleight_of_hand.svg`, // https://game-icons.net/1x1/lorc/snatch.html
    "DND5E.SkillSte": `/modules/${MODULE_NAME}/assets/stealth.svg`, // https://game-icons.net/1x1/lorc/cloak-dagger.html
    "DND5E.SkillSur": `/modules/${MODULE_NAME}/assets/survival.svg`, // https://game-icons.net/1x1/delapouite/deer-track.html

    "DND5E.ToolArtisans": `/modules/${MODULE_NAME}/assets/artisan_s_tools.svg`, // https://game-icons.net/1x1/lorc/hammer-nails.html
    "DND5E.ToolDisguiseKit": `/modules/${MODULE_NAME}/assets/disguise_kit.svg`, // https://game-icons.net/1x1/lorc/duality-mask.html
    "DND5E.ToolForgeryKit": `/modules/${MODULE_NAME}/assets/forgery_kit`, // https://game-icons.net/1x1/lorc/quill-ink.html
    "DND5E.ToolGamingSet": `/modules/${MODULE_NAME}/assets/gaming_set.svg`, // https://game-icons.net/1x1/delapouite/rolling-dice-cup.html
    "DND5E.ToolHerbalismKit": `/modules/${MODULE_NAME}/assets/herbalism_kit`, // https://game-icons.net/1x1/delapouite/herbs-bundle.html
    "DND5E.ToolMusicalInstrument": `/modules/${MODULE_NAME}/assets/musical_instrument.svg`, // https://game-icons.net/1x1/zajkonur/violin.html
    "DND5E.ToolNavigators": `/modules/${MODULE_NAME}/assets/navigator_s_tools.svg`, // https://game-icons.net/1x1/delapouite/sextant.html
    "DND5E.ToolPoisonersKit": `/modules/${MODULE_NAME}/assets/poisoner_s_kit.svg`, // https://game-icons.net/1x1/lorc/poison-bottle.html
    "DND5E.ToolThieves": `/modules/${MODULE_NAME}/assets/thieves_tools.svg`, // https://game-icons.net/1x1/delapouite/lockpicks.html

    "DND5E.ShortRest": `/modules/${MODULE_NAME}/assets/short_rest.svg`, // https://game-icons.net/1x1/delapouite/wooden-chair.html
    "DND5E.LongRest": `/modules/${MODULE_NAME}/assets/long_rest.svg`, // https://game-icons.net/1x1/delapouite/person-in-bed.html

    // TODO

    // "DND5E.DamageAcid": `/modules/${MODULE_NAME}/assets/acid.svg`,
    // "DND5E.DamageBludgeoning": `/modules/${MODULE_NAME}/assets/bludgeoning.svg`,
    // "DND5E.DamageCold": `/modules/${MODULE_NAME}/assets/cold.svg`,
    // "DND5E.DamageFire": `/modules/${MODULE_NAME}/assets/fire.svg`,
    // "DND5E.DamageForce": `/modules/${MODULE_NAME}/assets/force.svg`,
    // "DND5E.DamageLightning": `/modules/${MODULE_NAME}/assets/lightning.svg`,
    // "DND5E.DamageNecrotic": `/modules/${MODULE_NAME}/assets/necrotic.svg`,
    // "DND5E.DamagePiercing": `/modules/${MODULE_NAME}/assets/piercing.svg`,
    // "DND5E.DamagePhysical": `/modules/${MODULE_NAME}/assets/non_magical_physical.svg`,
    // "DND5E.DamagePoison": `/modules/${MODULE_NAME}/assets/poison.svg`,
    // "DND5E.DamagePsychic": `/modules/${MODULE_NAME}/assets/psychic.svg`,
    // "DND5E.DamageRadiant": `/modules/${MODULE_NAME}/assets/radiant.svg`,
    // "DND5E.DamageSlashing": `/modules/${MODULE_NAME}/assets/slashing.svg`,
    // "DND5E.DamageThunder": `/modules/${MODULE_NAME}/assets/thunder.svg`,
    // "DND5E.DeathSave": `/modules/${MODULE_NAME}/assets/death_saves.svg`,

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
  "DND5E.DamageAcid": `/modules/${MODULE_NAME}/assets/acid.svg`,
  "DND5E.DamageBludgeoning": `/modules/${MODULE_NAME}/assets/bludgeoning.svg`,
  "DND5E.DamageCold": `/modules/${MODULE_NAME}/assets/cold.svg`,
  "DND5E.DamageFire": `/modules/${MODULE_NAME}/assets/fire.svg`,
  "DND5E.DamageForce": `/modules/${MODULE_NAME}/assets/force.svg`,
  "DND5E.DamageLightning": `/modules/${MODULE_NAME}/assets/lightning.svg`,
  "DND5E.DamageNecrotic": `/modules/${MODULE_NAME}/assets/necrotic.svg`,
  "DND5E.DamagePiercing": `/modules/${MODULE_NAME}/assets/piercing.svg`,
  "DND5E.DamagePhysical": `/modules/${MODULE_NAME}/assets/non_magical_physical.svg`,
  "DND5E.DamagePoison": `/modules/${MODULE_NAME}/assets/poison.svg`,
  "DND5E.DamagePsychic": `/modules/${MODULE_NAME}/assets/psychic.svg`,
  "DND5E.DamageRadiant": `/modules/${MODULE_NAME}/assets/radiant.svg`,
  "DND5E.DamageSlashing": `/modules/${MODULE_NAME}/assets/slashing.svg`,
  "DND5E.DamageThunder": `/modules/${MODULE_NAME}/assets/thunder.svg`,
  "DND5E.DeathSave": `/modules/${MODULE_NAME}/assets/death_saves.svg`,
}
