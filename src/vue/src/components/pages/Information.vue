<docs>
# PageInfoSingle
> A single news page

@author Nicolas Husson <nicolas@kffein.com>
</docs>

<script>
// import UiPicture from 'components/ui/Picture';
// import PageBuilder from 'components/builder';
// import Store from './store';
import UiPicture from "components/ui/Picture";
import GoogleMap from "components/pages/GoogleMap";
import Chart from "components/pages/Chart";
import { mapGetters } from "vuex";

export default {
  name: "PageInfoSingle",
  // components: { UiPicture, PageBuilder },
  components: {
    UiPicture,
    GoogleMap,
    Chart
  },
  computed: {
    // Check in src/store/modules/Informations
    ...mapGetters({
      data: "Informations/data",
      page: "Informations/page"
    }),
    slug() {
      return this.$route.params.slug;
    }
  },
  data() {
    return {
      minDate: "2018-11-05T10:41:26",
      maxDate: "2019-11-18T10:41:26"
    };
  },
  watch: {
    /** watch slug from route to load datas
     * Note that we may stay on the same component within some other slug
     */
    slug: {
      handler(slug) {
        if (!slug) {
        }
        this.$store.dispatch("Informations/LOAD", slug);
      },
      immediate: true
    }
  }
};
</script>


<template>
  <main class="PageInfoSingle">
    <section id="top">
      <header class="header">
        <UiPicture class="picture" :src="page.image" cover="cover" :full="true" :overlay="true"/>
        <h1 v-text="page.title" class="title"/>
      </header>
      <div class="content" v-html="page.description"/>
    </section>
    <section id="middle">
      <div class="d3Graph">
        <!-- TODO: inclure un graph d3.js -->
      </div>
      <h1 v-text="'statsTitle'" class="title"/>
    </section>
    <section id="bottom">
      <h1 v-text="'mapTitle'" class="title"/>
      <div class="map">
        <GoogleMap :minDate="minDate" :maxDate="maxDate" :donnee="data"/>
      </div>
    </section>
    <div class="chart">Chart :
      <Chart :minDate="minDate" :maxDate="maxDate" :donnee="data"/>
    </div>
    <a :href="page.contact">Ressources</a>
  </main>
</template>

<style lang="stylus" scoped>
.header {
  ratio-box((16 / 9));
  position: relative;

  .title {
    absolute: bottom 20px left 20px;
    f-style(title, h1);
    z-index: 10;
  }
}

.content {
  padding: 20px;
  line-height: 1.4;

  >>> ul {
    list-style: outside disc;
    margin-left: 20px;
  }

  >>> h2 {
    f-style(title, h2);
    margin-top: 20px;
  }

  >>> h3 {
    f-style(title, h3);
    margin-top: 10px;
  }

  >>> a {
    display: inline-block;
    margin-top: 20px;
    border: 2px solid red;
    color: red;
    padding: 10px 20px;
  }
}

#top {
  background: white;
}

#middle {
  background: #112;
  display: flex;

  h1 {
    color: red;
    flex-grow: 2;
  }

  .d3Graph {
    flex-grow: 8;
    border: 2px solid black;
    border-radius: 1em;
  }
}

#bottom {
  background: #123;
}

#middle {
  background: #112;
  display: flex;

  h1 {
    color: red;
    flex-grow: 2;
  }

  .d3Graph {
    flex-grow: 8;
    border: 2px solid black;
    border-radius: 1em;
  }
}

#bottom {
  background: #123;
}

.picture {
  // ratio-box(16/9)
  // width: 50%;
}

/**
 * TABLE OF CONTENT
 * --------
 *  - LAYOUT
 *  - DEBUG
 *  - NO_SCOPE
 */
</style>

<i18n>
{
  "fr": {
    "statsTitle": "Statistiques",
    "mapTitle": "Près de chez vous"
  }
}
</i18n>
