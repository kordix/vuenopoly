<template>
    <div style="border:1px black solid;margin-top:20px;padding:5px" >Licytacja:
        <input type="number" min="0" step="10" style="width:50px" v-model="betprice" @input="validate">
        <button @click="nextPlayerBet">Dalej</button>
        <button @click="passBuyEvent">Pas</button>
       <p>Aktualnie licytuje: <span :style="{color:currentPlayerBet.color}">{{currentPlayerBet.name}} </span></p>
    </div>


</template>

<script>
export default {
    data(){
        return{
            betprice:0,
            betpriceconfirmed:0
        }
    },
    methods:{
        validate(){
            if(parseInt(this.currentPlayerBet.money) < parseInt(this.betprice)){
                this.betprice = this.currentPlayerBet.money;
            }


            if(parseInt(this.betprice) < parseInt(this.betpriceconfirmed)){
                this.betprice = this.betpriceconfirmed;
            }
            
            if(parseInt(this.currentPlayerBet.money) < parseInt(this.betpriceconfirmed)) {
                this.$root.addLogEntry(`gracz ${this.player2} przelicytował gracza ${this.currentPlayer.name}`)
                this.passBuyEvent();
            }


        },
        nextPlayerBet(){
                  if(this.betprice == this.betpriceconfirmed){
                 console.log(this.betpriceconfirmed);
                this.$root.addLogEntry('musisz zaproponować większą cene!');
                return false
            }

            this.betpriceconfirmed=this.betprice;
            this.$root.switchPlayerBet();
            
        },
        passBuyEvent(){
            let winner ='';
            if(this.currentPlayerBet.name=='red'){
                winner='blue';
            }else{
                winner='red'
            }

            let player = this.$root.players.find((el)=>el.name==winner)

            if(player.money < this.betpriceconfirmed){
                this.$root.addLogEntry('nie stać cię na zakup tej działki');
                return
            }

            this.$emit('buy',this.betpriceconfirmed,player,'bet');
            this.$root.addLogEntry(winner+' wygrywa licytację na działkę '+this.currentField.name+' za '+this.betpriceconfirmed );

        }
    },
    computed:{
        currentPlayer(){
            return this.$root.currentPlayer;
        },
         currentPlayerBet(){
            return this.$root.currentPlayerBet;
        },
         currentField(){
            return this.$root.currentField;
        },
        player2(){
        if(this.currentPlayerBet.name=='red'){
            return 'blue';
        }else{
            return 'red'
        }
    }
    },
    mounted(){
        this.betprice=this.currentField.price
    }

}
</script>

<style scoped>
</style>
