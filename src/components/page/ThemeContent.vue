
<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <el-cascader
            :options="themeData"
            :props="defaultProps"
            :value="[searchItem.theme_id]"
            @change="(val) => {searchItem.theme_id = val[val.length-1];initMainData();}"
            placeholder="选择主题类别"
            change-on-select
            clearable
            >
          </el-cascader>
          <el-input style="width:200px;"  @blur="(e)=>{if(e.target._value){searchItem.name = e.target._value}else{delete searchItem.name};initMainData();}" placeholder="请输入主题内容名称" clearable>
          </el-input>
        </div>
      </el-header>
      
      <el-main style="height: 600px; border: 2px solid #eee">
        <div v-if="mainData[0]&&mainData[0].theme.themeType == 'article'">
          <el-table :data="mainData" style="width: 100%">
            <el-table-column label="主题标题" >
              <template slot-scope="scope">
                <span v-if="scope.row.name!=null">{{scope.row.name}}</span>
                <span v-if="scope.row.title!=null">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="关联类型">
              <template slot-scope="scope">
                <span >文章</span>
              </template>
            </el-table-column>

            <el-table-column
              label="文章标题" prop="relationinfo.title">
            </el-table-column>
            
            <el-table-column
              label="创建时间"
              prop="create_time">
            </el-table-column>

            <el-table-column label="操作" >
              <template slot-scope="scope">
                
                <el-button
                size="small"
                @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                size="small"
                @click="handleDel(scope.row)">删除</el-button>
                
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="mainData[0]&&mainData[0].theme.themeType == 'product'">
          <el-table :data="mainData" style="width: 100%">
            <el-table-column label="主题标题" >
              <template slot-scope="scope">
                <span v-if="scope.row.name!=null">{{scope.row.name}}</span>
                <span v-if="scope.row.title!=null">{{scope.row.title}}</span>
                
              </template>
            </el-table-column>
            <el-table-column
              label="关联类型">
              <template slot-scope="scope">
                <span >商品</span>
              </template>
            </el-table-column>

            <el-table-column
              label="产品标题" prop="relationinfo.name">
            </el-table-column>
            
            <el-table-column
              label="创建时间"
              prop="create_time">
            </el-table-column>

            <el-table-column label="操作" >
              <template slot-scope="scope">
                
                <el-button
                size="small"
                @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                size="small"
                @click="handleDel(scope.row)">删除</el-button>
                
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog  title="主题信息" :visible.sync="dialogFormVisible" >
          <el-form autocomplete="off" >        
            <el-form-item label="名称" :label-width="formLabelWidth" >
              <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
              </el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth" >
              <el-input v-model="Form.description" @input="sForm.description = arguments[0]">
              </el-input>
            </el-form-item>                   
            <!--<el-form-item label="所属类别" :label-width="formLabelWidth">
              <el-cascader
              :options="themeData"
              :props="defaultProps"
              v-model="Form.Theme_array"
              @change="(val)=>{sForm.Theme_id = val[val.length-1];}"
              change-on-select
              clearable
              >
              </el-cascader>
            </el-form-item>-->
            
            <el-form-item label="主图上传" >
              <imgup @imgchange = "(data)=>{imgchange(data,'sForm','mainImg')}" :imglist = "Form.img" :imglimit = "imglimit"></imgup>
            </el-form-item>
                                     
            <el-button type="primary" @click="onSubmit()">确 定</el-button>          
          </el-form>              
        </el-dialog>

        
      </el-main>
      <el-footer style="margin-top:20px;">
        <div>
          <el-pagination
            @size-change="(val) => {paginate.pagesize = val;initMainData();}"
            @current-change="(val) => {paginate.currentPage = val;initMainData();}"
            :current-page="paginate.currentPage"  
            :page-sizes="[10, 50, 70, 100]"
            :page-size="paginate.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginate.count">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {ThemeTree,ThemeContentList,ThemeContentEdit,ThemeContentDel} from '@/api/getData';


import {notify,sCallBack,cloneForm,formatDate,imgchange,getParentNames} from '@/api/commonFunc';
import imgup from '../common/UploadImg';
import editor from '../common/VueEditor'; 
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    created(){
      this.initThemeData();
      
      
    },
    components: {
      imgup,
      editor
    },
    data() {
      return {
        filterText: '',
        themeData:[],
        mainData: [],//承载主列表数据
        dialogFormVisible: false,//dialog的显示参数，默认不显示
        Form: {},//承载页面数据装载
        standardForm:{
          
          name :'',
          description :'',
          mainImg :[],
          Theme_array: [],

        },
        sForm: {},//承载提交数据装载
        imglimit:10,//设置上传插件允许上传的张数
        formLabelWidth: '120px',//设置的el-form-item的宽度
        token:this.$store.getters.getUserInfo.token,
        searchItem:{},
        paginate: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true
        },//分页的基础设置参数
        defaultProps: {
          children: 'child',
          label: 'name',
          value: 'id',
        }                        
      }
    },

    methods: {


      async initThemeData(){
        const self =this;
        const postData = {};
        postData.token = self.token;

        try{
          var res = await ThemeTree(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.themeData = res.data;
          if(self.themeData[0]){
            self.searchItem.theme_id = self.themeData[0].id;
          }
          self.initMainData();
        };

        
      },
      
      async initMainData(){
        const self =this;
        self.mainData = [];

        const postData  = this.paginate;
        postData.searchItem = cloneForm(self.searchItem);
        postData.token = self.token; 
        
        
        try{ 
            var res = await ThemeContentList(postData); 
        }catch(err){ 
          notify('网络故障','error');
        };
         
        if(res){
            self.paginate['count'] = res.data.total;
            self.mainData = res.data.data;
          
        };
         
      },

      

      
      

      

      



      //编辑事件
      handleEdit(row) {

        const self = this;
        self.Form = cloneForm(row);
        self.sForm = {};
        self.sForm.id = row.id;
        self.sForm.token = self.token;
        self.sForm.type = 'edit'; 
        self.Form['Theme_array'] = getParentNames(self.themeData,self.Form.Theme_id);
        self.dialogFormVisible = true;

      },

      //删除事件
      async handleDel(row){

          const self = this;
          self.sForm = {};
          self.sForm.id = row.id;
          self.sForm.token = self.token; 
          self.sForm.themeType = row.theme.themeType; 
          self.sForm.theme_id = 0; 
          self.sForm.type = 'del'; 
          self.onSubmit();         
                   
      },


      

      


      

      
      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
        if (self.sForm.type == 'edit') {

          delete self.sForm.type;
          try {
            var res = await ThemeContentEdit(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'del'){

          delete self.sForm.type;
          
          try{          
            var res = await ThemeContentDel(self.sForm);
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
            self.initMainData();
          };
        };
        

      },
      
      //图片上传的回调
      imgchange(data,formName,fieldName){
          return imgchange(this,data,formName,fieldName);
      },
      
      




    }   
  }
</script>