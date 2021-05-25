import Vue from 'vue';
import { parseTime } from './utils';
Vue.filter('parseTime', parseTime);
console.log('fliters.js');