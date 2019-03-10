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

function getLocalData(category) {
  let customPositions = JSON.parse(localStorage.getItem('addedPositions')) || [];
  customPositions = customPositions.filter(customPosition => customPosition.category === category);
  customPositions = customPositions.map(customPosition => ({
    amount: 1,
    date: customPosition.date,
    position:
    {
      lat: customPosition.lat,
      lng: customPosition.lng,
    },
  }));
  console.log(customPositions);
  return customPositions;
}
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

      let dataToSet = getLocalData(slug);
      console.log(dataToSet);
      switch (slug) {
        case 'punaises':
          import('db/data/punaises/punaises.json').then(({ default: data }) => {
            dataToSet = data.map(singleData => ({
              amount: parseInt(singleData.NBR_EXTERMIN, 10) || 0,
              date: new Date(singleData.DATE_DECLARATION),
              position:
              {
                lat: parseFloat(singleData.LATITUDE),
                lng: parseFloat(singleData.LONGITUDE),
              },
            })).concat(dataToSet);
            commit('SET_DATA', dataToSet);
          });
          break;
        case 'inondations':
          // import('db/data/punaises/punaises.json').then(({ default: data }) => {
          //   commit('SET_DATA', data);
          // });
          import('db/data/inondations/inondations.json').then(({ default: data }) => {
            dataToSet = data.features.map(singleData => ({
              amount: 1,
              date: new Date(singleData.properties.date_observation),
              position: { lat: singleData.geometry.coordinates[1], lng: singleData.geometry.coordinates[0] },
            })).concat(dataToSet);
            commit('SET_DATA', dataToSet);
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
            dataToSet = data.map(singleData => ({
              amount: 1,
              date: new Date(singleData.date),
              position: { lat: singleData.lat, lng: singleData.lng },
            })).concat(dataToSet);
            commit('SET_DATA', dataToSet);
          });
          break;
        case 'insects':
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
          import('db/data/insects/insects.json').then(({ default: data }) => {
            dataToSet = data.map(singleData => ({
              amount: 1,
              date: new Date(singleData.DDS_DATE_CREATION),
              position: { lat: singleData.LOC_LAT, lng: singleData.LOC_LONG },
            })).concat(dataToSet);
            commit('SET_DATA', dataToSet);
          });
          break;
        case 'rats':
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
          import('db/data/rats/rats.json').then(({ default: data }) => {
            console.log(dataToSet);
            dataToSet = data.map(singleData => ({
              amount: 1,
              date: new Date(singleData.DDS_DATE_CREATION),
              position: { lat: singleData.LOC_LAT, lng: singleData.LOC_LONG },
            })).concat(dataToSet);
            console.log(dataToSet);
            commit('SET_DATA', dataToSet);
          });
          break;
        case 'vermines':
          commit('SET_PAGE_DATA', find(state.sections, { slug }));
          import('db/data/vermines/vermines.json').then(({ default: data }) => {
            dataToSet = data.map(singleData => ({
              amount: 1,
              date: new Date(singleData.DDS_DATE_CREATION),
              position: { lat: singleData.LOC_LAT, lng: singleData.LOC_LONG },
            })).concat(dataToSet);
            commit('SET_DATA', dataToSet);
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
