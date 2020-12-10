<template>
  <b-modal
    v-model="show"
    :title="name.toUpperCase()"
    header-bg-variant="danger"
    header-text-variant="light"
    body-bg-variant="light"
    body-text-variant="dark"
    footer-bg-variant="warning"
    footer-text-variant="dark"
  >
    <b-container fluid>
      <b-overlay :show="loading" no-wrap></b-overlay>
      <b-row class="mb-1 text-center" v-if="id != ''">
        <b-col cols="3">
          <img :src="`${urlImg}${id}.gif`" class="img-fluid" />
        </b-col>
        <b-col cols="3">
          <img :src="`${urlImg2}${id}.gif`" class="img-fluid" />
        </b-col>
      </b-row>
    </b-container>
    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">Modal Footer Content</p>
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="show = false"
        >
          Close
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import axios from "axios";
export default {
  name: "Pokedex",
  data: () => ({
    show: false,
    loading: true,
    urlImg:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/",
    urlImg2:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/",
    id: "",
    name: "",
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
            this.pokemons[index].status = 0;
          });
          this.pokemonsTemp = this.pokemons;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        } else {
        }
      } catch (error) {}
    },
    showModal(id, name) {
      this.id = "";
      this.id = id;
      this.name = name;
      this.show = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  computed: {},
  created() {
    //this.getPokemon();
  },
};
</script>