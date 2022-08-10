# vitepress-plugin-npm2yarn

该插件的作用是当你在写一些文档或者教程时，可以很方便的将 `npm bash` 代码转化为 `yarn bash`，反之亦然。

~~wait vitepress new theme https://github.com/vuejs/vitepress/pull/232~~

现在可以使用 [`vitepress-plugin-code-group`](https://github.com/berber1016/vitepress-plugin-code-group) 来进行支持了，而不用等待官方的 new theme 来支持。

### 安装

```bash
npm install vitepress-plugin-npm2yarn
// 若theme没有支持 codeGroup 还需要安装
npm install vitepress-plugin-code-group
```

### 使用

```js
//.vitepress/config.js
const { npm2yarnPlugin } = require("vitepress-plugin-npm2yarn");
module.exports = {
  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(npm2yarnPlugin);
    },
  },
};

// 若theme没有支持 codeGroup 还需要配置
// .vitepress/theme/index.js

import DefaultTheme from "vitepress/theme";
import { CodeGroup, CodeGroupItem } from "vitepress-plugin-code-group";
import "vitepress-plugin-code-group/dist/style.css";
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // add
    app.component("CodeGroup", CodeGroup);
    app.component("CodeGroupItem", CodeGroupItem);
    // end
  },
};
```

当你需要在 md 文件中使用时，仅需要添加`npm2yarn`即可识别。

````js
// ```bash npm2yarn

// yarn run start

// ```
````
