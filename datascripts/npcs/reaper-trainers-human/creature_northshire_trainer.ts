import { std } from "wow/wotlk";
import { REAPER_CONSTANTS, REAPER_BIT_FLAGS, DEATH_TALENT_TREE, DEATH_SKILL_LINE, REAPER_CLASS, LOWLEVEL_TRAINER } from "../../classes/reaper";
import { THE_UNDYING } from "../../class-factions/the-undying";

const NORTHSHIRE_TRAINER_OUTFIT = std.CreatureOutfits.create().fromString(`

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

export const NORTHSHIRE_TRAINER = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, 'creature-northshire-trainer', 328)
NORTHSHIRE_TRAINER
    .TypeFlags.FORCE_GOSSIP.set(1)
    .Level.set(80)
    .FactionTemplate.set(THE_UNDYING.ID)
    .Rank.BOSS.set()
    .Type.UNDEAD.set()
    .TypeFlags.BOSS.set(1)
    .FlagsExtra.CANNOT_ENTER_COMBAT.set(1)
    .Models.clearAll()
    .Models.addGet().set(NORTHSHIRE_TRAINER_OUTFIT.ID)
    .Name.enGB.set("Master Lucious")
    .Subname.enGB.set("Reaper Trainer")
//    .Spawns.add(REAPER_CONSTANTS.MODULE_NAME, 'spawn-reaper-northshire-trainer', {map:0,x:-11237.380859,y:-1757.205688,z:-15.701232,o:2.779598},)
    .Trainer.set(LOWLEVEL_TRAINER.ID)
    .Gossip.set(0)
    .Gossip.getNew()
        .Text.addMod((gte) => {
            gte.Text.set({enGB: "Death shall remain unending, never again will fear hold us in its clutches!"})
        })