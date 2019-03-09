<docs>
# TheHeader
>  The Header

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import LogoSvg from 'assets/svg/logo.svg?vue';

export default {
  name: 'TheHeader',
  components: {
    LogoSvg,
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
};
</script>

<template>
  <header class="TheHeader">
    <div class="navBar">
      <button class="burger" />

      <router-link class="logo" :to="{name: `home`}">
        <LogoSvg />
      </router-link>

      <router-link class="report" v-text="'Signaler'" :to="{name: `reports`}" />
    </div>
    
    <nav class="menu">
      <ul>
        <li
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
    height 150px

  .navBar
    flexbox($align: center, $justify: space-between)

  .menu
    fixed top left bottom
    width 50vw
    transform translateX(-50vw)

  .logo
    width 50px
    stroke $c-white
    stroke-width 10px

  ul
    flexbox()

  .link
    padding 8px
    margin-left 8px

  //  ===DEBUG===
  [data-debug-mode="true"] .TheHeader
    //
</style>
