import { std } from "wow/wotlk";
import { REAPER_BIT_FLAGS, REAPER_CLASS, REAPER_CONSTANTS, REAPER_QUEST_GROUP } from "../../classes/reaper";
import { THE_UNDYING } from "../../class-factions/the-undying";
import { SPARE_THEIR_SOULS } from "../../quests/amas-their-souls";

const CRYPT_QUESTGIVER_OUTFIT = std.CreatureOutfits.create().fromString(`

    Character\Human\male\humanmale.m2
    1 0
    11 23 11 6 3 11 1
    25513
    0
    40502
    22480
    22482
    0
    40500
    40495
    22483
    40496
    30697
    0
    28672
    19505
    0
    `)


export const LUCIOUS_UNKNOWN = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, "Lucious Unknown")
    .Name.enGB.set("Unknown Man")
    .FactionTemplate.set(THE_UNDYING.ID)
    .Models.addGet().set(CRYPT_QUESTGIVER_OUTFIT.ID)
    .Icon.setQuest()
    .Type.HUMANOID.set()
    .Rank.BOSS.set()
    .Gossip.set(0)
    .Questgiver.addBoth(26100)
    .UnitClass.PALADIN.set()
    .UnitFlags.NON_ATTACKABLE.set(1)
    .Spawns.add(REAPER_CONSTANTS.MODULE_NAME, "Lucious Unknown", {map:0,x:-11237.380859,y:-1757.205688,z:-15.701232,o:2.779598},)