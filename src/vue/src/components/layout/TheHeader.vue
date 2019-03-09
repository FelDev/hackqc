<docs>
# TheHeader
>  The Header

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import LogoSvg from 'assets/svg/logo.svg?vue';
import TheBurger from 'components/misc/Burger';

export default {
  name: 'TheHeader',
  components: {
    LogoSvg, TheBurger
  },
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return {
      menu:[
        {
          label: 'Accueil',
          route: 'home',
        },
        {
          label: 'Informations',
          route: 'information',
        },
        {
          label: 'A-propos',
          route: 'about',
        },
        {
          label: 'Signaler',
          route: 'reports',
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      open: 'Menu/open',
    }),
  },
  mounted(){
    window.t = this
    this.$router.beforeEach((to, from, next)=>{
      this.$store.dispatch('Menu/CLOSE')
      next()
    })
  }
};
</script>

<template>
  <header class="TheHeader">
    <div class="navBar">
      <TheBurger
        class="burger"
        @click.native.prevent="$store.dispatch('Menu/TOGGLE')"/>

      <router-link class="logo" :to="{name: `home`}">
        <LogoSvg />
      </router-link>

      <router-link class="report" v-text="'Signaler'" :to="{name: `reports`}" />
    </div>
    
    <nav class="menu" :data-open="open">
      <ul class="list">
        <li
          class="item"
          v-for="item in menu"
          :key="item.route">
          <router-link
            :to="{name: `${item.route}`}"
            class="link"
            v-html="item.label"
          />
        </li>
      </ul>
    </nav>
  </header>
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
  .TheHeader
    fixed top left right
    height $h-header
    z-index $z-header


  .navBar
    flexbox($align: center, $justify: space-between)
    padding 0.5em 2em
    background-color white
    box-shadow: 1px 0px 10px #888888;
    position relative
    z-index $z-navbar

  .menu
    fixed top left bottom
    height 100%
    min-width 200px
    flexbox(column, $justify: center)
    padding 20px
    background-color white
    z-index $z-menu
    transition transform 0.4s easing('in-quad')
    transform translateX(-100%)
    &[data-open]
      transform translateX(0%)
      transition-timing-function easing('out-expo')
    .list
      flexbox(column, $align: center, $justify: space-between)
      // min-height 200px
      max-height 200px
      height 50%
      // >.item:not(:first-child)
      //   margin-top 1em
    //
  .logo
    size 40px

  .burger
    size 20px
</style>
