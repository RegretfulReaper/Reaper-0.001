import { std } from "wow/wotlk";
import { MYSTIC_CLASS, MYSTIC_CONSTANTS } from "../classes/Mystic";
import { ItemTemplate } from "wow/wotlk/std/Item/ItemTemplate";

const SHARED_VALUES = {
    MACE_NAME: "Scribe's Mace",
    WAND_NAME: "Scribe's Enchanted Pen",
    ROBE_NAME: "Scribe Robe",
    LEGGINGS_NAME: "Scribe Leggings",
    BOOTS_NAME: "Scribe Wandering Slippers",
    SHIRT_NAME: "Only Good Shirt",
}

const MACE = std.Items.create(MYSTIC_CONSTANTS.MODULE_NAME, SHARED_VALUES.MACE_NAME)
    .Name.enGB.set(SHARED_VALUES.MACE_NAME)
    .InventoryType.MAINHAND.set()
    .SheatheType.set(3)
    .Sheath.ONE_HANDED.set()    
    .Class.MACE_1H.set()
    .DisplayInfo.set(34860)
    .Quality.WHITE.set()
    .Damage.addPhysical(1, 3)
    .Damage.addArcane(1, 6)
    .Description.enGB.set("A Scribe's trusty knocker")
    .Delay.addMilliseconds(1850)
    .Durability.set(16)
    .ItemLevel.set(1)
    .ClassMask.set(MYSTIC_CLASS.Mask)
    .Bonding.BINDS_ON_PICKUP.set()
    .Price.PlayerSellPrice.addCopper(6)

const WAND = std.Items.create(MYSTIC_CONSTANTS.MODULE_NAME, SHARED_VALUES.WAND_NAME)
    .Name.enGB.set(SHARED_VALUES.WAND_NAME)
    .InventoryType.RANGED.set()
    .Class.WAND.set()
    .ClassMask.set(MYSTIC_CLASS.Mask)
    .Bonding.BINDS_ON_PICKUP.set()
    .Damage.addArcane(1, 6)
    .DisplayInfo.set(31863)
    .Delay.addMilliseconds(1400)
    .ItemLevel.set(1)
    .Quality.WHITE.set()
    .Price.PlayerSellPrice.addCopper(7)
    .Sheath.NONE.set()
    .RangeMod.set(100)

const ROBE = std.Items.create(MYSTIC_CONSTANTS.MODULE_NAME, SHARED_VALUES.ROBE_NAME)
    .Name.enGB.set(SHARED_VALUES.ROBE_NAME)
    .Armor.set(13)
    .DisplayInfo.set(22033)
    .Class.CLOTH_EQUIP.set()
    .InventoryType.CHEST.set()
    .Bonding.BINDS_ON_PICKUP.set()
    .ClassMask.set(MYSTIC_CLASS.Mask)
    .Durability.set(35)
    .Description.enGB.set("It feels wrong, but that makes it so good.")

const BOOTS = std.Items.create(MYSTIC_CONSTANTS.MODULE_NAME, SHARED_VALUES.BOOTS_NAME)
    .Name.enGB.set(SHARED_VALUES.BOOTS_NAME)
    .Quality.WHITE.set()
    .DisplayInfo.set(22034)
    .InventoryType.FEET.set()
    .Class.CLOTH_EQUIP.set()
    .Armor.set(2)
    .Bonding.BINDS_ON_PICKUP.set()
    .ClassMask.set(MYSTIC_CLASS.Mask)


const LEGGINGS = std.Items.create(MYSTIC_CONSTANTS.MODULE_NAME, SHARED_VALUES.LEGGINGS_NAME, 1395)
    .Name.enGB.set(SHARED_VALUES.LEGGINGS_NAME)

const GEAR = [ROBE, BOOTS, LEGGINGS, MACE, WAND]

for (let classRacePair of MYSTIC_CLASS.Races.get()) {
    classRacePair.Outfits.both((srg) => {
        srg.Items.clearAll()
        srg.Items.add(6948)
        for (let item of GEAR) {
            srg.Items.add(item.ID)
        }
    })
}