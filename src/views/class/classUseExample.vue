<!-- 动态样式 -->
<template>
  <div class="container">
    <!-- 字符串写法 适用于：样式的类名不确定，需要动态指定 -->
    <div class="basic-box" :class="mode">提示信息</div>
    <!-- 数组写法  适用于需要绑定的样式个数不确定、名字也不确定-->
    <div class="basic-box" :class="arr">提示信息</div>
    <!-- 三元表达式 -->
    <div class="basic-box" :class="[isHighLight ? 'hight-light' : 'normal']">
      提示信息
    </div>
    <button @click="keepHighLight">切换</button>
    <!-- 动态class 对象写法 -->
    <div class="tabs" :class="{ active: isHighLight }"></div>
    <br />
    <el-checkbox
      :indeterminate="isIndeterminateClass"
      v-model="checkAllClass"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-checkbox-group v-model="checkClassList" @change="handleCheckBoxGroup">
      <el-checkbox :label="item" v-for="item in checkOptions" :key="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <div class="basic-box" :class="checkClassListArr">提示信息</div>

    <div style="margin-top: 50px">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllCitiesChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0"></div>
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox v-for="city in cities" :label="city" :key="city.id">{{
          city.name
        }}</el-checkbox>
      </el-checkbox-group>
    </div>

    <!-- 对象形式  适用于要绑定的样式个数确定、名字确定，但要动态决定用不用-->
    <div class="basic-box" :class="classObj" style="margin-bottom: 50px">
      提示信息
    </div>

    <!-- 动态style -->
    <div class="basic-box" :style="{ fontSize: fontSize + 'px' }">
      动态style1
    </div>
    <div class="basic-box" :style="styleObj">动态style2</div>
    <div class="basic-box" :style="styleArr">动态style2</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isActived: false,
      mode: "success",
      arr: ["success", "bold", "big"],
      isHighLight: false,
      classObj: {
        success: false,
        error: false,
        bold: false,
        big: false,
      },
      fontSize: 40,
      styleObj: {
        //这里的样式font-size要写成fontSize小驼峰的形式
        fontSize: "50px",
        color: "blue",
      },
      styleObj2: {
        fontWeight: 500,
      },
      styleArr: [
        {
          fontSize: "50px",
          color: "blue",
        },
        {
          fontWeight: "700",
        },
      ],
      checkClassList: [],
      isIndeterminateClass: true,
      checkAllClass: false,
      checkOptions: [
        { id: 1, name: "成功", value: "success" },
        { id: 2, name: "错误", value: "error" },
        { id: 3, name: "加粗", value: "bold" },
        { id: 4, name: "加大", value: "big" },
      ],
      checkAll: false,
      checkedCities: [],
      cities: [
        { id: 1, name: "上海", value: "shanghai" },
        { id: 2, name: "北京", value: "beijing" },
        { id: 3, name: "广州", value: "guangzhou" },
        { id: 4, name: "深圳", value: "shenzhen" },
      ],
      isIndeterminate: true,
      checkClassListArr: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    keepHighLight() {
      this.isHighLight = !this.isHighLight;
    },
    handleCheckBoxGroup(value) {
      console.log(value); //这个value就是this.checkList
      let checkedCount = value.length;
      this.checkAllClass = checkedCount === this.checkOptions.length; //判断是否全选
      this.isIndeterminateClass =
        checkedCount > 0 && checkedCount < this.checkOptions.length;
      if (this.checkClassList.length) {
        this.checkClassList.map((item) => {
          this.checkClassListArr = [item.value];
        });
      } else {
        this.checkClassListArr = [];
      }
      console.log(this.checkClassListArr);
    },
    handleCheckAllChange(val) {
      console.log(val); //true或false
      this.checkClassList = val ? this.checkOptions : [];
      console.log(this.checkClassList);
      this.isIndeterminateClass = false;
      if (this.checkClassList.length) {
        this.checkClassList.map((item) =>
          this.checkClassListArr.push(item.value)
        );
      } else {
        console.log(111);
        this.checkClassListArr = [];
      }

      console.log(this.checkClassListArr);
    },
    handleCheckAllCitiesChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
  created() {},
  mounted() {
    //flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
    //js扁平化数组的方法flat(depth)  depth指定要提取嵌套数组的深度，默认值为 1。
    let arr = [1, 2, [3, [4, [5, 6, 2, 5]]]];
    console.log(arr.flat(1));
    console.log(arr.flat(Infinity)); //当传入Infinity时，相当于扁平化最深层次的数组
    console.log([...new Set(arr.flat(Infinity))]);

    // js ?.可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。
    //判断对象的某个属性是否存在，如果存在那么就返回整个属性的值，否则返回undefined
    const obj = {
      name: "ceshi",
      detail: {
        cat: "huahua",
      },
    };
    const name = obj.dog?.name;
    console.log(name); // undefined

    const detail = obj.detail?.cat;
    console.log(detail); //huahua

    const cat = obj.detail?.cat ?? "default name";
    console.log(cat);

    const dog = obj.detail?.dog ?? "default name";
    console.log(dog);
  },
};
</script>
<style lang="scss" scoped>
.container {
  .tabs {
    width: 50px;
    height: 50px;
    background-color: deepskyblue;
  }
  .normal {
    color: rgb(104, 104, 216);
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  .warning {
    color: burlywood;
  }
  .bold {
    font-weight: 600;
  }
  .big {
    font-size: 24px;
  }
  .hight-light {
    color: skyblue;
    font-size: 30px;
    font-weight: 700;
  }
  .active {
    background-color: skyblue;
  }
}
</style>
