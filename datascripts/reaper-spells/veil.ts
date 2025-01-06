import { std } from "wow/wotlk";
import { DEATH_SKILL_LINE, REAPER_BIT_FLAGS, REAPER_CLASS, REAPER_CONSTANTS } from "../classes/reaper";
import { createNewRank, damageCurveByLevel, addToTrainer } from "../utility";
import { TUNING_VALUES } from "../tuning";

const SHARED_VALUES = {
    NAME: "Veil of Undeath",
    DESCRIPTION: "As the Grim Reaper himself, you can hide behind the Veil of Undeath to follow your target until their time has come.",
    ICON: "spell_shadow_nethercloak",
    AURA_DESCRIPTION: "Hidden, and ready to pounce.",

    A_SPELL_TAGS: [],
    B_SPELL_TAGS: [],
    C_SPELL_TAGS: [],
}

const VEIL_TEMPLATE = std.Spells.create(REAPER_CONSTANTS.MODULE_NAME, "spell-" + SHARED_VALUES.NAME, 0)

VEIL_TEMPLATE
    .Name.enGB.set(SHARED_VALUES.NAME)
    .Description.enGB.set(SHARED_VALUES.DESCRIPTION)
    .AuraDescription.enGB.set(SHARED_VALUES.AURA_DESCRIPTION)
    .Icon.setPath(SHARED_VALUES.ICON)
    .Family.set(REAPER_CONSTANTS.FAMILY_ID)
    .ClassMask.clearAll()
    .Range.set(1)
    .Duration.set(21)
    .ActiveIcon.set(30)
    .Power.Type.MANA.set()
    .AutoLearn.add(REAPER_CLASS.Mask)

VEIL_TEMPLATE
    .Attributes.IS_ABILITY.set(1)
    .Attributes.NOT_SHAPESHIFTED.set(1)
    .Attributes.SHEATHE_UNCHANGED.set(1)
    .Attributes.STOP_ATTACKING.set(1)
    .Attributes.DISABLED_WHILE_ACTIVE.set(1)
    .Attributes.CASTABLE_WHILE_SITTING.set(1)
    .Attributes.CANNOT_USE_IN_COMBAT.set(1)
    .Attributes.UNK3.set(1)
    .Attributes.DAMAGE_REDUCE_SHIELD.set(1)
    .Attributes.CAN_PROC_WITH_TRIGGERED.set(1)
    .AuraInterruptFlags.CAST.set(1)
    .AuraInterruptFlags.TAKE_DAMAGE.set(1)
    .Visual.getRefCopy().cloneFromSpell(1784)

VEIL_TEMPLATE
    .Effects.addGet()
        .Type.APPLY_AURA.set()
        .Aura.MOD_SHAPESHIFT.set()
        .Form.set(30)
        .ImplicitTargetA.UNIT_CASTER.set()
        .ChainAmplitude.set(1)
    
VEIL_TEMPLATE
    .Effects.addGet()
        .Type.APPLY_AURA.set()
        .Aura.MOD_STEALTH.set()
        .School.NORMAL.set()
        .PointsBase.set(5)
        .PointsDieSides.set(1)
        .PointsPerLevel.set(5)
        .ChainAmplitude.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()

VEIL_TEMPLATE
    .Effects.addGet()
        .Type.APPLY_AURA.set()
        .Aura.PERIODIC_HEAL.set()
        .School.set(0)
        .HealPeriod.set(3 * 1000)
        .HealBase.set(337)
        .HealDieSides.set(1)
        .BonusMultiplier.set(0.5)
        .ChainAmplitude.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()

VEIL_TEMPLATE.SkillLines.add(DEATH_SKILL_LINE.ID, [REAPER_CLASS.Mask])

addToTrainer(4, VEIL_TEMPLATE, DEATH_SKILL_LINE.ID, [])