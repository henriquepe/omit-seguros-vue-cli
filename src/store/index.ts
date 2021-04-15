import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseURL: 'https://flt-sas-hml.omintseguros.com.br/api/SASData/Get_V2/',
    baseURLSrv: 'https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2',
    userData: {
      cpf: '',
      data: null||'',
    },
    sessionData: {
      token: '',
      sessionID: '',
    },
    tickets: "",
    loginState: false,
    bilhete: '',
    reemissaoBilhete: '',
    nome: '',
    erro: '',
    arrayValue:0,
    atendimento: '',
    nomeUsuario: ''
  },
  
  actions: {},
  modules: {}
});
