<doc>
# portail
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
export default {
  name: 'Portail',
  components: {},
  props: {},
  data(){
    return {
      isLoggedIn : true,
      email : "",
      password: '',
      gridColumns: ['name', 'power'],
      gridData: {}
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
      this.data = JSON.parse(localStorage.getItem("input")) || [];
      console.log(localStorage)
      console.log(this.data)
     
    }
  },
};
</script>

<template>
  <div class="portail-main">
    <div v-if="!isLoggedIn">
      <label>Courriel de la ville:</label>
      <input type="text" v-model="email"> 
      <label>Mot de passe:</label>
      <input type="text" v-model="password"> 
      <button v-on:click="login()" >Entrer</button>
    </div>
    <div v-if="isLoggedIn">
      <!-- component template -->
      <table>
        <thead>
          <tr>
            <th>Hello
            </th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td>
             hello
            </td>
          </tr>
        </tbody>
      </table>
      <button v-on:click="test()" ></button>
    </div>
  </div>

  
</template>

<style lang="stylus" scoped>
  body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
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
