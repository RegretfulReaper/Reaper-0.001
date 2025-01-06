import { std } from "wow/wotlk";

export const MYSTIC_CONSTANTS = {
    MODULE_NAME: "default",
    CLASS_NAME: "Mystic",
    CLASS_COLOR: 0xb864fc,
    FAMILY_ID: 502,
    GLYPH_SUBFAMILY_ID: 502,
    CLASS_DESCRIPTION: "Runes, Glyphs, and Inscyptions, a Mystic's bread and butter. You use the knowledge of ancient Magic runes to Destroy your foes or support your Allies.",

    INFO_1: "- Role: Damage, Support",
    INFO_2: "- Light Armor (Cloth)",
    INFO_3: "- Great for buffing and making their allies stronger.",
    INFO_4: "- Utilizes Staves, Daggers, and Maces to fight.",
    INFO_5: "- Uses Mana as main Resource",

    TREE_1_NAME: "Runes",
    TREE_1_ICON: "spell_fire_rune",
    TREE_2_NAME: "Glyphs",
    TREE_2_ICON: "spell_shadow_rune",
    TREE_3_NAME: "Wisdom",
    TREE_3_ICON: "inv_misc_rune_03",

    CLASS_TRAINER_TEXT: "Our Studies never end, ancient knowledge is endless.",

    COOL_CATEGORY_RUNIC_BLAST: 1000,
    COOL_CATEGORY_CREATE_RUNE: 1001,

    MISSLE_MOTION_PROMINENCE: 5001,

    MYSTIC_QUEST_GROUP_ID: -1001,
}

export const MYSTIC_BIT_FLAGS = {
    A_RUNIC_BLAST: 1,
    A_CREATE_RUNE: 2,

    B_RUNES: 1,
    B_GLYPHS: 2,
    B_WISDOM: 3,
    B_SUPPORT: 4,

    C_RUNE: 1,
    C_RUNE_DAMAGE: 2,
    C_RUNE_STAMINA: 3,
    C_RUNE_SPELLPOWER: 4,
    C_RUNE_ATTACKPOWER: 5,
    C_RUNE_INTELLECT: 6,
    C_RUNE_SPIRIT: 7,
    C_RUNE_STRENGTH: 8,
    C_RUNE_AGILITY: 9,
    C_RUNE_HASTE: 10,
    C_RUNE_MOVEMENT: 11,
}
export const MYSTIC_CLASS = std.Classes.create(MYSTIC_CONSTANTS.MODULE_NAME, MYSTIC_CONSTANTS.CLASS_NAME, "MAGE")
    .Name.enGB.set(MYSTIC_CONSTANTS.CLASS_NAME)
    .Roles.Healer.set(1)
    .UI.Color.set(MYSTIC_CONSTANTS.CLASS_COLOR)
    .UI.DisabledText.set("This Race can not see the Natural Runes around us.")
    .UI.Description.set(MYSTIC_CONSTANTS.CLASS_DESCRIPTION)
    .UI.setIcon(std.Image.readFromModule("default", "assets/class-icon/spell_arcane_rune.blp"))
    .UI.Info.add(MYSTIC_CONSTANTS.INFO_1)
    .UI.Info.add(MYSTIC_CONSTANTS.INFO_2)
    .UI.Info.add(MYSTIC_CONSTANTS.INFO_3)
    .UI.Info.add(MYSTIC_CONSTANTS.INFO_4)
    .UI.Info.add(MYSTIC_CONSTANTS.INFO_5)
    .Races.add(["NIGHTELF", "BLOODELF", "TROLL", "DWARF", "DRAENEI", "TAUREN"])

std.DBC.QuestSort.add(-1 * MYSTIC_CONSTANTS.MYSTIC_QUEST_GROUP_ID)
    .SortName.enGB.set("Mystic")

export const RUNES_TALENT_TREE = MYSTIC_CLASS.TalentTrees.addGet(MYSTIC_CONSTANTS.MODULE_NAME, "talent-tree-" + MYSTIC_CONSTANTS.TREE_1_NAME, 0)
    .Name.enGB.set(MYSTIC_CONSTANTS.TREE_1_NAME)
    .Icon.setPath(MYSTIC_CONSTANTS.TREE_1_ICON)
    .OrderIndex.set(0)
    
export const GLYPHS_TALENT_TREE = MYSTIC_CLASS.TalentTrees.addGet(MYSTIC_CONSTANTS.MODULE_NAME, "talent-tree-" + MYSTIC_CONSTANTS.TREE_2_NAME, 0)
    .Name.enGB.set(MYSTIC_CONSTANTS.TREE_2_NAME)
    .Icon.setPath(MYSTIC_CONSTANTS.TREE_2_ICON)
    .OrderIndex.set(1)

export const WISDOM_TALENT_TREE = MYSTIC_CLASS.TalentTrees.addGet(MYSTIC_CONSTANTS.MODULE_NAME, "talent-tree-" + MYSTIC_CONSTANTS.TREE_3_NAME, 0)
    .Name.enGB.set(MYSTIC_CONSTANTS.TREE_3_NAME)
    .Icon.setPath(MYSTIC_CONSTANTS.TREE_3_ICON)
    .OrderIndex.set(2)

export const RUNES_SKILL_LINE = std.SkillLines.create(MYSTIC_CONSTANTS.MODULE_NAME, "skill-line-" + MYSTIC_CONSTANTS.TREE_1_NAME)
    .Name.enGB.set(MYSTIC_CONSTANTS.TREE_1_NAME)
    .Icon.setPath(MYSTIC_CONSTANTS.TREE_1_ICON)
    .Category.CLASS.set()
    .enableAutolearn()

