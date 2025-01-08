import { std } from "wow/wotlk";
import { REAPER_BIT_FLAGS, REAPER_CLASS, REAPER_CONSTANTS, REAPER_QUEST_GROUP } from "../classes/reaper";
import { DEVOURING_SPIRIT, FRAGMENTED_SOUL } from "../npcs/crypt-mobs/devouring-spirit";
import { LUCIOUS_UNKNOWN } from "../npcs/reaper-trainers-human/lucious-unknown";
import { THE_UNDYING } from "../class-factions/the-undying";


export const SPARE_THEIR_SOULS = std.Quests.create(REAPER_CONSTANTS.MODULE_NAME, "spare-the-dying")

SPARE_THEIR_SOULS
    .Name.enGB.set("Spare their shattered Souls")
    .PickupText.enGB.set("$C, I am glad to see that you are a successful incarnate. Sadly not everyone makes it this far. I require your assistance in clearing out the Devouring Spirits, formed from the shattered souls of failed Incarnates. $B$BGrab the fragments of their Soul and let them rest at last.")
    .ObjectiveText.enGB.set("Lay 10 Devouring Spirits to rest, and retrieve their Soul Fragments.")
    .IncompleteText.enGB.set("You must lay them to rest yourself $C!")
    .CompleteText.enGB.set("Cold as your Scythe, you are worthy of being a $c. Congratulations.")
    .CompleteLogText.enGB.set("Return to the Unknown Incarnate.")

SPARE_THEIR_SOULS
    .AreaSort.set(41)
    .QuestLevel.set(3)

SPARE_THEIR_SOULS
    .Objectives.Entity.add(DEVOURING_SPIRIT.ID, 10)
    .Objectives.Item.add(FRAGMENTED_SOUL.ID, 3)

SPARE_THEIR_SOULS
    .Rewards.Difficulty.DIFFICULTY_9.set()
    .Rewards.Reputation.add(THE_UNDYING.ID, 250)
    .Rewards.ChoiceItem.add(44097, 1)
    .Rewards.ChoiceItem.add(44098, 1)

SPARE_THEIR_SOULS
    .Flags.SHARABLE.set(1)
    .Questgiver.addCreatureBoth(LUCIOUS_UNKNOWN.ID)