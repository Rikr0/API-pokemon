<template>
  <div class="div-floating">
    <b-row>
      <b-col>
        <b-badge variant="warning" pill>
          {{ pokemonsCap.length }}
        </b-badge>
        <img
          src="@/assets/poke-1.png"
          alt="pokebola"
          class="img-fluid"
          id="img-poke"
          v-b-toggle="'collapse-2'"
        />
      </b-col>
    </b-row>
    <b-row v-if="pokemonsCap.length != 0">
      <b-collapse id="collapse-2" class="scroll-poke">
        <b-list-group>
          <b-list-group-item
            v-for="(poke, index) in pokemonsCap"
            :key="index"
            class="fondo-list"
          >
          <b-row>
            <b-col cols="12" class="text-right">
              <b-icon
                icon="x-circle"
                scale="1.5"
                variant="danger"
                v-b-tooltip.hover.top="capitalize('Liberar')"
                @click="liberar(poke.id)"
            ></b-icon>
            </b-col>
            <b-col col="12">
              <img
                :src="`${urlImg}${poke.id}.gif`"
                :alt="poke.name"
                class="img-fluid"
                v-b-tooltip.hover.top="capitalize(poke.name)"
              />
            </b-col>
          </b-row>
          </b-list-group-item>
        </b-list-group>

        <b-card-group v-if="1 == 2">
          <b-row align-h="end">
            <b-col
              v-for="(poke, index) in pokemonsCap"
              :key="index"
              md="3"
              class="no-padding"
            >
              <b-card
                :border-variant="color(index)"
                :header="capitalize(poke.name)"
                :header-border-variant="color(index)"
                :header-text-variant="color(index)"
                align="center"
                style="height: 100%"
              >
                <img
                  :src="`${urlImg}${poke.id}.gif`"
                  :alt="poke.name"
                  class="img-fluid"
                />
              </b-card>
            </b-col>
          </b-row>
        </b-card-group>
      </b-collapse>
    </b-row>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Pokebola",
  data: () => ({
    urlImg:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/",
  }),
  methods: {
    capitalize(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    color(index) {
      let num = index + 1;
      return num % 2 == 0 ? "danger" : "warning";
    },
    liberar(id){
      this.$emit("click", id);
      //this.$root.liberar(id);
    }
  },
  computed: {
    ...mapState(["pokemonsCap"]),
  },
  created() {},
};
</script>
<style scoped>
.card-footer {
  background-color: red;
}
.div-floating {
  position: fixed;
  float: right;
  right: 0px;
  z-index: 1;
}
#img-poke {
  width: 100px;
  float: right;
}
.scroll-poke {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 300px;
}
.no-padding {
  padding-right: 1px !important;
  padding-left: 1px !important;
}
.fondo-list {
  background-color: #959595;
}
</style>