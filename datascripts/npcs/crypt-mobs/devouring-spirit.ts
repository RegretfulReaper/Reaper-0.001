import { std } from "wow/wotlk";
import { REAPER_BIT_FLAGS, REAPER_CLASS, REAPER_CONSTANTS, REAPER_QUEST_GROUP } from "../../classes/reaper";
import { CreatureModel } from "wow/wotlk/std/Creature/CreatureDisplayInfo";
import { QUEST_LOOT_REAPER } from "../../datascripts";

export const DEVOURING_SPIRIT = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, "Devouring-Spirit")
    .Name.enGB.set("Lesser Devouring Spirit")
    .Subname.enGB.set("Failed Incarnate")
    .Level.set(1, 3)
    .Type.UNDEAD.set()
    .Icon.setAttack()
    .Models.addIds(11649)
    .UnitClass.MAGE.set()
    .Family.GHOUL.set()
    .Rank.ELITE.set()
    .DamageSchool.Shadow.set()
    .AttackTime.MeleeBase.set(3000)
    .MechanicImmunity.BLEED.set(1)
    .MechanicImmunity.STUN.set(1)
    .MechanicImmunity.SAPPED.set(1)
    .NormalLoot.set(QUEST_LOOT_REAPER.ID)
    .FactionTemplate.NEUTRAL_NON_AGGRESSIVE.set()
    .Stats.ArmorMod.set(10)
    .Stats.HealthMod.set(5)
    .Stats.ExperienceMod.set(3)
    .Stats.DamageMod.set(1.8)


const SPAWNS = [
    {map:0,x:-11200.396484,y:-1778.409668,z:-29.900120,o:2.381124},
    {map:0,x:-11204.540039,y:-1755.881348,z:-29.923647,o:1.805427},
    {map:0,x:-11216.910156,y:-1771.118530,z:-29.879827,o:4.039886},
    {map:0,x:-11242.548828,y:-1771.258179,z:-28.396908,o:2.980384},
    {map:0,x:-11234.536133,y:-1749.695435,z:-28.312199,o:1.392308},
    {map:0,x:-11246.779297,y:-1725.610474,z:-28.430315,o:2.043403},
    {map:0,x:-11233.304688,y:-1703.435425,z:-28.325916,o:0.989398},
    {map:0,x:-11206.570312,y:-1698.625488,z:-28.374418,o:0.151378},
    {map:0,x:-11202.010742,y:-1721.690674,z:-29.903122,o:4.899895},
    {map:0,x:-11183.975586,y:-1733.176392,z:-28.487724,o:5.719851},
    {map:0,x:-11190.567383,y:-1746.156128,z:-28.397768,o:4.237018},
    {map:0,x:-11184.791016,y:-1752.834595,z:-28.469479,o:5.677439},
    {map:0,x:-11213.588867,y:-1796.092407,z:-28.404757,o:4.219738},
    {map:0,x:-11208.859375,y:-1812.885498,z:-28.461290,o:5.024772},
    {map:0,x:-11223.255859,y:-1817.504272,z:-28.493099,o:3.418632},
    {map:0,x:-11231.891602,y:-1792.984009,z:-28.406301,o:1.752016},
    {map:0,x:-11246.511719,y:-1794.126587,z:-28.443949,o:3.219926},
]

DEVOURING_SPIRIT.Spawns.add(REAPER_CONSTANTS.MODULE_NAME, "Devouring-Spirit", SPAWNS, (spawn) => {
    spawn
        .MovementType.RANDOM_MOVEMENT.set()
        .WanderDistance.set(5)
})

export const FRAGMENTED_SOUL = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, "Soul Fragment")
    .Name.enGB.set("Soul Fragment")
    .Description.enGB.set("One might ponder, what happened to the souls which could not become a Reaper.")
    .Bonding.QUEST_ITEM.set()
    .Class.QUEST.set()
    .Quality.GREEN.set()
    .MaxStack.set(3)
    .DisplayInfo.set(39928)
