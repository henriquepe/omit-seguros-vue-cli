import axios from "axios";
import store from "../store";

export async function verBilhete(state: any) {
  const bilheteReemissaoResponse = await axios.post(store.state.baseURL, {
    SessionID: state.sessionData.sessionID,
    screenIdentification: "SASFT0035",
    Parameters: [
      {
        parametername: "NumeroBilhete",
        parametervalue: state.tickets[state.arrayValue].bilhete,
      },
      {
        parametername: "NumeroPassageiro",
        parametervalue: state.tickets[state.arrayValue].numeropassageiro,
      },
      {
        parametername: "CodigoDocumento",
        parametervalue: "CPF",
      },
      {
        parametername: "NumeroDocumento",
        parametervalue: state.userData.cpf,
      },
    ],
  });
  store.state.reemissaoBilhete = bilheteReemissaoResponse.data.ResponseJSONData;
}

export async function criarChamado(tel: string) {
  const data = await axios.post(store.state.baseURLSrv, {
    SessionID: store.state.sessionData.sessionID,
    screenIdentification: "SASVJ0146",
    Parameters: [
      { parametername: "cpf", parametervalue: `${store.state.userData.cpf}` },
    ],
  });

  const voucher = data.data.ResponseJSONData[0].nr_Voucher;

  const response = await axios.post(store.state.baseURLSrv, {
    SessionID: store.state.sessionData.sessionID,
    screenIdentification: "SASSA55",
    Parameters: [
      {
        parametername: "tp_operacao",

        parametervalue: "I",
      },
      {
        parametername: "id_atendimento",

        parametervalue: "0",
      },
      {
        parametername: "id_canal",

        parametervalue: "13",
      },
      {
        parametername: "cd_cliente",

        parametervalue: `${voucher}`,
      },
      {
        parametername: "id_classifica",
        parametervalue: "5982",
      },
      {
        parametername: "ds_obs",
        parametervalue: `${"tel: " +
          tel +
          " longitude: " +
          store.state.longitude +
          ", latitude: " +
          store.state.latitude}`,
      },
      {
        parametername: "cd_usuario",
        parametervalue: "1053",
      },
    ],
  });
  return response.data.ResponseJSONData
    ? response.data.ResponseJSONData[0].Column1
    : "";
}
