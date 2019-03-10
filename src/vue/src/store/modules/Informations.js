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
import agrile from 'db/data/agrile/page';
import insects from 'db/data/insects/page';
import rats from 'db/data/rats/page';

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
          slug: 'secheresses',
          label: 'secheresses',
          ...secheresses,
        },
        {
          slug: 'agrile',
          label: 'agrile',
          ...agrile,
        },
        {
          slug: 'insects',
          label: 'insects',
          ...insects,
        },
        {
          slug: 'rats',
          label: 'rats',
          ...rats,
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
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
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
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
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
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
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
