<doc>
# TheBurger
> 

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
import { mapGetters, mapState } from 'vuex';
import BurgerSvg from 'assets/svg/burger.svg?inline'
export default {
  name: 'TheBurger',
  props: {},
  data(){
    return {
      BurgerSvg
    }
  },
  computed: {
    ...mapGetters({
      open: 'Menu/open',
    }),
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <div class="TheBurger" v-html="BurgerSvg" :data-open="open" />
</template>

<style lang="stylus">
  .TheBurger
    fill black
    pointer-events all
    cursor pointer
    .bar
      position absolute
      transform rotate(0) translateY(0) translateX(0)
      opacity 1
      transform-origin 20px 10px
      transition transform 0.4s ease-in-out, opacity 0.2s ease-in-out
      &:nth-of-type(1)
        transform-origin 20px 10px
      &:nth-of-type(3)
        transform-origin 20px 20px
    &[data-open]
      .bar
        &:nth-of-type(1)
          transform rotate(-45deg) translateY(0) translateX(0%)
        &:nth-of-type(2)
          opacity 0
        &:nth-of-type(3) 
          transform rotate(45deg) translateY(0em) translateX(0em)

</style>
