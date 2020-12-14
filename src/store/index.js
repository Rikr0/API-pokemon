import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemonsCap: []
  },
  mutations: {
    pokemon_capturados(state) {
      if (localStorage.getItem("pokemons-capturados")) {
        state.pokemonsCap = JSON.parse(
          localStorage.getItem("pokemons-capturados")
        );
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
