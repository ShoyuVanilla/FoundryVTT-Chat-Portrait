import type { ImageReplaceVoiceData } from '../ChatPortraitModels';
import CONSTANTS from '../constants';

export default {
  SYSTEM_ID: 'dnd5e',
  /**
   * based on https://github.com/game-icons/icons/issues/516
   */
  imageReplacerDamageType: <ImageReplaceVoiceData[]>[
    { name: 'DND5E.DamageAcid', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/acid.svg` },
    { name: 'DND5E.DamageBludgeoning', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/bludgeoning.svg` },
    { name: 'DND5E.DamageCold', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/cold.svg` },
    { name: 'DND5E.DamageFire', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/fire.svg` },
    { name: 'DND5E.DamageForce', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/force.svg` },
    { name: 'DND5E.DamageLightning', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/lightning.svg` },
    { name: 'DND5E.DamageNecrotic', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/necrotic.svg` },
    { name: 'DND5E.DamagePiercing', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/piercing.svg` },
    { name: 'DND5E.DamagePhysical', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/non_magical_physical.svg` },
    { name: 'DND5E.DamagePoison', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/poison.svg` },
    { name: 'DND5E.DamagePsychic', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/psychic.svg` },
    { name: 'DND5E.DamageRadiant', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/radiant.svg` },
    { name: 'DND5E.DamageSlashing', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/slashing.svg` },
    { name: 'DND5E.DamageThunder', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/thunder.svg` },
  ],
  imageReplacerWeaponProperties: <ImageReplaceVoiceData[]>[
    { name: 'DND5E.WeaponPropertiesAda', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/adamantine.svg` },
    { name: 'DND5E.WeaponPropertiesAmm', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/ammunition.svg` },
    { name: 'DND5E.WeaponPropertiesFin', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/finesse.svg` },
    { name: 'DND5E.WeaponPropertiesFir', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/firearm.svg` },
    { name: 'DND5E.WeaponPropertiesFoc', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/focus.svg` },
    { name: 'DND5E.WeaponPropertiesHvy', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/heavy.svg` },
    { name: 'DND5E.WeaponPropertiesLgt', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/light.svg` },
    { name: 'DND5E.WeaponPropertiesLod', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/loading.svg` },
    { name: 'DND5E.WeaponPropertiesMgc', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/magical.svg` },
    { name: 'DND5E.WeaponPropertiesRch', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/reach.svg` },
    { name: 'DND5E.WeaponPropertiesRel', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/reload.svg` },
    { name: 'DND5E.WeaponPropertiesRet', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/returning.svg` },
    { name: 'DND5E.WeaponPropertiesSil', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/silvered.svg` },
    { name: 'DND5E.WeaponPropertiesSpc', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/special.svg` },
    { name: 'DND5E.WeaponPropertiesThr', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/thrown.svg` },
    { name: 'DND5E.WeaponPropertiesTwo', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/two-Handed.svg` },
    { name: 'DND5E.WeaponPropertiesVer', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/versatile.svg` },
  ],
  /**
   * based on https://github.com/game-icons/icons/issues/516
   */
  imageReplacerIconizer: <ImageReplaceVoiceData[]>[
    // =======================================================================
    // dnd5e
    // =======================================================================

    { name: 'DND5E.DamageRoll', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/damage_roll.svg` }, // https://game-icons.net/1x1/delapouite/dice-fire.html
    { name: 'DND5E.AttackRoll', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/attack_roll.svg` }, // https://game-icons.net/1x1/delapouite/dice-shield.html

    { name: 'DND5E.SkillAcr', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/acrobatics.svg` }, // https://game-icons.net/1x1/delapouite/contortionist.html
    { name: 'DND5E.SkillAni', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/animal_handling.svg` }, // https://game-icons.net/1x1/delapouite/cavalry.html
    { name: 'DND5E.SkillArc', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/arcana.svg` }, // https://game-icons.net/1x1/delapouite/spell-book.html
    { name: 'DND5E.SkillAth', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/athletics.svg` }, // https://game-icons.net/1x1/lorc/muscle-up.html
    { name: 'DND5E.SkillDec', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/deception.svg` }, // https://game-icons.net/1x1/delapouite/convince.html
    { name: 'DND5E.SkillHis', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/history.svg` }, // https://game-icons.net/1x1/delapouite/backward-time.html
    { name: 'DND5E.SkillIns', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/insight.svg` }, // https://game-icons.net/1x1/lorc/light-bulb.html
    { name: 'DND5E.SkillItm', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/intimidation.svg` }, // https://game-icons.net/1x1/lorc/one-eyed.html
    { name: 'DND5E.SkillInv', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/investigation.svg` }, // https://game-icons.net/1x1/lorc/magnifying-glass.html
    { name: 'DND5E.SkillMed', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/medicine.svg` }, // https://game-icons.net/1x1/delapouite/first-aid-kit.html
    { name: 'DND5E.SkillNat', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/nature.svg` }, // https://game-icons.net/1x1/delapouite/forest.html
    { name: 'DND5E.SkillPrc', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/perception.svg` }, // https://game-icons.net/1x1/lorc/semi-closed-eye.htmlml
    { name: 'DND5E.SkillPrf', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/performance.svg` }, // https://game-icons.net/1x1/lorc/sing.html
    { name: 'DND5E.SkillPer', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/persuasion.svg` }, // https://game-icons.net/1x1/delapouite/public-speaker.html
    { name: 'DND5E.SkillRel', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/religion.svg` }, // https://game-icons.net/1x1/lorc/holy-grail.html
    { name: 'DND5E.SkillSlt', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/sleight_of_hand.svg` }, // https://game-icons.net/1x1/lorc/snatch.html
    { name: 'DND5E.SkillSte', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/stealth.svg` }, // https://game-icons.net/1x1/lorc/cloak-dagger.html
    { name: 'DND5E.SkillSur', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/survival.svg` }, // https://game-icons.net/1x1/delapouite/deer-track.html

    { name: 'DND5E.ToolArtisans', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/artisan_s_tools.svg` }, // https://game-icons.net/1x1/lorc/hammer-nails.html
    { name: 'DND5E.ToolDisguiseKit', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/disguise_kit.svg` }, // https://game-icons.net/1x1/lorc/duality-mask.html
    { name: 'DND5E.ToolForgeryKit', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/forgery_kit` }, // https://game-icons.net/1x1/lorc/quill-ink.html
    { name: 'DND5E.ToolGamingSet', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/gaming_set.svg` }, // https://game-icons.net/1x1/delapouite/rolling-dice-cup.html
    { name: 'DND5E.ToolHerbalismKit', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/herbalism_kit` }, // https://game-icons.net/1x1/delapouite/herbs-bundle.html
    { name: 'DND5E.ToolMusicalInstrument', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/musical_instrument.svg` }, // https://game-icons.net/1x1/zajkonur/violin.html
    { name: 'DND5E.ToolNavigators', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/navigator_s_tools.svg` }, // https://game-icons.net/1x1/delapouite/sextant.html
    { name: 'DND5E.ToolPoisonersKit', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/poisoner_s_kit.svg` }, // https://game-icons.net/1x1/lorc/poison-bottle.html
    { name: 'DND5E.ToolThieves', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/thieves_tools.svg` }, // https://game-icons.net/1x1/delapouite/lockpicks.html

    { name: 'DND5E.ShortRest', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/short_rest.svg` }, // https://game-icons.net/1x1/delapouite/wooden-chair.html
    { name: 'DND5E.LongRest', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/long_rest.svg` }, // https://game-icons.net/1x1/delapouite/person-in-bed.html
    { name: 'DND5E.DeathSave', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/death_saves.svg` },

    { name: 'DND5E.AbilityStr', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/strength.svg` }, // https://game-icons.net/1x1/delapouite/bear-head.html
    { name: 'DND5E.AbilityDex', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/dexterity.svg` }, // https://game-icons.net/1x1/delapouite/feline.html
    { name: 'DND5E.AbilityCon', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/constitution.svg` }, // https://game-icons.net/1x1/delapouite/weight-lifting-up.html
    { name: 'DND5E.AbilityInt', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/intelligence.svg` }, // https://game-icons.net/1x1/lorc/fox-head.html
    { name: 'DND5E.AbilityWis', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/wisdom.svg` }, // https://game-icons.net/1x1/lorc/owl.html
    { name: 'DND5E.AbilityCha', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/charisma.svg` }, // https://game-icons.net/1x1/delapouite/eagle-head.html
    { name: 'DND5E.Initiative', icon: `/modules/${CONSTANTS.MODULE_NAME}/assets/initiative.svg` }, //https://game-icons.net/1x1/delapouite/acoustic-megaphone.html

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
  ],
};
