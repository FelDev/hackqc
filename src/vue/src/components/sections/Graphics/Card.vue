<doc>
# SubjectCard
> Slide of the slideshow

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
import UiPicture from 'components/ui/Picture'
import { mapGetters } from 'vuex';
export default {
  name: 'SubjectCard',
  components: { UiPicture },
  props: ['title', 'image', 'shortDescription', 'slug'],
  data(){
    return {}
  },
  computed:{
    ...mapGetters({
      isDesktop: 'Interface/isDesktop',
    }),
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <router-link tag="article" class="SubjectCard"
    :to="{name:'subject', params:{slug}}">
    <template v-if="isDesktop">
      <header>
        <h3 class="title" v-text="title" />
      </header>
      <div class="content">
        <UiPicture class="picture" :src="image" cover="cover"/>
        <p class="description" v-text="description"/>
      </div>
    </template>
    <template v-else>
      <UiPicture class="picture" :src="image" cover="cover"/>
      <div class="content">
        <h3 class="title" v-text="title" />
        <p class="description" v-text="shortDescription"/>
      </div>
    </template>
  </router-link>
</template>

<style lang="stylus" scoped>
  .SubjectCard
    cursor pointer
    box-sizing border-box
    flexbox(column)
    background-color white
    box-shadow 1px 1px 5px rgba(black, 0.2)
    .content
      flex-grow 1
      padding-top 20px
    +desktop()
      padding 20px
      .content
        flexbox($align:flex-start)
      .picture
        ratio-box(4/3)
        flex 0 0 30%
        margin-right 20px
      .description
        max-width 400px
        flex-grow 1
    +not-desktop()
      .picture
        ratio-box(16/9)
        width 100%
      .content
        padding 20px

    
</style>
