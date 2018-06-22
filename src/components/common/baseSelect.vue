<template>
  <el-select @change="handlechange" :value="selectedvalue" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"     
      :value="item.value"
      >
    </el-option>
  </el-select>
</template>

<script>
  export default {

    props:{
      options: {
            type: Array,
            default: function () {
              return []
            } 
      },
      initvalue:{
            type: String,
            default: ""

      }
    },
    data() {
      return {
        
        selectedvalue: ""
      }
    },
    watch:{

        initvalue(val) {
           
           if(this.initvalue == "#"){
       this.selectedvalue = '';
       
       }else{
       this.selectedvalue = this.initvalue;
       };
          
        },
        
      },
    created(){
      if(this.initvalue == "#"){
       this.selectedvalue = '';

       }else{
       this.selectedvalue = this.initvalue;
       }
     
    },
    methods:{

    handlechange(value){
    this.selectedvalue= value;
    console.log(value)
    this.$emit('selectChange',value);

    }



    }
  }
</script>