<template>
  <div>
    <menu-component />
    <div class="attendence-div"><p>Nenhum registro encontrado</p></div>
    <modalLogin v-show="isModalVisible"
      @close="closeModal"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Menu from "../components/Menu.vue";
import store from "../store/";
import { verBilhete } from "../utils/api";
import Modal from "../components/Modal.vue";

export default Vue.extend({
  name: "Novidades",
  components: {
    "menu-component": Menu,
    "modalLogin": Modal
  },
  created(){
    console.log('created')
    if(!this.state.loginState){
      this.isModalVisible = true;
      console.log(this.isModalVisible)
    }
  },
  methods: {
    closeModal() {
        this.isModalVisible = false;
    },
  },
  data() {
    return {
      state: store.state,
      isModalVisible: false,
    };
  },
});
</script>

<style scoped>
.attendence-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.attendence-div p {
  margin-top: 10px;
}
</style>
