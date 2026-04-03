<!--
 * @Author: shushiqi 1539588925@qq.com
 * @Date: 2026-02-27 10:30:24
 * @LastEditors: shushiqi 1539588925@qq.com
 * @LastEditTime: 2026-03-04 09:59:26
 * @FilePath: \workingspace\image-collection-notes\vite.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## vite开发模式快的核心原因
    1. 浏览器对ES Module的原生支持：按模块加载，不需要在启动时提前打包
    2. 按需编译/按需加载：只编译浏览器请求的模块，减少开销
    3. 依赖预构建：第三方依赖提前打包成扁平化模块，避免重复请求