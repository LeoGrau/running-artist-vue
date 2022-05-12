<template>
  <div>
    <pv-card>
      <template #header>
        <img alt="user header" :src="challengeData.urlToImage" />
      </template>
      <template #title> {{ challengeData.title }} </template>
      <template #content>
        {{ challengeData.description }}
        <p> ChallengeType: {{ challengeData.challengeType }} </p>
        <p> BussinessId: {{ challengeData.businessId }} </p>
      </template>
      <template #footer>
        <pv-button icon="pi pi-check" label="Save" />
        <pv-button
          icon="pi pi-times"
          label="Cancel"
          class="p-button-secondary"
          style="margin-left: 0.5em"
        />
      </template>
    </pv-card>
  </div>
</template>

<script>
export default {
  name: "RaCard",
  props: {
    challengeData: Object
  },
};
</script>

<style scoped>
img {
  width: 100px;
}
</style>