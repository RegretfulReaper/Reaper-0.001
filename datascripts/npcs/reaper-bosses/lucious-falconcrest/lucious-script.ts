import { std } from "wow/wotlk";
import { LUCIOUS_BOSS } from "./lucious_falconcrest_boss";
import { REAP_TEMPLATE } from "../../../reaper-spells/reap";

LUCIOUS_BOSS
    .Scripts.onAggro((script) => {
        script.Action.setSetCounter(1, 1, 1).Target.setSelf();
    })
    .Scripts.onCounterSet(1, 1, 0, 0, (script) => {

        script.Action.setCallTimedActionlist(

            std.TimedActionListBuilder.create(LUCIOUS_BOSS.ID, 11, false)
                .addAction(     0, (script) => {script.Action.setTalk({ enGB: "You dare engage me!"}, 1000).Target.setSelf(); })
                .addAction(     0, (script) => {script.Action.setSetEventPhase(1).Target.setSelf(); })
                .addAction(     0, (script) => {script.Action.setAttackStop().Target.setSelf(); })
                .addAction(  1000, (script) => {script.Action.setSetReactState("PASSIVE").Target.setSelf(); })
                .addAction(     0, (script) => {script.Action.setSetReactState("AGGRESSIVE").Target.setSelf(); })
            .ID

        , 1, 1).Target.setSelf();

        script.row.event_flags.set(1)
        
    })
    .Scripts.onUpdateIc(1000, 1000, 1500, 1500, x=>x
        .Action.setCast(REAP_TEMPLATE.ID, 4, 5).Target.setVictim()
        .row.event_phase_mask.set(1)
    )