<template>
  <h1>Counter: {{ offersData.length }}</h1>
  <div class="grid3c">
    <ra-card
      v-for="offerData in offersData"
      :key="offerData.id"
      :offerData="offerData"
      style="max-width: 300px"
    ></ra-card>
  </div>
</template>

<script>
import RaCard from "../components/ra-card.vue";
import { OffersApiService } from "../services/offers-api.service";
export default {
  components: {
    RaCard,
  },
  name: "OffersView",
  data() {
    return {
      offersData: [],
      apiOffer: undefined,
    };
  },
  created() {
    this.apiOffer = new OffersApiService();
    this.getAllCards();
  },
  methods: {
    getAllCards() {
      this.apiOffer.getAll().then((response) => {
        this.offersData = response.data;
      });
    },
  },
};
</script>

<style>
.grid3c {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  gap: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 60px;
  margin-top: 30px;
}

.ra-card {
  max-width: 400px;
}

</style>
