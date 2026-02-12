<template>
  <div class="hello">
    <span>{{time}}</span>
    <el-button @click="dialogEnable = true">打开弹窗</el-button>

<el-dialog
  title="信息"
  :visible.sync="dialogEnable"
  width="30%"
  @close="handleClose"
>
  <el-descriptions :column="1" :labelStyle="{width:'100px'}"  >
    <el-descriptions-item
      v-for="(item, index) in dialogItem"
      :key="index"
      :label="item.label"
    >
      {{ item.value }}
    </el-descriptions-item>
  </el-descriptions>

</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      time: Date(),
      msg: 'Welcome to Your Vue.js App',
      dialogEnable: false,
      dialogItem: [
        { label: "label234", value: "value" },
        { label: "打算", value: "value2" },
        {
          label: "阿里山的空",
          value:
            "进入正题，做后台项目区别于做其它的项目，权限验证与安全性是非常重要的，可以说是一个后台项目一开始就必须考虑和搭建的基础核心功能。我们所要做到的是：不同的权限对应着不同的路由，同时侧边栏也需根据不同的权限，异步生成。这里先简单说一下，我实现登录和权限验证的思路。",
        },
        { label: "label3", value: "value4" },
        { label: "label4", value: "value5" },
      ],
    }
  },
  methods: {
    handleClose() {
      console.log("close");
      this.dialogEnable = false;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
