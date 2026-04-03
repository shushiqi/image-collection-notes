## 装箱(boxing)
    - 把一个“原始值（primitive）”，临时包装成一个“对象”，以便调用对象的方法或访问属性
    - 为什么？原始值没有方法，无法调用
        - 例如'abc'.toUpperCase()实际运行是可以的
        -   `'abc'.length`等价于`new String('abc').length`
        - 这个 String 对象是 临时的,用完立刻销毁,永远拿不到它的引用
    - 装箱过程原理
        1. 创建对应的包装对象(String/Number/Boolean)
        2. primitive 放进对象内部
        3. 调用方法
        4. 销毁对象
    - 可装箱对象
        - string/number/boolean/symbol/bigint
        - null / undefined 不会装箱