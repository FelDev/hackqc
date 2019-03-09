<doc>
# sectionReport
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

export default {
  name: "sectionReport",
  components: {
    Datepicker
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
      }
    };
  },
  mounted() {},
  methods: {
    submit: function (event) {
      console.log("supyal")
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
        GOOGLE MAPS HERE!
      </div>
      <div class="description">
        <span>Informations supplémentaires</span>
        <input type="text" v-model="report.description" >
      </div>
      <button v-on:click="submit">Envoyé</button>
      {{report}}
    </div>
  </div>
</template>

<style lang="stylus" scoped>

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
