<template>
    <div >
        <b-row>

            <b-col cols="2" >
                <h5>Timeline</h5>
                <hr/>
                <b-form-input :v-model="searchQuery" placeholder="type to search"></b-form-input>
                <br>
                <b-button 
                    variant="outline-success"
                    class="mb-1"
                    style="width: 100%;"
                    @click="addNote()"> 
                    New Day
                </b-button>

                <div style="overflow-y: scroll; height: 30rem;">
                    <div v-for="(note, index) in filteredTimeline" :key="index + '_TLN'" >
                        <b-button 
                        class="mb-1"
                        style="width: 95%;"
                        :variant="selectedNote.date == note.date ? 'dark' : 'outline-dark'"
                        @click="selectNote(index)"
                        >
                        {{ note.date }}
                        </b-button>
                    </div>
                </div>
              
            </b-col>

            <b-col cols="10">
                <TimelineNote v-if="timeline.length > 0" :note="selectedNote"></TimelineNote>
            </b-col>

        </b-row>
    </div>
</template>

<script>
import _ from "lodash";
import TimelineNote from "./TimelineNote.vue";

export default {
  props: ["timeline"],
  components: {TimelineNote},
  data() {
    return {
        searchQuery: "",
        selectedNote: null,
        defaultNote: {
            date: "New Note",
            content: "",
            links: []
        }
    };
  },
  created() {
    if(this.timeline.length == 0)
        this.timeline.push(_.cloneDeep(this.defaultNote));
    this.selectNote(0);
  },
  methods: {
    clearFilter(){
        this.searchQuery = "",
        this.selectNote(0);
    },
    addNote(){
        let note = _.cloneDeep(this.defaultNote);
        this.timeline.unshift(note);
        this.selectNote(0);
    },
    selectNote(index){
        this.selectedNote = this.filteredTimeline[index];
    }
  },
  computed: {
    filteredTimeline(){
        if(!this.searchQuery) return this.timeline;
        else return this.timeline.filter(x => {
            x.content.toLower().includes(this.searchQuery.toLower()) ||
            x.date.toLower().includes(this.searchQuery.toLower())
        })
    }
  },
};
</script>