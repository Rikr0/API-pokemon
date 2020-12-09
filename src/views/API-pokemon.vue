<template>
  <b-container>
    {{ statusLoanding }}
    <b-pagination
      align="center"
      :total-rows="pokemons.length"
      v-model="paginaActual"
      :per-page="itemsPorPagina"
      pills
      size="lg"
    >
    </b-pagination>
    <b-card-group deck>
      <b-row>
        <b-col md="4" v-for="(poke, index) in paginador(pokemons)" :key="index">
          <b-overlay :show="loading" no-wrap></b-overlay>
          <b-card
            :title="capitalize(poke.name)"
            :img-src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`"
            img-alt="Image"
            img-top
          >
            <b-card-text> </b-card-text>
            <template #footer> </template>
          </b-card>
        </b-col>
      </b-row>
    </b-card-group>
  </b-container>
</template>
<script>
import axios from "axios";
export default {
  name: "API-pokemon",
  data: () => ({
    pokemons: [],
    paginaActual: 1,
    paginaActualAux: 1,
    itemsPorPagina: 6,
    loading: true,
  }),
  methods: {
    async getPokemon() {
      let path = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=60";
      try {
        let res = await axios.get(path);
        console.log(res.data);
        if (res.data) {
          this.pokemons = res.data.results;
          this.pokemons.forEach((poke, index) => {
            this.pokemons[index].id = index + 1;
          });
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        } else {
        }
      } catch (error) {}
    },
    paginador(items) {
      const indiceInicio = (this.paginaActual - 1) * this.itemsPorPagina;
      const indiceFinal =
        indiceInicio + this.itemsPorPagina > items.length
          ? items.length
          : indiceInicio + this.itemsPorPagina;
      return items.slice(indiceInicio, indiceFinal);
    },
    capitalize(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
  },
  computed: {
    statusLoanding() {
      if (this.paginaActual == this.paginaActualAux) {
      } else {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.paginaActualAux = this.paginaActual;
        }, 500);
      }
    },
  },
  created() {
    this.getPokemon();
  },
};
</script>