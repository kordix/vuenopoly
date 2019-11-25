<template>
    <div class="">
        <p v-for="entry in log" style="font-size:10px">-{{entry}}</p>
    </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {

        }
    },
    methods: {
        addLogEntry(arg) {
            this.$store.dispatch('addLogEntry', arg);
        }
    },
    mounted() {
        this.addLogEntry('Gra rozpoczęta!');
    },
    computed: {
        log() {
            return this.$store.state.log
        }
    }
}
</script>

<style>
</style>
