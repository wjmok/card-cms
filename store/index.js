import Vuex from 'Vuex'
import Vue from 'Vue'
import login from './models/login'
import axios from 'axios';
Vue.use(Vuex);
Vue.prototype.$axios = axios;


export default new Vuex.Store({

  modules:{
  	login
  }


})