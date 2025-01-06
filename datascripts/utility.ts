import { std } from "wow/wotlk";
import { Spell } from "wow/wotlk/std/Spell/Spell";
import { REAPER_CONSTANTS, LOWLEVEL_TRAINER, HIGHLEVEL_TRAINER, REAPER_CLASS } from "./classes/reaper";
import { FactionTemplateValues } from "wow/wotlk/std/Faction/FactionTemplates";
import { RaceIDs } from "wow/wotlk/std/Race/RaceType";
import { CreatureTemplate } from "wow/wotlk/std/Creature/CreatureTemplate"

export const CONV_VALUES = {
    CRIT_RATING: 1792,
    HASTE_RATING: 917504
}

var reference_levels = [1, 6, 12, 18, 24,
     30, 36, 42, 48, 54,
     60, 66, 70, 74, 80]

    var reference_damage = [16 * (3.5/1.5), 34 * (3.5/2.0), 57 * (3.5/2.5), 89 * (3.5/3.0), 146,
        207 * (3.5/3.0), 264 * (3.5/3.0), 328 * (3.5/3.0), 404 * (3.5/3.0), 488 * (3.5/3.0),
        575 * (3.5/3.0), 649 * (3.5/3.0), 733 * (3.5/3.0), 804 * (3.5/3.0), 898 * (3.5/3.5)]
reference_damage = reference_damage.map((val) => {return val / 3.5})

var reference_stats = [1, 2, 4, 6, 8,
    10, 12, 14, 17, 23,
    25, 31, 44, 52, 75]

var reference_training_costs = [10, 100, 600, 1800, 4000,
    8000, 13000, 18000, 28000, 36000,
    42000, 78000, 100000, 125000, 150000
]

function valueCurveByLevel(level : number, ref_levels : number[], ref_values : number[]) : number {
    if (ref_levels.length != ref_values.length) {
        console.log("There's an error in reference values in the Reaper utility-functions file - two arrays had different lengths.")
    }

    let index = 0
    while (ref_levels[index] < level) {
        index++
    }

    if (ref_levels[index] == level) {
        return ref_values[index]
    }

    else {
        let previous_level = ref_levels[index - 1]
        let previous_value = ref_values[index - 1]
        let next_level : number
        let next_value : number
        if (index >= ref_levels.length - 1) {
            next_level = 80
            next_value = ref_values[ref_values.length - 1]
        }
        else {
            next_level = ref_levels[index]
            next_value = ref_values[index]
        }
        let proportion = (level - previous_level) / (next_level - previous_level)
        if (proportion < 0 || proportion > 1) {
            console.log("Something went wrong with proportion, got value: " + proportion + ", levels: " + level + "," + next_level + "," + previous_level)
        }
        return next_value * proportion + previous_value * (1 - proportion)
    }
}

