<template>
  <b-container>
    {{ statusLoanding }}
    <Pokebola @click="liberar"/>
    <b-pagination
      align="center"
      :total-rows="pokemons.length"
      v-model="paginaActual"
      :per-page="itemsPorPagina"
      pills
      size="lg"
      class="mt-3"
    >
    </b-pagination>
    <b-card-group deck>
      <b-row>
        <b-col
          md="3"
          class="mb-1"
          v-for="(poke, index) in paginador(pokemons)"
          :key="index"
        >
          <b-overlay :show="loading" no-wrap></b-overlay>
          <b-card
            :title="capitalize(poke.name)"
            :img-src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`"
            img-alt="Image"
            img-top
            border-variant="warning"
          >
            <b-card-text>
              <b-row class="justify-content-center">
                <b-col cols="6">
                  <img
                    :src="imgs[poke.status]"
                    class="img-fluid"
                    @click="pokebola(poke.id, poke.status)"
                  />
                </b-col>
                <b-col cols="6">
                  <img
                    src="../assets/pokedex.png"
                    class="img-fluid"
                    @click="showModal(poke.id, poke.name)"
                  />
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-card-group>
    <b-pagination
      align="center"
      :total-rows="pokemons.length"
      v-model="paginaActual"
      :per-page="itemsPorPagina"
      pills
      size="lg"
    >
    </b-pagination>
    <Pokedex ref="showM" />
  </b-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import img0 from "../assets/poke-0.png";
import img1 from "../assets/poke-1.png";
import Pokedex from "@/components/Pokedex.vue";
import Pokebola from "@/components/Pokebola.vue";
export default {
  name: "API-pokemon",
  components: {
    Pokedex,
    Pokebola,
  },
  data: () => ({
    pokemons: [],
    pokemonsTemp: [],
    paginaActual: 1,
    paginaActualAux: 1,
    itemsPorPagina: 12,
    loading: true,
    imgs: [img0, img1],
  }),
  methods: {
    ...mapMutations(["pokemon_capturados"]),
    async getPokemon() {
      let path = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=60";
      try {
        let res = await axios.get(path);
        //console.log(res.data);
        if (res.data) {
          this.pokemons = res.data.results;
          await this.pokemons.forEach((poke, index) => {
            this.pokemons[index].id = index + 1;
            this.pokemons[index].status = 0;
          });

          await this.pokemonsCap.forEach((pokeC) => {
            let index = this.pokemons.findIndex((poke) => poke.id == pokeC.id);
            this.pokemons[index].status = 1;
          });
          this.pokemonsTemp = this.pokemons;
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
    pokebola(id, status) {
      status == 0 ? this.capturar(id) : this.liberar(id);
    },
    capturar(id) {
      this.pokemons = [];
      let index = this.pokemonsTemp.findIndex((poke) => poke.id === id);
      this.pokemonsTemp[index].status = 1;
      this.pokemons = this.pokemonsTemp;

      this.pokemonsCap.push({
        id: this.pokemons[index].id,
        name: this.pokemons[index].name,
      });

      localStorage.setItem(
        "pokemons-capturados",
        JSON.stringify(this.pokemonsCap)
      );
    },
    liberar(id) {
      this.pokemons = [];
      let index = this.pokemonsTemp.findIndex((poke) => poke.id === id);
      this.pokemonsTemp[index].status = 0;
      this.pokemons = this.pokemonsTemp;

      let index2 = this.pokemonsCap.findIndex((poke) => poke.id === id);

      this.pokemonsCap.splice(index2, 1);
      if (this.pokemonsCap.length == 0) {
        localStorage.removeItem("pokemons-capturados");
      } else {
        localStorage.setItem(
          "pokemons-capturados",
          JSON.stringify(this.pokemonsCap)
        );
      }
    },
    showModal(id, name) {
      this.$refs.showM.showModal(id, name);
    },
  },
  computed: {
    ...mapState(["pokemonsCap"]),
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
  async created() {
    await this.pokemon_capturados();
    this.getPokemon();
  },
};
</script>
<style scoped>
.floating {
  width: 100px;
  position: fixed;
  float: right;
  right: 0px;
  z-index: 1;
}
</style>