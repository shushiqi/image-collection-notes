<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2026-01-28 11:01:25
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2026-02-02 15:43:30
 * @FilePath: \workingspace\image-collection-notes\interview.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## Vue3 的响应式原理 [vue3 简易实现](./simple-vue3.js)

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

### vue3 [简易实现](./simple-vue3.js)的缺点

    1. effect 嵌套（effect 栈）
    2. cleanup 旧依赖
    3. scheduler（批量更新）
    4. 区分 ADD / SET / DELETE
    5. computed 的懒执行
    6. ref 对基本类型的支持

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

## 既然 JS 里“一切皆对象”，为什么 Vue3 还要区分 reactive 和 ref？
为什么基础类型不能直接 reactive(1)？
    - 因为reactive响应式本质是：`proxy`代理的是对象的行为，基础类型无法代理,`proxy`仅能代理对象
    - js中一切皆对象？ 语义上成立，运行机制上不成立；基础类型是值，并非对象，`只是访问属性时被临时封装成对象,即[装箱](./js.md#装箱boxing)(boxing)`

## reactive与ref
    - 为什么不把基础类型`1`包装成`{value:1}`
        - 语义不一致：ref明确把`.value`暴露出来
        - 解构必失效
        - 心智模型更清晰，让值和容器进行区分
    - 如果包装了会怎么样？
        - 违反 JS 语义
        - 引入“看不见的魔法”：vue必然要在后台做更多hack处理
        - 更难调试
        - 不包装是基于工程设计和语言边界的选择
        - 总结：虽然 ref(1) 在实现上类似 reactive({ value: 1 })，但 ref 在解包规则、依赖追踪粒度、解构安全性和可替换性上都有刻意设计的语义差异；它不是语法糖，而是为“值语义状态”设计的一等公民。

## 银行后台权限树场景

    - 虚拟滚动 / 懒渲染
        1. Vue2 可以用第三方组件（如 vue-virtual-scroll-list）或自己在 el-tree 上用 lazy-load + load-children 异步渲染子节点
        2. 只渲染可视节点
    - 懒加载子节点
        1. 如果树很深，先只渲染父节点
        2. 展开时再加载子节点
        3. 配合接口分页
    - 避免全量响应式
        1. 只对需要勾选状态的节点做响应式
        2. 大对象可用普通对象存储其余字段，避免性能开销
    - 减少 watcher / computed 层级
        1. 勾选状态不要绑定过多 computed
            2. 直接操作 checkedKeys 数组 + getCheckedNodes 方法

    - 回答模版
        性能优化：懒渲染/虚拟滚动；懒加载子节点；减少响应式深度
        回显与提交：
            回显：setCheckedKeys(menuIds)
            提交：getCheckedKeys + getHalfCheckedKeys
            接口只返回必要字段
        父子联动：
            利用 el-tree 内置联动，或者自己用 check-change 递归
                半选状态自动计算
