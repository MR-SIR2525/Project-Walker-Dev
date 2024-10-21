playsound gun.m1014_fire @a[rm=0, r=100] ^^0.5^1 100 1 0.01
function guns/effect/immersive
playanimation @s animation.m1014_fire gun 0 "!v.is_first_person"
camerashake add @s[tag=sneaking] 0.08 0.1 rotational
camerashake add @s[tag=!sneaking] 0.14 0.2 rotational
function guns/effect/light
function guns/effect/muzzle_0
scoreboard players remove @s[scores={rpg7=1..}] rpg7 1
event entity @s pw:gun_fire