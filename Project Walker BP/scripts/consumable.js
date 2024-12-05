import { system, world } from '@minecraft/server';

// Define an array of water-related food items
const WATER_FOODS = [
  'minecraft:melon_slice',
  'minecraft:sweet_berries',
  'minecraft:honey_bottle',
  'minecraft:rabbit_stew',
  'minecraft:apple',
  'minecraft:beetroot',
  'minecraft:potato',
  'minecraft:beetroot_soup',
  'minecraft:glow_berries',
  'minecraft:baked_potato',
  'minecraft:mushroom_stew',
  'minecraft:suspicious_stew',
  'minecraft:golden_apple',
  'minecraft:enchanted_golden_apple',
];

// Event handler for a custom script event named 'pw:thirst_countdown'
system.afterEvents.scriptEventReceive.subscribe(async (event) => {
  if (event.id === 'pw:thirst_countdown') {
    const player = event.sourceEntity;
    let thirstReduction = 1;

    // Do not reduce thirst if the player is in water
    if (player.isInWater) {
      thirstReduction = 0;
    }
    // Increase thirst reduction if the player is performing certain actions
    else if (player.isSprinting ||
      player.isClimbing ||
      player.isFalling ||
      player.hasTag('infection')
    ) {
      thirstReduction = 2;
    }

    // Adjust the player's 'thirst' scoreboard value
    player.runCommand(
      `scoreboard players remove @s thirst ${thirstReduction}`
    );

    // seems like check all players when it should really just check self
    // Sets thirst to 0 for players who have (thirst <= -1)
    player.runCommand(
      'scoreboard players set @a[scores={thirst=..-1}] thirst 0'
    );
  }
});

// Event handler for item use on block
world.beforeEvents.itemUseOn.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;

  // If the item has a custom tag 'pw:is_closed_food'
  if (item.getTags().includes('pw:is_closed_food')) {
    // Open the food item (replace with opened version)
    player.runCommand(
      `replaceitem entity @s slot.weapon.mainhand 0 ${item.typeId}_open 1 0`
    );
    player.runCommand(
      'playsound armor.equip_iron @s[r=10] ~~~ 1 1 0.01'
    );
  }
});

// Event handler for item complete use (e.g., when a player finishes eating/drinking)
world.afterEvents.itemCompleteUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;

  if (item.getTags().includes('pw:is_drink_high')) {
    player.runCommand(
      'scoreboard players add @s[scores={thirst=0..20}] thirst 6'  //consider increasing
    );
  } 
  else if (item.getTags().includes('pw:is_drink_low') ||
            WATER_FOODS.includes(item.typeId)) {
    player.runCommand(
      'scoreboard players add @s[scores={thirst=0..20}] thirst 2'
    );
  } 
  else if (item.getTags().includes('pw:is_drink_medium')) {
    player.runCommand(
      'scoreboard players add @s[scores={thirst=0..20}] thirst 4'
    );
  }

  // Apply effects if the item has certain tags
  if (item.getTags().includes('pw:is_energy')) {
    player.runCommand('effect @s speed 5 2 true');
  }

  // Medical items handling
  if (item.getTags().includes('pw:is_medical')) {
    if (item.typeId === 'pw:aidkit') {
      player.runCommand('event entity @s pw:reset_stats');
      player.runCommand('effect @s clear');
      player.runCommand('effect @s instant_health 1 1 true');
    } 
    else if (item.typeId === 'pw:bandage') {
      player.runCommand('event entity @s pw:reset_stats');
      player.runCommand('event entity @s pw:remove_bleeding');
    } 
    else if (item.typeId === 'pw:rag') {
      player.runCommand('event entity @s pw:reset_stats');
      player.runCommand('event entity @s pw:remove_bleeding');
    } 
    else if (item.typeId === 'pw:splint') {
      player.runCommand(
        'playsound armor.equip_leather @s[r=10] ~~~ 1 1 0.01'
      );
      player.runCommand('event entity @s pw:reset_stats');
      player.runCommand('event entity @s pw:remove_broken_leg');
    } 
    else if (item.typeId === 'pw:syringe_morphine') {
      player.runCommand('event entity @s pw:reset_stats');
      player.runCommand('effect @s resistance 600 2 true');
    } 
    else if (item.typeId === 'pw:syringe_cure') {
      player.runCommand('event entity @s pw:reset_stats');
      player.runCommand('event entity @s pw:remove_infection');
    }
  }
});

// Event handler for item use on a block (e.g., using an item on a water source)
world.beforeEvents.itemUseOn.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  const block = event.block;

  system.run(() => {
    if (
      item.getTags().includes('pw:use_water_pump_block') &&
      (block.typeId === 'minecraft:water' ||
        block.typeId === 'minecraft:flowing_water' ||
        block.hasTag('pw:water_pump'))
    ) {
      if (item.typeId === 'pw:water_bottle_empty') {
        player.runCommand(
          'replaceitem entity @s[hasitem={item=pw:water_bottle_empty, location=slot.weapon.mainhand}] slot.weapon.mainhand 0 pw:water_bottle'
        );
        player.runCommand(
          'playsound bucket.fill_water @a[r=20] ~~~ 1 1 0.01'
        );
      } else if (item.typeId === 'pw:water_canteen_empty') {
        player.runCommand(
          'replaceitem entity @s[hasitem={item=pw:water_canteen_empty, location=slot.weapon.mainhand}] slot.weapon.mainhand 0 pw:water_canteen'
        );
        player.runCommand(
          'playsound use.wood @s[r=10] ~~~ 1 1 0.01'
        );
      }

      if (block.hasTag('pw:water_pump')) {
        player.runCommand(
          'playsound block.water_pump.use @a[r=20] ~~~ 1 1 0.01'
        );
      }

      // Cancel the default behavior
      event.cancel = true;
    }
  });
});
