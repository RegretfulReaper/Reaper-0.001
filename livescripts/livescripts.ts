import { CONFIG } from "../datascripts/config";


export function Main(events: TSEvents) {
    
    
    
    // Buffs.
    
    const auraIDs = [
        UTAG("default", "spell.maldrion.reduce-spell-damage-taken"),
        UTAG("default", "spell.maldrion.increase-spell-damage"),
        UTAG("default", "spell.maldrion.reduce-physical-damage-taken"),
        UTAG("default", "spell.maldrion.increase-physical-damage"),
        UTAG("default", "spell.maldrion.reflect-damage"),
        UTAG("default", "spell.maldrion.increase-resistances"),
        UTAG("default", "spell.maldrion.increase-armor"),
        UTAG("default", "spell.maldrion.increase-health")
    ];



/*      events.Creature.OnJustAppeared(TAG("default", "creature.spirit-binder.auto-set-position-z"), (creature) => {

        // Force creatures always appear at ground level.

        const map = creature.GetMap();

        const x = creature.GetX();
        const y = creature.GetY();
        const z = map.GetHeight(x, y, 0);
        const o = creature.GetO();

        creature.NearTeleport(x, y, z, o);
        
    }); */



    events.Creature.OnJustAppeared(TAG("default", "creature.enraged-spirit"), (creature) => {

        // Apply random aura to adds.

        let randomAuraID = auraIDs[Math.floor(Math.random() * auraIDs.length)];

        creature.AddAura(randomAuraID, creature);
        
    });



    events.Creature.OnDeathEarly(TAG("default", "creature.defeated-spirit"), (dying, killer) => {

        // Transfer buffs from adds to ghosts.
        
        if ( !killer ) return;

        const auras = dying.GetAuraApplications();

        const ghost = dying.GetNearestCreature(5, UTAG("default", "creature.defeated-spirit"));
        if ( !ghost ) return;

        auras.forEach((aura) => {
            
            const auraID = aura.GetAura().GetAuraID();

            if ( auraIDs.includes(auraID) ) {

                ghost.AddAura(aura.GetAura().GetAuraID(), ghost);
                
            }

        });

        // Make ghost attack the killer of the add (to stay in combat / not regen health).

        ghost.Attack(killer, false);
        
        // Summon ghost killer creature and save the add GUID as "parent-guid" so we know which ghost to target later.

        dying.SetGUIDNumber("parent-guid", ghost.GetGUID());

        const ghost_killer = ghost.GetMap().SpawnCreature(UTAG("default", "creature.Spirit-Killer"), ghost.GetPosition().x, ghost.GetPosition().y, ghost.GetPosition().z, ghost.GetPosition().o, 0, 1);
        if ( !ghost_killer ) return;

        ghost_killer.SetGUIDNumber("parent-guid", ghost.GetGUID());
        
    });



/*     events.Creature.OnGossipHello(UTAG("default", "creature.Spirit-Killer"), (creature, player, cancel) => {

        // Trigger a spell when ghost killer creature is interacted with.

        const parentGUID = creature.GetGUIDNumber("parent-guid");
        if ( !parentGUID ) return;

        player.CastSpell(creature, UTAG("default", "Spirit-Killer.activate-Spirit-Killer"));

        cancel.set(true);

    });



    events.Spell.OnAfterCast(UTAG("default", "spell.Spirit-Killer"), (spell, cancel) => {

        // Cast channeled spell to kill the specific ghost (selected based on "parent-guid").

        const target = ToCreature(spell.GetTarget());
        if ( !target ) return;
    
        const parentGUID = target.GetGUIDNumber("parent-guid");
        if ( !parentGUID ) return;

        const ghost = target.GetCreature(parentGUID);
        if ( !ghost ) return;

        target.CastSpell(ghost, UTAG("default", "spell.Spirit-Killer"));

        target.DespawnOrUnsummon(6000);

    }); */



/*     events.Creature.OnUpdateAI(UTAG("default", "creature.maldrion-add.ghost"), (creature, diff) => {

        // Scale ghosts down based on their health percentage.

        creature.SetScale(creature.GetHealthPct() / 100 + 0.1);

    });



    events.Creature.OnMovementInform(TAG("default", "creature.maldrion-add-or-ghost"), (creature, type, id) => {

        // If adds or ghosts reach the boss, transfer their buffs to the boss.

        switch ( id ) {

            case 20:
            case 30:

                const boss = creature.GetNearestCreature(5, UTAG("default", "creature.maldrion"));
                if ( !boss ) return;

                const auras = creature.GetAuraApplications();
                
                auras.forEach((aura) => {
                    
                    const auraID = aura.GetAura().GetAuraID();

                    if ( auraIDs.includes(auraID) ) {

                        boss.AddAura(aura.GetAura().GetAuraID(), boss);
                        
                    }

                });
                
                break;

        }

    });



    events.Creature.OnMovementInform(TAG("default", "creature.maldrion-add"), (creature, type, id) => {

        // If adds reach the boss, make boss do some AoE damage.
        
        switch ( id ) {

            case 20:

                const boss = creature.GetNearestCreature(5, UTAG("default", "creature.maldrion"));
                if ( !boss ) return;
                
                boss.CastSpell(boss, UTAG("default", "spell.maldrion.blood-boil"), true);
                
                break;

        }

    });



    events.Creature.OnJustAppeared(TAG("default", "creature.maldrion-add.projectile"), (creature) => {

        // Shoot projectiles to random directions (positions in certain range) from the add.

        const angle = Math.random() * 2 * Math.PI;

        const projectileDestinationX = creature.GetPosition().x + CONFIG.projectileDestinationDistance * Math.cos(angle);
        const projectileDestinationY = creature.GetPosition().y + CONFIG.projectileDestinationDistance * Math.sin(angle);
        const projectileDestinationZ = creature.GetMap().GetHeight(projectileDestinationX, projectileDestinationY, 0);

        creature.MoveTo(creature.GetGUIDLow(), projectileDestinationX, projectileDestinationY, projectileDestinationZ, true);
        
    });
 */
}