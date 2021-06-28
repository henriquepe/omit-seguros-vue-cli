import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseURL: "https://flt-sas.omintseguros.com.br/api/SASData/Get_V2",
    baseURLSrv: "https://app-sas.omintseguros.com.br/api/SASData/Get_V2",
    baseURLProd: "https://flt-sas.omintseguros.com.br/api/SASData/Get_V2",
    baseURLSrvProd: "https://sas-hml.omintseguros.com.br/api/SASData/Get_V2",
    userData: {
      cpf: "",
      data: null || "",
    },
    sessionData: {
      token: "",
      sessionID: "",
    },
    tickets: "",
    loginState: false,
    bilhete: "",
    reemissaoBilhete: "",
    nome: "",
    erro: "",
    arrayValue: 0,
    atendimento: "",
    nomeUsuario: "",
    latitude: "",
    longitude: "",
  },

  actions: {},
  modules: {},
});
