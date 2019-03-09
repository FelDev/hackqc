<Sectiondoc>
# Status
> Section that resume invadors status in your sector / neighbourhood

@author Nicolas Husson <hello@nusson.ninja>
</Sectiondoc>

<script>
import moment from 'moment';
import {isEmpty} from 'lodash'
export default {
  name: 'SectionStatus',
  components: {},
  props: {
    title:{
      type:String
    }
  },
  data(){
    return {
     alertes : [
       {
         niveau: '2',
         location : 'Québec',
         description : "La ville de Québec à présentement émis une alerte concernant le niveau d'eau sur le bord du fleuve, yer ben frosty.",
         categorie : 'inondation',
         dateDeParution : moment().locale("fr").format('MMMM Do YYYY'),
       },{
         niveau: '1',
         location : 'Drummond Ville',
         description : 'La ville de Québec à présentement émis une alerte concernant ',
         categorie : 'secheresse',
         dateDeParution : moment().locale("fr").subtract(3,'days').format('MMMM Do YYYY')
       },{
        niveau: '3',
         location : 'Montréal',
         description : "La ville de Montréal à présentement émis une alerte sur une infestion de punaises dans le quartier Hochelaga-Maisonneuve et le quartier Saint-Henri, " +
         "pour plus d'information sur les ressources disponibles, consulter la section information",
         categorie : 'insecte',
         dateDeParution : moment().locale("fr").subtract(7,'days').format('MMMM Do YYYY')
       }
     ],
     focus : ''
    }
  },
  methods: {
    setFocus: function (index){
      if(this.focus === index){
        this.focus = ''
      }else{
        this.focus = index;
      }
    },
    deleteAlert : function(index){
      this.alertes.splice(index,1);
    }
  }
};
</script>

<template>
  <section class="SectionStatus section">
    <h1 class="title">{{title}} </h1>
      <div class="alertes list-item" v-for="(alert, index) in alertes"  :key="index" >
        <div v-on:click="setFocus(index)" class="info-container">
          <div class="icon container">
            <img v-if="alert.categorie === 'inondation'" src="./icons/water-solid.svg" class="icon">
            <img v-if="alert.categorie === 'insecte'" src="./icons/bug-solid.svg" class="icon">
            <img v-if="alert.categorie === 'secheresse'" src="./icons/sun-solid.svg" class="icon">
          </div>
          <div class="informations">
            Location : {{alert.location}} <br>
            Date d'émission : {{alert.dateDeParution}}<br>
          </div>
          <span class="description"  v-if="focus === index">
            Criticité:  {{alert.niveau}} <br>
            Categorie : {{alert.categorie}}<br>
            Description : {{alert.description}}
          </span>
        </div>
        <div class="closeIcon" v-on:click="deleteAlert(index)">
          <img src="./icons/times-solid.svg"  >
        </div>
      </div>
      <div v-if="alertes.length ===0">Il n'y a pas d'alertes annoncées pour le moment
      </div>
  </section>
</template>

<style lang="stylus" scoped>

  .alertes{
     border: 2px solid red;
     padding : 3px
     margin-bottom: 5px
     border-radius: 10px;
     display: flex;
     position: relative
  }

  /**
  * TABLE OF CONTENT
  * --------
  *  - LAYOUT
  *  - DEBUG
  *  - NO_SCOPE
  */

  .icon {
    size : 3em;
  }

  .closeIcon{
     size : 2em;
     margin-left :85%
     position : absolute
  }

  //  ===LAYOUT===
  .SectionStatus
    //

  //  ===DEBUG===
  .SectionStatus
    // background-color rgba(red, 0.5)
    min-height 50vh
</style>

<i18n>
{
  "en": {
    "title":"Invador status"
  },
  "fr": {
    "title":"Status section"
  }
}
</i18n>
