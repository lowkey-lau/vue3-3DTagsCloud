<template>
  <div class="box">
    <TagsCloud :data="demoData" />
  </div>
</template>

<script setup>
import TagsCloud from "@/components/TagsCloud.vue";
import { demoData } from "@/json/demoData";
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
