<template>
	<div class="page">
		<div class="tagsCloud" :style="{ height: boxWidth + 'px', width: boxWidth + 'px' }" ref="Panel" @mousemove="listener($event)">
			<div
				class="item"
				v-for="(item, index) in useArray"
				:key="index"
				:style="[
					{ opacity: (400 + item.z) / 600 },
					{ 'font-size': 12 * (600 / (400 - item.z)) + 'px' },
					{ left: item.x + 'px' },
					{ top: item.y + 'px' },
					{ zIndex: item.zindexVal },
					{ display: 'inline-block' },
					{ color: item.rcolor }
				]"
				@click="toUrl(item.url)"
			>
				{{ item.name }}
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	props: ['useArray', 'boxWidth', 'speed', 'randomColor'],

	data() {
		return {
			speedX: Math.PI / this.speed,
			speedY: Math.PI / this.speed
		};
	},
	computed: {
		radius() {
			return this.boxWidth / 3;
		},
		CX() {
			//球心x坐标
			return this.boxWidth / 2;
		},
		CY() {
			//球心y坐标
			return this.boxWidth / 2;
		},
		EX() {
			return this.boxWidth + document.body.scrollLeft + document.documentElement.scrollLeft;
		},
		EY() {
			return this.boxWidth + document.body.scrollTop + document.documentElement.scrollTop;
		}
	},
	created() {
		this.init();
	},
	mounted() {
		//使球开始旋转
		setInterval(() => {
			this.rotateX();
			this.rotateY();
		}, 10);
	},
	methods: {
		init() {
			let winWidth = document.body.clientWidth;
			if (this.boxWidth > winWidth) {
				this.boxWidth = winWidth;
			}
			this.useArray.forEach((item, key) => {
				let k = -1 + (2 * (key + 1) - 1) / this.useArray.length;
				let a = Math.acos(k);
				let b = a * Math.sqrt(this.useArray.length * Math.PI);

				// X,Y,Z
				Vue.set(item, 'x', this.radius * Math.sin(a) * Math.cos(b) + this.CX);
				Vue.set(item, 'y', this.radius * Math.sin(a) * Math.sin(b) + this.CX);
				Vue.set(item, 'z', this.radius * Math.cos(a));

				// 随机色
				if (this.randomColor) {
					Vue.set(item, 'rcolor', 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')');
				}

				// Z-index
				let scale = this.boxWidth / (this.boxWidth - item.z);
				Vue.set(item, 'zindexVal', parseInt(scale * 100));
			});
		},
		rotateX() {
			var cos = Math.cos(this.speedX);
			var sin = Math.sin(this.speedX);
			// for (let tag of this.useArray) {
			// 	var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY;
			// 	var z1 = tag.z * cos + (tag.y - this.CY) * sin;
			// 	tag.y = y1;
			// 	tag.z = z1;
			// }
			this.useArray.forEach((item, key) => {
				var y1 = (item.y - this.CY) * cos - item.z * sin + this.CY;
				var z1 = item.z * cos + (item.y - this.CY) * sin;
				item.y = y1;
				item.z = z1;

				let scale = this.boxWidth / (this.boxWidth - item.z);
				item.zindexVal = parseInt(scale * 100);
			});
		},
		rotateY() {
			var cos = Math.cos(this.speedY);
			var sin = Math.sin(this.speedY);
			this.useArray.forEach(item => {
				var x1 = (item.x - this.CX) * cos - item.z * sin + this.CX;
				var z1 = item.z * cos + (item.x - this.CX) * sin;
				item.x = x1;
				item.z = z1;

				let scale = this.boxWidth / (this.boxWidth - item.z);
				item.zindexVal = parseInt(scale * 100);
			});
		},
		listener(event) {
			//响应鼠标移动
			var refX = this.$refs.Panel.offsetLeft;
			var refY = this.$refs.Panel.offsetTop;
			var x = event.clientX - refX - this.CX;
			var y = event.clientY - refY - this.CY;

			// this.x + CX - this.ele.offsetWidth/2 +"px";
			this.speedY = x * 0.0001 > 0 ? Math.min(this.radius * 0.00002, x * 0.0001) : Math.max(-this.radius * 0.00002, x * 0.0001);
			this.speedX = y * 0.0001 > 0 ? Math.min(this.radius * 0.00002, y * 0.0001) : Math.max(-this.radius * 0.00002, y * 0.0001);
		},
		toUrl(url) {
			window.location.href = url;
		}
	}
};
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
	&:hover {
		border: 2px solid #666;
	}
}
</style>
