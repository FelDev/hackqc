<docs>
# sectionReport
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<script src="vue-google-maps.js"></script>

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
        position : {
          lat: '',
          lng : ''
        },
        infoCitoyen: {
          email :'',
          emailConf: '',
          nom : '',
          telephone: ''
        }
      },
      sent : false,
      fileSubmitted : false,
      center: { lat: 45.508, lng: -73.587 },
      useCustomLocation : false,
      hasSetLocation : false,
      suivit: false
    };
  },
  mounted() {},
  methods: {
    submit: function (){
      this.sent = true;
      const input = JSON.stringify(this.report)
      localStorage.setItem('input',input)    
    },
    photoSubmitted : function(){
      this.fileSubmitted = true
    },
    setLocation : function(bool){
      if(bool){
        this.useCustomLocation = false;
        this.hasSetLocation = true;
      }else{
         this.useCustomLocation = true;
         this.hasSetLocation = false;
      }
    },
    addMarker: function (event){
      this.report.position.lat = event.latLng.lat()
      this.report.position.lng = event.latLng.lng()
      this.hasSetLocation = true;
      console.log(this.report)
    },
  }
};
</script>

<template>
  <div class="sectionReport">
    <h1>Signaler</h1>
    <h2></h2>
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
        <label>Position de l'incident</label><br>
        <button v-on:click="setLocation(true)">Position courante</button>
        <button v-on:click="setLocation(false)">Ajouter une localisation</button>
         <div v-if="hasSetLocation">Position Enregistrée</div>
         <gmap-map v-if="useCustomLocation" :center="center" :zoom="12" style="width:100%;  height: 400px;" :options="{disableDefaultUI:true}" 
                :clickable="true"
                :draggable="true"
                @click="addMarker">
                <GmapMarker
                  :key="1"
                  :position="report.position"
                  v-if="hasSetLocation"
                />
        </gmap-map>
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
      <div class="date">
        <label for="checkbox" >Je veux un suivi sur mon incidence</label>
        <input type="checkbox" id="checkbox" v-model="suivit">
      </div>
        <div v-if="suivit" class="suivit" >
          <div class="nom">
            <span>Votre Nom</span>
            <input type="text" v-model="report.infoCitoyen.nom" >
          </div>
          <div class="email">
            <span>Votre Email</span>
            <input type="text" v-model="report.infoCitoyen.email" >
          </div>
          <div class="emailconf">
            <span>Votre Email (Confirmation)</span>
            <input type="text" v-model="report.infoCitoyen.emailConf" >
          </div>
          <div class="telephone">
            <span>Votre Telephone</span>
            <input type="text" v-model="report.infoCitoyen.telephone" >
          </div>
        </div>
      </div>
      <button v-on:click="submit()">Envoyé</button>
      <div v-if="sent">Merci beaucoup de votre collaboration! Vos élus sont impatient de lire vos messages. En attendant vous pouvez aller
        faire un tour sur le site de portail de données québec!
      </div>
      </div>
   
</template>

<style lang="stylus" scoped>

input[type='file'] {
  color: transparent;
}

h1 {
  color: red;
  font-size: 5em;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  text-align: left;

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
