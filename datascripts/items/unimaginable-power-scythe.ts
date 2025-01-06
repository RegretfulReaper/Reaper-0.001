import { std } from "wow/wotlk";
import { REAPER_CLASS, REAPER_CONSTANTS } from "../classes/reaper";
import { ScalingStatDistributionDBCFile } from "wow/wotlk/dbc/ScalingStatDistribution";

const SHARED_VALUES = {
    POLEARM_NAME: "Infinity Scythe",
}

const INFINITY_SCYTHE = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.POLEARM_NAME)
    .Name.enGB.set(SHARED_VALUES.POLEARM_NAME)
    .Class.POLEARM.set()
    .InventoryType.TWOHAND.set()
    .Bonding.NO_BOUNDS.set()
    .Quality.ORANGE.set()
    .ClassMask.set(REAPER_CLASS.Mask)
    .DisplayInfo.set(39287)
    .Damage.add("PHYSICAL", 3879, 4377)
    .Damage.addShadow(915, 1796)
    .Delay.addMilliseconds(2900)
    .Flags.BIND_TO_ACCOUNT.set(0)
    .Sheath.TWO_HANDED_WEAPON.set()
    .SheatheType.set(0)
    .Stats.addAttackPower(10000)
    .Stats.addStamina(10000)
    .Stats.addAgility(10000)
    .Stats.addStrength(10000)
    .Armor.set(10000)
    .Stats.addHitRating(10000)
    .Stats.addHasteRating(10000)
    .Stats.addExpertiseRating(10000)
    .ItemLevel.set(60)