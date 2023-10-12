<template>
    <b-modal size="xl" hide-header hide-footer :id="'conditionInfoModal'" :body-class="getStylingClass('background')">
        <!-- MOVEMENT -->
        <b>Conditions</b>
        <hr>
        <span>Conditions alter your capabilities in a variety of ways, and can arise as a result of a spell, a class feature, a monster's attack, or other effect.</span>

        <b-row>
            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Blinded')">
                    <b>Blinded</b><br>
                    <span>You can't see</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Blinded" :body-class="getStylingClass('background')">
                    You can't see<br><br>
                    You automatically fail any ability check which requires sight.<br><br>
                    You have disadvantage on attack rolls.<br><br>
                    Attack rolls against you have advantage.<br><br>
                    PHB, pg. 290.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Charmed')">
                    <b>Charmed</b><br>
                    <span>You are charmed</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Charmed" :body-class="getStylingClass('background')">
                    You are charmed by another creature<br><br>
                    You can't attack your charmer or target them with harmful abilities or magical effects.<br><br>
                    Your charmer has advantage on ability checks to interact socially with you.<br><br>
                    PHB, pg. 290.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Deafened')">
                    <b>Deafened</b><br>
                    <span>You can't hear</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Deafened" :body-class="getStylingClass('background')">
                    You can't hear<br><br>
                    You automatically fail any ability check which requires hearing.<br><br>
                    PHB, pg. 290.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Exhaustion')">
                    <b>Exhaustion</b><br>
                    <span>You are exhausted</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Exhaustion" :body-class="getStylingClass('background')">
                    Exhaustion is measured in six levels<br><br>
                    Level			Effect<br><br>
                    1			Disadvantage on ability checks<br><br>
                    2			Speed halved<br><br>
                    3			Disadvantage on attack rolls and saving throws<br><br>
                    4			Hit point maximum halved<br><br>
                    5			Speed reduced to 0<br><br>
                    6			Death<br><br>
                    You suffer the effect of your current level of exhaustion as well as all lower levels.<br><br>
                    Finishing a long rest reduces your exhaustion level by 1, provided that you have also had some food and drink.<br><br>
                    PHB, pg. 291.<br><br>
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Frightened')">
                    <b>Frightened</b><br>
                    <span>You are frightened</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Frightened" :body-class="getStylingClass('background')">
                    You are frightened<br><br>
                    You have disadvantage on ability checks and attack rolls while the source of your fear is within line of sight.<br><br>
                    You can't willingly move closer to the source of your fear.<br><br>
                    PHB, pg. 290.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Grappled')">
                    <b>Grappled</b><br>
                    <span>You are grappled</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Grappled" :body-class="getStylingClass('background')">
                    You are grappled<br><br>
                    Your speed becomes 0, and you can't benefit from any bonus to your speed.<br><br>
                    The condition ends if your grappler is incapacitated.<br><br>
                    The condition also ends if you are removed from the reach of your grappler.<br><br>
                    PHB, pg. 290.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Incapacitated')">
                    <b>Incapacitated</b><br>
                    <span>You can't take actions or reactions</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Incapacitated" :body-class="getStylingClass('background')">
                    You can't take actions, bonus actions or reactions <br><br>
                    PHB, pg. 290.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Invisible')">
                    <b>Invisible</b><br>
                    <span>You can't be seen</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Invisible" :body-class="getStylingClass('background')">
                    You can't be seen without the aid of magic or a special sense<br><br>
                    For the purpose of hiding, you are heavily obscured.<br><br>
                    You can still be detected by any noise you make or tracks you leave.<br><br>
                    You have advantage on attack rolls.<br><br>
                    Attack rolls against you have disadvantage.<br><br>
                    PHB, pg. 291.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Paralyzed')">
                    <b>Paralyzed</b><br>
                    <span>You are paralyzed</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Paralyzed" :body-class="getStylingClass('background')">
                    You can't do anything<br><br>
                    You are incapacitated and can't move or speak.<br><br>
                    Attack rolls against you have advantage.<br><br>
                    Any attack that hits you is a critical hit if the attacker is within 5 feet of you.<br><br>
                    You automatically fail Strength and Dexterity saving throws.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Petrified')">
                    <b>Petrified</b><br>
                    <span>You are transformed to stone</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Petrified" :body-class="getStylingClass('background')">
                    You are transformed, along with any nonmagical objects you are wearing or carrying, into a solid inanimate substance (usually stone)<br><br>
                    Your weight increases by a factor of ten, and you cease aging.<br><br>
                    You are incapacitated, can't move or speak, and are unaware of your surroundings.<br><br>
                    Attack rolls against you have advantage.<br><br>
                    You automatically fail Strength and Dexterity saving throws.<br><br>
                    You have resistance to all damage.<br><br>
                    You are immune to poison and disease, though a poison or disease already in your system is only suspended, not neutralized.<br><br>
                    PHB, pg. 291.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Poisoned')">
                    <b>Poisoned</b><br>
                    <span>You are poisoned</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Poisoned" :body-class="getStylingClass('background')">
                    You are poisoned<br><br>
                    You have disadvantage on attack rolls and ability checks.<br><br>
                    PHB, pg. 292.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Prone')">
                    <b>Prone</b><br>
                    <span>You are prone</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Prone" :body-class="getStylingClass('background')">
                    You are prone<br><br>
                    Your only movement option is to crawl, unless you stand up.<br><br>
                    You have disadvantage on attack rolls.<br><br>
                    Attack rolls against you have advantage if the attacker is within 5 feet of you, otherwise the attack roll has disadvantage.<br><br>
                    PHB, pg. 292.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Restrained')">
                    <b>Restrained</b><br>
                    <span>You are restrained</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Restrained" :body-class="getStylingClass('background')">
                    You are restrained<br><br>
                    Your speed becomes 0, and you can't benefit from any bonus to your speed.<br><br>
                    You have disadvantage on attack rolls.<br><br>
                    Attack rolls against you have advantage.<br><br>
                    You have disadvantage on Dexterity saving throws.<br><br>
                    PHB, pg. 292.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Stunned')">
                    <b>Stunned</b><br>
                    <span>You are stunned</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Stunned" :body-class="getStylingClass('background')">
                    You are stunned<br><br>
                    You are incapacitated, can't move, and can speak only falteringly.<br><br>
                    Attack rolls against you have advantage.<br><br>
                    You automatically fail Strength and Dexterity saving throws.<br><br>
                    PHB, pg. 292.
                </b-modal>
            </b-col>

            <b-col lg="3">
                <b-button :class="getStylingClass('button')" @click="$bvModal.show('Unconcscious')">
                    <b>Unconcscious</b><br>
                    <span>You are unconscious</span>
                </b-button>
                <b-modal size="md" hide-header hide-footer id="Unconcscious" :body-class="getStylingClass('background')">
                    You are unconscious<br><br>
                    You are incapacitated, can't move or speak, and are unaware of your surroundings.<br><br>
                    You drop whatever you're holding and fall prone.<br><br>
                    Attack rolls against you have advantage.<br><br>
                    Any attack that hits you is a critical hit if the attacker is within 5 feet of you.<br><br>
                    You automatically fail Strength and Dexterity saving throws.<br><br>
                    PHB, pg. 292.
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