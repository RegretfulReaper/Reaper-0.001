local ____lualib = require("lualib_bundle")
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local ____exports = {}
function ____exports.Main(events)
    local auraIDs = {
        80928,
        80929,
        80930,
        80931,
        80932,
        80933,
        80934,
        80935
    }
    events.Creature:OnJustAppeared(
        {45012},
        function(creature)
            local randomAuraID = auraIDs[math.floor(math.random() * #auraIDs) + 1]
            creature:AddAura(randomAuraID, creature)
        end
    )
    events.Creature:OnDeathEarly(
        {45013},
        function(dying, killer)
            if not killer then
                return
            end
            local auras = dying:GetAuraApplications()
            local ghost = dying:GetNearestCreature(
                5,
                45013
            )
            if not ghost then
                return
            end
            __TS__ArrayForEach(
                auras,
                function(____, aura)
                    local auraID = aura:GetAura():GetAuraID()
                    if __TS__ArrayIncludes(auraIDs, auraID) then
                        ghost:AddAura(
                            aura:GetAura():GetAuraID(),
                            ghost
                        )
                    end
                end
            )
            ghost:Attack(killer, false)
            dying:SetGUIDNumber(
                "parent-guid",
                ghost:GetGUID()
            )
            local ghost_killer = ghost:GetMap():SpawnCreature(
                45014,
                ghost:GetPosition().x,
                ghost:GetPosition().y,
                ghost:GetPosition().z,
                ghost:GetPosition().o,
                0,
                1
            )
            if not ghost_killer then
                return
            end
            ghost_killer:SetGUIDNumber(
                "parent-guid",
                ghost:GetGUID()
            )
        end
    )
end
return ____exports
