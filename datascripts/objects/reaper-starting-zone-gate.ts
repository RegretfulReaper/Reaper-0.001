import { Objects } from "wow";
import { std } from "wow/wotlk";
import { REAPER_CONSTANTS } from "../classes/reaper";

//console.log(std.GameObjectTemplates.Doors.load(177203).stringify())

const SHARED_VALUES = {
    NAME: "PLAYER_CRYPT_GATE",
}

const PLAYER_CRYPT = std.GameObjectTemplates.Doors.create(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.NAME)
    .Name.enGB.set(SHARED_VALUES.NAME)
    .Type.DOOR.set()
    .Display.set(411)
    .StartOpen.set(0)
    .AutoClose.set(5000)
    .Lock.set(4)
    .Size.set(1.5)
    .Flags.NO_DESPAWN.set(1)
    .Condition1.set(0)
    .Spawns.add(REAPER_CONSTANTS.MODULE_NAME, SHARED_VALUES.NAME, {map:0,x:-11233.153320,y:-1754.810059,z:-15.486454,o:0.023982})