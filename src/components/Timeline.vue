<template>
    <div >
        <b-row>

            <b-col cols="2" >
                <h5>Notebook</h5>
                <hr/>
                <b-form-input v-model="searchQuery" placeholder="type to search"></b-form-input>
                <b-button 
                    variant="outline-success"
                    class="mb-1 mt-1"
                    style="width: 100%;"
                    @click="addNote()"> 
                    <i class="fas fa-plus"></i> Add Note
                </b-button>
                <hr>

                <div :key="searchQuery" style="overflow-y: scroll; height: 30rem;">
                    <div v-for="(note, index) in filteredTimeline" :key="index + '_TLN'" >
                        <b-button-group 
                            class="mb-1"
                            style="width: 100%; height: 2rem;"
                            >
                            <b-button 
                                :variant="selectedNote.date == note.date ? 'dark' : 'outline-dark'"
                                class="p-1"
                                style="width: 90%;"
                                @click="selectNote(index)"
                                >
                                {{ note.date }}
                            </b-button>

                            <b-button 
                                class="p-1"
                                variant="outline-danger" @click="deleteNote(index, note.date)">
                                <i class="fas fa-trash"></i>
                            </b-button>
                        </b-button-group>
                    </div>
                </div>
              
            </b-col>

            <b-col cols="10">
                <TimelineNote v-if="campaign.timeline.length > 0" :note="selectedNote" :campaign="campaign"></TimelineNote>
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
        this.searchQuery = "";
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