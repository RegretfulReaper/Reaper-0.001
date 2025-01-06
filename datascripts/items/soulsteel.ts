import { std } from "wow/wotlk"
import { REAPER_CONSTANTS } from "../classes/reaper"

const SHARED_VALUES = {
    NAME: "Soul Steel",
    ICON: "spell_shadow_soulgem",
    DESCRIPTION: "Within this one tiny Pearl, lie dormant thousands of souls."
}

export const SOULSTEEL = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, "item-" + SHARED_VALUES.NAME)
    .Name.enGB.set(SHARED_VALUES.NAME)
    .Description.enGB.set(SHARED_VALUES.DESCRIPTION)
    .Quality.PURPLE.set()
    .Bonding.BINDS_ON_PICKUP.set()
    .MaxStack.set(20)
    .MaxCount.set(100)
    .Flags.CONJURED.set(1)
SOULSTEEL.DisplayInfo.getRefCopy(REAPER_CONSTANTS.MODULE_NAME, "display" + SHARED_VALUES.NAME)
    .Icon.set(SHARED_VALUES.ICON)