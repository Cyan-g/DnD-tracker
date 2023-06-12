<template>
    <div>
        <b-card class="mb-1" body-class="p-1 text-dark mt-0" no-header>
            <b-form-checkbox v-model="spell.prepared">
                <b-button variant="outline-dark"  size="sm" style="padding: 3px;"  @click="$bvModal.show('modal_' + spell.name)"> 
                    {{ spell.name }}
                </b-button>
            </b-form-checkbox>
        </b-card>

        <b-modal size="lg" hide-header hide-footer :id="'modal_' + spell.name">
            <b-row>
                <b-col cols="5">
                    <b-form-input v-model="spell.name"></b-form-input>
                </b-col>
                <b-col cols="2">
                    <b-button variant="outline-danger" pill @click="$bvModal.hide('modal_' + spell.name); $emit('delete')"><i class="fas fa-trash"></i></b-button>
                </b-col>
            </b-row>
            <hr>
            <b-row>
                <b-col cols="4">
                    <b>Level</b><br>
                    <b-dropdown style="width: 100%" variant="dark" :text="spell.level">
                        <b-dropdown-item
                            v-for="item in spellLevels"
                            :key="item"
                            @click="spell.level = item; $bvModal.hide('modal_' + spell.name)"
                            >{{ item }}</b-dropdown-item
                        >
                    </b-dropdown>            
                    
                    <b>School</b><br>
                    <b-dropdown style="width: 100%" variant="dark" :text="spell.school">
                        <b-dropdown-item
                            v-for="item in spellSchools"
                            :key="item"
                            @click="spell.school = item"
                            >{{ item }}</b-dropdown-item
                        >
                    </b-dropdown>
                  

                    <b>Cast Time</b><br>
                    <b-dropdown style="width: 100%" variant="dark" :text="spell.castingTime">
                        <b-dropdown-item
                            v-for="item in spellActions"
                            :key="item"
                            @click="spell.castingTime = item"
                            >{{ item }}</b-dropdown-item
                        >
                    </b-dropdown>

                    <b>Type</b><br>
                    <b-dropdown style="width: 100%" variant="dark" :text="spell.type">
                        <b-dropdown-item
                            v-for="item in spellType"
                            :key="item"
                            @click="spell.type = item"
                            >{{ item }}</b-dropdown-item
                        >
                    </b-dropdown>

                    <b>Target</b><br>
                    <b-dropdown style="width: 100%" variant="dark" :text="spell.areaType">
                        <b-dropdown-item
                            v-for="item in spellArea"
                            :key="item"
                            @click="spell.areaType = item"
                            >{{ item }}</b-dropdown-item
                        >
                    </b-dropdown>
                    <div v-if="spell.areaType != 'Targeted'" >
                        <b>feet</b>
                        <b-form-input v-model="spell.areaSize"></b-form-input>
                    </div>
                    
                </b-col>
                <b-col cols="8">
                    <b-row>
                        <b-col cols="6">
                            <b>Range</b>
                            <b-form-input v-model="spell.range"></b-form-input>
                            <b>Duration</b>
                            <b-form-input v-model="spell.duration"></b-form-input>
                          
                        </b-col>
                        <b-col cols="6">
                            <b>Casting</b>
                            <b-form-checkbox v-model="spell.verbal"> Verbal</b-form-checkbox>
                            <b-form-checkbox v-model="spell.somatic"> Somatic</b-form-checkbox>
                            <b-form-checkbox v-model="spell.component"> Material</b-form-checkbox>
                            <b-form-checkbox v-model="spell.concentration"> Concentration</b-form-checkbox>
                        </b-col>
                    </b-row>

                    <b>Description</b>
                    <b-form-textarea style="height: 13rem;" v-model="spell.description"></b-form-textarea>

                    <b>Components</b>
                    <b-form-textarea v-model="spell.cost"></b-form-textarea>
                </b-col>
            </b-row>
        </b-modal>
    </div>
</template>

<script>

export default {
  props: [
    "spell",
    "spellSchools",
    "spellActions",
    "spellArea",
    "spellType",
    "spellLevels",
    ]
};
</script>