<doc>
# portail
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
//  const fs = require('fs')
export default {
  name: 'Portail',
  components: {},
  props: {},
  data(){
    return {
      isLoggedIn : false,
      email : "moncompte@moi.com",
      newdata : '',
      password: 'somepassword',
      gridColumns: ['Catégorie', 'Criticité','Date','Description','Lat','Lng','Nom','Telephone','Courrier'],
      data : []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    login: function(){
      if(this.email !== '' && this.password !== "") this.isLoggedIn = true;
    },
    test: function(){
      console.log(localStorage)
      
    },
   
    init(){

      let created = [{
        categorie : 'animal',
        criticite : '2',
        date : '02/01/2019',
        description: 'Infestation de rongueur dans un cabanon',
        lat: '45.675645654566',
        lng: '-71.12323231222',
        nom: 'Olivier Gauthier-Farley',
        telephone: '438-453-6523',
        email: 'olivier@olivier.com'
      },
      {
        categorie : 'animal',
        criticite : '5',
        date : '23/02/2019',
        description: 'Chat perdu',
        lat: '45.675645654566',
        lng: '-71.123235645622',
        nom: 'Gaston',
        telephone: '514-567-9808',
        email: 'gaston@hackathon.ca'
      },
      {
        categorie : 'insecte',
        criticite : '1',
        date : '03/03/19',
        description: 'Frelons',
        lat: '45.675724654566',
        lng: '-71.123235645622',
        nom: 'Johanne',
        telephone: '514-235-0781',
        email: 'johanne@hotmail.com'
      },
      {
        categorie : 'naturel',
        criticite : '5',
        date : '01/10/18',
        description: 'Inondations dans mon parc',
        lat: '45.78524652343',
        lng: '-70.34563235645622',
        nom: 'Louis Hebert',
        telephone: '438-098-7128',
        email: 'louis@louis.com'
      },
      {
        categorie : 'animal',
        criticite : '2',
        date : '01/01/19',
        description: 'Vermines dans le parc de mon quartier',
        lat: '41.45645678345',
        lng: '-69.34567334534',
        nom: 'Bruno Charpentier',
        telephone: '514-890-0543',
        email: 'bruno@hotmail.com'
      },
      {
        categorie : 'animal',
        criticite : '2',
        date : '04/01/19',
        description: 'Il y a des punaises dans mon lit',
        lat: '42.34533455445',
        lng: '-71.9789348344',
        nom: 'Amélie Rivard',
        telephone: '514-523-8593',
        email: 'non-appliquable'
      },
      {
        categorie : 'animal',
        criticite : '5',
        date : '01/03/19',
        description: 'punaises',
        lat: '41.8675476893',
        lng: '68.54353454545.',
        nom: 'Louise Tibeau',
        telephone: '438-123-9781',
        email: 'louise@tibo.ca'
      },
      ]

      created.map(object=>{
        this.data.push(object)
      })

      let newData = JSON.parse(localStorage.getItem("userInputs")) || [];
      newData.map(object =>{
        this.data.push(object)
      })
      console.log( this.data)
      console.log( newData)
    }
  },
};
</script>

<template>
  <div class="portail-main">
    <div class="login" v-if="!isLoggedIn">
      <label>Courriel de la ville:</label><br>
      <input type="text" v-model="email"><br>
      <label>Mot de passe:</label><br>
      <input type="text" v-model="password"><br>
      <button class="button" v-on:click="login()" >Entrer</button>
    </div>
    <div v-if="isLoggedIn">
      <div>
        <h1 class="title">
          Portail de données de l'application
        </h1>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="(header,index) in gridColumns" :key="index" >
              {{header}}
            </th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="(input,index) in data" :key="index">
          <td>
            {{input.categorie}}
          </td>
           <td>
            {{input.criticite}}
          </td>
           <td>
            {{input.date}}
          </td>
           <td>
            {{input.description}}
          </td>
           <td>
            {{input.lat}}
          </td>
           <td>
            {{input.lng}}
          </td>
           <td>
            {{input.nom}}
          </td>
          <td>
            {{input.telephone}}
          </td>
          <td>
            {{input.email}}
          </td>
        </tr>
        </tbody>
      </table>
      <div class="actions">
        <a download href="export.json">Export JSON</a>
        <a download href="export.csv">Export CSV</a>
      </div>
      
      <div class="descriptionTitle">Description des données :</div><br>
      <p class="description">Ces données sont des données fournis volontairement par les utilisations de l'application Fléo.<br></p>
    </div>
  </div>

  
</template>

<style lang="stylus" scoped>
  
  .actions
    margin-top 20px
    a
      color green
      border 1px solid green 
      padding 0.2em 0.5em

  .portail-main
    padding 20px
  table
    tr:nth-child(2n) td
      background-color rgba(black, 0.1)
  .title
    f-style(title, h2)

  input[type="text"]
    width 100%
    margin-bottom 1em

  body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 16px;
  color: #444;
}

.login {
  margin: auto;
  margin-top :10em
  width: 50%;
  border: 3px solid #f75956;
  padding: 10px;
}



.title{
  padding-top : 1em
}

.descriptionTitle{
  margin-top : 1em
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 16px;
}


table {
  border: 2px solid #f75956;
  border-radius: 3px;
  background-color: #fff;
  display: block;
  overflow-x: auto;
  margin-top : 1em;
}
  

th {
  background-color: #f75956;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}


th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}
</style>
