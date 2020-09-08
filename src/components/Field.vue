<template>
    <div style="position:relative" @click="setPreviewField" class="field" :class="{highlight:fieldnumber==currentPlayer.field}">
        <div class="headerdiv" :style="{background:fieldObjectColor}"></div> <span :style="{color:$root.fields[fieldnumber].fontcolor}" style="font-weight:bold;text-align:center;display:block;height:18px; margin-top:2px;font-size:12px"> {{$parent.fields[fieldnumber].name  }} </span>
        <div style="display:flex;flex-wrap:wrap">
        <div  v-for="player in  $root.players" v-if="player.field==fieldnumber" class="player" style="margin:1px" :style="{color:player.color}">{{player.name}}</div>
        </div>
        <p style="position:absolute;top:37px;"><i v-for="num in fieldobject.houses" class="fas fa-home" style="font-size:10px"></i></p>
        <span style="font-size:0.5em;position:absolute;bottom:0px;left:0px;">Owner: <span  :style="{color:$parent.fields[fieldnumber].owner }">{{$parent.fields[fieldnumber].owner}}</span></span>

    </div>
</template>

<script>
export default {
    props:['fieldnumber','fieldobject'],
    data(){
        return {

        }
    },
    methods:{
        setPreviewField(){
            this.$root.setPreviewField(this.fieldobject);
            this.$root.showPreview = true;
        }
    },
    computed:{
        fields(){
            return this.$root.field;
        },
        showPreview(){
            return this.$root.showPreview
        },
        currentPlayer(){
            return this.$root.currentPlayer;
        },
        fieldObjectColor(){
            if (typeof(this.fieldobject.color) == 'undefined'){
                return '#999'
            }else {
                return this.fieldobject.color
            }
        }

    }

}
</script>

<style scoped>
.headerdiv{
    position:absolute;width:100%;height:20px;background:#999;z-index:-1000
}

.highlight{
    background:rgba(0.9,0,0,0.1);
}

.field{
    transition:.3s;
}

.field:hover{
    opacity:0.8
}


</style>
