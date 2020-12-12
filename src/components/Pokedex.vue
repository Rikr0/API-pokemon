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
      <template v-if="id != ''">
        <b-row class="mb-3 justify-content-center">
          <b-col cols="3">
            <img :src="`${urlImg}${id}.gif`" class="img-fluid" />
          </b-col>
          <b-col cols="3">
            <img :src="`${urlImg2}${id}.gif`" class="img-fluid" />
          </b-col>
        </b-row>
        <b-row class="mb-1 justify-content-center">
          <b-col cols="12">
            <b-skeleton-table
              v-if="loading"
              :rows="5"
              :columns="1"
              :table-props="{ bordered: true, striped: true }"
            ></b-skeleton-table>
            <b-card no-body v-if="!loading">
              <b-tabs pills card vertical>
                <b-tab badge="50" active>
                  <template #title>
                    Abilities
                    <b-badge variant="warning" pill>
                      {{ pokemon.abilities.length }}
                    </b-badge>
                  </template>
                  <b-card-text class="scroll-list">
                    <b-list-group>
                      <b-list-group-item
                        v-for="(item, index) in pokemon.abilities"
                        :key="index"
                      >
                        {{ item.ability.name }}
                      </b-list-group-item>
                    </b-list-group>
                  </b-card-text>
                </b-tab>
                <b-tab>
                  <template #title>
                    Moves
                    <b-badge variant="warning" pill>
                      {{ pokemon.moves.length }}
                    </b-badge>
                  </template>
                  <b-card-text class="scroll-list">
                    <b-list-group>
                      <b-list-group-item
                        v-for="(item, index) in pokemon.moves"
                        :key="index"
                      >
                        {{ item.move.name }}
                      </b-list-group-item>
                    </b-list-group>
                  </b-card-text>
                </b-tab>
                <b-tab>
                  <template #title>
                    Stats
                    <b-badge variant="warning" pill>
                      {{ pokemon.stats.length }}
                    </b-badge>
                  </template>
                  <b-card-text class="scroll-list">
                    <b-list-group>
                      <b-list-group-item
                        v-for="(item, index) in pokemon.stats"
                        :key="index"
                      >
                        {{ item.stat.name }}
                      </b-list-group-item>
                    </b-list-group>
                  </b-card-text>
                </b-tab>
                <b-tab>
                  <template #title>
                    Types
                    <b-badge variant="warning" pill>
                      {{ pokemon.types.length }}
                    </b-badge>
                  </template>
                  <b-card-text class="scroll-list">
                    <b-list-group>
                      <b-list-group-item
                        v-for="(item, index) in pokemon.types"
                        :key="index"
                      >
                        {{ item.type.name }}
                      </b-list-group-item>
                    </b-list-group>
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </template>
    </b-container>
    <template #modal-footer>
      <div class="w-100">
        <p class="float-left"></p>
        <b-button
          variant="danger"
          size="sm"
          class="float-right"
          @click="show = false"
        >
          Cerrar
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
    pokemon: {},
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
    async getInfo() {
      let path = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
      try {
        let res = await axios.get(path);
        console.log(res.data);
        if (res.data) {
          this.pokemon = res.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      } catch (error) {}
    },
    showModal(id, name) {
      this.loading = true;
      this.id = "";
      this.id = id;
      this.name = name;
      this.show = true;
      this.getInfo();
    },
  },
  computed: {},
  created() {},
};
</script>
<style>
.scroll-list {
  height: 250px;
  overflow-y: scroll;
}
</style>