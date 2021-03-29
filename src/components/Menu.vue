<template>
  <div class="menu-component">
    <div class="menu">
      <div class="padding-Style"></div>
      <img
        class="padding-Style logo-seleto"
        src="../assets/omint-viagem.png"
        alt="Seleto viagem"
      />
      <a @click.prevent="showModal('login')" v-if="this.state.nomeUsuario" class="login-button padding-Style">
        {{this.state.nomeUsuario}}
      </a>

      <a @click.prevent="showModal('login')" v-if="!this.state.nomeUsuario" class="login-button padding-Style">
        Login
      </a>
    </div>

    <div class="menu-list">
      <a @click.prevent="showModal('meubilhete')">Meu Bilhete</a>
      <a @click.prevent="showModal('atendimento')">Atendimento</a>
    </div>
      <modalLogin v-show="isModalVisible"
      @close="closeModal"/>
  </div>
</template>

<script>
import Vue from "vue";
import Modal from "./Modal";
import store from "../store/";

export default Vue.extend({
  name: "Menu",
  data() {
    return {
      pageOn: "",
      state: store.state,
      isModalVisible: false,
    }
  },
  components: {
    "modalLogin": Modal
  },

  methods: {
    showModal(value) {
      if(value === 'meubilhete'){
        this.$router.push('/');
      }
      else if(value === 'atendimento'){
        this.$router.push('/atendimento');
      }
      else if(value === 'novidades'){
        this.$router.push('novidades');
      }
      else if(value === 'login'){
        if(!this.state.loginState){
          this.isModalVisible = true;
        }
      }
    },

    closeModal() {
        this.isModalVisible = false;
    }
  },
});
</script>

<style scoped>
.padding-Style {
  width: 33%;
}
.menu-component {
  padding: 0px 50px;
  background:#00316B;
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
  max-width: 40%;
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
  color:white
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
</style>
