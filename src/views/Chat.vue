<template>
  <div class="chat-container">

    <div>
      <div class="chat-header">
        <button class="voltar-menu" v-on:click="$router.replace( { name: 'Atendimento' } )">Voltar</button>
      </div>

      <div class="chat-proposta">
        <p>Número: {{this.state.atendimento !== null ? this.state.atendimento : ""}}</p>
      </div>
    </div>

    <div class="conversa-chat-atendente">

      <div v-for="mensagensGravadas in mensagens" :key="mensagensGravadas" class="mensagem-cliente">
        <strong class="nome-chat">Você</strong>
        <p class="mensagem-chat">{{mensagensGravadas}}</p>
        <p class="data-chat">09/02/2021 15:15</p>
      </div>

    </div>

    <div class="input-chat">
      <input placeholder="Digite sua mensagem" v-model="mensagem"  type="text">
      <button v-on:click="adicionarMensagem">Enviar</button>
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import store from "../store/index";
import axios from 'axios'


  export default Vue.extend({
  name: "Chat",
  data() {
    return {
      state: store.state,
      mensagens: [],
      mensagem: 'Solicito atendimento via app'
    };
  },


  methods: {
    handleChangePage(){
      this.$router.replace({ path: "/atendimento", name: 'Atendimento' });
    },

    adicionarMensagem(){



      this.mensagens.push(this.mensagem);

      console.log(this.mensagens);

      this.mensagem = ''

      localStorage.setItem('@mensagens-usuario', JSON.stringify(this.mensagens));


    }
  },

  async created() {

      localStorage.setItem('@mensagens-usuario', JSON.stringify([]))

      this.adicionarMensagem()


      const response = await axios.post(store.state.baseURLSrv, {

        "SessionID": store.state.sessionData.sessionID,
        "screenIdentification": "SASSA55",
        "Parameters": [
          {

          "parametername": "tp_operacao",

          "parametervalue": "I"

          },
          {

          "parametername": "id_atendimento",

          "parametervalue": "0"

          },
          {

          "parametername": "id_canal",

          "parametervalue": "13"

          },
          {

          "parametername": "cd_cliente",

          "parametervalue": "1576362"

          },
          {

          "parametername": "id_classifica",
          "parametervalue": "5982"

          },
          {

          "parametername": "ds_obs",
          "parametervalue": "solicito atendimento via app"

          },
          {

          "parametername": "cd_usuario",
          "parametervalue": "1053"

          }
        ]

      })


      store.state.atendimento = response.data.ResponseJSONData[0].Column1;




    const mensagensLocal = localStorage.getItem(('@mensagens-usuario'));

    console.log(this.mensagens)

    if(mensagensLocal){

      this.mensagens = JSON.parse(mensagensLocal);
      return;
    }

    else {


      return;
    }

  }


})

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
  color: #FFF;
  background: #00316B;
  padding: 5px 20px;
}

.chat-header p {
  margin-top: 14px;
}

.chat-proposta {
  width: 100%;
  color: #00316b;
  background: #FFF;
  padding: 5px 20px;
  font-weight: bold;

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
}

.chat-proposta p {
  margin-top: 14px;
}

.input-chat {
  width: 100%;
  background: #FFF;
  padding: 10px;
  -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
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
  color: #fFF;
  font-weight: bold;
  border-radius: 5px;
}

.conversa-chat-atendente {

  padding: 30px;

  height: 100%;

  padding-bottom: 300px;

}

.mensagem-atendente {

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);

  padding: 10px;

  margin-left: 30px;

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

  -webkit-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 35px -9px rgba(0,0,0,0.25);

  padding: 20px;

  margin-left: 90px;

  text-align: left;

  margin-bottom: 25px;


}

.voltar-menu {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-top:10px;
  padding-bottom:10px

}

.voltar-menu p {
  margin-left: 10px;
}

</style>
