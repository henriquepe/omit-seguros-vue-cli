<template>
  <div v-if="modal" class="modal-backdrop">
    <div class="modal">
      <h1>Quero que me ligue</h1>
      <p class="pStyle">Telefone completo</p>
      <input class="inputStyle" v-model="telefone">
        <div id="erro">
        <p v-show="erro">{{erro}}</p>
    </div>
      <div v-show="loader" id="loader">
        <vue-loaders-ball-beat color="#00316B"></vue-loaders-ball-beat>
      </div>
      <button v-bind:disabled="telefone" class="buttonStyle" @click="submitCall">Enviar</button>
      <button class="cancelButtonStyle" @click="close">Cancelar</button>
    </div>
  </div>
</template>

<script>
  import 'vue-loaders/dist/vue-loaders.css';
  import 'vue2-datepicker/index.css';
  import 'vue2-datepicker/locale/pt-br';
  import store from "../store/";
  import  moment from "moment";
  import Vue from 'vue';
  import VueLoaders from 'vue-loaders';


  Vue.use(VueLoaders);

  export default {
    name: 'modal',
    data(){
      return {
        dataViagem: null,
        telefone: null,
        state: store.state,
        erro: '',
        loader: false,
        modal: true,
        sessionid: '',
        momentFormat: {
      //[optional] Date to String
      stringify: (date) => {
        console.log('data:' + date)

        console.log('parsedData: ' + moment(date).format('DD/MM/YYYY'))
        return date ? moment(date).format('DD/MM/YYYY') : ''
      },
      //[optional]  String to Date
      parse: (value) => {
        console.log('value:' + value)
        return value ? moment(value, 'DD/MM/YYYY').toDate() : null
      },
    }
      }
    },

    methods: {
      async submitCall(){
        console.log("telefone",this.telefone);
        this.loader = true;
      },
      close() {
        this.modal = false;
      },

    },
  };
</script>

<style>
  h1{
    color:#00316B;
  }

  #erro{
    font-size: 14px;
    margin: 0 auto;
    width: 60%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  #erro p {
    width: 100%;
    color: red;
    font-weight: bold;
    padding-top: 10px;

  }

  #loader {
    margin-top: 40px;
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
    z-index: 10 !important;
    justify-content: center;
    align-items: center;
  }

  .modal {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    background: white;
    padding:20px;
    border-radius:10px;
    width: 370px;
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
.cancelButtonStyle{
  padding: 15px;
  border-width: 1px;
  border-color: #00316B;
  -webkit-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.25);
  -moz-box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.25);
  margin-top:50px;
  margin-left: 20px;
  margin-right:20px;
  background:transparent;
  border-radius: 5px;
  color:#00316B;
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
