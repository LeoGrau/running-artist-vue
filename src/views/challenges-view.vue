<template>
  <div class="team-container">
    <h1>Teams</h1>
    <p class = "info"> Current Team Challenges: <strong> {{ teamsData.length }} </strong>  </p>
    <div class="grid3c">
      <ra-card
        v-for="teamData in teamsData"
        :key="teamData.id"
        :challengeData="teamData"
        style="max-width: 300px"
      ></ra-card>
    </div>
  </div>
  <div class="individual-container">
    <h1>Individuals</h1>
    <p class = "info"> Current Individual Challenges:  <strong> {{ individualsData.length }} </strong> </p>
    <div class="grid3c">
      <ra-card
        v-for="individualData in individualsData"
        :key="individualData.id"
        :challengeData="individualData"
        style="max-width: 300px"
      ></ra-card>
    </div>
  </div>
</template>

<script>
import RaCard from "../components/ra-card.vue";
import { ChallengesApiService } from "../services/challenges-api.service";
export default {
  components: {
    RaCard,
  },
  name: "ChallengesView",
  data() {
    return {
      teamsData: [],
      individualsData: [],
      apiChallenge: undefined,
    };
  },
  created() {
    this.apiChallenge = new ChallengesApiService();
    this.divideAndConquer();
  },
  methods: {
    getAllCards() {
      this.apiChallenge.getAll().then((response) => {
        this.challengesData = response.data;
      });
    },

    divideAndConquer() {
      this.apiChallenge
        .getAll()
        .then(
          (response) =>
            (this.teamsData = response.data.filter(
              (item) => item.challengeType == "Team"
            ))
        );
      this.apiChallenge
        .getAll()
        .then(
          (response) =>
            (this.individualsData = response.data.filter(
              (item) => item.challengeType == "Individual"
            ))
        );
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
  font-family: "Roboto";
  text-align: center;
  margin-bottom: 60px;
  margin-top: 30px;
}

p.info {
  font-family: "Roboto";
  margin-bottom: 100px;
  font-size: 1.2rem;
}

h1, p {
  text-align: center;
}

.ra-card {
  max-width: 400px;
}
</style>
