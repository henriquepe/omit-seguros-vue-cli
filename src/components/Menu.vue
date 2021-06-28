<template>
  <div class="menu-component">
    <div class="menu">
      <div class="padding-Style"></div>
      <img
        class="padding-Style logo-seleto"
        src="../assets/omint-viagem.png"
        alt="Seleto viagem"
      />
      <a
        @click.prevent="showModal('login')"
        v-if="this.state.nomeUsuario"
        class="login-button padding-Style"
      >
        {{ this.state.nomeUsuario }}
      </a>

      <a
        @click.prevent="showModal('login')"
        v-if="!this.state.nomeUsuario"
        class="login-button padding-Style"
      >
        Login
      </a>
    </div>

    <div class="menu-list">
      <!-- <a @click.prevent="showModal('meubilhete')">Meu Bilhete</a>
      <a @click.prevent="showModal('atendimento')">Atendimento</a> -->
    </div>
    <modalLogin v-show="isModalVisible" @close="closeModal" />

    <callModal v-show="callModal" />

    <div class="abrir-atendimento">
      <div @click="atendimentos = !atendimentos" class="quadrado-menor">
        <p>Iniciar novo atendimento</p>
        <strong>Médico/Odontológico</strong>
      </div>
      <transition name="fade">
        <div
          v-bind:class="
            atendimentos
              ? 'conteudo-atendimento'
              : 'conteudo-atendimento-reverso'
          "
        >
          <a
            href="tel:08007273002"
            v-bind:class="
              atendimentos
                ? 'botao-atendimento-estilo'
                : 'botao-atendimento-estilo-reverso'
            "
          >
            <p>No Brasil</p>
            <p>0800 727 3002</p>
          </a>
          <a
            href="tel:00551121324278"
            v-bind:class="
              atendimentos
                ? 'botao-atendimento-estilo'
                : 'botao-atendimento-estilo-reverso'
            "
          >
            <p>No Exterior</p>
            <p>00 55 11 21324278</p>
          </a>
          <a
            v-on:click="showCallModal"
            v-bind:class="
              atendimentos
                ? 'botao-atendimento-estilo'
                : 'botao-atendimento-estilo-reverso'
            "
          >
            <div style="display: flex; flex-direction: column;">
              <p>No Brasil<br />No Exterior</p>
            </div>
            <p>Quero que me ligue</p>
          </a>
          <a
            v-on:click="goToChat"
            v-bind:class="
              atendimentos
                ? 'botao-atendimento-estilo'
                : 'botao-atendimento-estilo-reverso'
            "
          >
            <div style="display: flex; flex-direction: column;">
              <p>No Brasil<br />No Exterior</p>
            </div>
            <p>Por mensagem</p>
          </a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Modal from "./Modal";
import CallModal from "./CallModal";
import store from "../store/";

export default Vue.extend({
  name: "Menu",
  data() {
    return {
      pageOn: "",
      state: store.state,
      isModalVisible: false,
      atendimentos: false,
      callModal: false,
    };
  },
  components: {
    modalLogin: Modal,
    callModal: CallModal,
  },

  methods: {
    getUsernameFromStore() {
      setTimeout(() => {
        return store.state.nomeUsuario;
      }, 2000);
    },

    showModal(value) {
      if (value === "meubilhete") {
        this.$router.push("/");
      } else if (value === "atendimento") {
        this.$router.push("/atendimento");
      } else if (value === "novidades") {
        this.$router.push("novidades");
      } else if (value === "login") {
        if (!this.state.loginState) {
          this.isModalVisible = true;
        }
      }
    },

    showCallModal() {
      this.callModal = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    goToChat() {
      store.commit("atendimento");

      this.$router.replace({ path: "/chat" });
    },
  },
});
</script>

<style scoped>
.padding-Style {
  width: 33%;
}
.menu-component {
  padding: 0px 50px;
  background: #00316b;
  -webkit-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 35px -9px rgba(0, 0, 0, 0.25);
  margin-bottom: 10px;
}

.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10px;
  padding-top: 20px;
}

.logo-seleto {
  max-width: 10%;
  text-align: center;
  align-items: center;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 16px;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: white;
}

#question-circle-icon {
  margin-right: 5px;
  font-size: 20px;
}

.menu-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
}

.menu-list a {
  margin: 0px;
  text-decoration: none;
  color: white;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
}

.menu-list a:hover {
  border-bottom: 3px solid orange;
}

@media only screen and (max-width: 425px) {
  .logo-seleto {
    max-width: 80% !important;
  }
}

.abrir-atendimento {
  width: 100%;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: fixed;
  margin-left: -50px;
}

.abrir-atendimento .quadrado-menor {
  cursor: pointer;
  background: #00316b;
  width: 70%;
  height: 80px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-width: 1px;
  border-color: #000;
}

.abrir-atendimento .quadrado-menor p {
  color: #fff;
  font-size: 14px;
}

.abrir-atendimento .quadrado-menor strong {
  color: #fff;
  font-size: 15px;
}

.abrir-atendimento .conteudo-atendimento {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #00316b;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: 0.8s;
}

.botao-atendimento-estilo {
  display: flex;
  justify-content: space-between;
  padding: 0px 15px;
  width: 70%;
  height: 70px;
  background: #a19062;
  border: 1px solid transparent;
  border-radius: 5px;
  margin-bottom: 15px;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
}

.botao-atendimento-estilo p {
  color: #fff;
  font-size: 16px;
  margin: 0;
}

.botao-atendimento-estilo-reverso {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  width: 80%;
  background: #a19062;
  border: 1px solid transparent;
  border-radius: 5px;
  margin-bottom: 15px;

  overflow: hidden;
  --prefix-animation: slide 1s ease 7.5s forwards;
}

.conteudo-atendimento-reverso {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0;
  background: #00316b;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  overflow: hidden;
  --prefix-animation: slide 1s ease 7.5s forwards;
}

@-prefix-keyframes slide {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
</style>
