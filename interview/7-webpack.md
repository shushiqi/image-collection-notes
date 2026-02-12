# webpack

- ​​模块打包工具​​ (Module Bundler) / ​​构建工具​​ (Build Tool)
- 核心概念​​（必须掌握）：
    1. ​​Entry（入口）​​：指示Webpack从哪个文件开始构建依赖图。
    2. ​​Output（输出）​​：指示Webpack将打包后的文件输出到哪里，以及如何命名。
    3. ​​Loader（加载器）​​：​​Webpack本身只能理解JavaScript和JSON​​。Loader让Webpack能处理其他类型的文件，并将其转换为有效模块。本质上是一个「源码转换器」，可以对任何文件进行处理。例如：
        -   babel-loader: 将ES6+语法转译为ES5。
        -   css-loader& style-loader: 处理CSS文件。
        -   file-loader: 处理图片、字体等文件。
    4. ​​Plugin（插件）​​：用于执行范围更广的任务，从打包优化到环境变量注入等。例如：
        -   HtmlWebpackPlugin: 自动生成HTML文件并注入打包后的JS/CSS。
        -   CleanWebpackPlugin: 在打包前清理输出目录。
        -   TerserWebpackPlugin: 用于压缩JS代码。
        -   MiniCssExtractPlugin: 将CSS提取到单独的文件

- ​​构建流程​​：
    1. 初始化：读取webpack配置文件，创建Compiler对象，并初始化配置参数。
    2. 开始编译：调用Compiler对象的run方法开始执行编译。
    3. 模块解析：从入口文件开始，递归解析模块依赖，调用Loader对模块进行转换。
    4. 完成模块编译：将编译后的模块打包成Chunk，并生成Assets。
    5. 输出：根据配置将Assets输出到文件系统。

- ​​优化构建速度​​：
    1. 使用高版本的Webpack和Node.js。
    2. 优化Loader配置：减少不必要的Loader处理，使用include/exclude指定处理范围。
    3. 使用缓存：使用cache-loader或babel-loader的cacheDirectory选项。
    4. 多进程并行处理：使用thread-loader或parallel-webpack。
    5. 优化resolve配置：减少文件搜索范围，使用alias配置别名。
    6. 使用DLLPlugin和DLLReferencePlugin：将第三方库单独打包，避免重复编译。

- ​​优化构建体积​​：
    1. 代码压缩：使用TerserWebpackPlugin压缩JS代码，使用css-minimizer-webpack-plugin压缩CSS代码。
    2.  Tree Shaking：移除未使用的代码，只打包必要的模块。
    3.  Scope Hoisting：将多个模块的代码合并到一个函数中，减少函数调用开销。
    4.  代码分割：将代码拆分成多个Chunk，按需加载，减少初始加载时间。
    5.  图片压缩：使用image-webpack-loader压缩图片。
    6.  字体压缩：使用fontmin-webpack-plugin压缩字体。
    7.  提取公共代码：使用SplitChunksPlugin提取公共代码，避免重复打包。
    8.  动态导入：使用import()语法实现按需加载，减少初始加载时间。
    9.  懒加载：使用懒加载策略，将一些不常用的模块延迟加载，减少初始加载时间。
    10.  缓存策略：使用缓存策略，如HTTP缓存、CDN缓存等，减少重复请求。

- 高级特性和优化​​    
    1. ​​打包原理​​
    2. ​​代码分割（Code Splitting）​​
    3. ​​Tree Shaking​​
