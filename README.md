# 3D Tags Cloud

> 一个基于 `Vue3` 开发的 `3D标签云` 效果

## 使用方法，引入组件即可

```Vue
<TagsCloud :data="data" :boxWidth="600" :speed="600" randomColor />
import TagsCloud from "@/components/tagsCloud.vue";
```

`data` 数据源，格式为

```array
[
    {
        name: "XXX",
        url: "https://xxx.com",
    }
]
```

`boxWidth` 容器宽度，默认 `600px`

`speed` 模型转动速度，默认 `600`

`randomColor` 是否随机颜色，默认 `true`
