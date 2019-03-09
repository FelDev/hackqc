/**
 * # Our store
 * > Manage our app state
 *
 * chunked by modules
 * - features (interface, scrollmagic etc)
 * - pages etc
 *
 * @todo : TEST and finish this
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
import Vue from 'vue';
import Vuex from 'vuex';

import App from './modules/App';
import I18n from './modules/I18n';
import Loader from './modules/Loader';
import Interface from './modules/Interface';
import Menu from './modules/Menu';
import ScrollMagic from './modules/Scrollmagic';
import Global from './modules/Global';
import Informations from './modules/Informations';

Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    App,
    I18n,
    Loader,
    Interface,
    Menu,
    ScrollMagic,
    Global,
    Informations,
  },
});
export default Store;
