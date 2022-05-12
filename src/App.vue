<template>
  <ra-tool-bar-vue style="border-radius: 0;"></ra-tool-bar-vue>
  <router-view></router-view>
</template>

<script>
import RaToolBarVue from "./components/ra-tool-bar.vue";
export default {
  components: {
    RaToolBarVue,
  },
  data() {
    return {};
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
