import { MODULE_NAME } from "./settings";

export let ImageReplacerImpl:Record<string, string> = {};
/**
 * based on https://github.com/game-icons/icons/issues/516
 */
export const ImageReplaceriInit = function():Record<string, string> {
    if(game.i18n.lang=="en"){
        ImageReplacerImpl = imageReplacerEn;
    }
    else if(game.i18n.lang=="ko"){
        ImageReplacerImpl = imageReplacerKo;
    }
    // TODO OTHER LANGUAGE
    else{
        ImageReplacerImpl = imageReplacerEn;
    }
    return ImageReplacerImpl;
}

export const imageReplacerEn:Record<string, string> = 
    {
        "Damage Roll": `/modules/${MODULE_NAME}/assets/damage_roll.svg`, // https://game-icons.net/1x1/delapouite/dice-fire.html
        "Attack Roll": `/modules/${MODULE_NAME}/assets/attack_roll.svg`, // https://game-icons.net/1x1/delapouite/dice-shield.html

        // =======================================================================
        // dnd5e
        // =======================================================================

        "Strength": `/modules/${MODULE_NAME}/assets/strength.svg`, // https://game-icons.net/1x1/delapouite/bear-head.html
        "Dexterity": `/modules/${MODULE_NAME}/assets/dexterity.svg`, // https://game-icons.net/1x1/delapouite/feline.html
        "Constitution": `/modules/${MODULE_NAME}/assets/constitution.svg`, // https://game-icons.net/1x1/delapouite/weight-lifting-up.html
        "Intelligence": `/modules/${MODULE_NAME}/assets/intelligence.svg`, // https://game-icons.net/1x1/lorc/fox-head.html
        "Wisdom": `/modules/${MODULE_NAME}/assets/wisdom.svg`, // https://game-icons.net/1x1/lorc/owl.html
        "Charisma": `/modules/${MODULE_NAME}/assets/charisma.svg`, // https://game-icons.net/1x1/delapouite/eagle-head.html
        "Initiative": `/modules/${MODULE_NAME}/assets/initiative.svg`, //https://game-icons.net/1x1/delapouite/acoustic-megaphone.html

        "Strength Check": `/modules/${MODULE_NAME}/assets/strength.svg`, // https://game-icons.net/1x1/delapouite/bear-head.html
        "Dexterity Check": `/modules/${MODULE_NAME}/assets/dexterity.svg`, // https://game-icons.net/1x1/delapouite/feline.html
        "Constitution Check": `/modules/${MODULE_NAME}/assets/constitution.svg`, // https://game-icons.net/1x1/delapouite/weight-lifting-up.html
        "Intelligence Check": `/modules/${MODULE_NAME}/assets/intelligence.svg`, // https://game-icons.net/1x1/lorc/fox-head.html
        "Wisdom Check": `/modules/${MODULE_NAME}/assets/wisdom.svg`, // https://game-icons.net/1x1/lorc/owl.html
        "Charisma Check": `/modules/${MODULE_NAME}/assets/charisma.svg`, // https://game-icons.net/1x1/delapouite/eagle-head.html
        "Initiative Check": `/modules/${MODULE_NAME}/assets/initiative.svg`, //https://game-icons.net/1x1/delapouite/acoustic-megaphone.html

        "Strength Save": `/modules/${MODULE_NAME}/assets/strength.svg`, // https://game-icons.net/1x1/delapouite/bear-head.html
        "Dexterity Save": `/modules/${MODULE_NAME}/assets/dexterity.svg`, // https://game-icons.net/1x1/delapouite/feline.html
        "Constitution Save": `/modules/${MODULE_NAME}/assets/constitution.svg`, // https://game-icons.net/1x1/delapouite/weight-lifting-up.html
        "Intelligence Save": `/modules/${MODULE_NAME}/assets/intelligence.svg`, // https://game-icons.net/1x1/lorc/fox-head.html
        "Wisdom Save": `/modules/${MODULE_NAME}/assets/wisdom.svg`, // https://game-icons.net/1x1/lorc/owl.html
        "Charisma Save": `/modules/${MODULE_NAME}/assets/charisma.svg`, // https://game-icons.net/1x1/delapouite/eagle-head.html
        "Initiative Save": `/modules/${MODULE_NAME}/assets/initiative.svg`, //https://game-icons.net/1x1/delapouite/acoustic-megaphone.html

        "Acrobatics": `/modules/${MODULE_NAME}/assets/acrobatics.svg`, // https://game-icons.net/1x1/delapouite/contortionist.html
        "Acrobatics Skill Check": `/modules/${MODULE_NAME}/assets/acrobatics.svg`, // https://game-icons.net/1x1/delapouite/contortionist.html
        "Animal Handling": `/modules/${MODULE_NAME}/assets/animal_handling.svg`, // https://game-icons.net/1x1/delapouite/cavalry.html
        "Animal Handling Skill Check": `/modules/${MODULE_NAME}/assets/animal_handling.svg`, // https://game-icons.net/1x1/delapouite/cavalry.html
        "Arcana": `/modules/${MODULE_NAME}/assets/arcana.svg`, // https://game-icons.net/1x1/delapouite/spell-book.html
        "Arcana Skill Check": `/modules/${MODULE_NAME}/assets/arcana.svg`, // https://game-icons.net/1x1/delapouite/spell-book.html
        "Athletics": `/modules/${MODULE_NAME}/assets/athletics.svg`, // https://game-icons.net/1x1/lorc/muscle-up.html
        "Athletics Skill Check": `/modules/${MODULE_NAME}/assets/athletics.svg`, // https://game-icons.net/1x1/lorc/muscle-up.html
        "Deception": `/modules/${MODULE_NAME}/assets/deception.svg`, // https://game-icons.net/1x1/delapouite/convince.html
        "Deception Skill Check": `/modules/${MODULE_NAME}/assets/deception.svg`, // https://game-icons.net/1x1/delapouite/convince.html
        "History": `/modules/${MODULE_NAME}/assets/history.svg`, // https://game-icons.net/1x1/delapouite/backward-time.html
        "History Skill Check": `/modules/${MODULE_NAME}/assets/history.svg`, // https://game-icons.net/1x1/delapouite/backward-time.html
        "Insight": `/modules/${MODULE_NAME}/assets/insight.svg`, // https://game-icons.net/1x1/lorc/light-bulb.html
        "Insight Skill Check": `/modules/${MODULE_NAME}/assets/insight.svg`, // https://game-icons.net/1x1/lorc/light-bulb.html
        "Intimidation": `/modules/${MODULE_NAME}/assets/intimidation.svg`, // https://game-icons.net/1x1/lorc/one-eyed.html
        "Intimidation Skill Check": `/modules/${MODULE_NAME}/assets/intimidation.svg`, // https://game-icons.net/1x1/lorc/one-eyed.html
        "Investigation": `/modules/${MODULE_NAME}/assets/investigation.svg`, // https://game-icons.net/1x1/lorc/magnifying-glass.html
        "Investigation Skill Check": `/modules/${MODULE_NAME}/assets/investigation.svg`, // https://game-icons.net/1x1/lorc/magnifying-glass.html
        "Medicine": `/modules/${MODULE_NAME}/assets/medicine.svg`, // https://game-icons.net/1x1/delapouite/first-aid-kit.html
        "Medicine Skill Check": `/modules/${MODULE_NAME}/assets/medicine.svg`, // https://game-icons.net/1x1/delapouite/first-aid-kit.html
        "Nature": `/modules/${MODULE_NAME}/assets/nature.svg`, // https://game-icons.net/1x1/delapouite/forest.html
        "Nature Skill Check": `/modules/${MODULE_NAME}/assets/nature.svg`, // https://game-icons.net/1x1/delapouite/forest.html
        "Perception": `/modules/${MODULE_NAME}/assets/perception.svg`, // https://game-icons.net/1x1/lorc/semi-closed-eye.html
        "Perception Skill Check": `/modules/${MODULE_NAME}/assets/perception.svg`, // https://game-icons.net/1x1/lorc/semi-closed-eye.html
        "Performance": `/modules/${MODULE_NAME}/assets/performance.svg`, // https://game-icons.net/1x1/lorc/sing.html
        "Performance Skill Check": `/modules/${MODULE_NAME}/assets/performance.svg`, // https://game-icons.net/1x1/lorc/sing.html
        "Persuasion": `/modules/${MODULE_NAME}/assets/persuasion.svg`, // https://game-icons.net/1x1/delapouite/public-speaker.html
        "Persuasion Skill Check": `/modules/${MODULE_NAME}/assets/persuasion.svg`, // https://game-icons.net/1x1/delapouite/public-speaker.html
        "Religion": `/modules/${MODULE_NAME}/assets/religion.svg`, // https://game-icons.net/1x1/lorc/holy-grail.html
        "Religion Skill Check": `/modules/${MODULE_NAME}/assets/religion.svg`, // https://game-icons.net/1x1/lorc/holy-grail.html
        "Sleight of Hand": `/modules/${MODULE_NAME}/assets/sleight_of_hand.svg`, // https://game-icons.net/1x1/lorc/snatch.html
        "Sleight of Hand Skill Check": `/modules/${MODULE_NAME}/assets/sleight_of_hand.svg`, // https://game-icons.net/1x1/lorc/snatch.html
        "Stealth": `/modules/${MODULE_NAME}/assets/stealth.svg`, // https://game-icons.net/1x1/lorc/cloak-dagger.html
        "Stealth Skill Check": `/modules/${MODULE_NAME}/assets/stealth.svg`, // https://game-icons.net/1x1/lorc/cloak-dagger.html
        "Survival": `/modules/${MODULE_NAME}/assets/survival.svg`, // https://game-icons.net/1x1/delapouite/deer-track.html
        "Survival Skill Check": `/modules/${MODULE_NAME}/assets/survival.svg`, // https://game-icons.net/1x1/delapouite/deer-track.html

        "Artisan's Tools": `/modules/${MODULE_NAME}/assets/artisan_s_tools.svg`, // https://game-icons.net/1x1/lorc/hammer-nails.html
        "Disguise Kit": `/modules/${MODULE_NAME}/assets/disguise_kit.svg`, // https://game-icons.net/1x1/lorc/duality-mask.html
        "Forgery Kit": `/modules/${MODULE_NAME}/assets/forgery_kit`, // https://game-icons.net/1x1/lorc/quill-ink.html
        "Gaming Set": `/modules/${MODULE_NAME}/assets/gaming_set.svg`, // https://game-icons.net/1x1/delapouite/rolling-dice-cup.html
        "Herbalism Kit": `/modules/${MODULE_NAME}/assets/herbalism_kit`, // https://game-icons.net/1x1/delapouite/herbs-bundle.html
        "Musical Instrument": `/modules/${MODULE_NAME}/assets/musical_instrument.svg`, // https://game-icons.net/1x1/zajkonur/violin.html
        "Navigator's tools": `/modules/${MODULE_NAME}/assets/navigator_s_tools.svg`, // https://game-icons.net/1x1/delapouite/sextant.html
        "Poisoner's Kit": `/modules/${MODULE_NAME}/assets/poisoner_s_kit.svg`, // https://game-icons.net/1x1/lorc/poison-bottle.html
        "Thieves Tools": `/modules/${MODULE_NAME}/assets/thieves_tools.svg`, // https://game-icons.net/1x1/delapouite/lockpicks.html
        "Thieves' Tools": `/modules/${MODULE_NAME}/assets/thieves_tools.svg`, // https://game-icons.net/1x1/delapouite/lockpicks.html

        "Short Rest": `/modules/${MODULE_NAME}/assets/short_rest.svg`, // https://game-icons.net/1x1/delapouite/wooden-chair.html 
        "Long Rest": `/modules/${MODULE_NAME}/assets/long_rest.svg`, // https://game-icons.net/1x1/delapouite/person-in-bed.html
    }


export const imageReplacerKo:Record<string, string> =
    {
        // =======================================================================
        // dnd5e
        // =======================================================================

    }


