import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

const viteConfig = ({ mode }) => {
  const alias = {
    "@": pathResolve("./src/"),
    "~": pathResolve("./"),
    assets: pathResolve("./src/assets"),
  };

  return {
    plugins: [vue()],
    root: process.cwd(),
    resolve: { alias },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "./src/styles/init.scss";',
          //👆这样写是不行的。因为如果项目中其他的css文件有@forward关键字，就会提示错误
          // additionalData: '@use "./src/styles/init.scss" as *;',
          //👆这样写是可以的，但是要注意
          //!!!!一定要将其他地方引入该css文件的地方删除，如index.html,否则会提示已经加载该module的错误！！！
          // javascriptEnabled: true,
        },
      },
    },
    base: "./",
    server: {
      host: true,
      open: true,
    },
  };
};

export default viteConfig;
