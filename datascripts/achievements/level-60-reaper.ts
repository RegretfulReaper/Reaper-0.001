import { std } from "wow/wotlk";
import { Achievement } from "wow/wotlk/std/Achievement/Achievement";
import { AchievementCategory } from "wow/wotlk/std/Achievement/AchievementCategory";
import { REAPER_CONSTANTS } from "../classes/reaper";



const SHARED_VALUES = {
    ACHIEVEMENT_NAME: "Reaper Level 60",
    ACHIEVEMENT_DESCRIPTION: "One of the few Reapers on the realm to achieve level 60.",
}

console.log()

const REAPER_SIXTY = std.Achievements.create(REAPER_CONSTANTS.MODULE_NAME, "achievement-" + SHARED_VALUES.ACHIEVEMENT_NAME)
    .Category.set("GENERAL")
    .Icon.setPath("inv_staff_78")
    .Name.enGB.set(SHARED_VALUES.ACHIEVEMENT_NAME)
    .Description.enGB.set(SHARED_VALUES.ACHIEVEMENT_DESCRIPTION)
    .Flags.HasProgressBar.set(1)
    .Rewards.Title.set(178)
    .Criteria.addMod(REAPER_CONSTANTS.MODULE_NAME, 'Feat of Strength Reaper', crit=>{
        crit.Type.REACH_LEVEL.set()
            .Level.set(60)
            .Description.enGB.set(SHARED_VALUES.ACHIEVEMENT_DESCRIPTION)
})