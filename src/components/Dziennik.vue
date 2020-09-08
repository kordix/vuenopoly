<template>
    <div class="">
        <p v-for="entry in log" style="font-size:10px">-{{entry}}</p>
    </div>

</template>

<script>

export default {
    data() {
        return {

        }
    },
    methods: {
        addLogEntry(arg) {
            this.$root.addLogEntry(arg)
        }
    },
    mounted() {
        this.addLogEntry('Gra rozpoczęta!');
    },
    computed: {
        log() {
            return this.$root.log
        }
    }
}
</script>

<style>
</style>
