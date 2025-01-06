import { std } from "wow/wotlk";
import { REAPER_CLASS, REAPER_CONSTANTS } from "../classes/reaper";

export const SHARED_VALUES = {
    NAME: "Crypt Key",
    DESCRIPTION: "A key to unlock Your Crypt.",
    ICON: "inv_misc_key_11",
}


export const CRYPT_KEY = std.Items.create(REAPER_CONSTANTS.MODULE_NAME, "reaper-key-" + SHARED_VALUES.NAME)
    .Name.enGB.set(SHARED_VALUES.NAME)
    .Class.KEY.set()
    .Quality.GREEN.set()
    .Description.enGB.set(SHARED_VALUES.DESCRIPTION)
    .ClassMask.set(REAPER_CLASS.Mask)
    .DisplayInfo.setSimpleIcon(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.NAME, SHARED_VALUES.ICON)
    .Spells.addGet()
        .Spell.set(3366)