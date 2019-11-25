<template>
    <div id="plansza">
    <field v-for="n in 8" :fieldnumber="n-1" :fieldobject="fields[n-1]" :key="fields[n-1].name" :class="'field-h'"></field>
    <div style="clear:both"></div>
    <div class="row">
        <div id="leftfieldsgroup" style="width:5.1em;float:left">
        <field v-for="n in 5" :fieldnumber="26-n" :fieldobject="fields[26-n]" :key="fields[26-n].name" :class="'field-v'"></field>
        </div>
        <div class="centerblock"></div>
        <div id="rightfieldsgroup" style="width:4em;float:left">
            <field v-for="n in 5" :fieldnumber="n+7" :fieldobject="fields[n+7]" :key="fields[n+7].name" class="field-v"></field>
        </div>
    </div>
    <div style="clear:both"></div>
    <field v-for="n in 8" :fieldnumber="21-n" :fieldobject="fields[21-n]" :key="fields[21-n].name" :class="'field-h'"></field>

    <div style="clear:both"></div>
    <p></p>
</div>
</template>

<script>
import Field from './Field.vue'


export default {
    components:{
        Field
    },
    data(){
        return {

        }
    },
    methods:{

    },
    computed:{
        fields(){
            return this.$store.state.fields;
        }
    }
}

</script>
<style scoped>
    .field-h{
        border:1px black solid;
        position:relative;
        /* padding:30px; */
        width:5em;
        height:5em;
        float:left;
    }

    .field-v{
        border:1px black solid;
        width:5em;
        height:5em;
    }

    .centerblock{
        border:1px green solid;
        width:30.7em;
        height:25.5em;
        float:left;
        padding:0px;
        margin:0px;
    }

    .player{
        /* position:absolute; */
        font-size:12px;
        transition:1s
    }

    .player:hover{
        left:200px;
    }

    #fieldDialogue > p {
        margin:0px;
    }

    body{
        font-family: "Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    }

</style>
