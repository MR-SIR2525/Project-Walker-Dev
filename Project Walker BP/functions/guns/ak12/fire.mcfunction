playsound gun.ak12_fire @a[rm=0, r=100] ^^0.5^1 100 1 0.01
function guns/effect/immersive
playanimation @s animation.akm_fire gun 0 "!v.is_first_person"
camerashake add @s[tag=sneaking] 0.04 0.1 rotational
camerashake add @s[tag=!sneaking] 0.08 0.2 rotational
function guns/effect/light
function guns/effect/muzzle_0
scoreboard players remove @s[scores={ak12=1..}] ak12 1
event entity @s pw:gun_fire