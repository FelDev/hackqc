<docs>
# TheHeader
>  The Header

@author KFFEIN <dev@kffein.com>
</docs>

<script>
import { mapGetters, mapState } from 'vuex';
import logoPng from 'assets/images/logo.png';
import TheBurger from 'components/misc/Burger';

export default {
  name: 'TheHeader',
  components: {
    TheBurger
  },
  props: {
    state: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return {
      ima: logoPng,
      subjectsOpen:false,
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
        
        {
          label : 'Portail des villes',
          route : 'portail'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      open: 'Menu/open',
      subjects: 'Informations/sections',
    })
  },
  mounted(){
    this.$watch('open', (open)=>{
      if(!open) this.subjectsOpen = false
    })
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
        <img  class="logo" :src="ima" alt="logo"/>
      </router-link>

        <router-link class="report" v-text="'Signaler'"
        :to="{name: `reports`}" />
    </div>

    <nav class="menu" :data-open="open">
      <ul class="list">
        <li
          class="item"
          v-for="item in menu"
          :key="item.route">
          <div
            v-if="item.route === 'information'"
            tag="div"
            :to="{name: `${item.route}`}"
            class="subjects">
            <div class="link" @click.prevent="subjectsOpen = !subjectsOpen">
              <p class="label" v-html="item.label" />
              <span class="triangle" :data-open="subjectsOpen" />
            </div>
            <ul class="list" :data-open="subjectsOpen">
              <li class="item"
                v-for="subject in subjects"
                :key="`info-${subject.slug}`">
                <router-link
                  class="link sublink"
                  :to="{name: 'subject', params:{slug:subject.slug}}"
                  v-text="`- ${subject.title}`" />
              </li>
            </ul>
          </div>
          <router-link
            v-else
            :to="{name: `${item.route}`}"
            class="link"
            v-text="item.label"
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

  .logo
    border-radius :50%
  
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
      flexbox(column, $justify: space-between)
      // min-height 200px
      // max-height 200px
      // height 50%
      >.item
        // text-align center
        padding 1em 0
      // >.item:not(:first-child)
      //   margin-top 1em
    //
  .subjects
    position relative
    .list
      height 0px
      overflow hidden
      transition height 0.4s ease-in-out
      &[data-open]
        height 140px
        height 162px

    .item
      padding 0.2em 0 !important
      &:first-child
        margin-top 0.2em
      &:last-of-type
        padding-bottom 0
    
    .link
      flexbox(row, $justify:flex-start, $align:center)
      .triangle
        triangle( down, 8px, black )
        margin-left 10px
        position relative
        top 2px
        transition transform 0.4s ease-in-out
        transform-origin center 4.5px
        &[data-open]
          transform rotate(180deg)

  .link
    cursor pointer

  .logo
    size 40px
    
  .burger
    size 20px
</style>
