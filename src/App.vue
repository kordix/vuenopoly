<template>
  <div id="app">
      <plansza style="float:left;margin-left:40px;margin-right:30px"></plansza>
      <interfejs></interfejs>
      <!-- <div class="" style="float:left;width:150px;border:1px black solid">
          siemano
      </div> -->
    <!-- <div class="">
              <p style="text-align:left">to do fafdsfsd</p>
            <ul style="text-align:left">
                <li>ceny opłat, domy</li>
                <li>money -</li>
                <li>informacje o działce</li>
                <li>agent</li>
                <li>elektrownie, poukładanie, parking, więzienie np.</li>
                <li>mechanizm elektrowni, lotniska</li>
                <li>stylizowanie</li>
                <li>asfsdffsd</li>
                <li>podświetlanie aktualnego pola</li>
            </ul>
    </div> -->

  </div>
</template>

<script>
import Plansza from './components/Plansza.vue';
import Field from './components/Field.vue';
import Interfejs from './components/Interfejs.vue';





export default {
  name: 'app',
  components: {
    Plansza,Field,Interfejs
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
