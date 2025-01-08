import { std } from "wow/wotlk";

const LUCIOUS_MODEL = std.CreatureOutfits.create().fromString(`
    
    Character\Scourge\male\scourgemale.m2
    5 0
    3 0 1 1 0 1 1
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
    36605
    34986
    28672
    19505
    0
    `)

export const LUCIOUS_BOSS = std.CreatureTemplates.create("default", "Lucious Falconcrest Boss")
    .Name.enGB.set("Lucious Falconcrest")
    .Subname.enGB.set("The Liveless Husk of Master Lucious")
    .Models.addGet().set(LUCIOUS_MODEL.ID)
    .Gold.set(746152, 1124566)
    .Rank.BOSS.set()
    .TypeFlags.BOSS.set(1)
    .UnitFlags.FEIGN_DEATH.set(1)
    .Scale.set(1.5)
    .DamageSchool.Shadow.set()
    .Spawns.add("default", "Lucious Falconcrest Boss", {map:571,x:5728.000977,y:2183.178955,z:636.040649,o:0.724867},)
    .Level.set(83)
    .AIName.ReactorAI()
    .MovementType.IDLE.set()
    .AttackTime.MeleeBase.set(2900)
    .UnitClass.PALADIN.set()
    .NormalLoot.set(1)

LUCIOUS_BOSS
    .Type.UNDEAD.set()
    .FactionTemplate.NEUTRAL_HOSTILE.set()
    .Stats.ArmorMod.set(10)
    .Stats.HealthMod.set(150)
    .Stats.ManaMod.set(100)
    .Stats.DamageMod.set(12)