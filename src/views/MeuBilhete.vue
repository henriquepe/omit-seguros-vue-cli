<template>
  <div id="attendence-div">
    <menu-component />
    <div v-if="!this.state.loginState" class="ticket-div">
      <p>Nenhum Bilhete Localizado.</p>
    </div>
    <div
      class="bilhete-container"
      v-if="this.state.loginState && this.state.tickets"
    >
      <h6>{{ this.state.nome }}</h6>
      <div
        style="width:90%"
        v-for="(item, index) in state.tickets"
        v-bind:key="index"
      >
        <div>
          <div class="bilhete-box">
            <p class="numero-proposta">nº {{ item.bilhete }}</p>
            <p class="dados-proposta">PLANO: {{ item.Producto }}</p>
            <p class="dados-proposta">
              VIGÊNCIA:
              {{ moment(item.dataInicioViagem).format("DD/MM/YYYY") }}
            </p>

            <button
              type="button"
              class="botao"
              v-on:click="abrirBilhete(index)"
            >
              Ver detalhes do bilhete
            </button>
          </div>
        </div>
      </div>
    </div>
    <inModal v-show="isInModalVisible" @close="closeInModal" />
    <modalLogin v-show="isModalVisible" @close="closeModal" />
  </div>
</template>

<script lang="ts">
interface BilheteProps {
  bilhete: string;
  numeropassageiro: number;
}

import Vue from "vue";
import Menu from "../components/Menu.vue";
import store from "../store/";
import inModal from "../components/InModal.vue";
import Modal from "../components/Modal.vue";
import moment from "moment";

export default Vue.extend({
  name: "Meu Bilhete",
  components: {
    "menu-component": Menu,
    modalLogin: Modal,
    inModal: inModal,
  },
  created() {
    if (!this.state.loginState) {
      this.isModalVisible = true;
      console.log(this.state);
    }
  },
  methods: {
    abrirBilhete: async function(id: number) {
      //const arrayValue = (store.state.arrayValue = value);
      //await verBilhete(store.state);
      console.log(id);

      if (this.state.tickets) {
        const bilheteIndex = (this.state.tickets[
          id
        ] as unknown) as BilheteProps;
        console.log(bilheteIndex);
        const urlBilhete = `http://srvseg-homolog.omintseguroviagem.com.br:7220/${bilheteIndex.bilhete}0${bilheteIndex.numeropassageiro}.pdf`;
        console.log(urlBilhete);
        setTimeout(() => window.open(urlBilhete), 1000);
      }
    },
    closeModal() {
      setTimeout(() => {
        this.isModalVisible = false;
      }, 2000);

      setTimeout(() => {
        this.openInModal();
      }, 2000);
    },
    closeInModal() {
      this.isInModalVisible = false;
    },
    openInModal() {
      this.state.loginState
        ? (this.isInModalVisible = true)
        : (this.isModalVisible = true);
    },
  },

  data() {
    return {
      state: store.state,
      tickets: "",
      urlTicket: "",
      moment: moment,
      isModalVisible: false,
      inModal: false,
      isInModalVisible: false,
    };
  },
  // updated: function() {
  //   console.log(this.urlTicket);
  // }
});
</script>

<style scoped>
.ticket-div {
  display: flex;

  align-items: center;
  justify-content: center;
}

h6 {
  font-size: 18px;
  color: #00316b;
  font-weight: bold;
}

.ticket-div p {
  margin-top: 10px;
  font-weight: bold;
}

.bilhete-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.bilhete-box {
  border-radius: 5px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  padding: 15px;
  margin-top: 15px;
}

.numero-proposta {
  color: #00316b;
  font-size: 16px;
  margin-bottom: 15px !important;
  font-weight: bold;
}

.dados-proposta {
  color: grey;
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
  background-color: #00316b;
  transition: opacity 0.2s;
}

.botao:hover {
  opacity: 0.7;
}

.a {
  color: white;
}
</style>
