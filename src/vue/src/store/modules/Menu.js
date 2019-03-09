/**
 * # Menu store
 * > control our menu state (open/close)
 *
 * @todo :
 *
 * @author Sebastien Levy <sebastien@kffein.com>
 */

export default {
  namespaced: true,
  state: {
    open: false,

  },
  mutations: {
    SET_STATE(state, open) {
      console.log('set state', state, open);
      state.open = open;
    },
  },
  actions: {
    TOGGLE({ commit, state }) {
      commit('SET_STATE', !state.open);
    },
    OPEN({ commit }) {
      commit('SET_STATE', true);
    },
    CLOSE({ commit }) {
      commit('SET_STATE', false);
    },
  },
  getters: {
      // we must return a function to watch it with this.$store.watch
      // watch(fn: Function, callback: Function, options?: Object): Function
      open: state => state.open,
  },
};
