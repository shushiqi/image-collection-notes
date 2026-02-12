- Vite（基于 ESBuild，开发环境极快）和 Rollup（更专注于库的打包）

  - 特点

    - 开发环境用 ESBuild 做依赖预构建（Go 写的，极快）。
    - 热更新（HMR）几乎是“秒级”，开发体验非常流畅。
    - 生产环境打包还是用 Rollup，支持 RollUp 的插件系统，所以支持 Tree Shaking、代码分割等优化。

    - vite 快速原理
        - 基于 ESBuild 的依赖预构建，用 ESBuild（基于Go）把 node_modules 中的依赖提前打包成浏览器可以直接用的 ESM。
        - 浏览器原生支持 ES Modules，Vite 利用这一点，开发环境不需要像 Webpack 那样打包整个项目，
        - 按需编译，只有浏览器访问的模块会被即时加载。
        - 基于 Rollup 的打包，在保证了开发效率的同时，保证了生产环境的兼容性和稳定性
