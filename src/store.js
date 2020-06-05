import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myId: 6,
    idLeader: 6,
    lobbyId: null,
    players: [
      { name: "Exapos", id: 1 },
      { name: "Eflyax", id: 6 },
      { name: "BoldaCZ", id: 2 }
    ],
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
    }
  },
  modules: {
  },
  actions: {
    setLobbyId(context, id) { // this is called by component
      context.commit("SET_LOBBY_ID", id);
    },
    isLeader() { // this is called by component
      return state.myId == state.idLeader;
    },
  },
  mutations: { // managing state
    SET_LOBBY_ID(state, payload) {
      // console.log(payload);
      state.lobbyId = payload;
    },
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event)
    },
    SOCKET_ONMESSAGE(state, message) {
      console.log('server zpráva:', message);
      state.socket.message = message;
    },
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  getters: {
    getNumbers(state) {
      return state.numbers;
    },
    isLeader: state => {
      return state.myId == state.idLeader;
    }
  }
});
