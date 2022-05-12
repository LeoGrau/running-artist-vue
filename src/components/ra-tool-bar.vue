<template>
  <pv-toolbar class="bg-primary">
    <template #start>
      <pv-button
        class="p-button-text text-white"
        icon="pi pi-bars"
        @click="drawer = !drawer"
      ></pv-button>
      <h3>Running Artist</h3>
    </template>
    <template #end>
      <div class="flex-column">
        <router-link
          v-for="item in items"
          :to="item.to"
          custom
          v-slot="{ navigate, href }"
          :key="item.label"
        >
          <pv-button
            class="p-button-text text-white"
            :href="href"
            @click="navigate"
            >{{ item.label }}</pv-button
          >
        </router-link>
      </div>
    </template>
  </pv-toolbar>
</template>

<script>
export default {
  name: "RaToolBar",
  data() {
    return {
      drawer: false,
      items: [
        { label: "Offers", to: "/" },
        { label: "New Offer", to: "/offers" },
      ],
    };
  },
};
</script>

<style></style>
