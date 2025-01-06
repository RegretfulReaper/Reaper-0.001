import { std } from "wow/wotlk";
import { REAPER_CONSTANTS, REAPER_BIT_FLAGS, DEATH_TALENT_TREE, DEATH_SKILL_LINE, REAPER_CLASS, HIGHLEVEL_TRAINER } from "../../classes/reaper";
import { THE_UNDYING } from "../../class-factions/the-undying";

let position = {map:0,x:-9483.967773,y:39.439552,z:57.966076,o:3.057852}

const GOLDSHIRE_TRAINER_OUTFIT = std.CreatureOutfits.create().fromString(`
    
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


export const GOLDSHIRE_TRAINER = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, 'creature-goldshire-trainer', 328)
GOLDSHIRE_TRAINER
    .Models.clearAll()
    .Models.addGet().set(GOLDSHIRE_TRAINER_OUTFIT.ID)
    .Name.enGB.set("Master Lucious")
    .Subname.enGB.set("Reaper Trainer")
    .Level.set(80)
    .FactionTemplate.set(THE_UNDYING.ID)
    .TypeFlags.BOSS.set(1)
    .Rank.BOSS.set()
    .FlagsExtra.CANNOT_ENTER_COMBAT.set(1)
    .Spawns.add(REAPER_CONSTANTS.MODULE_NAME, 'spawn-reaper-goldshire-trainer', position)
    .Trainer.set(HIGHLEVEL_TRAINER.ID)
    .Gossip.set(0)
    .Gossip.getNew()
        .Text.addMod((gte) => {
            gte.Text.set({enGB: `You see me, but do you know what to call me?
            
Do not approach, if you wish to keep that Neck of yours.`})
            gte.Emote.set(3) // wave
        })

export const GOLDSHIRE_TRAINER_POI_ID = std.IDs.points_of_interest.dynamicId();
std.SQL.points_of_interest.add(GOLDSHIRE_TRAINER_POI_ID, { PositionX: position.x, PositionY: position.y, Icon: 7, Flags: 99, Importance: 0, Name: 'Goldshire Reaping Trainer' });