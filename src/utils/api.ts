import axios from 'axios';
import store from "../store/";

export async function  verBilhete (state:any){
  const bilheteReemissaoResponse = await axios.post(store.state.baseURL, {
    "SessionID":state.sessionData.sessionID,
    "screenIdentification": "SASFT0035",
    "Parameters":
    [
      {
        "parametername":"NumeroBilhete",
        "parametervalue":state.tickets[state.arrayValue].bilhete
      },
        {
        "parametername":"NumeroPassageiro",
        "parametervalue":state.tickets[state.arrayValue].numeropassageiro
        },
        {
          "parametername":"CodigoDocumento",
          "parametervalue":"CPF"
        },
        {
          "parametername":"NumeroDocumento",
          "parametervalue":state.userData.cpf
        }
    ],
  })
  store.state.reemissaoBilhete = bilheteReemissaoResponse.data.ResponseJSONData
}