export const GLYPHS_SKILL_LINE = std.SkillLines.create(MYSTIC_CONSTANTS.MODULE_NAME, "skill-line-" + MYSTIC_CONSTANTS.TREE_2_NAME)
    .Name.enGB.set(MYSTIC_CONSTANTS.TREE_2_NAME)
    .Icon.setPath(MYSTIC_CONSTANTS.TREE_2_ICON)
    .Category.CLASS.set()
    .enableAutolearn()

export const WISDOM_SKILL_LINE = std.SkillLines.create(MYSTIC_CONSTANTS.MODULE_NAME, "skill-line-" + MYSTIC_CONSTANTS.TREE_3_NAME)
    .Name.enGB.set(MYSTIC_CONSTANTS.TREE_3_NAME)
    .Icon.setPath(MYSTIC_CONSTANTS.TREE_3_ICON)
    .Category.CLASS.set()
    .enableAutolearn()

for (let skillLine of [RUNES_SKILL_LINE, GLYPHS_SKILL_LINE, WISDOM_SKILL_LINE]) {
    skillLine.RaceClassInfos.add([MYSTIC_CLASS.Mask], ["NIGHTELF", "BLOODELF", "TROLL", "DWARF", "DRAENEI", "TAUREN"])
}

std.EquipSkills.Cloth.enableAutolearnClass(MYSTIC_CLASS.Mask)
std.EquipSkills.Staves.enableAutolearnClass(MYSTIC_CLASS.Mask)
std.EquipSkills.Daggers.enableAutolearnClass(MYSTIC_CLASS.Mask)
std.EquipSkills.Maces1H.enableAutolearnClass(MYSTIC_CLASS.Mask)
std.EquipSkills.Maces2H.enableAutolearnClass(MYSTIC_CLASS.Mask)
std.EquipSkills.Wands.enableAutolearnClass(MYSTIC_CLASS.Mask)

const DRAENEI_RACIAL = std.Spells.create(MYSTIC_CONSTANTS.MODULE_NAME, 'spell-mystic-draenei-racial', 59548)
DRAENEI_RACIAL.AutoLearn.add(1, MYSTIC_CLASS.Mask, ["DRAENEI"])
const ORC_RACIAL = std.Spells.create(MYSTIC_CONSTANTS.MODULE_NAME, 'spell-Reaper-orc-racial', 26297)
ORC_RACIAL.AutoLearn.add(1, MYSTIC_CLASS.Mask, ["ORC"])

for (let rcp of MYSTIC_CLASS.Races.get()) {
    std.Spells.load(5019).AutoLearn.add(1, MYSTIC_CLASS.Mask)
    rcp.Actions.addSpell(2, 5019)

    if (rcp.Race.get() == 11)
        rcp.Actions.addSpell(3, DRAENEI_RACIAL.ID)

    if (rcp.Race.get() == 10) { // blood elf
        rcp.Actions.addSpell(3, 28730) // BE racial shared across mana-using classes
    }
}

export const MYSTIC_QUEST_GROUP = std.DBC.QuestSort.add(MYSTIC_CONSTANTS.MYSTIC_QUEST_GROUP_ID)
    .SortName.enGB.set("Mystic")

    const DUMMY_LOWLEVEL_TRAINER_NPC = std.CreatureTemplates.create(MYSTIC_CONSTANTS.MODULE_NAME, 'mystic-lowlevel-trainer', 16500)
    .Trainer.create()
DUMMY_LOWLEVEL_TRAINER_NPC
    .Trainer.getRef()
        .Greeting.enGB.set("Shall we decypher the Runes together?")
        .RequirementType.CLASS.set()
        .ClassMask.set(MYSTIC_CLASS.Mask)

export const LOWLEVEL_TRAINER = DUMMY_LOWLEVEL_TRAINER_NPC.Trainer.getRef()

const DUMMY_HIGHLEVEL_TRAINER_NPC = std.CreatureTemplates.create(MYSTIC_CONSTANTS.MODULE_NAME, 'mystic-highlevel-trainer', 16500)
    .Trainer.create()
DUMMY_HIGHLEVEL_TRAINER_NPC
    .Trainer.getRef()
        .Greeting.enGB.set("Shall we discuss these Runes?")
        .RequirementType.CLASS.set()
        .ClassMask.set(MYSTIC_CLASS.Mask)

export const HIGHLEVEL_TRAINER = DUMMY_HIGHLEVEL_TRAINER_NPC.Trainer.getRef()

type VendorItem = {
    item : number,
    altCostID: number,
    altCostCount: number
}

let runeVendorItems : VendorItem[] = []
let runeVendors : number[] = []

function addVendorItemToCreature(item : VendorItem, creatureID : number) {
    let creature = std.CreatureTemplates.load(creatureID)
    if (item.altCostID > 0) {
        creature.Vendor.addGet(item.item, "GENERATE")
            .ExtendedCost.getRef()
                .Items.add(item.altCostID, item.altCostCount)
    }
    else {
        creature.Vendor.addGet(item.item)
    }
}

export function registerRuneVendor(creatureID : number) {
    std.CreatureTemplates.load(creatureID).NPCFlags.VENDOR.set(1)
    runeVendors.push(creatureID)
    for (let vendorItem of runeVendorItems) {
        addVendorItemToCreature(vendorItem, creatureID)
    }
}