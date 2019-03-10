/**
 * # Global store
 * > for our /api/global stuff
 *
 * @author Nicolas Husson <nicolas@kffein.com>
 */
// import { get, each, set } from 'lodash';
// import data from 'db/data/informations.json';

import { find, map } from 'lodash';
import Informations from 'db/data/informations';

export default {
  namespaced: true,
  state() {
    return {
      data: [],
      page: {},
      sections: Informations,
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
      const section = find(state.sections, { slug });
      if (!section) {
        console.error(`WRONG SLUG "${slug}" - must be one of ${map(state.sections, s => s.slug).join(' | ')}`);
        return;
      }
      commit('SET_PAGE_DATA', section);
      switch (slug) {
        case 'punaises':
          import('db/data/punaises/punaises.json').then(({ default: data }) => {
            commit('SET_DATA', data.map(singleData => ({
              amount: parseInt(singleData.NBR_EXTERMIN, 10) || 0,
              date: new Date(singleData.DATE_DECLARATION),
              position:
              {
                lat: parseFloat(singleData.LATITUDE),
                lng: parseFloat(singleData.LONGITUDE),
              },
            })));
          });

          break;
        case 'inondations':
          // import('db/data/punaises/punaises.json').then(({ default: data }) => {
          //   commit('SET_DATA', data);
          // });
          import('db/data/inondations/inondations.json').then(({ default: data }) => {
            commit('SET_DATA', data.features.map(singleData => ({
              amount: 1,
              date: new Date(singleData.properties.date_observation),
              position: { lat: singleData.geometry.coordinates[1], lng: singleData.geometry.coordinates[0] },
            })));
          });
          break;
        case 'secheresse':
          // import('db/data/punaises/punaises.json').then(({ default: data }) => {
          //   commit('SET_DATA', data);
          // });
          break;
        case 'agrile':
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
          import('db/data/agrile/agrile.json').then(({ default: data }) => {
            commit('SET_DATA', data.map(singleData => ({
              amount: 1,
              date: new Date(singleData.date),
              position: { lat: singleData.lat, lng: singleData.lng },
            })));
          });
          break;
        case 'insects':
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
          import('db/data/insects/insects.json').then(({ default: data }) => {
            commit('SET_DATA', data.map(singleData => ({
              amount: 1,
              date: new Date(singleData.DDS_DATE_CREATION),
              position: { lat: singleData.LOC_LAT, lng: singleData.LOC_LONG },
            })));
          });
          break;
        default:
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
