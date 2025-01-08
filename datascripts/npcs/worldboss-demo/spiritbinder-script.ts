import { std } from "wow/wotlk";
import { CONFIG } from "./config";
import { CREATURES } from "./spirit-binder-wb-demo";
import { SPELLS } from "./spells";

CREATURES.SPIRIT_BINDER
    .Scripts.onAggro(x=>x
        .Action.setSetCounter(1, 1, 1).Target.setSelf()
    )
    .Scripts.onCounterSet(1, 1, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.SPIRIT_BINDER.ID, 11, false)
                .addAction(     0, x=>x.Action.setTalk({enGB: "Do not interfere, $c!"}, 1000).Target.setSelf())
                .addAction(     0, x=>x.Action.setSetEventPhase(1).Target.setSelf())
                .addAction(     0, x=>x.Action.setAttackStop().Target.setSelf())
                .addAction(     0, x=>x.Action.setSetReactState("PASSIVE").Target.setSelf())
                .addAction(  1000, x=>x.Action.setSetReactState("AGGRESSIVE").Target.setSelf())
                .addAction(     0, x=>x.Action.setAttackStart().Target.setSelf())
            .ID
        , 1, 1).Target.setSelf()
        .row.event_flags.set(1)
    )
    .Scripts.onUpdateIc(1000, 1000, 1500, 1500, x=>x
        .Action.setCast(SPELLS.frostbolt.ID, 4,  5).Target.setVictim()
        .row.event_phase_mask.set(1)
    )
    .Scripts.onUpdateIc(3000, 8000, 3000, 8000, x=>x
        .Action.setCast(SPELLS.frostlance.ID, 4, 5).Target.setVictim()
        .row.event_phase_mask.set(1)
    )
    .Scripts.onUpdateIc(6000, 16000, 10000, 15000, x=>x
        .Action.setCast(SPELLS.blizzard.ID, 4, 5).Target.setVictim()
        .row.event_phase_mask.set(1)
    )
    .Scripts.onUpdateIc(6000, 16000, 15000, 20000, x=>x
        .Action.setCast(SPELLS.evocation.ID, 4, 5).Target.setVictim()
        .row.event_phase_mask.set(1)
    )

    .Scripts.onHealthPct(0, 60, 0, 0, x=>x
        .Action.setSetCounter(1, 2, 1).Target.setSelf()
    )

    .Scripts.onCounterSet(1, 2, 0, 0, x=>x
        .Action.setCallTimedActionlist(
            std.TimedActionListBuilder.create(CREATURES.SPIRIT_BINDER.ID, 21, false)
                .addAction(    0, x=>x.Action.setTalk({enGB: "You won't be any better than them, $c! You should just give up!"}, 1000).Target.setSelf())
                .addAction(    0, x=>x.Action.setSetEventPhase(2).Target.setSelf())
                .addAction(    0, x=>x.Action.setInterruptSpell(0, 0, 1).Target.setSelf())
                .addAction(    0, x=>x.Action.setAttackStop().Target.setSelf() )
                .addAction(    0, x=>x.Action.setSetReactState("PASSIVE").Target.setSelf())
                .addAction( 1000, x=>x.Action.setCast(SPELLS.immunity.ID, 6, 5).Target.setSelf())
                .addAction(    0, x=>x.Action.setMoveToPos(10, 0, 0, 0).Target.setPosition(CONFIG.bossSpawnPosition))
            .ID
        , 1, 1).Target.setSelf()
    )
    .Scripts.onMovementinform(0, 10, (script) => {

        const timedActionList = std.TimedActionListBuilder.create(CREATURES.SPIRIT_BINDER.ID, 22, false)
            .addAction(    0, x=>x.Action.setTalk({ enGB: "Do you really think I go down that easy? You have no idea what is waiting for you!" }, 1000).Target.setSelf())
            .addAction(    0, x=>x.Action.setSetOrientation(0).Target.setSelf())
            .addAction(    0, x=>x.Action.setSetEmoteState(468).Target.setSelf())
            .addAction(    0, x=>x.Action.setTalk({ enGB: "Arise my minions, ARISE!" }, 1000).Target.setSelf())
            .addAction( 3000, x=>x.Action.setSetCounter(10, 0, 0).Target.setSelf())
        ;

        const addsSpawnPositions = getAddsSpawnPositions(CONFIG.bossSpawnPosition, CONFIG.addsPerPhase[0], CONFIG.addsDistanceFromBoss);

        for ( const addsSpawnPosition of addsSpawnPositions ) {
            timedActionList.addAction(0, x=>x.Action.setSummonCreature(CREATURES.ENRAGED_SPIRIT.ID, "TIME_OR_DEATH", 100000, 0).Target.setPosition(addsSpawnPosition))
            timedActionList.addAction(0, x=>x.Action.setSummonCreature(CREATURES.DEFEATED_SPIRIT.ID, "TIME_OR_DEATH", 100000, 0).Target.setPosition(addsSpawnPosition))
        };

        script.Action.setCallTimedActionlist(timedActionList.ID, 1, 1).Target.setSelf();
    })

    .Scripts.onCounterSet(2, CONFIG.addsPerPhase[0], 0, 0, x=>x
        .Action.setSetCounter(4, 0, 1).Target.setSelf()
        .then()
        .Action.setSetCounter(3, 0, 1).Target.setSelf()
        .then()
        .Action.setSetCounter(1, 3, 1).Target.setSelf()
    )
    










































































    function getAddsSpawnPositions (bossSpawnPosition: TSPosition, numberOfAdds: number, addsDistanceFromBoss: number): TSPosition[] {
    
        const addsSpawnPositions: TSPosition[] = [];
    
        const addsSpawnPositionsOffset = Math.random() * 2 * Math.PI;
    
        for ( let i = 0; i < numberOfAdds; i++ ) {
    
            const angle = (i / numberOfAdds) * 2 * Math.PI + addsSpawnPositionsOffset;
    
            addsSpawnPositions.push({
                map: bossSpawnPosition.map,
                x: bossSpawnPosition.x + addsDistanceFromBoss * Math.cos(angle),
                y: bossSpawnPosition.y + addsDistanceFromBoss * Math.sin(angle),
                z: bossSpawnPosition.z,
                o: bossSpawnPosition.o
            });
    
        }
    
        return addsSpawnPositions;
    
    }