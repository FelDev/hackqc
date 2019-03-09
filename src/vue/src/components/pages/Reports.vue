<docs>
# sectionReport
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>

<script>
import Datepicker from 'vuejs-datepicker';
//taken from https://github.com/alessiomaffeis/vue-picture-input
import PictureInput from 'vue-picture-input'
import moment from 'moment';

export default {
  name: "sectionReport",
  components: {
    Datepicker,
    PictureInput
  },
 
  props: {},
  data() {
    return {
      report: {
        categorie: {},
        espece : '',
        date : moment().format('L'),
        criticite : 1,
        description: "",
        location : {}
      },
      sent : false,
      fileSubmitted : false
    };
  },
  mounted() {},
  methods: {
    submit: function (){
      this.sent = true;
      const input = JSON.stringify(this.report)
      localStorage.setItem('input',input)
      console.log(localStorage.getItem('input'))
    
    },
    photoSubmitted : function(){
      this.fileSubmitted = true
      console.log("it happend")
    } 
  }
};
</script>

<template>
  <div class="sectionReport">
    <h1>Report</h1>
    <div class="formContainer">
      <div class="categorie">
        <label>Catégorie de l'incident</label>
        <select v-model="report.categorie">
          <option v-bind:value="categorie = 'inondations'">Inondations</option>
          <option v-bind:value="categorie = 'crues'">crues</option>
          <option v-bind:value="categorie = 'pluies'">pluies</option>
          <option v-bind:value="categorie = 'insectes'">insectes</option>
        </select>
        <div v-if="report.categorie ==='insectes'">
          <label>Espèces :</label>
          <select v-model="report.especes">
            <option v-bind:value="especes = 'punaises'">Punaises</option>
            <option v-bind:value="especes = 'frelons'">Frelons</option>
          </select>
        </div>
      </div>
      <div class="date">
        <label>Date de l'incident</label>
        <datepicker :value="report.date"></datepicker>
      </div>
      <div class="criticite">
        <label>Criticité de l'incident</label>
          <input type="radio" id="one" value="1" v-model="report.criticite">
          <label for="one">1</label>
          <input type="radio" id="two" value="2" v-model="report.criticite">
          <label for="two">2</label>
          <input type="radio" id="two" value="3" v-model="report.criticite">
          <label for="two">3</label>
          <input type="radio" id="two" value="4" v-model="report.criticite">
          <label for="two">4</label>
          <input type="radio" id="two" value="5" v-model="report.criticite">
          <label for="two">5</label>
      </div>
      <div class="googlemaps">
        //TODO : GET ACCES TO USERS LOCATION -> GOOGLE MAPS
      </div>
      <div class="description">
        <span>Informations supplémentaires</span>
        <input type="text" v-model="report.description" >
      </div>
      <div class="camera">
        <input type="file" name="myFile" 
       v-on:change="photoSubmitted()">
        <div v-if="fileSubmitted" class="fas fa-check">Votre photo à été enregistré avec succès</div>
      </div>
      <button v-on:click="submit()">Envoyé</button>
      <div v-if="sent">Merci beaucoup de votre collaboration pour le projet  _____ ,
        Votre information est importante pour nous!
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>

input[type='file'] {
  color: transparent;
}

  /**
  * TABLE OF CONTENT
  * --------
  *  - LAYOUT
  *  - DEBUG
  *  - NO_SCOPE
  */

  //  ===LAYOUT===

  //  ===DEBUG===
</style>
