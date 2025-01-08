import { std } from "wow/wotlk";
import { ExtendedCost } from "wow/wotlk/std/ExtendedCost/ExtendedCost";
import { ItemIcon } from "wow/wotlk/std/Item/ItemIcon";
import { RaceIDs } from "wow/wotlk/std/Race/RaceType"
import { Vendor } from "wow/wotlk/std/Vendor/Vendor"

export const REAPER_CONSTANTS = {
    MODULE_NAME: "default",
    CLASS_NAME: "Reaper",
    CLASS_COLOR: 0xb864fc,
    FAMILY_ID: 501,
    GLYPH_SUBFAMILY_ID: 501,
    CLASS_DESCRIPTION: `When the Body Perishes, the Reaper comes to take their soul to the other side. Not all heroes die and pass on, some become reapers themselves, to ensure that death remains a constance in this world.

The Most Brutal of them, become devouring Spirits, that eternally haunt the Azeroth and remain their until their so called duty is fulfilled.

The Primary stats pf a Reaper are Agility and Strength.`,
    INFO_1: `- Role: Damage, Tank`,
    INFO_2: `- All Types of Armor`,
    INFO_3: `- Good for Close Quarters Combat`,
    INFO_4: `- Reaps Souls to increase Power`,
    INFO_5: `- Uses mana and health as resource`,
    TREE_1_NAME: 'Death',
    TREE_1_ICON: 'spell_shadow_deathsembrace',
    TREE_2_NAME: 'Decay',
    TREE_2_ICON: 'spell_shadow_darkritual',
    TREE_3_NAME: 'Undying',
    TREE_3_ICON: 'achievement_boss_cthun',

    CLASS_TRAINER_DIALOG: `Death comes for all, let us ensure, it stays that way! What do you wish to know $N?`,

    COOL_CATEGORY_BLOODBATH: 1000,
    COOL_CATEGORY_REAP: 1001,
    COOL_CATEGORY_UNDYING: 1002,
    COOL_CATEGORY_VEIL: 1003,
    COOL_CATEGORY_CONSUMPTION: 1004,
    COOL_CATEGORY_PETRIFYING_STARE: 1005,
    COOL_CATEGORY_OMEN: 1006,

    REAPER_QUEST_GROUP_ID: -1001,
}

//=====================
//===== BIT FLAGS =====
//=====================
export const REAPER_BIT_FLAGS = {
    A_BLOODBATH: 1,
    A_REAP: 2,
    A_UNDYING: 3,
    A_VEIL: 4,
    A_CONSUMPTION: 5,
    A_PETRIFYING_STARE: 6,
    A_OMEN: 7,
    A_ZUG: 8,

    B_DEATH: 1,
    B_DECAY: 2,
    B_UNDYING: 3,
    B_SUPPORT: 4,

    C_UNDYING: 1,
}

//======================
//===== MAIN CLASS =====
//======================
export const REAPER_CLASS = std.Classes.create(REAPER_CONSTANTS.MODULE_NAME, REAPER_CONSTANTS.CLASS_NAME, "PALADIN")
    .Name.enGB.set(REAPER_CONSTANTS.CLASS_NAME)
    .Roles.Damage.set(1)
    .UI.Color.set(REAPER_CONSTANTS.CLASS_COLOR)
    .UI.DisabledText.set("You must select a Mortal Race to become a Reaper.")
    .UI.setIcon(std.Image.readFromModule("default", "assets/class-icon/Reaper.blp"))
    .UI.Info.add(REAPER_CONSTANTS.INFO_1)
    .UI.Info.add(REAPER_CONSTANTS.INFO_2)
    .UI.Info.add(REAPER_CONSTANTS.INFO_3)
    .UI.Info.add(REAPER_CONSTANTS.INFO_4)
    .UI.Info.add(REAPER_CONSTANTS.INFO_5)
    .UI.Description.set(REAPER_CONSTANTS.CLASS_DESCRIPTION)
    .Races.add(["HUMAN", "GNOME", "DWARF", "ORC", "TAUREN"])
    .Races.forEach(raceClass => {
        if (raceClass.Class.get() == 12) {
            raceClass.SpawnPosition.set(41, {map:0,x:-11253.531250,y:-1755.243896,z:-15.699960,o:0.026782})
        }
    })
    .RequiredExpansion.set(0)

std.DBC.QuestSort.add(-1 * REAPER_CONSTANTS.REAPER_QUEST_GROUP_ID)
    .SortName.enGB.set("Reaper")

//========================
//===== TALENT TREES =====
//========================
export const DEATH_TALENT_TREE = REAPER_CLASS.TalentTrees.addGet(REAPER_CONSTANTS.MODULE_NAME, "talent-tree-" + REAPER_CONSTANTS.TREE_1_NAME, 0)
    .Name.enGB.set(REAPER_CONSTANTS.TREE_1_NAME)
    .Icon.setPath(REAPER_CONSTANTS.TREE_1_ICON)
    .BackgroundImage.set(std.Classes.load("PRIEST").TalentTrees.get()[2].BackgroundImage.get())
    .OrderIndex.set(0)

export const DECAY_TALENT_TREE = REAPER_CLASS.TalentTrees.addGet(REAPER_CONSTANTS.MODULE_NAME, "talent-tree-" + REAPER_CONSTANTS.TREE_2_NAME, 0)
    .Name.enGB.set(REAPER_CONSTANTS.TREE_2_NAME)
    .Icon.setPath(REAPER_CONSTANTS.TREE_2_ICON)
    .BackgroundImage.set(std.Classes.load("WARLOCK").TalentTrees.get()[0].BackgroundImage.get())
    .OrderIndex.set(1)

