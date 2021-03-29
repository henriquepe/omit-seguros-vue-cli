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
    atendimento: [],
    nomeUsuario: ''
  },
  mutations: {
    async login (state){
      if(state.userData.cpf != '' && state.userData.data != null){

        const responseToken = await axios.post(state.baseURL, {
          "screenIdentification":"SASFT0039",
          "Parameters":
          [
            {
              "parametername":"Usuario",
              "parametervalue":"integracao@flytour.com.br"
            },
            {
              "parametername":"Senha",
              "parametervalue":"6503378"
            }
          ]
        });

        const { Token } = responseToken.data.ResponseJSONData;

        const responseSessionId = await axios.post(state.baseURL, {
          "userToken": `${Token}`,
          "screenIdentification":"SASFT0045"
        });

        const { SessionID } = responseSessionId.data.ResponseJSONData;


        state.sessionData.token = Token;
        state.sessionData.sessionID = SessionID;

        const ticketsResponse = await axios.post(state.baseURLSrv, {
          "SessionID":SessionID,
          "screenIdentification":"SASVJ0145",
          "Parameters":
          [
            {
              "parametername":"nr_cpf",
              "parametervalue":state.userData.cpf
            },
            {
              "parametername":"dt_nascimento",
              "parametervalue":state.userData.data
            }
          ]
        })


        console.log(ticketsResponse.data.ResponseJSONData[0].nome)

        state.nomeUsuario = ticketsResponse.data.ResponseJSONData[0].nome;

        if(ticketsResponse.data.ResponseJSONData === "" || ticketsResponse.data.ResponseCode === 999){


          state.erro = 'Dados inválidos, por favor verifique as informações e envie novamente.'

        }

        if(ticketsResponse.data.ResponseJSONData){
          state.tickets = ticketsResponse.data.ResponseJSONData;
          state.nome = ticketsResponse.data.ResponseJSONData[0].nome
          state.loginState = true;
        }
      }
      console.log('deu certo',state.tickets)
      return true;

    },
    async atendimento(state){
      const abrirAtendimento = await axios.post(state.baseURLSrv, {
        "SessionID": state.sessionData.sessionID,
        "screenIdentification":"SASCC0010",
         "Parameters": [
             {"parametername":"tp_operacao", "parametervalue":"I"},
             {"parametername":"id_canal", "parametervalue":"6"},
             {"parametername":"ds_nome", "parametervalue":""},
             {"parametername":"nr_documento", "parametervalue": state.userData.cpf},
             {"parametername":"tp_documento", "parametervalue":"CPF"},
             {"parametername":"id_filial", "parametervalue":"1"},
             {"parametername":"cd_usuario", "parametervalue":""}
         ]
 
       })
      if(abrirAtendimento.data.ResponseJSONData){
        state.atendimento = abrirAtendimento.data.ResponseJSONData;
      }
      // console.log('abrirAtendimento', state.atendimento)

      const att = state.atendimento.find(atendimento => {

        return atendimento

      })

      if(att){
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        console.log(att.id_atendimento)

        const {id_atendimento}: any = att;

        const responseReq = await axios.post('https://app-sas-hml.omintseguros.com.br/api/SASData/Get_V2', {
        "SessionID": state.sessionData.sessionID,
        "screenIdentification":"SASCC0011",  
        "Parameters": [ 
        {"parametername":"tp_operacao", "parametervalue":"I"}, 
        {"parametername":"id_atendimento", "parametervalue": id_atendimento}, 
        {"parametername":"id_canal", "parametervalue":"6"}, 
        {"parametername":"cd_cliente", "parametervalue":""}, 
        {"parametername":"ds_nome", "parametervalue":""}, 
        {"parametername":"nr_documento", "parametervalue": ""}, 
        {"parametername":"tp_documento", "parametervalue":"CPF"}, 
        {"parametername":"id_classifica", "parametervalue":"2593"}, 
        {"parametername":"ds_obs", "parametervalue":""}, 
        {"parametername":"id_filial", "parametervalue":"3"}, 
        {"parametername":"cd_usuario", "parametervalue":""} 
     ]  })

        console.log(responseReq.data)
      }




    },


  },
  actions: {},
  modules: {}
});
