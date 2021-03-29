<template>
  <div id="attendence-div">
    <menu-component />
    <div v-if="state.loginState" class="omintPage">
      <a v-on:click="getAtendimento" class="begin-attendance">
        <p class="withoutPadding">Iniciar novo atendimento</p>
      </a>
    </div>
    <div v-if="!state.loginState" class="omintPage-disabled">
      <button class="begin-attendance omintPage-disabled" disabled>
        <p class="withoutPadding">Iniciar novo atendimento</p>
      </button>
    </div>
    <div v-if="state.loginState && state.atendimento" class="bilhete-container">
      <button
        v-for="(item, index) in state.atendimento"
        v-bind:key="index"
        v-on:click="handleChangePage"
        class="bilhete-box"
      >
        <p class="numero-proposta">Bilhete nº 1234566789987654</p>
        <p class="numero-proposta">Protocolo nº {{item.id_atendimento}}</p>
        <p class="dados-proposta">Demanda: Solicitação</p>
        <p class="dados-proposta">Assunto: Atendimento viagem app</p>
        <p class="dados-proposta">Status: <strong>Em andamento</strong></p>

        <p class="data-proposta">09/02/2021 15:15</p>
      </button>
    </div>
    <inModal v-show="isInModalVisible" @close="closeInModal"/>
    <modalLogin v-show="isModalVisible"
      @close="closeModal"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Menu from "../components/Menu.vue";
import Modal from "../components/Modal.vue";
import inModal from '../components/InModal.vue';

import store from "../store/index";

export default Vue.extend({
  name: "Atendimento",
  components: {
    "menu-component": Menu,
    "modalLogin": Modal,
    "inModal": inModal
  },
  data() {
    return {
      isOpen: true,
      state: store.state,
      isModalVisible: false,
      inModal: false,
      isInModalVisible: false
    };
  },
  created(){
    if(!this.state.loginState){
      this.isModalVisible = true;
    }
  },

  methods: {
    handleChangePage() {
      this.$router.replace({ path: "/chat" });
    },
    closeModal() {



      setTimeout(() => {
        this.isModalVisible = false;


      }, 2000)

      setTimeout(() => {
        this.openInModal();
      }, 2000)



    },
    closeInModal(){
      this.isInModalVisible = false
    },
    openInModal(){
      this.state.loginState ? this.isInModalVisible = true : this.isModalVisible = true
    },

    async getAtendimento(){
      console.log('atendimento')
      await store.commit("atendimento");
    }
  },
});
</script>

<style scoped>
.withoutPadding{
  padding-top:0px !important;
}
.omintPage {
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  background: #000;
}

.begin-attendance {
  background: #01316b;
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.begin-attendance:hover {
  opacity: 0.9;
}

.begin-attendance p {
  color: #fff;
  font-weight: bold;
  padding-top: 15px;
  font-size: 14px;
}

.bilhete-container {
  margin: 0px 40px;
}

.bilhete-box {
  border-radius: 5px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  padding: 15px;
  width: 100%;
  margin-top: 15px;
  text-align: left;
  border: 0;
}

.numero-proposta {
  color: #00316b;
  font-size: 16px;
  margin-bottom: 15px !important;
  font-weight: bold;
  margin: 0px !important;
  padding: 0px !important;
}

.dados-proposta {
  color: grey;

  margin: 0px;
  font-size: 14px;
}

.botao {
  width: 100%;
  text-align: center;
  padding: 10px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  background-color: #286bbb;
  transition: opacity 0.2s;
}

.botao:hover {
  opacity: 0.7;
}

.data-proposta {
  color: #00316b;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
}

.omintPage-disabled {

  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;
}


</style>
