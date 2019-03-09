/**
 * # Global store
 * > for our /api/global stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
// import { get, each, set } from 'lodash';
// import data from 'db/data/informations.json';

import { find } from 'lodash';
import punaises from 'db/data/punaises/page';
import inondations from 'db/data/inondations/page';
import secheresses from 'db/data/secheresses/page';

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
          ...punaises,
        },
        {
          slug: 'inondations',
          label: 'Inondations',
          ...inondations,
        },
        {
          slug: 'secheresse',
          label: 'Secheresse',
          ...secheresses,
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
    LOAD({ commit, state }, slug) {
      switch (slug) {
        case 'punaises':
          // import('db/data/punaises/page').then(({ default: data }) => {
          //   console.log({ data });
          //   commit('SET_PAGE_DATA', data);
          // });
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
          import('db/data/punaises/punaises.json').then(({ default: data }) => {
            commit('SET_DATA', data.map(singleData => ({
              lat: parseFloat(singleData.LATITUDE),
              lng: parseFloat(singleData.LONGITUDE),
            })));
          });
          break;
        case 'inondations':
          import('db/data/inondations/inondations.json').then(({ default: data }) => {
            commit('SET_DATA', data.features.map(singleData => ({ lat: singleData.geometry.coordinates[1], lng: singleData.geometry.coordinates[0] })));
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