export const UNDYING_TALENT_TREE = REAPER_CLASS.TalentTrees.addGet(REAPER_CONSTANTS.MODULE_NAME, "talent-tree-" + REAPER_CONSTANTS.TREE_3_NAME, 0)
    .Name.enGB.set(REAPER_CONSTANTS.TREE_3_NAME)
    .Icon.setPath(REAPER_CONSTANTS.TREE_3_ICON)
    .BackgroundImage.set(std.Classes.load("ROGUE").TalentTrees.get()[2].BackgroundImage.get())
    .OrderIndex.set(2)

//=======================
//===== SKILL LINES =====
//=======================
// Tabs for the Spellbook.
export const DEATH_SKILL_LINE = std.SkillLines.create(REAPER_CONSTANTS.MODULE_NAME, "skill-line" + REAPER_CONSTANTS.TREE_1_NAME)
    .Name.enGB.set(REAPER_CONSTANTS.TREE_1_NAME)
    .Icon.setPath(REAPER_CONSTANTS.TREE_1_ICON)
    .Category.CLASS.set()
    .enableAutolearn()

export const DECAY_SKILL_LINE = std.SkillLines.create(REAPER_CONSTANTS.MODULE_NAME, "skill-line" + REAPER_CONSTANTS.TREE_2_NAME)
    .Name.enGB.set(REAPER_CONSTANTS.TREE_2_NAME)
    .Icon.setPath(REAPER_CONSTANTS.TREE_2_ICON)
    .Category.CLASS.set()
    .enableAutolearn()

export const UNDYING_SKILL_LINE = std.SkillLines.create(REAPER_CONSTANTS.MODULE_NAME, "skill-line" + REAPER_CONSTANTS.TREE_3_NAME)
    .Name.enGB.set(REAPER_CONSTANTS.TREE_3_NAME)
    .Icon.setPath(REAPER_CONSTANTS.TREE_3_ICON)
    .Category.CLASS.set()
    .enableAutolearn()

for (let skillLine of [DEATH_SKILL_LINE, DECAY_SKILL_LINE, UNDYING_SKILL_LINE]) {
    skillLine.RaceClassInfos.add([REAPER_CLASS.Mask], ["HUMAN", "GNOME", "DWARF", "ORC", "TAUREN"])
}

std.EquipSkills.Cloth.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Leather.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Mail.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Plate.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Polearms.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Swords1H.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Swords2H.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Thrown.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Axes1H.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Axes2H.enableAutolearnClass(REAPER_CLASS.Mask)
std.EquipSkills.Shields.enableAutolearnClass(REAPER_CLASS.Mask)

const TROLL_RACIAL = std.Spells.create(REAPER_CONSTANTS.MODULE_NAME, 'spell-Reaper-troll-racial', 26297)
TROLL_RACIAL.AutoLearn.add(1, REAPER_CLASS.Mask, ["ORC"])

for (let rcp of REAPER_CLASS.Races.get()) {
    std.Spells.load(2764).AutoLearn.add(1, REAPER_CLASS.Mask)
    rcp.Actions.addSpell(2, 2764)
}


//=======================
//===== QUEST GROUP =====
//=======================
export const REAPER_QUEST_GROUP = std.DBC.QuestSort.add(REAPER_CONSTANTS.REAPER_QUEST_GROUP_ID)
    .SortName.enGB.set("Reaper")

//==============================
//===== TRAINERS & VENDORS =====
//==============================
const DUMMY_LOWLEVEL_TRAINER_NPC = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, 'reaper-lowlevel-trainer', 16500)
    .Trainer.create()
DUMMY_LOWLEVEL_TRAINER_NPC
    .Trainer.getRef()
        .Greeting.enGB.set("Death is unchanging and eternal!")
        .RequirementType.CLASS.set()
        .ClassMask.set(REAPER_CLASS.Mask)

export const LOWLEVEL_TRAINER = DUMMY_LOWLEVEL_TRAINER_NPC.Trainer.getRef()

const DUMMY_HIGHLEVEL_TRAINER_NPC = std.CreatureTemplates.create(REAPER_CONSTANTS.MODULE_NAME, 'reaper-highlevel-trainer', 16500)
    .Trainer.create()
DUMMY_HIGHLEVEL_TRAINER_NPC
    .Trainer.getRef()
        .Greeting.enGB.set("It is time for you, to become Death itself!")
        .RequirementType.CLASS.set()
        .ClassMask.set(REAPER_CLASS.Mask)

export const HIGHLEVEL_TRAINER = DUMMY_HIGHLEVEL_TRAINER_NPC.Trainer.getRef()

type VendorItem = {
    item : number,
    altCostID: number,
    altCostCount: number
}
let soulsteelVendorItems : VendorItem[] = []
let soulsteelVendors : number[] = []

function addVendorItemToCreature(item: VendorItem, creatureID : number) {
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

export function registerSoulsteelItem(item : number, altCostID : number, altCostCount : number) {
    let vendorItem = {
        item : item,
        altCostID : altCostID,
        altCostCount : altCostCount
    }
    soulsteelVendorItems.push(vendorItem)

    for (let creatureID of soulsteelVendors) {
        addVendorItemToCreature(vendorItem, creatureID)
    }
}