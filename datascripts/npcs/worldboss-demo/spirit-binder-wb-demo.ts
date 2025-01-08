import { std } from "wow/wotlk";
import { REAPER_BIT_FLAGS, REAPER_CLASS, REAPER_CONSTANTS, REAPER_QUEST_GROUP } from "../../classes/reaper";
import { DEVOURING_SPIRIT } from "../crypt-mobs/devouring-spirit";
import { CONFIG } from "../../config";

export const SPIRIT_BINDER = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, "spirit-binder")
    .Name.enGB.set("Etherion")
    .Subname.enGB.set("The Spirit Enslaver")
    .Rank.BOSS.set()
    .UnitClass.MAGE.set()
    .Family.GHOUL.set()
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .Type.UNDEAD.set()
    .TypeFlags.BOSS.set(1)
    .FactionTemplate.NEUTRAL_NON_AGGRESSIVE.set()
    .Difficulty.Heroic5Man.set(0)
    .MovementSpeed.set(1.5, 1.5)
    .Level.set(5)
    .Scale.set(0.5)
    .Stats.HealthMod.set(15)
    .Stats.ArmorMod.set(5)
    .Stats.ExperienceMod.set(8)
    .Stats.ManaMod.set(5)
    .Stats.DamageMod.set(3)
    .Gold.set(5000, 40000)
    .Models.addIds(17444)
    .MovementType.IDLE.set()
    .Emote.set(4)
    .Tags.addUnique("default", "spirit-binder")
    .Tags.add("default", "creature.spirit-binder.auto-set-position-z")
//    .Spawns.add("default", "spirit-binder", {map:0,x:-11216.100586,y:-1740.085449,z:-29.961668,o:4.713251},)
;

if ( CONFIG.isActive ) {
    SPIRIT_BINDER.Spawns.add("default", "creature.spirit-binder", CONFIG.bossSpawnPosition, x=>x
        .EquipmentID.set(1)
    )
}

const ENRAGED_SPIRIT = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, "enraged-spirit")
    .Name.enGB.set("Enraged Spirit")
    .Subname.enGB.set("Reaper Fragment")
    .Models.addIds(11649)
    .Scale.set(0.6)
    .Stats.HealthMod.set(0.1)
    .Level.set(3)
    .FactionTemplate.NEUTRAL_NON_AGGRESSIVE.set()
    .MovementSpeed.set(CONFIG.addsMovementSpeed, CONFIG.addsMovementSpeed)
    .UnitClass.WARRIOR.set()
    .Type.UNDEAD.set()
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .Tags.addUnique("default", "enraged-spirit")
    .Tags.add("default", "creature.enraged-spirit")
;

const DEFEATED_SPIRIT = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, "defeated-spirit")
    .Name.enGB.set("Defeated Spirit")
    .Level.set(5)
    .Models.addIds(14365)
    .Stats.HealthMod.set(0.1)
    .MovementSpeed.set(CONFIG.addsMovementSpeed, CONFIG.addsMovementSpeed)
    .NormalLoot.set(0)
    .Tags.addUnique("default", "defeated-spirit")
    .Tags.add("default", "creature.defeated-spirit")
;

const SPIRIT_KILLER = std.CreatureTemplates.create("default", "Spirit-Killer", 32666)
    .Name.enGB.set("Spirit-Killer")
    .FactionTemplate.NEUTRAL_PASSIVE.set()
    .Level.set(80, 80)
    .Icon.setInteract()
    .NormalLoot.set(0)
    .Gold.set(0)
    .MechanicImmunity.add(["BANISH", "CHARM", "DISORIENTED", "FEAR", "FREEZE", "GRIP", "HORROR", "KNOCKOUT", "POLYMORPH", "ROOT", "SAPPED", "SHACKLE", "SLEEP", "SNARE", "STUN"])
    .NPCFlags.GOSSIP.set(true)
    .Tags.addUnique("default", "Spirit-Killer")
    .Tags.add("default", "creature.Spirit-Killer")
;

    export const CREATURES = {
        SPIRIT_BINDER,
        ENRAGED_SPIRIT,
        DEFEATED_SPIRIT,
        SPIRIT_KILLER
    }





