let minorGlyphIcons = ["inv_inscription_minorglyph09", "inv_inscription_minorglyph03", "inv_inscription_minorglyph20", "inv_inscription_minorglyph17", "inv_inscription_minorglyph18", "inv_inscription_minorglyph08", "inv_inscription_minorglyph12", "inv_inscription_minorglyph15", "inv_inscription_minorglyph16", "inv_inscription_minorglyph01", "inv_inscription_minorglyph06", "inv_inscription_minorglyph10", "inv_inscription_minorglyph13", "inv_inscription_minorglyph14", "inv_inscription_minorglyph00", "inv_inscription_minorglyph02", "inv_inscription_minorglyph19", "inv_inscription_minorglyph04", "inv_inscription_minorglyph05", "inv_inscription_minorglyph07", "inv_inscription_minorglyph11"]
let majorGlyphIcons = ["inv_inscription_majorglyph15", "inv_inscription_majorglyph20", "inv_inscription_majorglyph09", "inv_inscription_majorglyph13", "inv_inscription_majorglyph16", "inv_inscription_majorglyph19", "inv_inscription_majorglyph04", "inv_inscription_majorglyph10", "inv_inscription_majorglyph14", "inv_inscription_majorglyph00", "inv_inscription_majorglyph01", "inv_inscription_majorglyph17", "inv_inscription_majorglyph02", "inv_inscription_majorglyph18", "inv_inscription_majorglyph03", "inv_inscription_majorglyph05", "inv_inscription_majorglyph06", "inv_inscription_majorglyph07", "inv_inscription_majorglyph08", "inv_inscription_majorglyph11", "inv_inscription_majorglyph12"]
let appliedIcons = [3118]
let lastIcon = 0
export function createGlyphFromEffectSpell(effectSpell : Spell, isMinor? : bool) {
    let name = effectSpell.Name.enGB.get()
    let description = effectSpell.Description.enGB.get()

    // we need to splice a new description. We do this by splitting on $s1, $s2, etc.
    let splitDescription = description.split("$s1")
    description = splitDescription.join("$" + effectSpell.ID + "s1")
    splitDescription = description.split("$s2")
    description = splitDescription.join("$" + effectSpell.ID + "s2")
    splitDescription = description.split("$s3")
    description = splitDescription.join("$" + effectSpell.ID + "s3")

    // for internal identifiers
    let internal_name = effectSpell.Name.enGB.get().toLowerCase().replace(" ", "-")

    // get icon
    let appliedIcon  = appliedIcons[lastIcon % appliedIcons.length]
    let icon : string
    if (isMinor) {
        icon = minorGlyphIcons[lastIcon % minorGlyphIcons.length]
    }
    else {
        icon = majorGlyphIcons[lastIcon % majorGlyphIcons.length]
    }
    lastIcon++

    const GLYPH_STRUCT = std.Glyphs.create(REAPER_CONSTANTS.MODULE_NAME, 'glyph-struct-' + internal_name)
        .Spell.set(effectSpell.ID)
        .Icon.set(appliedIcon)

    const GLYPH_APPLY_SPELL = std.Spells.create(REAPER_CONSTANTS.MODULE_NAME, 'spell-apply-glyph' + internal_name, 56599)
        .Name.enGB.set(name)
        .Description.enGB.set(description)
    GLYPH_APPLY_SPELL
        .Effects.get(0)
            .Type.APPLY_GLYPH.set()
            .Glyph.set(GLYPH_STRUCT.ID)

    const GLYPH_ITEM = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, 'item-glyph-' + internal_name, 42751)
        .Name.enGB.set(name)
        .ClassMask.set([REAPER_CLASS.Mask])
    GLYPH_ITEM
        .Spells.get(0)
            .Spell.set(GLYPH_APPLY_SPELL.ID)
    GLYPH_ITEM
        .DisplayInfo.getRefCopy(REAPER_CONSTANTS.MODULE_NAME, 'itemdisplay-' + internal_name)   
            .Icon.set(icon)

    if (isMinor) {
        GLYPH_STRUCT.Flags.IS_MINOR.set(1)
    }
    GLYPH_STRUCT.Items.addMod(REAPER_CONSTANTS.MODULE_NAME, 'glyphitem-' + internal_name, (gi) => {
        gi.Description.enGB.set(description)
        gi.Name.enGB.set(name)
    })

    return GLYPH_ITEM
}

