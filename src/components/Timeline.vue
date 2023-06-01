<template>
    <div >
        <b-row>

            <b-col cols="2" >
                <h5>Timeline</h5>
                <hr/>
                <b-form-input v-model="searchQuery" placeholder="type to search"></b-form-input>
                <br>
                <b-button 
                    variant="outline-success"
                    class="mb-1"
                    style="width: 100%;"
                    @click="addNote()"> 
                    Add Note
                </b-button>

                <div :key="searchQuery" style="overflow-y: scroll; height: 30rem;">
                    <div v-for="(note, index) in filteredTimeline" :key="index + '_TLN'" >
                        <b-button-group 
                            class="mb-1"
                            style="width: 100%;"
                            >
                            <b-button 
                                :variant="selectedNote.date == note.date ? 'dark' : 'outline-dark'"
                                style="width: 90%;"
                                @click="selectNote(index)"
                                >
                                {{ note.date }}
                            </b-button>

                            <b-button variant="outline-danger" @click="deleteNote(index, note.date)">
                                <i class="fas fa-lg fa-times mt-2"></i>
                            </b-button>
                        </b-button-group>
                    </div>
                </div>
              
            </b-col>

            <b-col cols="10">
                <TimelineNote v-if="campaign.timeline.length > 0" :note="selectedNote"></TimelineNote>
            </b-col>

        </b-row>
    </div>
</template>

<script>
import _ from "lodash";
import TimelineNote from "./TimelineNote.vue";

export default {
  props: ["campaign"],
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
    if(this.campaign.timeline.length == 0)
        this.campaign.timeline.push(_.cloneDeep(this.defaultNote));
    this.selectNote(0);
  },
  methods: {
    clearFilter(){
        this.searchQuery = "",
        this.selectNote(0);
    },
    deleteNote(index, name){
        if(!confirm("Delete Note: " + name + " ?")) return;

        this.campaign.timeline.splice(index, 1);
        if(this.campaign.timeline.length == 0)
            this.campaign.timeline.push(_.cloneDeep(this.defaultNote));
        this.selectNote(0);
    },
    addNote(){
        let note = _.cloneDeep(this.defaultNote);
        note.date += " " + this.campaign.timeline.length;
        this.campaign.timeline.unshift(note);
        this.selectNote(0);
    },
    selectNote(index){
        this.selectedNote = this.filteredTimeline[index];
    }
  },
  computed: {
    filteredTimeline(){
        if(this.searchQuery.length == 0) return this.campaign.timeline;
        else return this.campaign.timeline.filter(x => 
            x.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            x.date.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
    }
  },
};
</script>