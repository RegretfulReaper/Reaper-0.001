import { std } from "wow/wotlk";
import { CONFIG } from "./config";
import { DamageBase, PointsBase } from "wow/wotlk/std/Spell/EffectTemplates/PointsBase";

//console.log(std.Spells.load(10).objectify())

const frostbolt = std.Spells.create("default", "boss-frostbolt", 116)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(11 * 1.3)
    .CastTime.setSimple(3000)
;

const blizzard = std.Spells.create("default", "boss-blizzard", 10)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(53 * 1.2)
    .CastTime.set(1)
    .Attributes.set(["CHANNELED"]).delete()
;

const frostlance = std.Spells.create("default", "boss-frostlance", 30455)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(133 * 1.5)
    .CastTime.setSimple(500)
;

const evocation = std.Spells.create("default", "boss-evocation", 12051)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .CastTime.set(1)
;

const immunity = std.Spells.create("default", "boss-immunity", 52982)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Duration.setSimple(30000)
    .Visual.modRefCopy(x=>x
        .ImpactKit.modRefCopy(x=>x.clear())
    )
;

const reduce_spell_damage_taken = std.Spells
    .create("default", "spell.maldrion.reduce-spell-damage-taken", 23028) // 27518
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("default", "spell.maldrion.reduce-spell-damage-taken")
;
const increace_spell_damage = std.Spells
    .create("default", "spell.maldrion.increase-spell-damage", 23028) // 14799
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("default", "spell.maldrion.increase-spell-damage")
;
const reduce_physical_damage_taken = std.Spells
    .create("default", "spell.maldrion.reduce-physical-damage-taken", 14752) // 34337
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("default", "spell.maldrion.reduce-physical-damage-taken")
;
const increace_physical_damage = std.Spells
    .create("default", "spell.maldrion.increase-physical-damage", 1126) // 63391
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("default", "spell.maldrion.increase-physical-damage")
;
const reflect_damage = std.Spells
    .create("default", "spell.maldrion.reflect-damage", 467) // 15696
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("default", "spell.maldrion.reflect-damage")
;
const increase_resistances = std.Spells
    .create("default", "spell.maldrion.increase-resistances", 976) // 18681
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("default", "spell.maldrion.increase-resistances")
;
const increase_armor = std.Spells
    .create("default", "spell.maldrion.increase-armor", 588) // 11348
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("default", "spell.maldrion.increase-armor")
;
const increase_health = std.Spells
    .create("default", "spell.maldrion.increase-health", 1243) // 2378
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Stacks.set(999)
    .Attributes.NOT_STEALABLE.set(true)
    .DispelType.DISPEL_NONE.set()
    .Tags.addUnique("default", "spell.maldrion.increase-health")
;
const drain_ghost = std.Spells
    .create("default", "spell.Spirit-Killer", 46153)
    .Name.enGB.set("Kill Spirit")
    .Duration.setSimple(6000, 0, 6000)
    .Range.setSimple(0, CONFIG.addsDistanceFromBoss + 10)
    .Power.CostPercent.set(0)
    .Power.CostBase.set(0)
    .Attributes.CAN_TARGET_NOT_IN_LOS.set(true)
    .Attributes.IGNORE_HIT_RESULT.set(true)
    .Attributes.IGNORE_IMMUNE_FLAGS.set(true)
    .Attributes.IGNORE_RESISTANCES.set(true)
    .Effects.mod(0, x=>x
        .Aura.PERIODIC_DAMAGE.set().DamageBase.set(1000).DamagePeriod.set(10)
        .ImplicitTargetA.UNIT_TARGET_ANY.set()
    )
    .InterruptFlags.clearAll()
    .AuraInterruptFlags.clearAll()
    .ChannelInterruptFlags.clearAll()
    .Tags.addUnique("default", "spell.Spirit-Killer.activate-Spirit-Killer.drain-ghost")
;

export const SPELLS = {
    immunity,
    frostbolt,
    blizzard,
    frostlance,
    evocation
}
export const AURAS = {
    reduce_spell_damage_taken,
    increace_spell_damage,
    reduce_physical_damage_taken,
    increace_physical_damage,
    reflect_damage,
    increase_resistances,
    increase_armor,
    increase_health
};