let INSCRIPTION_TRAINERS = [30706, 30713, 26995, 28702, 30722, 33603, 26959, 26916, 30716, 33638, 30715, 30709, 33679, 30711, 33615, 26977, 30721, 30717, 30710]
let INK_LEVELS = [1, 100, 150, 200, 250, 300, 350]
let INKS = [39774, 43116, 43118, 43120, 43122, 43124, 43126]
let PARCHMENTS = [39354, 10648, 10648, 39501, 39501, 39502, 39502]
export function addGlyphToTrainer(item : number, skill : number) {
    let itemTemplate = std.Items.load(item)
    itemTemplate.RequiredLevel.set(Math.max(Math.min(Math.floor(skill / 8 - 5), 80), 15))
    let name = itemTemplate.Name.enGB.get()
    let internal_name = name.toLowerCase().replace(" ", "-")

    // find correct ink and parchment
    let current_ink_index = 0
    while (INK_LEVELS[current_ink_index + 1] < skill && current_ink_index < INK_LEVELS.length - 2) {
        current_ink_index++
    }
    if (INK_LEVELS[current_ink_index] > skill) {
        current_ink_index++ // handles the last index
    }
    let requiredInk = INKS[current_ink_index]
    let requiredParchment = PARCHMENTS[current_ink_index]

    const CRAFT_SPELL = std.Spells.create(REAPER_CONSTANTS.MODULE_NAME, 'spell-create-' + internal_name, 57003)
    CRAFT_SPELL
        .Name.enGB.set(name)
        .Reagents.clearAll()
        .Reagents.add(requiredInk, 1)
        .Reagents.add(requiredParchment, 1)
        .Effects.get(0)
            .Type.CREATE_ITEM.set()
            .Item.set(item)

    for (let trainerID of INSCRIPTION_TRAINERS) {
        let trainer = std.CreatureTemplates.load(trainerID)

        // high level glyphs only go on northrend/outland trainers
        if (skill <= 300) {
            trainer.Trainer.getRef().Spells.add(CRAFT_SPELL.ID, costCurveByLevel(skill / 5) / 4, 0, 773, skill)
        }
        else if (trainer.Level.Min.get() >= 60 && skill <= 375) {
            // has to be >= 60, the honor hold/thrallmar trainers are 60 exactly
            trainer.Trainer.getRef().Spells.add(CRAFT_SPELL.ID, costCurveByLevel(skill / 5) / 4, 0, 773, skill)
        }
        else if (trainer.Level.Min.get() >= 70 && skill <= 450) {
            trainer.Trainer.getRef().Spells.add(CRAFT_SPELL.ID, costCurveByLevel(skill / 5) / 4, 0, 773, skill)
        }
    }
}



export function damageCurveByLevel(level : number) {
    return valueCurveByLevel(level, reference_levels, reference_damage)
}

export function statCurveByLevel(level : number) {
    return valueCurveByLevel(level, reference_levels, reference_stats)
}

export function costCurveByLevel(level : number) {
    if (level <= 2) {
        return 10 // 10c for lvl2 spell
    }
    if (level <= 6) {
        return 100 // 100c for lvl4 or 6 spell
    }
    let returnValue = valueCurveByLevel(level, reference_levels, reference_training_costs)
    let numDigits = Math.floor(Math.log10(returnValue)) + 1
    if (numDigits <= 3) { return returnValue }
    else { return returnValue - (returnValue % Math.pow(10, numDigits - 3)) }
}

export function createNewRank(templateSpell : number, rank : number, level : number, nextLevel : number, previousRank? : number) {
    const NEW_RANK = std.Spells.create(REAPER_CONSTANTS.MODULE_NAME, "rank(" + rank.toString() + ")-" + templateSpell, templateSpell)
    NEW_RANK.Subtext.enGB.set("Rank " + rank)

    let requiredSpells : number[]

    if (rank == 1) {
        NEW_RANK.Rank.set(NEW_RANK.ID, 1)
        requiredSpells = []
    }
    else if (typeof previousRank != 'undefined') {
        NEW_RANK.Rank.set(std.Spells.load(previousRank).Rank.getFirstSpell(), rank)
        requiredSpells = [previousRank]
    }
    else {
        throw "Attempt to create new rank failed - rank was >1 but no previous rank specified."
    }

    NEW_RANK.Levels.set(level, level, nextLevel)

    return NEW_RANK
}

export function addToTrainer(level : number, spell : Spell, skillLine : number | undefined, requiredSpells : number[]) {
    if (level <= 6) {
        LOWLEVEL_TRAINER.Spells.add(spell.ID,
            costCurveByLevel(level),
            level,
            skillLine,
            0,
            requiredSpells
        )
    }
    HIGHLEVEL_TRAINER.Spells.add(spell.ID,
        costCurveByLevel(level),
        level,
        skillLine,
        0,
        requiredSpells
    )
}

export function addNPCPOI(creature : number, label : string) : number {
    const NEW_POI_ID = std.IDs.points_of_interest.dynamicId();
    const position = std.CreatureTemplates.load(creature).Spawns.get()[0].Position
    std.SQL.points_of_interest.add(NEW_POI_ID, { PositionX: position.X.get(), PositionY: position.Y.get(), Icon: 7, Flags: 99, Importance: 0, Name: label });
    return NEW_POI_ID
}