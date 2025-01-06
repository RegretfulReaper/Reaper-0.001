import { std } from "wow/wotlk";
import { ItemDisplayInfoDBCFile } from "wow/wotlk/dbc/ItemDisplayInfo";
import { ItemDisplayInfo } from "wow/wotlk/std/Item/ItemDisplayInfo";
import { ItemFlags } from "wow/wotlk/std/Item/ItemFlags";

std.SQL.spell_area.query({ area: 616, spell: 42202 }).delete();

std.Titles.create("default", "True-Reaper")
    .Text.set({enGB: "%s, Undying Soul"})

std.Titles.create("default", "fresh-reaper")
    .Text.set({enGB: "Initiate %s, the awoken Soul"})


export const QUEST_LOOT_REAPER = std.Loot.Creature.create().addItem(60013, 33, 1, 1, true)