import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

//访问状态--- this.$store.state....................................
const state = {
  modalShowOrHide : false,
  /**/
  btnMsg : '',
  bol : true,
  boll : false,
  showAgencyModel : false,
  agencyArr : [],
  agencyName : '',
  address : '',
  index : '',
  title : true,
  showPage : false,
  /*每个路由页面下存储信息的数组列*/
  splitPages : [],
  oldManInfo : [],
  /**/
  currentPage : 1,
  /*------------------    照护管理---上传照片    -------------------------*/
  allOldManInfo : [],




};
//状态变更   this.$store.commit(...)................................
const mutations = {
  changeTrue : function (state) {
    state.modalShowOrHide = true;
    state.showAgencyModel = true;
  },
  changeFalse : function (state) {
    state.modalShowOrHide = false;
    state.showAgencyModel = false;
  },
  setAgencyName : function (state, obj) {
      state.agencyName = obj
  },
  setAddress : function (state,object) {
      state.address = object
  },

  changeCP : function (state,page) {
      state.currentPage = page
  },
  minusCP : function (state) {
    state.currentPage --;
  },
  plusCP : function (state) {
    state.currentPage ++;
  }
};
// Getters..........................................................
const getters = {
  agencyName : function (state) {
    return state.agencyName
  },
  address : function (state) {
    return state.address
  }
};
//Actions............................................................
const actions = {


  //jiahaha(context) {
  //    context.commit('jia',{a : 2})
  //}
};








































export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})















//import Vue from 'vue'
//import vueX from 'vuex'
//
//Vue.use(vueX);
//import model from './model/module.js'
//
//export default new vueX.Store({
//    module :{
//
//    }
//});
