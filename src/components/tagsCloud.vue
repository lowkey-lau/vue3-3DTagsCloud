<template>
  <div class="page">
    <div class="tagsCloud" ref="tagsCloud" :style="{ height: $props.boxWidth + 'px', width: $props.boxWidth + 'px' }" @mousemove="listener($event)">
      <div
        class="item"
        v-for="(item, index) in state.data"
        :key="index"
        :style="[
          { opacity: (400 + item.z) / 600 },
          { 'font-size': 12 * (600 / (400 - item.z)) + 'px' },
          { left: item.x + 'px' },
          { top: item.y + 'px' },
          { zIndex: item.zindexVal },
          { display: 'inline-block' },
          { color: item.rcolor },
        ]"
        @click="toUrl(item.url)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
const $props = defineProps({
  data: {
    default: [],
    type: Array,
  },
  boxWidth: {
    default: 600,
    type: Number,
  },
  speed: {
    default: 600,
    type: Number,
  },
  randomColor: {
    default: true,
    type: Boolean,
  },
});

const state = reactive({
  speedX: Math.PI / $props.speed,
  speedY: Math.PI / $props.speed,
  data: [],
});

const radius = computed(() => $props.boxWidth / 3);
const CX = computed(() => $props.boxWidth / 2);
const CY = computed(() => $props.boxWidth / 2);
const EX = computed(() => $props.boxWidth + document.body.scrollLeft + document.documentElement.scrollLeft);
const EY = computed(() => $props.boxWidth + document.body.scrollTop + document.documentElement.scrollTop);

const init = () => {
  let winWidth = document.body.clientWidth;
  if ($props.boxWidth > winWidth) {
    $props.boxWidth = winWidth;
  }

  state.data.forEach((item, key) => {
    let k = -1 + (2 * (key + 1) - 1) / state.data.length;
    let a = Math.acos(k);
    let b = a * Math.sqrt(state.data.length * Math.PI);

    // X,Y,Z
    item.x = radius.value * Math.sin(a) * Math.cos(b) + CX.value;
    item.y = radius.value * Math.sin(a) * Math.sin(b) + CX.value;
    item.z = radius.value * Math.cos(a);

    // 随机色
    if ($props.randomColor) {
      item.rcolor = `rbg(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`;
    }

    // Z-index
    let scale = $props.boxWidth / ($props.boxWidth - item.z);
    item.zindexVal = parseInt(scale * 100);
  });
};

const rotateX = () => {
  var cos = Math.cos(state.speedX);
  var sin = Math.sin(state.speedX);
  // for (let tag of state.data) {
  // 	var y1 = (tag.y - CY.value) * cos - tag.z * sin + CY.value;
  // 	var z1 = tag.z * cos + (tag.y - CY.value) * sin;
  // 	tag.y = y1;
  // 	tag.z = z1;
  // }
  state.data.forEach((item, key) => {
    var y1 = (item.y - CY.value) * cos - item.z * sin + CY.value;
    var z1 = item.z * cos + (item.y - CY.value) * sin;
    item.y = y1;
    item.z = z1;

    let scale = $props.boxWidth / ($props.boxWidth - item.z);
    item.zindexVal = parseInt(scale * 100);
  });
};

const rotateY = () => {
  var cos = Math.cos(state.speedY);
  var sin = Math.sin(state.speedY);

  state.data.forEach((item) => {
    var x1 = (item.x - CX.value) * cos - item.z * sin + CX.value;
    var z1 = item.z * cos + (item.x - CX.value) * sin;
    item.x = x1;
    item.z = z1;

    let scale = $props.boxWidth / ($props.boxWidth - item.z);
    item.zindexVal = parseInt(scale * 100);
  });
};

const tagsCloud = ref();
const listener = (event) => {
  //响应鼠标移动
  var refX = tagsCloud.offsetLeft;
  var refY = tagsCloud.offsetTop;
  var x = event.clientX - refX - CX.value;
  var y = event.clientY - refY - CY.value;

  // this.x + CX - this.ele.offsetWidth/2 +"px";
  state.speedY = x * 0.0001 > 0 ? Math.min(radius.value * 0.00002, x * 0.0001) : Math.max(-radius.value * 0.00002, x * 0.0001);
  state.speedX = y * 0.0001 > 0 ? Math.min(radius.value * 0.00002, y * 0.0001) : Math.max(-radius.value * 0.00002, y * 0.0001);
};

const toUrl = (url) => {
  window.location.href = url;
};

onMounted(() => {
  state.data = $props.data;
  init();
});

onBeforeMount(() => {
  rotateX();
  rotateY();
});
</script>

<style scoped lang="scss">
.tagsCloud {
  position: relative;
  display: inline-block;
  max-width: 100%;
}
.item {
  position: absolute;
  cursor: pointer;
  text-align: center;
  transform: translate(-50%, -50%);
  background-color: transparent;
  outline: none;
  transition: all 0.4s;
  border: 2px solid transparent;

  &:hover {
    border-color: #666;
  }
}
</style>
