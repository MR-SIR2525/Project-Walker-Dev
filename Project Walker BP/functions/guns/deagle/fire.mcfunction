playsound gun.deagle_fire @a[rm=0, r=100] ^^0.5^1 100 1 0.01
function guns/effect/immersive
playanimation @s animation.deagle_fire gun 0 "!v.is_first_person"
camerashake add @s[tag=sneaking] 0.08 0.1 rotational
camerashake add @s[tag=!sneaking] 0.1 0.2 rotational
function guns/effect/light
function guns/effect/muzzle_1
scoreboard players remove @s[scores={deagle=1..}] deagle 1
event entity @s pw:gun_fire