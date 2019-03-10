<docs>
# sectionReport
> 

@author Nicolas Husson <hello@nusson.ninja>
</docs>
<script src="vue-google-maps.js"></script>

<script>
import Datepicker from 'vuejs-datepicker';
//taken from https://github.com/alessiomaffeis/vue-picture-input
// import PictureInput from 'vue-picture-input'
import moment from 'moment';

export default {
  name: "sectionReport",
  components: {
    Datepicker,
    // PictureInput
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
      filePreviews: [],
      center: { lat: 45.508, lng: -73.587 },
      useCustomLocation : false,
      hasSetLocation : false,
      suivit: "oui"
    };
  },
  mounted() {},
  methods: {
    submit: function() {
      this.sent = true;
      console.log(this.report)
      var customPositions = JSON.parse(localStorage.getItem("addedPositions")) || [];
      customPositions.push({
        category: this.report.categorie,
        date: new Date(),
        lat: this.report.position.lat,
        lng: this.report.position.lng
      });
      localStorage.setItem("addedPositions", JSON.stringify(customPositions));
    },
    photoSubmitted : function(){
      this.fileSubmitted = true

    },
    setLocation : function(bool){
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      this.report.position.lat = position.coords.latitude
      this.report.position.lng = position.coords.longitude
      this.hasSetLocation = true;
      });
      this.hasSetLocation = true;
    },
    addMarker: function (event){
      this.report.position.lat = event.latLng.lat()
      this.report.position.lng = event.latLng.lng()
      this.hasSetLocation = true;
      console.log(this.report)
    }
  }
};
</script>

<template>

  <div class="sectionReport">
    <h1 v-if="!sent">Signaler</h1>
    <h2></h2>
    <div v-if="!sent" class="formContainer">
      <div class="categorie">
        <div class="subCatFlex">
          <label>Catégorie de l'incident</label>
          <select v-model="report.categorie">
            <option disabled selected hidden>Faire un choix</option>
            <option v-bind:value="categorie = 'inondations'">Inondations</option>
            <option v-bind:value="categorie = 'crues'">crues</option>
            <option v-bind:value="categorie = 'pluies'">pluies</option>
            <option v-bind:value="categorie = 'insectes'">insectes</option>
          </select>
        </div>
        <transition name="expand">
          <div class="subCatFlex" v-if="report.categorie ==='insectes'" transition>
            <label>Espèces</label>
            <select v-model="report.especes">
              <option v-bind:value="especes = 'punaises'">Punaises</option>
              <option v-bind:value="especes = 'frelons'">Frelons</option>
            </select>
          </div>
        </transition>
      </div>
      <div class="date subCatFlex">
        <label>Date de l'incident</label>
        <datepicker :value="report.date" :input-class="'dateInput'"></datepicker>
      </div>
      <div class="criticite subCatFlex">
        <label for="myRange">Sévérité</label>
        <div class="slidecontainer">
          <input type="range" min="1" max="5" value="3" class="slider" id="myRange" name="myRange" v-model="report.criticite">
          <p>{{report.criticite}}</p>
        </div>
      </div>
      <div class="googlemaps subCat">
        <label>Position de l'incident</label><br>
        <div class="btnWrapper">
          <button class="btn" v-on:click="setLocation(true)">Utiliser votre position actuelle</button>
        </div>
         <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;" :options="{disableDefaultUI:true}" 
                :clickable="true"
                :draggable="true"
                @click="addMarker">
                <GmapMarker
                  :key="1"
                  :position="report.position"
                />
        </gmap-map>
      </div>
      <div class="description subCat">
        <span>Informations supplémentaires</span>
        <textarea type="text" v-model="report.description" />
      </div>
      <div class="camera subCat">
        <label for="myFile">Ajouter un fichier (optionel)</label>
        <input class="funkyInput" type="file" name="myFile"
          v-on:change="photoSubmitted()">
        <div v-if="fileSubmitted" class="fas fa-check">Votre photo à été enregistré avec succès
          <!-- TODO it'be nice to have a preview -->
          <!-- <div class="page" v-bind="filePreviews" :key="index" v-for="img in filePreviews">
            <img :src="`/static/img/${pic}`">
          </div> -->
        </div>
      </div>
      <div class="suivitOrNot subCat">
        <h2>Je veux un suivi sur mon incident</h2>
        <div id="suivitOptions">
          <input type="radio" id="suivitOui" name="suivit" value="oui" v-model="suivit">
          <label for="suivitOui" >Oui svp!</label>
          <input type="radio" id="suivitNon" name="suivit" value="non" v-model="suivit">
          <label for="suivitNon" >Non, merci.</label>
        </div>
      </div>
        <transition name="expand">
          <div v-if="suivit=='oui'" class="suivit">
            <div class="nom subCatFlex">
              <label for="name">Votre Nom</label>
              <input class="funkyInput" name="name" type="text" v-model="report.infoCitoyen.nom" >
            </div>
            <div class="email subCatFlex">
              <label for="email">Votre Email</label>
              <input class="funkyInput" name="email" type="text subCatFlex" v-model="report.infoCitoyen.email" >
            </div>
            <div class="emailconf subCatFlex">
              <label for="emailConf">Votre Email (Confirmation)</label>
              <input class="funkyInput" name="emailConf" type="text" v-model="report.infoCitoyen.emailConf" >
            </div>
            <div class="telephone subCatFlex">
              <label for="phone">Votre Telephone</label>
              <input class="funkyInput" name="phone" type="text" v-model="report.infoCitoyen.telephone" >
            </div>
          </div>
        </transition>
      </div>
      <div class="btnWrapper subCat">
        <button v-if="!sent" class="btn" v-on:click="submit()">Envoyé</button>
      </div>
      <div v-if="sent">Merci beaucoup de votre collaboration! Vos élus sont impatient de lire vos messages. En attendant vous pouvez aller
        faire un tour sur le site de portail de données québec!
        <router-link class="logo" :to="{name: `home`}">
          <div class="btnWrapper subCat">
            <button class="btn">Retour au menu principal</button>
          </div>
        </router-link>
    </div>
  </div>
   
