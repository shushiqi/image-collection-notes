<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2026-01-28 11:01:25
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-02-02 15:43:30
 * @FilePath: \workingspace\image-collection-notes\interview.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## Vue3 的响应式原理
[vue3简易实现](./simple-vue3.js)
    - Vue2 响应式原理
        1. 对象：通过 Object.defineProperty 对数据进行劫持（只会劫持已经存在的属性），新增和删除属性不会通知到视图；
        2. 数组：通过重写数组方法来实现和劫持（对数组的变异方法进行了包裹）；
        3. 缺点：初始化的时候对每个属性进行遍历，如果属性值是对象，会进行深度遍历，造成性能问题；
        4. 缺点：新增和删除属性，不会触发更新；
        5. 缺点：数组的索引和长度变化，不会触发更新。
    - Vue3 响应式原理
        1. Vue3 通过 ES6 的 Proxy 对象来实现响应式（能够检测到对象和数组的变化），不需要初始化的时候遍历整个对象，新增和删除属性会触发更新；
        2. Vue3 的响应式是惰性的，只有在真正访问数据的时候才会进行依赖收集；
        3. Vue3 的响应式是精确的，只会对需要响应式的数据进行劫持，不需要对整个对象进行劫持；
    - 在vue3中，使用proxy代理对象，使用ref时必须使用`a.value`，本质是`a:{value}`为了保持和reactive的一致性，

## 为什么 vue2 需要 this，vue3 不用

    - Vue2 需要 this，是因为它基于“对象 + 选项式 API”；
    - Vue3 不需要 this，是因为它基于“函数 + 组合式 API”。
    - 总结
        Vue2 基于组件实例模型，所有状态和能力都挂载在实例上，因此必须通过 this 访问；
        Vue3 引入 Composition API，将组件逻辑收敛到 setup 函数中，利用函数作用域和闭包管理状态，从而消除了 this 带来的指向、类型和复用问题。这是一次从“面向实例”到“面向函数”的设计升级

## 为什么 vue3 要引入 `<script setup>`

    - <script setup> 消除了 setup 返回对象的心智负担，让代码结构更扁平，更利于组合和拆分。
    - 既然这么好，为什么不全用？
        ❌ 不适合的场景
        1. 动态 return（极少）
        2. 需要高度控制暴露边界（库级组件）
        3. 迁移老 Vue2 / Options API

| 对比点   | setup()     | `<script setup>` |
| -------- | ----------- | ---------------- |
| 执行时机 | 运行时      | 编译期           |
| return   | 必须        | 自动             |
| 模板可见 | return 决定 | 顶层变量         |
| TS 体验  | 一般        | 极佳             |
| 心智负担 | 中          | 低               |

    - 总结：<script setup> 是 Vue3 提供的编译期语法糖，它在构建阶段把代码转换为标准的 setup 函数，自动完成变量暴露和类型推导，减少样板代码，让 Composition API 更贴近普通函数式开发。
