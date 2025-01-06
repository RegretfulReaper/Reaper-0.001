import { std } from "wow/wotlk";
import { REAPER_CONSTANTS, REAPER_BIT_FLAGS, REAPER_QUEST_GROUP, REAPER_CLASS, DECAY_SKILL_LINE } from "../classes/reaper";
import { addToTrainer, createNewRank, damageCurveByLevel } from "../utility";
import { TUNING_VALUES } from "../tuning";

const SHARED_VALUES = {
    NAME: "Steal Soul",
    DESCRIPTION: "Drains souls, creating an Orb of Soul Steel.",
    ICON: "Inv_enchant_voidsphere",
//=====================
//===== BIT FLAGS =====
//=====================

    A_SPELL_TAGS: [REAPER_BIT_FLAGS.A_ZUG],
    B_SPELL_TAGS: [REAPER_BIT_FLAGS.B_DECAY],
    C_SPELL_TAGS: [],
}

const LEVELS = [10, 14, 18, 26, 32, 38, 46, 54, 64, 70, 76, 80]

export const ZUG_TEMPLALTE = std.Spells.create(REAPER_CONSTANTS.MODULE_NAME, "spell-" + SHARED_VALUES.NAME + "-rank1")


ZUG_TEMPLALTE
    .Name.enGB.set(SHARED_VALUES.NAME)
    .Icon.setPath(SHARED_VALUES.ICON)
    .Description.enGB.set(SHARED_VALUES.DESCRIPTION)
    .Family.set(REAPER_CONSTANTS.FAMILY_ID)
    .ClassMask.clearAll()
    .FacingCasterFlags.SPELL_FACING_FLAG_INFRONT.set(0)
    .Power.Type.HEALTH.set()
    .Power.CostBase.set(14)
    .Power.CostPerLevel.set(14 * 1.5)
    .Visual.set(12656)


ZUG_TEMPLALTE
    .Attributes.UNK1.set(0)
    .Attributes.UNK9.set(0)
    .Attributes.UNK82.set(0)
    .Attributes.NOT_SHAPESHIFTED.set(0)
    .Attributes.CHANNELED.set(0)
    .Attributes.CHANNEL_TRACK_TARGET.set(0)
    .Attributes.UN_AUTOCASTABLE_BY_PET.set(0)
    .Attributes.IS_DRAIN_SOUL.set(0)
    .Attributes.HASTE_AFFECT_DURATION.set(0)

ZUG_TEMPLALTE
    .Effects.addGet()
        .Type.APPLY_AURA.set()
        .Aura.CHANNEL_DEATH_ITEM.set()
        .Item.set(60005)
        .CountBase.set(0)
        .CountDieSides.set(1)
        .ChainAmplitude.set(1)
        .ImplicitTargetA.UNIT_TARGET_ENEMY.set()

ZUG_TEMPLALTE
    .Effects.addGet()
        .Type.APPLY_AURA.set()
        .Aura.PERIODIC_DAMAGE.set()
        .DamagePeriod.set(1000)
        .DamageBase.set(54)
        .DamageDieSides.set(1)
        .BonusMultiplier.set(0.27)
        .ChainAmplitude.set(1)
        .ImplicitTargetA.UNIT_TARGET_ENEMY.set()
        .ImplicitTargetB.UNIT_DEST_AREA_ENEMY.set().Radius.setSimple(20, 0, 20)

ZUG_TEMPLALTE
    .Effects.addGet()
        .Type.APPLY_AURA.set()
        .Aura.PROC_TRIGGER_SPELL.set()
        .TriggeredSpell.set(0)
        .ImplicitTargetA.UNIT_CASTER.set()
        .ChainAmplitude.set(1)

ZUG_TEMPLALTE
    .Visual.getRef().cloneFromSpell(1120)

ZUG_TEMPLALTE
    .Range.setSimple(0, 50)
    .CastTime.setSimple(0)
    .Duration.set(8)

ZUG_TEMPLALTE.SkillLines.add(DECAY_SKILL_LINE.ID, [REAPER_CLASS.Mask])

addToTrainer(10, ZUG_TEMPLALTE, DECAY_SKILL_LINE.ID, [])