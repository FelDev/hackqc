<doc>
# SubjectCard
> Slide of the slideshow

@author Nicolas Husson <hello@nusson.ninja>
</doc>

<script>
import UiPicture from 'components/ui/Picture'
export default {
  name: 'SubjectCard',
  components: { UiPicture },
  props: ['title', 'image', 'description'],
  data(){
    return {}
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <article class="SubjectCard">
    <header>
      <h3 class="title" v-text="title" />
    </header>
    <div class="content">
      <UiPicture class="picture" :src="image" cover="cover"/>
      <p class="description" v-text="description"/>
    </div>
  </article>
</template>

<style lang="stylus" scoped>
  .SubjectCard
    flexbox(column)
    padding 20px
    box-sizing border-box

  .content
    flex-grow 1
    padding-top 20px
    flexbox($align:flex-start, $justify:space-between)

  .picture
    ratio-box(4/3)
    flex 0 0 30%
    margin-right 20px
</style>
