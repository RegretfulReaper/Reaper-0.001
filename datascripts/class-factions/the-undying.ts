import { std } from "wow/wotlk";
import { REAPER_BIT_FLAGS, REAPER_CLASS, REAPER_CONSTANTS, REAPER_QUEST_GROUP } from "../classes/reaper";
import { Reputation } from "wow/wotlk/std/Spell/EffectTemplates/EffectTemplates";

const SHARED_VALUES = {
    NAME: "The Undying",
    DESCRIPTION: "The ones risen from their graves, the undead souls lingering to take lives. Once reborn, a Reaper serves eternal.",
}

//console.log(std.Factions.load(21).objectify())

export const THE_UNDYING = std.Factions.create(REAPER_CONSTANTS.MODULE_NAME, "faction-" + SHARED_VALUES.NAME, true)
    .Name.enGB.set(SHARED_VALUES.NAME)
    .Reputation.addSimple(1200, ["HUMAN", "DWARF", "GNOME", "TAUREN", "ORC"], 12, "PEACE_FORCED")
    .Description.enGB.set(SHARED_VALUES.DESCRIPTION)
    .RepSpilloverDown.Cap.FRIENDLY.set()
    .Parent.set(1118)
    .Templates.addNeutralPassiveGet()
    .FactionGroup.PLAYERS.set(1)
    .FriendFactions.addId(21)
    .Flags.ASSIST_PLAYERS.set(1)