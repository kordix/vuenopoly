<template>
    <div style="width:300px;margin:auto">
    <div style="border:1px black solid;padding:10px;width:300px;position:relative;cursor:pointer"  v-if="previewField.name && showPreview">
              <p >Nazwa działki:{{previewField.name}}</p>
              <p>Cena działki:{{previewField.price}}</p>
              <p>Właściciel: {{previewField.owner}} </span></p>
              <button @click="buyHouse()" v-if="houseBool">Kup domek</button>
              <!-- <button  @click="startbet" v-if="buybool">Licytuj działkę</button> -->
              <p class="closeicon" style="position:absolute;right:20px;top:20px" @click="switchPreview">x</p>
    </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            show:true,
            houseBool:false

        }
    },
    watch:{
        previewField:{
            deep:true,
            handler(){
                this.checkHouseBool();
            }
             
        }
    },
    computed:{
        previewField(){
            return this.$root.previewField
        },
        showPreview(){
            return this.$root.showPreview;
        },
        currentPlayer(){
            return this.$root.currentPlayer
        }
    },
    mounted(){

    },
    methods:{
        checkHouseBool(){
                console.log('watch');

            if(this.checkGroups(this.previewField.district,this.currentPlayer.name)){
                this.houseBool = true;
            }else{
                this.houseBool=false;
            }   
        },
        switchPreview(){
            this.$root.showPreview = !this.$root.showPreview;
        },
           buyHouse(){
            if(this.checkGroups(this.previewField.district,this.currentPlayer.name)){
                this.previewField.houses +=1;
                this.$root.currentPlayer.money -=100;
            }
        },
        checkGroups(district,player){
            let pola = this.$root.fields.filter((el)=>el.district==district).length;
            let polagracza = this.$root.fields.filter((el)=>el.district==district).filter((el)=>el.owner==player).length;
            console.log(pola);
            console.log(polagracza);
            if(pola ==polagracza ){
                return true
            }else{
                return false
            }
        }
        
    }
}
</script>

<style scoped>
.closeicon:hover{
    color:red;
}


</style>