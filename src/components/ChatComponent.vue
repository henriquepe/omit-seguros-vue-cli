<template>
  <div class="principal">
    <vue-loaders-ball-beat
      id="loader"
      v-if="loader"
      color="#00316B"
    ></vue-loaders-ball-beat>
    <h1 id="mensagem-loader" v-if="loader">
      Estamos gerando seu atendimento....
    </h1>
    <div style="overflow: auto;" v-if="!loader" class="chat-container">
      <div>
        <div class="chat-header">
          <button
            class="voltar-menu"
            v-on:click="$router.replace({ path: '/' })"
          >
            Voltar
          </button>
        </div>

        <div class="chat-proposta">
          <p>
            Número:
            {{
              this.state.chamadoInCall !== null ? this.state.chamadoInCall : ""
            }}
          </p>
        </div>
      </div>

      <div class="conversa-chat-atendente">
        <div
          v-show="mensagensGravadas.at_externo !== 'N'"
          v-bind:class="
            mensagensGravadas['operador/depto'] ===
            'PREMIUM ASSISTANCE - T.I INFORMÁTICA'
              ? 'mensagem-cliente'
              : 'mensagem-atendente'
          "
          v-for="mensagensGravadas in mensagens"
          :key="mensagensGravadas.id_obs"
          class="mensagem-cliente"
        >
          <strong class="nome-chat">{{
            mensagensGravadas["operador/depto"] ===
            "PREMIUM ASSISTANCE - T.I INFORMÁTICA"
              ? "Você"
              : "Atendente"
          }}</strong>
          <p class="mensagem-chat">{{ mensagensGravadas.ds_obs }}</p>
          <p class="data-chat">
            {{ convertDate(mensagensGravadas.dh_inclusao) }}
          </p>
        </div>
      </div>

      <div class="input-chat">
        <input
          placeholder="Digite sua mensagem"
          v-model="mensagem"
          type="text"
        />
        <button v-on:click="adicionarMensagem">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import store from "../store/index";
import axios from "axios";
import moment from "moment";

