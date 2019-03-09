<docs>
# PageNewsCollection
> Page news - listing

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
import { mapGetters } from 'vuex';
import UiPicture from 'components/ui/picture';
import Store from './store';
import NewsCard from './Card';

export default {
  name: 'PageNewsCollection',
  components: {
    UiPicture,
  },
  computed: {
  },
};
</script>

<template>
  <div class="PageNewsCollection _container">
    <h1
      v-t="'title'"
      class="title" />
    <UiPicture :src="$t('image')"/>
    <section>
      <h1
        v-t="'mapsTitle'"
        class="title" />
    </section>
  </div>
</template>

<i18n>
{
  "fr": {
      "title": "Toutes les nouvelles",
      "image": "https://static.actu.fr/uploads/2018/10/punaises-de-lit.jpg",
      "mapsTitle":"Votre region"
  },
  "en": {
      "title": "All news",
      "image": "https://static.actu.fr/uploads/2018/10/punaises-de-lit.jpg"
  }
}
</i18n>

<style lang="stylus" scoped>
  /**
   * TABLE OF CONTENT
   * --------
   *  - LAYOUT
   *  - DEBUG
   *  - NO_SCOPE
   */

  //  ===LAYOUT===
  .title
    padding-bottom 1em
    f-style(title, h1)
    vertical-padding()
    text-align center

  .list
    flexbox(row, $align: stretch, $wrap:wrap)
    >.item
      flex 0 1 32.5%
      // margin top after 1st row
      &:nth-child(n+4)
        padding-top 2em

  //  ===DEBUG===
  [data-debug-mode="true"] .PageNewsCollection
    //
</style>
