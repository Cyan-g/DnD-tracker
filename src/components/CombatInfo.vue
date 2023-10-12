<template>
    <b-modal size="xl" hide-header hide-footer :id="'combatInfoModal'" :body-class="getStylingClass('background')">
        <!-- MOVEMENT -->
        <b>Movement</b>
        <hr>
        <span>You can move at any time during your turn (before, after, or during actions).</span>

        <b-row>
            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Moving')">
                    <b>Moving</b><br>
                    <span>Cost: 5ft per 5ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Moving" :body-class="getStylingClass('background')">
                    Movement cost: 5ft per 5ft moved <br><br>
                    If you have more than one speed, such as your walking speed and a flying speed, you can switch back and forth between your speeds during your move. Whenever you switch, subtract the distance you've already moved from the new speed. <br><br>
                    You can move through a nonhostile creature's space. <br><br>
                    You can move through a hostile creature's space only if the creature is at least two sizes larger or smaller than you. <br><br>
                    Another creature's space is difficult terrain for you. <br><br>
                    Whether a creature is a friend or an enemy, you can't willingly end your move in its space. <br><br>
                    PHB, pg. 190.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Climbing')">
                    <b>Climbing</b><br>
                    <span>Cost: 10ft per 5ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Climbing" :body-class="getStylingClass('background')">
                    Movement cost: 10ft per 5ft climbed <br><br>
                    May involve a Strength (Athletics) check if the climb is difficult <br><br>
                    PHB, pg. 182.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Swimming')">
                    <b>Swimming</b><br>
                    <span>Cost: 10ft per 5ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Swimming" :body-class="getStylingClass('background')">
                    Movement cost: 10ft per 5ft swum <br><br>
                    May involve a Strength (Athletics) check if the swim is difficult<br><br>
                    PHB, pg. 182.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('DropProne')">
                    <b>Drop Prone</b><br>
                    <span>Cost: 0ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="DropProne" :body-class="getStylingClass('background')">
                    Movement cost: 0ft (free) <br><br>
                    You can drop prone without using any of your speed <br><br>
                    To move while prone, you must crawl or use magic such as teleportation <br><br>
                    Dropping prone adds the Prone condition (melee attacks against you have advantage, ranged attacks against you have disadvantage, your own attacks have disadvantage) <br><br>
                    PHB, pgs. 190-191,292.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Crawling')">
                    <b>Crawling</b><br>
                    <span>Cost: 10ft per 5ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Crawling" :body-class="getStylingClass('background')">
                    Movement cost: 10ft per 5ft crawled <br><br>
                    PHB, pg. 182.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Crawling')">
                    <b>Crawling</b><br>
                    <span>Cost: 10ft per 5ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Crawling" :body-class="getStylingClass('background')">
                    Movement cost: 10ft per 5ft crawled <br><br>
                    PHB, pg. 182.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('StandingUp')">
                    <b>Standing Up</b><br>
                    <span>Cost: Half your movement</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="StandingUp" :body-class="getStylingClass('background')">
                    Movement cost: half of your speed <br><br>
                    You can't stand up if you don't have enough movement left or if your speed is 0
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('HighJump')">
                    <b>High Jump</b><br>
                    <span>Cost: 5ft per 5ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="HighJump" :body-class="getStylingClass('background')">
                    Movement cost: 5ft per 5ft jumped <br><br>
                    You leap into the air a number of feet equal to 3 + your Strength modifier if you move at least 10 feet on foot immediately before the jump. <br><br>
                    When you make a standing high jump, you can jump only half that distance. <br><br>
                    You can extend your arms half your height above yourself during the jump. <br><br>
                    In some circumstances, your DM might allow you to make a Strength (Athletics) check to jump higher than you normally can. <br><br>
                    PHB, pg. 182.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('LongJump')">
                    <b>Long Jump</b><br>
                    <span>Cost: 5ft per 5ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="LongJump" :body-class="getStylingClass('background')">
                    Movement cost: 5ft per 5ft jumped<br><br>
                    You cover a number of feet up to your Strength score if you move at least 10 feet on foot immediately before the jump.<br><br>
                    When you make a standing long jump, you can leap only half that distance<br><br>
                    May involve a DC 10 Strength (Athletics) check to clear a low obstacle (no taller than a quarter of the jump's distance). You hit the obstacle on a failed check.<br><br>
                    May involve a DC 10 Dexterity (Acrobatics) check to land on your feet in difficult terrain. You land prone on a failed check.<br><br>
                    PHB, pg. 182.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Improvise')">
                    <b>Improvise</b><br>
                    <span>Any stunt not on this list</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Improvise" :body-class="getStylingClass('background')">
                    Perform any movement or stunt you can imagine <br>
                    When you describe a kind of movement not detailed elsewhere in the rules, the DM tells you whether it is possible and what kind of roll you need to make, if any, to determine success or failure.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('DifficultTerrain')">
                    <b>Difficult Terrain</b><br>
                    <span>Cost: +5ft per 5ft</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="DifficultTerrain" :body-class="getStylingClass('background')">
                    Moving in difficult terrain costs an additional 5ft per 5ft of movement
                    PHB, pg. 182.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('GrappleMove')">
                    <b>Grapple Move</b><br>
                    <span>Cost: Speed Halved</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="GrappleMove" :body-class="getStylingClass('background')">
                    Drag or carry the grappled creature with you <br><br>
                    If you move while grappling another creature, your speed is halved, unless the creature is two or more sizes smaller than you. <br><br>
                    See the attack action for how to grapple a creature. <br><br>
                    PHB, pg. 195.
                </b-modal>
            </b-col>
        </b-row>

        <!-- Action -->
        <b>Action</b>
        <hr>
        <span>You can also interact with one object or feature of the environment for free.</span>

        <b-row>
            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Attack')">
                    <b>Attack</b><br>
                    <span>melee or ranged attack</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Attack" :body-class="getStylingClass('background')">
                    Perform a melee or ranged attack with your weapon<br><br>
                    Certain features, such as the Extra Attack feature of the fighter, allow you to make more than one attack with this action. Each of these attacks is a separate roll and may target different creatures. You may move in between these attacks.<br><br>
                    When you attack with a light melee weapon, you can use a bonus action to attack with your other hand (see the Offhand attack bonus action).<br><br>
                    You may replace one of your melee attacks with a Grapple or a Shove.<br><br>
                    Some conditions give advantage on the attack: attacks against blinded, paralyzed, petrified, restrained, stunned, or unconscious targets; melee attacks against prone targets; attacks by invisible or hidden attackers.<br><br>
                    Some conditions give disadvantage on the attack: attacks against invisible or hidden targets; ranged attacks against prone targets; attacks by blinded, frightened, poisoned, or restrained attackers.<br><br>
                    PHB, pgs. 192,194-195.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Grapple')">
                    <b>Grapple</b><br>
                    <span>special melee attack</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Grapple" :body-class="getStylingClass('background')">
                    Attempt to grab a creature or wrestle with it<br><br>
                    You can use the Attack action to make a special melee attack, a grapple. If you're able to make multiple attacks with the Attack action, this attack replaces one of them.<br><br>
                    The target of your grapple must be no more than one size larger than you, and it must be within your reach.<br><br>
                    Using at least one free hand, you try to seize the target by making a grapple check, a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics) check (the target chooses the ability to use).<br><br>
                    If you succeed, you subject the target to the grappled condition (its speed is set to 0).<br><br>
                    PHB, pg. 195.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Shove')">
                    <b>Shove</b><br>
                    <span>special melee attack</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Shove" :body-class="getStylingClass('background')">
                    Shove a creature, either to knock it prone or push it away from you<br><br>
                    Using the Attack action, you can make a special melee attack to shove a creature. If you're able to make multiple attacks with the Attack action, this attack replaces one of them.<br><br>
                    The target of your shove must be no more than one size larger than you, and it must be within your reach.<br><br>
                    You make a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics) check (the target chooses the ability to use).<br><br>
                    If you win the contest, you either knock the target prone or push it 5 feet away from you.<br><br>
                    PHB, pg. 195.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Cast a Spell')">
                    <b>Cast a Spell</b><br>
                    <span>Cast time of 1 action</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Cast a Spell" :body-class="getStylingClass('background')">
                    Cast a spell with a casting time of 1 action<br><br>
                    You can't cast a spell with you action and a different spell with your bonus action in the same turn, except if the action is used to cast a cantrip.<br><br>
                    The target of a spell must be within the spell's range. To target something, you must have a clear path to it, so it can't be behind total cover.<br><br>
                    Spells with material components do not consume the material unless explicitly stated. Unless the cost of a material is given, you can assume that the cost is negligible and the material is simply available in a component pouch.<br><br>
                    Some spells require you to maintain concentration in order to keep their magic active. If you lose concentration, such a spell ends. You lose concentration on a spell if you cast another spell that requires concentration or when you are incapacitated. Each time you take damage, you must make a Constitution saving throw to maintain your concentration. The DC equals 10 or half the damage you take, whichever number is higher.<br><br>
                    PHB, pg. 192.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Dash')">
                    <b>Dash</b><br>
                    <span>Double movement speed</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Dash" :body-class="getStylingClass('background')">
                    Gain extra movement for the current turn<br><br>
                    The increase equals your speed, after applying any modifiers.<br><br>
                    PHB, pg. 192.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Disengage')">
                    <b>Disengage</b><br>
                    <span>Prevent opportunity attacks</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Disengage" :body-class="getStylingClass('background')">
                    Your movement doesn't provoke opportunity attacks for the rest of the turn
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Dodge')">
                    <b>Dodge</b><br>
                    <span>Increase defenses</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Dodge" :body-class="getStylingClass('background')">
                    Focus entirely on avoiding attacks<br><br>
                    Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.<br><br>
                    You lose this benefit if you are incapacitated or if your speed drops to 0.<br><br>
                    PHB, pg. 192.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Escape')">
                    <b>Escape</b><br>
                    <span>Escape a grapple</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Escape" :body-class="getStylingClass('background')">
                    Escape a grapple<br><br>
                    To escape a grapple, you must succeed on a Strength (Athletics) or Dexterity (Acrobatics) check contested by the grappler's Strength (Athletics) check.<br><br>
                    Escaping other conditions that restrain you (such as manacles) may require a Dexterity or Strength check, as specified by the condition.<br><br>
                    PHB, pg. 195.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Help')">
                    <b>Help</b><br>
                    <span>Grant an ally advantage</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Help" :body-class="getStylingClass('background')">
                    Grant an ally advantage on an ability check or attack<br><br>
                    The target gains advantage on the next ability check it makes to perform the task you are helping with.<br><br>
                    Alternatively, the target gains advantage on the next attack roll against against a creature within 5 feet of you.<br><br>
                    The advantage lasts until the start of your next turn.<br><br>
                    PHB, pg. 192.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Use Object')">
                    <b>Use Object</b><br>
                    <span>Interact, use special abilities</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Use Object" :body-class="getStylingClass('background')">
                    Interact with a second object or use special object abilities<br><br>
                    You can interact with one object for free during your turn (such as drawing a weapon or opening a door). If you want to interact with a second object, use this action.<br><br>
                    When an object requires your action for its use, you also take this action.<br><br>
                    PHB, pg. 193.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Use Shield')">
                    <b>Use Shield</b><br>
                    <span>Equip or unequip a shield</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Use Shield" :body-class="getStylingClass('background')">
                    Equip or unequip a shield<br><br>
                    A shieldalways takes an action to equip or unequip.<br><br>
                    Armor taes several minutes to equip or unequip.<br><br>
                    PHB, pgs. 144-146.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Hide')">
                    <b>Hide</b><br>
                    <span>Attempt to hide</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Hide" :body-class="getStylingClass('background')">
                    Attempt to hide<br><br>
                    You can't hide from a creature that can see you. You must have total cover, be in a heavily obscured area, be invisible, or otherwise block the enemy's vision.<br><br>
                    If you make noise (such as shouting a warning or knocking over a vase), you give away your position.<br><br>
                    When you try to hide, make a Dexterity (Stealth) check and note the result. Until you are discovered or you stop hiding, that check's total is contested by the Wisdom (Perception) check of any creature that actively searches for signs of your presence.<br><br>
                    A creature notices you even if it isn't searching unless your Stealth check is higher than its Passive Perception.<br><br>
                    Out of combat, you may also use a Dexterity (Stealth) check for acts like concealing yourself from enemies, slinking past guards, slipping away without being noticed, or sneaking up on someone without being seen or heard.<br><br>
                    PHB, pg. 192.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Search')">
                    <b>Search</b><br>
                    <span>Devote your attention to finding something</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Search" :body-class="getStylingClass('background')">
                    Devote your attention to finding something<br><br>
                    Depending on the nature of your search, the DM might have you make a Wisdom (Perception) check or an Intelligence (Investigation) check.<br><br>
                    PHB, pg. 193.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Ready')">
                    <b>Ready</b><br>
                    <span>Choose trigger and action</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Ready" :body-class="getStylingClass('background')">
                    Choose a trigger and a response reaction<br><br>
                    First, you decide what perceivable circumstance will trigger your reaction.<br><br>
                    Then, you choose the action you will take in response to that trigger, or you choose to move up to your speed in response to it.<br><br>
                    When the trigger occurs, you can either take your reaction right after the trigger finishes or ignore the trigger.<br><br>
                    When you ready a spell, you cast it as normal but hold its energy, which you release with your reaction when the trigger occurs. To be readied, a spell must have a casting time of 1 action, and holding onto the spell's magic requires concentration<br><br>
                    PHB, pg. 193.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Use class feature 1')">
                    <b>Use class feature</b><br>
                    <span>Some features use actions</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Use class feature 1" :body-class="getStylingClass('background')">
                    Use a racial or class feature that uses an action<br><br>
                    See class page for more information.
                </b-modal>
            </b-col>
        </b-row>


        <!-- Bonus Action -->
        <b>Bonus Action</b>
        <hr>
        <span>You can take a bonus action only when a special ability, spell, or feature states that you can do something as a bonus action.</span>
        
        <b-row>
            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Offhand Attack')">
                    <b>Offhand Attack</b><br>
                    <span>Only together with the attack action</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Offhand Attack" :body-class="getStylingClass('background')">
                    Attack with your off hand<br><br>
                    Only usable if you take the Attack action and attack with a light melee weapon that you're holding in one hand.<br><br>
                    Perform a single attack with a different light melee weapon that you're holding in the other hand.<br><br>
                    You don't add your ability modifier to the damage of the bonus attack, unless that modifier is negative.<br><br>
                    If either weapon has the thrown property, you can throw the weapon, instead of making a melee attack with it.<br><br>
                    PHB, pgs. 192,194-195.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Cast a spell 2')">
                    <b>Cast a spell</b><br>
                    <span>Cast time of 1 bonus action</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Cast a spell 2" :body-class="getStylingClass('background')">
                    Cast a spell with a casting time of 1 bonus action<br><br>
                    You can't cast a spell with you action and a different spell with your bonus action in the same turn, except if the action is used to cast a cantrip.<br><br>
                    For further details, see the Cast a spell action.<br><br>
                    PHB, pg. 192.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Use class feature')">
                    <b>Use class feature</b><br>
                    <span>Some features use bonus actions</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Use class feature" :body-class="getStylingClass('background')">
                    Use a racial or class feature that uses a bonus action<br><br>
                    See class page for more information.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Drink a potion')">
                    <b>Drink a potion</b><br>
                    <span>Consume a potion</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Drink a potion" :body-class="getStylingClass('background')">
                    I homebrewed this, don't bother looking it up.<br><br>
                    You can use your bonus action to drink 1 potion that you have on you, <br><br>
                    applying a potion to another creature counts as the "Use Object" Action
                </b-modal>
            </b-col>
        </b-row>

        <!-- Reaction -->
        <b>Reaction</b>
        <hr>
        <span>A reaction is an instant response to a trigger of some kind, which can occur on your turn or on someone else's.</span>

        <b-row>
            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Opportunity attack')">
                    <b>Opportunity attack</b><br>
                    <span>Enemy leaves your reach</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Opportunity attack" :body-class="getStylingClass('background')">
                    You can rarely move heedlessly past your foes without putting yourself in danger<br><br>
                    Trigger: enemy creature leaves your reach.<br><br>
                    Make one melee attack against the provoking creature.<br><br>
                    The attack interrupts the provoking creature's movement, occurring right before the creature leaves your reach.<br><br>
                    Creatures don't provoke an opportunity attack when they teleport or when someone or something moves them without using their movement, action, or reaction.<br><br>
                    PHB, pg. 195.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Readied action')">
                    <b>Readied action</b><br>
                    <span>Part of your "Ready" action</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Readied action" :body-class="getStylingClass('background')">
                    Execute the reaction specified by your Ready action <br><br>
                    Trigger: specified by your Ready action. <br><br>
                    PHB, pg. 193.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Cast a spell 3')">
                    <b>Cast a spell</b><br>
                    <span>Cast time of 1 reaction</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Cast a spell 3" :body-class="getStylingClass('background')">
                    Cast a spell with a casting time of 1 reaction<br><br>
                    Trigger: specified by the spell.<br><br>
                    For further details, see the Cast a spell action.<br><br>
                    PHB, pg. 192.
                </b-modal>
            </b-col>
        </b-row>
    </b-modal>
</template>


<script>
export default {
  props: ["getStylingClass"]
};
</script>

<style scoped>
button{
    padding: 0.2rem;
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
    text-align: left;
}

.col-lg-3{
    padding: 0.2rem;
}
</style>