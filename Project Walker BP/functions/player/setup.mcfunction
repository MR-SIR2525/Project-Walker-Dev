function player/score
gamerule recipesunlock false
gamerule showdaysplayed true
gamerule spawnradius 32
gamerule sendcommandfeedback false
scoreboard players set @s thirst 20
scoreboard players set @s blood 20
scoreboard players set @s deaths 0
scoreboard players set @s ak12 30
scoreboard players set @s ak47 30
scoreboard players set @s ak74 30
scoreboard players set @s akm 30
scoreboard players set @s aug 30
scoreboard players set @s famas 30
scoreboard players set @s fnfal 30
scoreboard players set @s m4 30
scoreboard players set @s m16 30
scoreboard players set @s sks 10
scoreboard players set @s stg44 30
scoreboard players set @s m60 100
scoreboard players set @s rpg7 1
scoreboard players set @s rpk 40
scoreboard players set @s colt_m1892 6
scoreboard players set @s colt_python 10
scoreboard players set @s deagle 7
scoreboard players set @s fs 20
scoreboard players set @s glock17 17
scoreboard players set @s p350 13
scoreboard players set @s tec9 18
scoreboard players set @s usp 12
scoreboard players set @s m1014 7
scoreboard players set @s sawedoff 7
scoreboard players set @s spas12 8
scoreboard players set @s mac10 30
scoreboard players set @s mp5 30
scoreboard players set @s mp7 30
scoreboard players set @s mp40 30
scoreboard players set @s p90 50
scoreboard players set @s ppsh 71
scoreboard players set @s thompson 30
scoreboard players set @s ump45 25
scoreboard players set @s awm 10
scoreboard players set @s kar98k 5
scoreboard players set @s m40 10
scoreboard players set @s m110 10
tellraw @s {"rawtext":[{"text":"⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_1"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_2"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_3"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_4"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_5"}]}
tellraw @s {"rawtext":[{"translate":"game.message.welcome_6"}]}
tellraw @s {"rawtext":[{"text":"⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛"}]}
execute as @s[tag=!starter_kit] run function player/starter_kit
tag @s remove sneaking
tag @s remove underground
tag @s remove broken_leg
tag @s remove infected
tag @s remove bleeding
tag @s remove e85d9a2dd8dd4b18b21a36d0c39e3980
tag @s add e51c00fd23014adaaf69e6064130667d
gamerule sendcommandfeedback true