export default Vue.extend({
  name: "ChatComponent",
  data() {
    return {
      state: store.state,
      mensagens: [],
      mensagem: "Solicito atendimento via app",
      loader: true,
      latitude: "",
      longitude: "",
    };
  },

  computed: {
    dateNow: () => {
      return moment().format("DD/MM/YYYY h:mm");
    },
  },

  methods: {
    handleChangePage() {
      this.$router.replace({ path: "/atendimento", name: "Atendimento" });
    },

    convertDate(date) {
      return moment(date).format("DD/MM/YYYY h:mm");
    },

    async adicionarMensagem() {
      // this.mensagens.push(this.mensagem);

      await axios.post(store.state.baseURLSrv, {
        SessionID: store.state.sessionData.sessionID,
        screenIdentification: "SASSA56",
        Parameters: [
          { parametername: "ve_id_atendimento", parametervalue: "0" },
          {
            parametername: "ve_id_chamado",
            parametervalue: store.state.chamadoInCall,
          },
          { parametername: "ve_cd_operador", parametervalue: "1053" },
          { parametername: "ve_ds_obs", parametervalue: `${this.mensagem}` },

          { parametername: "ve_at_externo", parametervalue: "S" },
        ],
      });

      this.mensagem = "";

      const historicoConversa = await axios.post(store.state.baseURLSrv, {
        SessionID: store.state.sessionData.sessionID,
        screenIdentification: "SASSA53",
        Parameters: [
          {
            parametername: "ve_id_chamado",
            parametervalue: this.state.chamadoInCall,
          },
        ],
      });

      console.log("historicoConversa", historicoConversa.data.ResponseJSONData);

      historicoConversa.data.ResponseJSONData.map((item, index) =>
        this.mensagens.splice(index, 1, item)
      );

      this.mensagens = this.mensagens.reverse();

      // this.mensagens = historicoConversa;

      // localStorage.setItem('@mensagens-usuario', JSON.stringify(historicoConversa));
    },

    success(pos) {
      const crd = pos.coords;

      console.log("Sua posição atual é:");
      console.log("Latitude : " + crd.latitude);
      console.log("Longitude: " + crd.longitude);
      // console.log('Mais ou menos ' + crd.accuracy + ' metros.');
      this.state.latitude = crd.latitude;
      this.state.longitude = crd.longitude;
    },
  },

  async created() {
    navigator.geolocation.getCurrentPosition(this.success);

    setInterval(async () => {
      const historicoConversa = await axios.post(store.state.baseURLSrv, {
        SessionID: store.state.sessionData.sessionID,
        screenIdentification: "SASSA53",
        Parameters: [
          {
            parametername: "ve_id_chamado",
            parametervalue: this.state.chamadoInCall,
          },
        ],
      });

      historicoConversa.data.ResponseJSONData.map((item, index) =>
        this.mensagens.splice(index, 1, item)
      );

      this.mensagens = this.mensagens.reverse();
    }, 10000);

    console.log("this.latitude", this.state.latitude);

    console.log("cpf", this.state.userData.cpf);

    // const data = await axios.post(store.state.baseURLSrv, {
    //   SessionID: store.state.sessionData.sessionID,
    //   screenIdentification: "SASVJ0146",
    //   Parameters: [
    //     { parametername: "cpf", parametervalue: `${this.state.userData.cpf}` },
    //   ],
    // });

    // console.log('data', data.data.ResponseJSONData[0].nr_Voucher)

    //   const voucher = data.data.ResponseJSONData[0].nr_Voucher;

    // this.mensagem = `Solicito atendimento via app`;

    // this.mensagens.push(this.mensagem);

    // const response = await axios.post(store.state.baseURLSrv, {
    //   SessionID: store.state.sessionData.sessionID,
    //   screenIdentification: "SASSA55",
    //   Parameters: [
    //     {
    //       parametername: "tp_operacao",

    //       parametervalue: "I",
    //     },
    //     {
    //       parametername: "id_atendimento",

    //       parametervalue: "0",
    //     },
    //     {
    //       parametername: "id_canal",

    //       parametervalue: "13",
    //     },
    //     {
    //       parametername: "cd_cliente",

    //       parametervalue: `${voucher}`,
    //     },
    //     {
    //       parametername: "id_classifica",
    //       parametervalue: "5982",
    //     },
    //     {
    //       parametername: "ds_obs",
    //       parametervalue: `solicito atendimento via app \n https://www.google.com/maps/search/?api=1&query=${this.state.latitude},${this.state.longitude}`,
    //     },
    //     {
    //       parametername: "cd_usuario",
    //       parametervalue: "1053",
    //     },
    //   ],
    // });

    // store.state.atendimento = response.data.ResponseJSONData[0].Column1;

    this.loader = false;

    // await axios.post(store.state.baseURLSrv, {
    //   SessionID: store.state.sessionData.sessionID,
    //   screenIdentification: "SASSA56",
    //   Parameters: [
    //     { parametername: "ve_id_atendimento", parametervalue: "0" },
    //     {
    //       parametername: "ve_id_chamado",
    //       parametervalue: store.state.chamadoInCall
    //     },
    //     { parametername: "ve_cd_operador", parametervalue: "1053" },
    //     { parametername: "ve_ds_obs", parametervalue: `${this.mensagem}` },

    //     { parametername: "ve_at_externo", parametervalue: "S" }
    //   ]
    // });
  },
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.chat-header {
  width: 100%;
  color: #fff;
  background: #00316b;
  padding: 5px 20px;
}

.chat-header p {
  margin-top: 14px;
}

.chat-proposta {
  width: 100%;
  color: #00316b;
  background: #fff;
  padding: 5px 20px;
  font-weight: bold;

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
}

.chat-proposta p {
  margin-top: 14px;
}

.input-chat {
  width: 100%;
  background: #fff;
  padding: 10px;
  -webkit-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  display: flex;
  position: fixed;
  bottom: 0;
}

.input-chat input {
  flex: 1;
  padding-left: 5px;
}

.input-chat button {
  width: 90px;
  margin-left: 15px;
  padding: 5px;
  border: 0;
  background: #00316b;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
}

.conversa-chat-atendente {
  padding: 30px;

  height: 100%;

  padding-bottom: 300px;
}

.mensagem-atendente {
  -webkit-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);

  padding: 10px;

  margin-left: 90px;

  margin-top: 20px;
}

.mensagem-chat {
  color: grey;
}

.data-chat {
  color: grey;
  text-align: right;

  font-size: 13px;

  margin: 0;
}

.mensagem-cliente {
  -webkit-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);

  padding: 20px;

  margin-left: 90px;

  text-align: left;

  margin-bottom: 25px;
}

.voltar-menu {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background: transparent;
  border-width: 0px;
  color: white;
}

.voltar-menu p {
  margin-left: 10px;
}

.principal {
  height: 100vh;
  overflow: hidden;
  width: 100%;
}

.principal #loader {
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.principal #mensagem-loader {
  position: absolute;
  top: 50%;
  left: 20%;
}
</style>
