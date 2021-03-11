<template>
  <div  class="modal-backdrop">
    <div class="modal">
        <h1>Login</h1>
        <p class="pStyle">CPF</p>
        <input class="inputStyle" v-model="cpf" placeholder="Digite seu CPF">
        <p class="pStyle">Data de inicio da viagem</p>
        <date-picker class="dateStyle" v-model="dataViagem" :formatter="momentFormat" :lang="lang"></date-picker>
        <button class="buttonStyle" @click="submitLogin">Entrar</button>
    </div>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import 'vue2-datepicker/locale/pt-br';
  import store from "../store/";
  import  moment from "moment";
  export default {
    name: 'modal',
    components: {
      DatePicker,
    },
    data(){
      return {
        dataViagem: null,
        cpf: null,
        state: store.state,
        momentFormat: {
      //[optional] Date to String
      stringify: (date) => {
        return date ? moment(date).format('DD/MM/YYYY') : ''
      },
      //[optional]  String to Date
      parse: (value) => {
        return value ? moment(value, 'DD/MM/YYYY').toDate() : null
      },
    }
      }
    },

    methods: {
      async submitLogin(){
        const data = await moment(this.dataViagem).format('YYYY/MM/DD')
        this.state.userData.data = data
        const cpf = await this.cpf
        this.state.userData.cpf = cpf

        await store.commit("login");

        const isUserOn = this.state.loginState;
        this.close()

      },
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  h1{
    color:#00316B
  }
  .inputStyle{
    width: 100%;
    text-indent: 10px;
    border-radius: 5px;
    border:1px solid #ccc;
    height: 50px;
    padding:0px
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: absolute;
  }

  .modal {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    background: white;
    padding:20px 10px;
    border-radius:10px;
    min-width: 70%;

  }

  @media only screen and (min-width: 600px) {
    .modal {
      min-width: 40%;
      z-index: 0;
    }
  }

  @media only screen and (max-width: 425px) {
    .modal {
      min-width: 75%;

    }
  }

  .pStyle{
    font-size: 21px;
  }

  .dateStyle{
    width: 100%;
  }

  .mx-input {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 1.4;
    /* color: #555; */
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    padding: 15px 0px 15px 0px;
    text-indent: 10px;
    border-radius: 5px;
    border-color: #D9D9D9;
    border-style: solid;
}

.buttonStyle{
  padding: 15px;
  border-width: 0px;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.25);
  margin-top:50px;
  margin-left: 20px;
  margin-right:20px;
  background:#00316B;
  border-radius: 5px;
  color:white;
  font-size:18px;
}

.inputStyle:focus{
   border: 1px solid #ccc !important;
}
.mx-input:focus{
  border: 1px solid #005ECC;
}
.mx-input:hover{
   border: 2px solid #ccc;
}

</style>
