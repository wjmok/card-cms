


<template>

  <div>
    <el-container>
      <el-header>
        关键词查询:
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText" style="width:260px!important">
        </el-input>

      </el-header>
      <el-main style="height: 500px; border: 2px solid #eee">
        <el-tree
          class="filter-tree"
          :data="MainData"
          :props="defaultProps"
          node-key="id"
          show-checkbox
          accordion
          check-strictly
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>

        <el-dialog  title="菜单信息" :visible.sync="dialogFormVisible" >
          <el-form autocomplete="off" >      
            <el-form-item label="菜单名称" :label-width="formLabelWidth" >
              <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
              </el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" >
              <el-input v-model="Form.description" @input="sForm.description = arguments[0]">
              </el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="Form.listorder" @input="sForm.listorder = arguments[0]" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="sForm.type == 'edit'" label="父级菜单" :label-width="formLabelWidth">
              <el-cascader
                :options="MainData"
                :props="defaultProps"
                v-model="Form.parentCategory_array"
                @change="(val) => {sForm.parentid = val[val.length-1]}"
                change-on-select
                clearable
                >
              </el-cascader>
            </el-form-item>                    
            <el-form-item label="img图片上传" >
              <imgup @imgchange = "(data)=>{imgchange(data,'sForm','img')}" :imglist = "Form.img" :imglimit = "imglimit">
              </imgup>
            </el-form-item>
            <el-button type="primary" @click="onSubmit()">确 定</el-button>        
          </el-form>              
        </el-dialog>

        

      </el-main>
      <el-footer style="margin-top:20px;">
        <div class="buttons">
          <el-button v-if="passKey == 'chuncuiwangluo'" @click="handleAddfirst">添加一级菜单</el-button>
          <el-button v-if="passKey == 'chuncuiwangluo'" @click="handleAddchild">添加子菜单</el-button>
          <el-button @click="handleEdit">编辑</el-button>
          <el-button v-if="passKey == 'chuncuiwangluo'" @click="deleteCategory">删除</el-button>  
        </div>
      </el-footer>
    </el-container>
  </div>
 
</template>

<script>
import {sendCategoryTree,sendCategoryEdit,sendCategoryAdd,sendCategoryDel} from '@/api/getData';
import {notify,sCallBack,cloneForm,formatDate,imgchange,getParentNames,getArrayByTarget} from '@/api/commonFunc';
import imgup from '../common/UploadImg';
import baseSelect from '../common/baseSelect';
import editor from '../common/VueEditor';
import axios from '../../http.js';
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },

    created(){
      this.initMainData();
    },

    components: {
      
      imgup,
      baseSelect,
      editor,

    },

    data() {
      return {
        filterText: '',
        MainData:[],
        Form: {},//承载页面数据装载
        standardForm:{
          name:'',
          listorder:'',
          img:[],
          description:'',
          parentid:'',
          parent_array:[],
        },
        artStandardForm:{
          title:'',
          small_title:'',
          description:'',
          keywords:'',
          img:[],
          content:'请输入内容',
        },
        sForm: {},//承载提交数据装载
        dialogFormVisible: false,//dialog的显示参数，默认不显示
        artDialogFormVisible: false,//dialog的显示参数，默认不显示
        imglimit:1,//设置上传插件允许上传的张数
        formLabelWidth: '120px',//设置的el-form-item的宽度
        passKey:this.$store.getters.getUserInfo.password,
        token:this.$store.getters.getUserInfo.token,
        searchItem:{}, 
        defaultProps: {
          children: 'child',
          label: 'name',
          value: 'id',
        }
      }
    },

    methods: {
      

      async initMainData(){
        const self =this;
        const postData = {};
        postData.token = self.token;
        try{
          var res = await sendCategoryTree(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
        if(res){
          self.MainData = res.data;
        };
      },

      

      //添加一级菜单
      handleAddfirst(){
        const self = this;
        self.resetChecked();
        self.Form = cloneForm(self.standardForm);
        self.sForm = {};
        self.sForm.type = 'add'; 
        self.sForm.parentid = '0'; 
        self.sForm.token = self.token;
        setTimeout(function () {  
             self.dialogFormVisible = true  
          }, 500);
      },

      //添加子菜单
      handleAddchild(){
        const self = this;
        self.Form = cloneForm(self.standardForm);
        self.sForm = {};  
        const res = self.getCheckedNodes();
        if(res){
          self.sForm.parentid = res.id;
          self.sForm.type = 'add'; 
          self.sForm.token = self.token;            
          setTimeout(function () {  
             self.dialogFormVisible = true  
          }, 500);
        }
      },
      
      //编辑事件
      handleEdit() {
        const self = this;
        self.sForm = {};
        const res = self.getCheckedNodes();
        if(res){

          self.Form = cloneForm(res);
          self.sForm.id = res.id;
          self.sForm.type = 'edit'; 
          self.sForm.token = self.token;
          self.Form['parentCategory_array'] = getParentNames(self.MainData,self.Form.parentid);
          console.log(self.Form); 
          setTimeout(function () {  
             self.dialogFormVisible = true  
          }, 500); 
          
        }            
      },

      //删除事件
      deleteCategory(){
        const self = this;
        self.sForm = {};
        const delres = self.getCheckedNodes();
        if(delres){
          self.sForm.id = delres.id;
          self.sForm.token = self.token;
          self.sForm.type = 'del';
          self.onSubmit();
        }

      },




      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
        console.log(self.sForm);
       
        if (self.sForm.type == 'edit') { 
          
          if(self.sForm.parentid){
            if(self.sForm.parentid == self.sForm.id){
              notify('父级不能与子集相同','error');
              console.log('execute');
              return false;
            }else{
              const mres = getArrayByTarget(self.MainData,'id',self.sForm.parentid);
              if(mres.length > 0 && mres[0].parentid == self.sForm.id){
                self.sForm.cCategoryid = mres[0].id;
                delete self.sForm.parentid;
              }
            }
          }else if(self.sForm.parentid == undefined){
            self.sForm.parentid = '0';
          };
          
          delete self.sForm.type;
          try {
            var res = await sendCategoryEdit(self.sForm);
          } catch (err) {
            console.log(err); 
            notify('网络故障','error');              
          };
          self.sForm.type = 'edit';

        }else if(self.sForm.type == 'add'){

          delete self.sForm.type;
          try {
             var res = await sendCategoryAdd(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error');             
          };
          self.sForm.type = 'add';

        }else if(self.sForm.type == 'del'){

          delete self.sForm.type;
          try{
            var res = await sendCategoryDel(self.sForm);
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'del';

        };

        if(res){
          var fCall =  sCallBack(res);
          if(fCall == 'success'){ 
            self.dialogFormVisible = false;     
            self.resetChecked();
            self.initMainData();
          };
        };
        
      },
      

      

      



      //Category过滤筛选事件
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      //获取Category tree点击事件
      getCheckedNodes() {
        const data = this.$refs.tree.getCheckedNodes();
        if(data.length > 1){
            notify('请只选择一个菜单','warning');
            this.resetChecked(); 
        };
        if(data.length == 1){
           return data[0];
        };
        if(data.length == 0){
          notify('请选择一个菜单','warning');
          this.resetChecked();
        }
      },

      //清空选中上传状态
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },



      //图片上传的回调
      imgchange(data,formName,fieldName){
        return imgchange(this,data,formName,fieldName);
      },




      
    }
  }
</script>