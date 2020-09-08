import Vue from 'vue'
import App from './App.vue'
Vue.config.devtools = true

Vue.config.productionTip = true
Vue.config.devtools = true

new Vue({
  data: {
    fields: [
      { name: 'start', price: 0, owner: '' },
      { name: 'kam. potok', price: '100', owner: '', group: 'districts', district: 'sopot', color: '#AA5577', fontcolor: 'white' },
      { name: 'wyścigi', price: '100', owner: '', group: 'districts', district: 'sopot', color: '#AA5577', fontcolor: 'white' },
      { name: 'rębiechowo', price: '100', owner: '', group: 'lotniska', color: '#AACCEE', fontcolor: 'black' },
      { name: 'witomino', price: '100', owner: '', group: 'districts', district: 'gdynia', color: 'blue', fontcolor: 'white' },
      { name: 'karwiny', price: '100', owner: '', group: 'districts', district: 'gdynia', color: 'blue', fontcolor: 'white' },
      { name: 'mały kack', price: '100', owner: '', group: 'districts', district: 'gdynia', color: 'blue', fontcolor: 'white' },
      { name: 'parking1', price: '100', owner: '', group: 'inne', fontcolor: 'black' },
      { name: 'gdańsk', price: '100', owner: '', group: 'districts', district: 'gdańsk', color: 'green', fontcolor: 'white' },
      { name: 'siedlce', price: '100', owner: '', group: 'districts', district: 'gdańsk', color: 'green', fontcolor: 'white' },
      { name: 'stogi', price: '100', owner: '', group: 'districts', district: 'gdańsk', color: 'green', fontcolor: 'white' },
      { name: 'chopina', price: '100', owner: '', group: 'lotniska', color: '#AACCEE', fontcolor: 'black' },
      { name: 'PEWIK', price: '100', owner: '', group: 'instalacje', color: '#A9DFBF', fontcolor: 'black' },
      { name: 'parking2', price: '100', owner: '', fontcolor: 'black' },
      { name: 'grochów', price: '100', owner: '', group: 'districts', district: 'warszawa', color: '#27AE60 ', fontcolor: 'black' },
      { name: 'praga', price: '100', owner: '', group: 'districts', district: 'warszawa', color: '#27AE60 ', fontcolor: 'black' },
      { name: 'włochy', price: '100', owner: '', group: 'districts', district: 'warszawa', color: '#27AE60 ', fontcolor: 'black' },
      { name: 'okęcie', price: '100', owner: '', group: 'lotniska', color: '#AACCEE', fontcolor: 'black' },
      { name: 'sczecin', price: '100', owner: '', group: 'districts', district: 'szczecin', color: '#FFD300', fontcolor: 'black' },
      { name: 'gocław', price: '100', owner: '', group: 'districts', district: 'szczecin', color: '#FFD300', fontcolor: 'black' },
      { name: 'parking', price: '100', owner: '', fontcolor: 'black' },
      { name: 'wejherowo', price: '100', owner: '', group: 'districts', district: '3miasto kaszubskie', color: '#F50003', fontcolor: 'black' },
      { name: 'rumia', price: '100', owner: '', group: 'districts', district: '3miasto kaszubskie', color: '#F50003', fontcolor: 'black' },
      { name: 'reda', price: '100', owner: '', group: 'districts', district: '3miasto kaszubskie', color: '#F50003', fontcolor: 'black' },
      { name: 'OPEC', price: '100', owner: '', group: 'instalacje', color: '#A9DFBF', fontcolor: 'black' },
      { name: 'radom ', price: '100', owner: '', group: 'lotniska', color: '#AACCEE', fontcolor: 'black' }
    ],
    players: [
      { color: 'red', field: 0, name: 'red', money: 1200, groups: [], current: true },
      { color: 'blue', field: 0, name: 'blue', money: 1200, groups: [], current: false },
      { color: 'gray', field: 0, name: 'agent', money: 0, current: false }
    ],
    currentPlayerId: 0,
    currentPlayerBetId: 0,
    previewField: {},
    showPreview: false,
    winner: null,
    log: []
  },
  methods: {
    switchPlayer() {
      let currentplayer = this.players.findIndex((el) => el.current == true);
      console.log(currentplayer);
      if (currentplayer + 1 == this.players.length) {
        this.players[currentplayer].current == false;
        this.players[0].current = true;
      } else {
        this.players[currentplayer].current = false;
        this.players[currentplayer + 1].current = true;
      }
    },
    switchPlayerBet() {
      if (this.currentPlayerBetId == 0) {
        this.currentPlayerBetId = 1
      } else {
        this.currentPlayerBetId = 0
      }
    },
    addLogEntry(arg) {
      this.log.unshift(arg);
    },
    clearLog() {
      this.log = [];
    },
    init() {
      for (let i = 0; i < this.fields.length; i++) {
        Vue.set(this.fields[i], 'houses', 0);
      }
    },
    setPreviewField(val) {
      this.previewField = val
    }
  },
  computed:{
    currentPlayer(){
      return this.players.find((el) => el.current == true)
    },
    currentPlayerBet() {
      return this.players[this.currentPlayerBetId]
    },
    currentField(){
      return this.fields[this.currentPlayer.field];
    },
    player2(){
      if (this.currentPlayer.name == 'red') {
          return 'blue';
      } else {
          return 'red'
      }
    }
  },

  mounted() {
    this.init()
    // Vue.set(this.dupa, 'siemano',2);
  },
  render: function (h) { return h(App) }
}).$mount('#app')
