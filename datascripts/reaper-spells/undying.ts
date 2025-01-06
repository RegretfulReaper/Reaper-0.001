import { std } from "wow/wotlk";
import { REAPER_BIT_FLAGS, REAPER_CLASS, REAPER_CONSTANTS, UNDYING_SKILL_LINE } from "../classes/reaper";
import { createNewRank, damageCurveByLevel, addToTrainer } from "../utility";
import { TUNING_VALUES } from "../tuning";

//console.log(std.Spells.load(1120).objectify())

const SHARED_VALUES = {
    NAME: "Undying",
    DESCRIPTION: "The Aura of Death envelopes you, and your party, reducing damage taken.",
    AURA_DESCRIPTION: "Increases Armor by $s1",
    ICON: "Inv_misc_tournaments_symbol_scourge",
    ACITVE_ICON: "Classic_temp",

    A_SPELL_TAGS: [],
    B_SPELL_TAGS: [REAPER_BIT_FLAGS.B_UNDYING],
    C_SPELL_TAGS: [REAPER_BIT_FLAGS.C_UNDYING],


}

export const LEVELS = [1, 8, 14, 20, 26, 
    36, 42, 48, 54, 60, 
/*    64, 70, 76, 80*/]
export const ARMOR = [0, 0, 0, 0, 20,
    30, 35, 45, 50, 60,
    65, 70, 100, 130, 150]

const UNDYING_TEMPLATE = std.Spells.create(REAPER_CONSTANTS.MODULE_NAME, "spell-" + SHARED_VALUES.NAME + "-rank0", 0)

UNDYING_TEMPLATE
    .Name.enGB.set(SHARED_VALUES.NAME)
    .Description.enGB.set(SHARED_VALUES.DESCRIPTION)
    .AuraDescription.enGB.set(SHARED_VALUES.AURA_DESCRIPTION)
    .Subtext.enGB.set("")
    .TargetType.UNIT_ALLY.set(1)
    .Icon.setPath(SHARED_VALUES.ICON)
    .ActiveIcon.setPath(SHARED_VALUES.ACITVE_ICON)
    .SchoolMask.PHYSICAL.set(1)
    .DispelType.DISPEL_NONE.set()
    .Range.set(100)
    .Family.set(REAPER_CONSTANTS.FAMILY_ID)
    .ClassMask.clearAll()
    .Duration.set(21)
    .AutoLearn.add(1, [REAPER_CLASS.Mask])
    .Visual.getRef().cloneFromSpell(15473)

UNDYING_TEMPLATE
    .Family.set(REAPER_CONSTANTS.FAMILY_ID)
    .ClassMask.clearAll()
for (let flag of SHARED_VALUES.A_SPELL_TAGS) {
    UNDYING_TEMPLATE.ClassMask.A.setBit(flag, 1)
}
for (let flag of SHARED_VALUES.B_SPELL_TAGS) {
    UNDYING_TEMPLATE.ClassMask.B.setBit(flag, 1)
}
for (let flag of SHARED_VALUES.C_SPELL_TAGS) {
    UNDYING_TEMPLATE.ClassMask.C.setBit(flag, 1)
}


UNDYING_TEMPLATE
    .AutoLearn.add(REAPER_CLASS.Mask)
    .Attributes.IS_ABILITY.set(0)
    .Attributes.NOT_SHAPESHIFTED.set(0)
    .Attributes.SHEATHE_UNCHANGED.set(0)
    .Attributes.CASTABLE_WHILE_DEAD.set(0)
    .Attributes.CASTABLE_WHILE_MOUNTED.set(0)
    .Attributes.CASTABLE_WHILE_SITTING.set(0)
    .Attributes.UNAFFECTED_BY_INVULNERABILITY.set(0)
    .Attributes.NO_THREAT.set(0)
    .Attributes.HIDE_FROM_AURA_BAR.set(0)
    .Attributes.UNK11.set(0)
    .Attributes.CAN_TARGET_DEAD.set(0)
    .Attributes.PERSISTS_DEATH.set(0)
    .Attributes.UNK43.set(0)
    .Attributes.CASTABLE_ON_VEHICLE.set(0)

UNDYING_TEMPLATE
    .Effects.addGet()
        .Type.APPLY_AREA_AURA_PARTY.set()
        .Aura.MOD_TARGET_ARMOR_PCT.set()
        .PercentBase.set(24)
        .PercentDieSides.set(1)
        .PercentPerLevel.set(14 * 150)
        .ChainAmplitude.set(1)
        .ImplicitTargetA.UNIT_CASTER.set()

    UNDYING_TEMPLATE
    .Effects.addGet()
        .Type.APPLY_AREA_AURA_PARTY.set()
        .Aura.MOD_SHAPESHIFT.set()
        .Form.set(30)
        .ImplicitTargetA.UNIT_CASTER.set()
        .ChainAmplitude.set(1)

UNDYING_TEMPLATE.SkillLines.add(UNDYING_SKILL_LINE.ID, [REAPER_CLASS.Mask])