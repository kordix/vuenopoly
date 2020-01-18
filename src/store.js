import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.devtools = true
export default new Vuex.Store({
    state: {
        fields: [
            { name: 'start', price: 0, owner: '' },
            { name: 'kam. potok', price: '100', owner: 'red', group: 'districts',district:'sopot', color: '#AA5577', fontcolor: 'white' },
            { name: 'wyścigi', price: '100', owner: 'red', group: 'districts', district: 'sopot', color: '#AA5577', fontcolor: 'white' },
            { name: 'rębiechowo', price: '100', owner: '', group: 'lotniska', color: '#AACCEE', fontcolor: 'black' },
            { name: 'witomino', price: '100', owner: '', group: 'districts', district: 'gdynia', color: 'blue', fontcolor: 'white' },
            { name: 'karwiny', price: '100', owner: '', group: 'districts', district: 'gdynia',color: 'blue', fontcolor: 'white' },
            { name: 'mały kack', price: '100', owner: '', group: 'districts', district: 'gdynia', color: 'blue', fontcolor: 'white' },
            { name: 'parking1', price: '100', owner: '', group: 'inne', fontcolor: 'black' },
            { name: 'gdańsk', price: '100', owner: '', group: 'districts', district: 'gdańsk',color: 'green', fontcolor: 'white' },
            { name: 'siedlce', price: '100', owner: '', group: 'districts', district: 'gdańsk',color: 'green', fontcolor: 'white' },
            { name: 'stogi', price: '100', owner: '', group: 'districts', district: 'gdańsk',color: 'green', fontcolor: 'white' },
            { name: 'chopina', price: '100', owner: '', group: 'lotniska', color: '#AACCEE', fontcolor: 'black' },
            { name: 'PEWIK', price: '100', owner: '', group: 'instalacje', color: '#A9DFBF', fontcolor: 'black' },
            { name: 'parking2', price: '100', owner: '', fontcolor: 'black' },
            { name: 'grochów', price: '100', owner: '', group: 'districts', district: 'warszawa',color: '#27AE60 ', fontcolor: 'black' },
            { name: 'praga', price: '100', owner: '', group: 'districts', district: 'warszawa',color: '#27AE60 ', fontcolor: 'black' },
            { name: 'włochy', price: '100', owner: '', group: 'districts', district: 'warszawa',color: '#27AE60 ', fontcolor: 'black' },
            { name: 'okęcie', price: '100', owner: '', group: 'lotniska', color: '#AACCEE', fontcolor: 'black' },
            { name: 'sczecin', price: '100', owner: '', group: 'districts', district: 'szczecin',color: '#FFD300', fontcolor: 'black' },
            { name: 'gocław', price: '100', owner: '', group: 'districts', district: 'szczecin',color: '#FFD300', fontcolor: 'black' },
            { name: 'parking', price: '100', owner: '', fontcolor: 'black' },
            { name: 'wejherowo', price: '100', owner: '', group: 'districts', district: '3miasto kaszubskie',color: '#F50003', fontcolor: 'black' },
            { name: 'rumia', price: '100', owner: '', group: 'districts', district: '3miasto kaszubskie', color: '#F50003', fontcolor: 'black' },
            { name: 'reda', price: '100', owner: '', group: 'districts', district: '3miasto kaszubskie', color: '#F50003', fontcolor: 'black' },
            { name: 'OPEC', price: '100', owner: '', group: 'instalacje', color: '#A9DFBF', fontcolor: 'black' },
            { name: 'radom ', price: '100', owner: '', group: 'lotniska', color: '#AACCEE', fontcolor: 'black' }
        ],
        players: [
            { color: 'red', field: 0, name: 'red', money: 1000, groups: [], current: true },
            { color: 'blue', field: 0, name: 'blue', money: 1000, groups: [], current: false },
            { color: 'gray', field: 0, name: 'agent', money: 0, current: false }
        ],
        currentPlayerId: 0,
        currentPlayerBetId: 0,
        previewField:{},
        showPreview:false,
        log: []



    },
    mutations: {
        switchPlayer(state) {
            let currentplayer = state.players.findIndex((el) => el.current == true);
            if (currentplayer + 1 == this.state.players.length) {
                state.players[currentplayer].current == false;
                state.players[0].current = true;
            } else {
                state.players[currentplayer].current = false;
                state.players[currentplayer + 1].current = true;
            }
        },
        switchPlayerBet(state) {
            if (state.currentPlayerBetId == 0) {
                state.currentPlayerBetId = 1
            } else {
                state.currentPlayerBetId = 0
            }
        },
        logtest(state, arg) {
            console.log(arg);
        },
        addLogEntry(state, arg) {
            state.log.unshift(arg);
        },
        clearLog(state) {
            state.log = [];
        },
        init(state, payload) {
            for(let i=0;i<state.fields.length;i++){
                Vue.set(state.fields[i],'houses',0);
                console.log(state.fields[i].houses);
            }
        },
        setPreviewField(state,payload){
            state.previewField = payload
        }
    },
    actions: {
        switchPlayer(context) {
            context.commit('switchPlayer');
        },
        switchPlayerBet(context) {
            context.commit('switchPlayerBet');
        },
        addLogEntry(context, arg) {
            context.commit('addLogEntry', arg);
        },
        clearLog(context) {
            context.commit('clearLog');
        },
        init(context){
            context.commit('init');
        },
        setPreviewField(context, payload) {
            context.commit('setPreviewField',payload)
        }
    },
    getters: {
        currentPlayer: state => {
            return state.players.find((el) => el.current == true)
        },
        currentPlayerV2: state => {
            return state.players[state.currentPlayerId]
        },
        currentPlayerBet: state => {
            return state.players[state.currentPlayerBetId]
        },
        currentField: (state, getters) => {
            return state.fields[getters.currentPlayer.field];
        },
        player2: (state, getters) => {
            if (getters.currentPlayer.name == 'red') {
                return 'blue';
            } else {
                return 'red'
            }
        }
    }
})
