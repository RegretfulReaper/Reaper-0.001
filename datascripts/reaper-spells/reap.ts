import { std } from "wow/wotlk";
import { DEATH_SKILL_LINE, REAPER_BIT_FLAGS, REAPER_CLASS, REAPER_CONSTANTS } from "../classes/reaper";
import { createNewRank, damageCurveByLevel, addToTrainer } from "../utility";
import { TUNING_VALUES } from "../tuning";

const SHARED_VALUES = {
    NAME: "Reap",
    DESCRIPTION: "Slashes an Enemy, dealing $s1 Physical Damage.",
    ICON: "inv_throwingknife_06",
    COUNT: "1",

    A_SPELL_TAGS: [REAPER_BIT_FLAGS.A_REAP],
    B_SPELL_TAGS: [REAPER_BIT_FLAGS.B_DEATH],
    C_SPELL_TAGS: [],
}

const LEVELS = [1, 4, 10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 80]
const CAST_TIMES = [0]

const REAP_TEMPLATE = std.Spells.create(REAPER_CONSTANTS.MODULE_NAME, "spell-" + SHARED_VALUES.NAME, 0)

REAP_TEMPLATE
    .Attributes.CANT_TARGET_SELF.set(0)
    .Name.enGB.set(SHARED_VALUES.NAME)
    .Description.enGB.set(SHARED_VALUES.DESCRIPTION)
    .Icon.setPath(SHARED_VALUES.ICON)
    .Range.set(2)
    .TargetType.UNIT_ENEMY.set(0)
    .CastTime.set(0)
    .Cooldown.Time.set(1000)
    .Mana.CostPerLevel.set(25)
    

REAP_TEMPLATE
    .Family.set(REAPER_CONSTANTS.FAMILY_ID)
    .ClassMask.clearAll()

REAP_TEMPLATE
    .Effects.addGet()
        .Type.SCHOOL_DAMAGE.set()
        .ImplicitTargetA.UNIT_TARGET_ENEMY.set()
        .DamageBase.set(27)
        .DamageDieSides.set(1)
        .ChainAmplitude.set(1)
        .DamagePerLevel.set(39)

        
REAP_TEMPLATE
    .Visual.getRefCopy()
        .cloneFromSpell(1715)

REAP_TEMPLATE.SkillLines.add(DEATH_SKILL_LINE.ID, [REAPER_CLASS.Mask])

let previousRank : number | undefined
LEVELS.forEach((level, index) => {

    let cast_time : number
    if (index >= CAST_TIMES.length) {
        cast_time = CAST_TIMES[CAST_TIMES.length-1]
    }
    else {
        cast_time = CAST_TIMES[index]
    }

    let next_level : number
    if (index >= LEVELS.length - 1) {
        next_level = 80
    }
    else {
        next_level = LEVELS[index+1]
    }

    let damage =
        TUNING_VALUES.OVERALL_DAMAGE *
        TUNING_VALUES.DEATH_DAMAGE *
        TUNING_VALUES.REAP_DAMAGE *
        damageCurveByLevel(level) *
        cast_time / 100

    let energy_cost =
        TUNING_VALUES.OVERALL_BASE_ENERGY_PER_SEC *
        TUNING_VALUES.DEATH_ENERGY_TUNING
        TUNING_VALUES.REAP_ENERGY
        cast_time / 100

    let ap_bonus =
        cast_time / 120

    let rank = index + 1

    const NEW_RANK = createNewRank(REAP_TEMPLATE.ID, rank, level, next_level, previousRank)
    NEW_RANK.SkillLines.add(DEATH_SKILL_LINE.ID, [REAPER_CLASS.Mask])
    NEW_RANK.CastTime.setSimple(cast_time)
    NEW_RANK.BonusData.DirectBonus.set(ap_bonus)
    NEW_RANK.Power.CostPercent.set(energy_cost)
    NEW_RANK.Effects.get(0)
        .PointsBase.set(damage * 3.0)
        .PointsDieSides.set(damage * 3.5)

    if (typeof previousRank == 'undefined') {
        NEW_RANK.AutoLearn.add(1, REAPER_CLASS.Mask)
        for (let crp of REAPER_CLASS.Races.get()) {
            crp.Actions.addSpell(0, NEW_RANK.ID)
        }
    }
    else {
        addToTrainer(level, NEW_RANK, DEATH_SKILL_LINE.ID, [previousRank])
    }

    previousRank = NEW_RANK.ID
})