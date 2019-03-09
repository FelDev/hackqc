/**
 * # Global store
 * > for our /api/global stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
// import { get, each, set } from 'lodash';
// import data from 'db/data/informations.json';

export default {
  namespaced: true,
  state() {
    return {
      data: [],
      page: {},
      sections: [
        {
          slug: 'punaises',
          label: 'Punaises de lit',
        },
        {
          slug: 'inondations',
          label: 'Inondations',
        },
        {
          slug: 'secheresse',
          label: 'Secheresse',
        },
      ],
    };
  },
  mutations: {
    SET_PAGE_DATA(state, data) {
      state.page = data;
    },
    SET_DATA(state, data) {
      state.data = data;
    },
  },
  actions: {
    /**
     * load our global
     * and dispatch i18n datas (if any) to the correct store
     * @param {VuexAction} store - action's store
     * @param {String} locale - @todo use this for api... somehow
     */
    LOAD({ commit }, slug) {
      switch (slug) {
        case 'punaises':
          import('db/data/punaises/page.json').then(({ default: data }) => {
            commit('SET_PAGE_DATA', data);
          });
          import('db/data/punaises/punaises.json').then(({ default: data }) => {
            commit('SET_DATA', data);
          });
        break;
        default:
          console.log('WRONG SLUG', slug);
        break;
      }
    },
  },
  getters: {
    page: ({ page }) => page,
    data: ({ data }) => data,
    sections: ({ sections }) => sections,
  },
};
