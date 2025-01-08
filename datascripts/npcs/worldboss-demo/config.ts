import { CreatureInstancePosition } from "wow/wotlk/std/Creature/CreatureTemplate";

export const CONFIG: { [key: string]: any } = {
    
    bossSpawnPosition: {map:0,x:-11216.100586,y:-1740.085449,z:-29.961668,o:4.713251} as CreatureInstancePosition,
    addsPerPhase: [4, 6, 8],
    addsDistanceFromBoss: 20,
    addsMovementSpeed: 0.5,
    projectileDestinationDistance: 80,
    projectileMovementSpeed: 2
    
}