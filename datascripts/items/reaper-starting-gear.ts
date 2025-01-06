import { std } from "wow/wotlk";
import { REAPER_CLASS, REAPER_CONSTANTS } from "../classes/reaper";
import { ScalingStatDistributionDBCFile } from "wow/wotlk/dbc/ScalingStatDistribution";

const SHARED_VALUES = {
    POLEARM_NAME: "Initiate Scythe",
    THROWN_NAME: "Blades of Fate",
    CHEST_NAME: "Blood Crusted Chestpiece",
    LEGGINGS_NAME: "Blood Crusted Leggings",
    BOOTS_NAME: "Blood Crusted Boots",
}

const CHEST = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.CHEST_NAME)
    .Name.enGB.set(SHARED_VALUES.CHEST_NAME)
    .Description.enGB.set("You remember something, the cold, a cackle, and a deep and echoing voice, talking about Making you their champion.")
    .Class.LEATHER_EQUIP.set()
    .ClassMask.set(REAPER_CLASS.Mask)
    .Armor.set(132)
    .InventoryType.CHEST.set()
    .Bonding.BINDS_ON_PICKUP.set()
    .Quality.WHITE.set()
    .DisplayInfo.set(35054)
    .Flags.BIND_TO_ACCOUNT.set(0)

const LEGGINGS = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.LEGGINGS_NAME)
    .Name.enGB.set(SHARED_VALUES.LEGGINGS_NAME)
    .Description.enGB.set("Stained in so much blood, is it truly yours?")
    .Class.LEATHER_EQUIP.set()
    .ClassMask.set(REAPER_CLASS.Mask)
    .Armor.set(73)
    .InventoryType.LEGS.set()
    .Bonding.NO_BOUNDS.set()
    .Quality.WHITE.set()
    .DisplayInfo.set(35065)
    .Flags.BIND_TO_ACCOUNT.set(0)

const BOOTS = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.BOOTS_NAME)
    .Name.enGB.set(SHARED_VALUES.BOOTS_NAME)
    .Description.enGB.set("A name is inscribed on the side of the sole... $N")
    .Class.LEATHER_EQUIP.set()
    .ClassMask.set(REAPER_CLASS.Mask)
    .Armor.set(53)
    .InventoryType.FEET.set()
    .Bonding.NO_BOUNDS.set()
    .Quality.WHITE.set()
    .DisplayInfo.set(36351)
    .Flags.BIND_TO_ACCOUNT.set(0)

const POLEARM = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.POLEARM_NAME)
    .Name.enGB.set(SHARED_VALUES.POLEARM_NAME)
    .Description.enGB.set("Do you even remember, what was in its stead once?")
    .Class.POLEARM.set()
    .InventoryType.TWOHAND.set()
    .Bonding.NO_BOUNDS.set()
    .Quality.WHITE.set()
    .ClassMask.set(REAPER_CLASS.Mask)
    .DisplayInfo.set(39287)
    .Damage.add("PHYSICAL", 3, 9)
    .Damage.addShadow(1, 3)
    .Delay.addMilliseconds(2900)
    .Flags.BIND_TO_ACCOUNT.set(0)
    .Sheath.TWO_HANDED_WEAPON.set()
    .SheatheType.set(2)

const THROWN = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.THROWN_NAME)
    .Name.enGB.set(SHARED_VALUES.THROWN_NAME)
    .Description.enGB.set("When looking at these blades, you feel a Piercing pain in your chest.")
    .Class.THROWN.set()
    .InventoryType.THROWN.set()
    .Bonding.NO_BOUNDS.set()
    .Quality.WHITE.set()
    .DisplayInfo.set(40187)
    .Damage.add("SHADOW", 3, 8)
    .Delay.addMilliseconds(1500)
    .RangeMod.set(100)

const GEAR = [CHEST, BOOTS, LEGGINGS, POLEARM, THROWN]

for (let classRacePair of REAPER_CLASS.Races.get()) {
    classRacePair.Outfits.both((srg) => {
        srg.Items.clearAll()
        srg.Items.add(6948)
        for (let item of GEAR) {
            srg.Items.add(item.ID)
        }
    })
}