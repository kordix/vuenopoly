<template>
    <div style="border:1px black solid;margin-top:20px;padding:5px" >Licytacja:
        <input type="number" min="0" step="10" style="width:50px" v-model="betprice" @input="validate">
        <button @click="nextPlayerBet">Dalej</button>
        <button @click="passBuyEvent">Pas</button>
       <p>Aktualnie licytuje: <span :style="{color:currentPlayerBet.color}">{{currentPlayerBet.name}} </span></p>
    </div>


</template>

<script>
import { mapGetters } from 'vuex';



export default {
    data(){
        return{
            betprice:0,
            betpriceconfirmed:null
        }
    },
    methods:{
        validate(){

            if(parseInt(this.currentPlayerBet.money) < parseInt(this.betpriceconfirmed)) {
                this.$store.dispatch('addLogEntry',`gracz ${this.player2} przelicytował gracza ${this.currentPlayer.name}`)
                this.passBuyEvent();
                return
            }

            if(parseInt(this.currentPlayerBet.money) < parseInt(this.betprice)){
                this.betprice = this.currentPlayerBet.money;
            }


            if(parseInt(this.betprice) < parseInt(this.betpriceconfirmed)){
                this.betprice = this.betpriceconfirmed;
            }
        },
        nextPlayerBet(){
            this.betpriceconfirmed=this.betprice;
            this.$store.dispatch('switchPlayerBet');
            this.validate();
        },
        passBuyEvent(){
            let winner ='';
            if(this.currentPlayerBet.name=='red'){
                winner='blue';
            }else{
                winner='red'
            }

            let player = this.$store.state.players.find((el)=>el.name==winner)

            if(player.money < this.betpriceconfirmed){
                this.$store.dispatch('addLogEntry', ' nie stać cię na zakup tej działki');
                return
            }

            this.$emit('buy',this.betpriceconfirmed,player,'bet');
            this.$store.dispatch('addLogEntry', winner+' wygrywa licytację na działkę '+this.currentField.name+' za '+this.betpriceconfirmed );

        }
    },
    computed:{
        ...mapGetters([
      'currentPlayer','currentPlayerBet','currentField'
    ]),
    player2(){
        if(this.currentPlayerBet.name=='red'){
            return 'blue';
        }else{
            return 'red'
        }
    }
    }
}
</script>

<style scoped>
</style>
