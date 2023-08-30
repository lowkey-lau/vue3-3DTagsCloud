# 3D Tags Cloud

> A `3D tag cloud` effect developed based on `Vue3`

# DEMO

![DEMO Img]("https://github.com/lowkey-lau/vue3-3DTagsCloud/blob/master/src/assets/demo.png")

## How to use, just import the component

```Vue
<TagsCloud :data="data" :boxWidth="600" :speed="600" randomColor />
import TagsCloud from "@/components/tagsCloud.vue";
```

`data` The data source, in the format

```array
[
    {
        name: "XXX",
        url: "https://xxx.com",
    }
]
```

`boxWidth` container width, default `600px`

`speed` Model rotation speed, default `600`

`randomColor` Whether random color, default `true`
