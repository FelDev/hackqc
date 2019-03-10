<doc>
# PageAbout
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
export default {
  name: 'PageAbout',
  components: {},
  props: {},
  data(){
    return {}
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <main class="PageAbout page section">
    <h1 class="title" v-t="'title'" />
    <p
      v-t="'p1'"
    />
    <p
      v-html="$t('p2')"
    />
  </main>
</template>

<style lang="stylus" scoped>
  //  ===LAYOUT===
  p
    margin-top 0.4em
    a
      text-decoration underline
  //  ===DEBUG===
</style>

<i18n>
{
  "fr": {
    "title": "À propos",
    "p1": "Fléo sert à renseigner le citoyen sur les enjeux de salubrité et environnementaux susceptible de le toucher tout en lui permettant de confirmer ces informations et d'y ajouter ses propres observations.",
    "p2": "L'application se base sur les <a href='https://www.donneesquebec.ca/fr/'>données ouvertes de données québecs</a> pour détecter des problèmes à proximité de l'utilisateur pour l'aviser du potentiel danger et des précautions à prendre si applicable.",
    "p3": "C'est vraiment nice.",
    "link1": "https://www.donneesquebec.ca/fr/"
  }
}
</i18n>
