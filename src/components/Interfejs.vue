<template>
    <div id="interfejs" style="float:left">
          <div style="font-weight:bold" v-if="endGameBool">Koniec gry! Wygrywa {{winner}}</div>  
          <div style="flex:20%" v-if="mainDialogueBool">
              <button @click="rollDice" v-if="!dicethrown">Rzut kością</button>
              <button @click="switchPlayer" v-if="endbool" class="margin-right:5px">koniec tury</button>
              <button v-if="surrenderbool" @click="surrender">Poddaj grę</button>
              <span>Kość: {{dice}}</span>
              <p>Aktualny gracz: <b :style="{color:currentPlayer.color}">{{currentPlayer.name}}</b> Kasa: {{currentPlayer.money}}</p>
          </div>
          <div v-if="fieldDialogueBool" id="fieldDialogue" style="border:1px black solid;padding:5px">
              <p>Nazwa działki:{{currentField.name}}</p>
              <p>Cena działki:{{currentField.price}}</p>
              <p>Właściciel: {{currentField.owner}} </span></p>
              <button @click="buy()" v-if="buybool">Kup działkę</button>
              <!-- <button  @click="startbet" v-if="buybool">Licytuj działkę</button> -->
              <!-- <button @click="buyHouse">Kup dom</button> -->

          </div>
          <licytacja v-if="betBool" @buy="function(a,b,c){buy(a,b,c)}"></licytacja>
          <dziennik></dziennik>
          <div style="position:fixed;right:20px;bottom:20px">random dice<input type="checkbox" v-model="randomDiceBool"> </div>
      </div>
</template>

<script>
import Licytacja from './Licytacja.vue';
import Dziennik from './Dziennik.vue';


export default {
    components:{Licytacja,Dziennik},
    data(){
        return {
            dice:0,
            dicethrown:false,
            fieldDialogueBool:true,
            teststring:'asdf',
            betBool:false,
            endbool:true,
            surrenderbool:false,
            endGameBool:false,
            winner:null,
            debt:0,
            debtBool:false,
            randomDiceBool:true
        }
    },
    methods:{
        surrender(){
            let player2;
              if(this.currentPlayer.name == 'red'){
                player2='blue'
            }else{
                player2='red'
            }
            this.endGameBool=true;
            this.winner=player2;
        },
        addLogEntry(arg) {
            this.$root.addLogEntry(arg);
        },
        rollDice(){
            if(this.dicethrown==true){
            return
            }
            if(this.randomDiceBool){
                this.dice = Math.floor(Math.random()*6+1);
            }else{
                this.dice = 1;
            }
            this.$root.addLogEntry(`gracz `+this.currentPlayer.name+' rzucił kością na '+this.dice)
            this.move(this.dice);
            this.dicethrown = true;
            if(this.currentPlayer.name !='agent'){
                this.endbool=true;
            }
        },
        switchPlayer(){
            if(this.debtBool){
                this.$root.addLogEntry('musisz uregulować długi zanim skończysz turę')
                return
            }
            this.$root.clearLog();
            this.endbool=false;
            this.dicethrown=false;
            this.surrendebool=false;
            this.$root.switchPlayer();
            this.$root.addLogEntry(`gracz ${this.currentPlayer.name} zaczyna turę`);
        },
        move(val){
            // this.currentPlayer +=val;
            let index = this.$root.players.findIndex((el)=>el.name == this.currentPlayer.name)
            console.log(this.$root.players[index]);
            this.$root.players[index].field += val;
            if(this.currentPlayer.field >= 26){
                this.$root.players[index].field = this.currentPlayer.field % 26
                this.$root.players[index].money+=200
                this.$root.addLogEntry(`gracz ${this.$root.currentPlayer.name} dostał 200 za przejście okrążenia`)
            }
            this.handleField();
        },
        handleField(){
        this.pay();
        this.agentAuto();
        },
        agentAuto(){
            if(this.currentPlayer.name!='agent'){
                this.betBool=false;
                return
            }
            if(this.currentField.price == 0){
                return
            }    

            if(this.owner != ''){
                this.$root.addLogEntry('działka zajęta nia ma co licytować');
                this.betBool=false;
                this.endbool=true;
                return
            }


            this.endbool=false;
            this.betBool=true;


        },
        pay(){
            console.log('pay');
            if (this.currentField.owner == this.currentPlayer.name){
                return
            }

            if(this.currentField.owner == ''){
                return
            }

            if(this.currentPlayer.name=='agent'){
                return
            }
            let player2,amount;



            if(this.currentPlayer.name == 'red'){
                player2='blue'
            }else{
                player2='red'
            }
            amount = this.currentField.price/5+parseInt(this.currentField.houses)*30;

             if(this.currentPlayer.money < amount){
                this.$root.addLogEntry(`graczowi ${this.currentPlayer.name} skończyła się kasa. Musisz sprzedać domki i dzałki, albo oddać w hipotekę, możesz też poddać grę `);
                this.surrenderbool=true;
                this.debt = amount;
                this.debtBool=true;
                return
            }
            this.currentPlayer.money -= amount;
            this.$root.addLogEntry(`gracz ${this.currentPlayer.name} płaci graczowi ${player2} ${amount} `)

        },
        buy(cost,player,mode){
            if (this.owner != ''){return}

            if(!cost){cost = this.currentField.price}

            if(!player){player = this.currentPlayer;}

            if(!mode){mode='default'}

            if(player.money < cost){
                this.$root.addLogEntry('nie stać cię na zakup tej działki');
                return
            }
            this.currentField.owner = player.name;
            player.money -= cost;
            this.betBool=false;


            if(mode=='bet'){
                this.endbool=true;
            }else{
                this.$root.addLogEntry(`gracz ${player.name} kupił działkę ${this.currentField.name} za ${cost}`)
            }
        },
        buyHouse(){
            if(this.checkGroups(this.currentField.district,this.currentPlayer.name)){
                this.currentField.houses +=1;
            }
            console.log(this.checkGroups(this.currentField.district,this.currentPlayer.name));
        },

        checkGroups(district,player){
            let pola = this.$root.fields.filter((el)=>el.district==district).length;
            let polagracza = this.$root.fields.filter((el)=>el.district==district).filter((el)=>el.owner==player).length;

            if(pola ==polagracza ){
                return true
            }else{
                return false
            }
        }
    },
    computed:{
        currentPlayer(){
            return this.$root.currentPlayer
        },
        currentField(){
            return this.$root.currentField
        },
        player2(){
            return this.$root.player2
        },
        buybool(){
            return this.owner !='' || this.currentPlayer.name=='agent' || this.currentField.price == 0 ? false:true;
        },
        test(){

        },

        players(){
            return this.$root.players;
        },
        currentField(){
            return this.$root.currentField;
        },
        owner(){
            return this.currentField.owner;
        },
        mainDialogueBool(){
            return true
        }
    }
}
</script>

<style scoped>
#interfejs{
    /* display:flex;justify-content:space-between;float:left; */
}

</style>
