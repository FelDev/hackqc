/* eslint-disable */
import Vue from 'vue';

export default function mergeState(state, value, propName, ignoreNull) {
  if (
    Object.prototype.toString.call(value) === '[object Object]'
    && (propName == null || state.hasOwnProperty(propName))
  ) {
    const o = propName == null ? state : state[propName];
    for (const prop in value) {
      mergeState(o, value[prop], prop, ignoreNull);
    }
    return;
  }
  if (!ignoreNull || value !== null) {
    Vue.set(state, propName, value);
  }
}
