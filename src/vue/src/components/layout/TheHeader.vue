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
    <div class="_container">
      <div class="header-block">
        <router-link :to="{name: `home`}">
          <LogoSvg class="logo" />
        </router-link>
        <nav>
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
      </div>
    </div>
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
    vertical-padding(10)

  .header-block
    flexbox($align: center, $justify: space-between)

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
