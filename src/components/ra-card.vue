<template>
  <div>
    <pv-card>
      <template #header>
        <img alt="user header" src="https://source.unsplash.com/random" />
      </template>
      <template #title> {{ offerData.title }} </template>
      <template #content>
        {{ offerData.description }}
        <p> Points: {{ offerData.points }} </p>
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
    offerData: Object
  },
};
</script>

<style scoped>
img {
  width: 100px;
}
</style>