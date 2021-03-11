<template>
  <div class="chat-container">

    <div>
      <div class="chat-header">
        <a class="voltar-menu" v-on:click="handleChangePage">Voltar</a>
      </div>

      <div class="chat-proposta">
        <p>Número: {{this.state.atendimento[0].id_atendimento}}</p>
      </div>
    </div>

    <!-- <div class="conversa-chat-atendente">
      <div class="mensagem-atendente">
        <strong class="nome-chat">Atendente Vanderlei</strong>
        <p class="mensagem-chat">geo localização</p>
        <p class="data-chat">09/02/2021 15:15</p>
      </div>


      <div class="mensagem-cliente">
        <strong class="nome-chat">Você</strong>
        <p class="mensagem-chat">geo localização</p>
        <p class="data-chat">09/02/2021 15:15</p>
      </div>


      <div class="mensagem-atendente">
        <strong class="nome-chat">Atendente Vanderlei</strong>
        <p class="mensagem-chat">geo localização</p>
        <p class="data-chat">09/02/2021 15:15</p>
      </div>

      <div class="mensagem-cliente">
        <strong class="nome-chat">Você</strong>
        <p class="mensagem-chat">geo localização</p>
        <p class="data-chat">09/02/2021 15:15</p>
      </div>
    </div> -->

    <div class="input-chat">
      <input placeholder="Digite sua mensagem" type="text">
      <button>Enviar</button>
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import store from "../store/index";


  export default Vue.extend({
  name: "Chat",
  data() {
    return {
      state: store.state,
    };
  },


  methods: {
    handleChangePage(){
      this.$router.replace({ path: "/" });
    }
  },


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

  padding: 10px;

  margin-right: 30px;

  margin-top: 20px;

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
