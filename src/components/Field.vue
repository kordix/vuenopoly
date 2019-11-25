<template>
    <div style="position:relative">
        <div class="headerdiv" :style="{background:fieldObjectColor}"></div> <span :style="{color:$parent.fields[fieldnumber].fontcolor}" style="font-weight:bold;text-align:center;display:block;height:18px; margin-top:2px;font-size:12px"> {{$parent.fields[fieldnumber].name  }} </span>
        <div style="display:flex;flex-wrap:wrap">
        <div  v-for="player in  $store.state.players" v-if="player.field==fieldnumber" class="player" style="margin:1px" :style="{color:player.color}">{{player.name}}</div>
        </div>
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
    computed:{
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

<style>
.headerdiv{
    position:absolute;width:100%;height:20px;background:#999;z-index:-1000
}


</style>
