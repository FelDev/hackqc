/**
 * # Router service
 * > manage our routes (pages)
 *
 * @todo :
 * - [ ] use routes.json (like old days)
 * - [ ] code split / async load
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import {
 get, map, without, flatten, assign, indexOf,
} from 'lodash';
import store from 'store';
import defaultLocale from 'utils/defaultLocale';
import settings from 'src/settings';
import routesMap from 'routes';

import Home from 'components/pages/Home';

const About = () => import(/* webpackChunkName: "pages-about" */ 'components/pages/About');
const FourOFour = () => import(/* webpackChunkName: "pages-404" */ 'components/pages/FourOFour');
const Informations = () => import(/* webpackChunkName: "pages-informations" */ 'components/pages/Informations');
const Reports = () => import(/* webpackChunkName: "pages-reports" */ 'components/pages/Reports');
const GoogleMap = () => import(/* webpackChunkName: "pages-reports" */ 'components/pages/GoogleMap');
const Information = {
  collection: () => import(/* webpackChunkName: "pages-Information" */ 'components/pages/Information/Collection'),
  single: () => import(/* webpackChunkName: "pages-Information" */ 'components/pages/Information/Single'),
};

Vue.use(VueRouter);

/**
 * return component by route handle
 * @param {String} id - route handle
 * @returns {VueComponent}
 */
function getComponentById(id) {
  switch (id) {
    case 'home':
      return Home;
    case 'about':
      return About;
    case 'informations':
      return Informations;
    // Information
    case 'information':
      return Information.collection;
    case 'subject':
      return Information.single;

    case 'reports':
      return Reports;
    case 'map':
      return GoogleMap;
    case '404':
    default:
      return FourOFour;
  }
}

/**
 * @argument {Array} routes - put debug / default routes here
 * when calling /api/globals, we may add new routes
 */
const defaultRoutes = [
  {
    path: '/:locale',
    redirect: (to) => {
      const { params } = to;
      const { locale } = params;
      if (indexOf(settings.locales, locale) < 0) {
        return {
          name: '404',
        };
      }

      return {
        name: 'home',
      };
    },
  },
  {
    path: '/',
    redirect: { name: 'home' },
  },
  {
    path: '/:locale/*',
    redirect: (to) => {
      const { params } = to;
      let { locale } = params;
      if (indexOf(settings.locales, locale) < 0) {
        locale = defaultLocale;
      }
      return {
        name: '404',
      };
    },
  },
  {
    path: '*',
    redirect: { name: '404' },
  },
];

/**
 * compute our routes array
 * by looping our routes.json within all our locales
 */
const routes = without(flatten(
  map(routesMap, ({ id, urls, meta }) => { // eslint-disable-line arrow-body-style
    // because a route has many locales, we create one per locale
    return map(urls, (url, locale) => {
      // retrieve our component within the id (handle)
      const component = getComponentById(id);
      if (!component) {
        return null;
      }
      // finaly, this is ONE route
      return {
        name: `${id}`,
        path: `/${locale}/${url}`,
        // mix lots of useful metas
        meta: assign({}, meta, {
          locale,
          id, // handle
        }),
        component,
      };
    });
  }),
), null);

routes.push(...defaultRoutes);

/**
 * @argument {VueRouter} router - our vue router instance
 */
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
});

/**
 * watch change locale
 * if so, tell our I18n store so all change, load new globals etc
 */
router.beforeEach((to, from, next) => {
  // remove all temp scenes
  store.dispatch('ScrollMagic/DESTROY_TEMP_SCENES');

  // retrieve locale (route's param or meta)
  const locale = get(to, 'params.locale') || get(to, 'meta.locale', defaultLocale);
  if (locale && (
      locale !== store.getters['I18n/locale']
      || !from.name
    )
   ) {
    // switch lang = page reload (same name but not locale)
    if (settings.reloadOnSwitchLangue && from.name) {
      next();
      return location.reload(true); // eslint-disable-line no-restricted-globals
    }

    store.dispatch('I18n/SET_LOCALE', locale);
  }
  return next();
});

/**
 * on route error, redirect 404
 */
router.onError(() => {
  router.replace('*');
});


// form `import router from 'router'
export default router;