</template>

<style lang="stylus" scoped>
  //  ===LAYOUT===
  .btnWrapper
    text-align center
    .btn
      width 80vw

  .expand-enter-active, .expand-leave-active {
    transition: all .3s ease
    height: inherit
    // padding: 10px
    background-color: #eee
    overflow: hidden
  }
  .expand-enter, .expand-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .sectionReport
    padding 1em

  .subCat, .subCatFlex
    margin-top: 1em;
  .subCatFlex  
    display flex
    justify-content space-between
    flex-direction column
  h1
    color: red
    font-size: 5em
    font-family: "Times New Roman", Times, serif
    font-weight: bold
    text-align: center

  input[type='file']
    color: #FFF

  input[type="radio"]
    visibility:hidden
    width:0
    height:0

  label
    font-size 1.1em

  select
    background: $c-inputColor
    border-radius: 1em
    border 2px solid darken($c-inputColor, 10%)
    text-align-last: center
    box-shadow: 0 0 black
    color: #FFF
    padding: 0.4em
    font-weight: bold
    font-size 1.1em
    min-width 10em

  textarea
    width: 100%
    min-height: 3em

  .suivitOrNot 
    & input[type="radio"]
      position: absolute
      opacity: 0
      height: 0
      width: 0
      &:checked + label
        color black
        background-color $c-success
        &:after
          content '√'
    & #suivitOptions
      display flex
      justify-content: space-around
      display flex
    & label
      background-color: darken($c-success,10)
      border-radius 1em
      color #CCC
      padding 0.5em 1em 0.5em 0.5em
  
  .slidecontainer
    width: 100%;

  .slider
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    background-image: linear-gradient(90deg, rgba(14,249,21,1) 0%, rgba(255,0,0,1) 100%);
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;

  .slider:hover
    opacity: 1;

  .slider::-webkit-slider-thumb
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid $c-inputColor;
    background: #111;
    cursor: pointer;

  .slider::-moz-range-thumb
    width: 25px;
    height: 25px;
    border: 2px solid $c-inputColor;
    border-radius: 50%;
    background: #111;
    cursor: pointer;

</style>

<style lang="stylus">
  .dateInput, .funkyInput
    background: $c-inputColor
    width: 100%
    border-radius: 1em
    border 2px solid darken($c-inputColor, 10%)
    padding: 0.4em
    color: #fff
    text-align: center
    font-weight: bold
    font-size: 1.1em
</style>
