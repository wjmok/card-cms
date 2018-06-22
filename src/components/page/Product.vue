
<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <el-cascader
            :options="Categorydata"
            :props="defaultProps"
            @change="(val) => {searchItem.category_id = val[val.length-1];initMainData();}"
            placeholder="选择商品类别"
            change-on-select
            clearable
            >
          </el-cascader>
          <el-input style="width:200px;"  @blur="(e)=>{if(e.target._value){searchItem.name = e.target._value}else{delete searchItem.name};initMainData();}" placeholder="请输入商品名称" clearable>
          </el-input>
          <el-input style="width:200px;"  @blur="(e)=>{if(e.target._value){searchItem.id = e.target._value}else{delete searchItem.id};initMainData();}" placeholder="请输入商品ID" clearable>
          </el-input>
        </div>
      </el-header>
      <el-main>
        <div>    
          <el-button type="primary" @click="handleAdd()">添加商品</el-button>
        </div>
      </el-main>
      <el-main style="height: 600px; border: 2px solid #eee">
        <div>
          <el-table :data="tableData" style="width: 100%">

            <el-table-column type="expand">
              <template slot-scope="props">
                 
                  <el-table :data="props.row.product_model" style="width: 100%">
                    <el-table-column
                      label="型号名称"
                      prop="name" width="180">
                    </el-table-column>
                    <el-table-column
                      label="库存"
                      prop="stock_num" width="180">
                    </el-table-column>
                    <el-table-column
                      label="单价"
                      prop="price" width="180">
                    </el-table-column>

                    <el-table-column label="操作" >
                      <template slot-scope="scope">
                        <el-button
                          size="small"
                          @click="handleEditModel(scope.row)">编辑型号</el-button>
                        <el-button
                        size="small"
                        @click="handleDelModel(scope.row)">删除型号</el-button>
                        <el-button
                        size="small"
                        @click="handleRec(scope.row)">推送到</el-button>
                        
                      </template>
                    </el-table-column>
                  </el-table>  
              </template>
            </el-table-column>


            <el-table-column label="商品ID" prop="id">
            </el-table-column>
            <el-table-column label="商品名称" prop="name">
            </el-table-column>
            <el-table-column
              label="商品类别"
              prop="category.name">
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="create_time">
            </el-table-column>
            <el-table-column label="操作" >
              <template slot-scope="scope">

                <el-button
                  size="small"
                  @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button
                size="small"
                @click="handleDel(scope.row)">
                  删除
                </el-button>
                <el-button
                size="small"
                @click="handleAddModel(scope.row)">
                  添加型号
                </el-button>
                
              </template>
            </el-table-column>
          </el-table>
        </div>



        <el-dialog  title="商品信息" :visible.sync="dialogFormVisible" >
          <el-form autocomplete="off" >

            <div v-if="dialogType=='main'">
              <el-form-item label="商品名称" :label-width="formLabelWidth" >
                <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
                </el-input>
              </el-form-item>                  
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="Form.listorder" @input="sForm.listorder = arguments[0]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属分类" :label-width="formLabelWidth">
                <el-cascader
                :options="Categorydata"
                :props="defaultProps"
                v-model="Form.Category_array"
                @change="(val)=>{sForm.category_id = val[val.length-1];}"
                change-on-select
                clearable>
                </el-cascader>
              </el-form-item>
              <el-form-item label="主图片上传" >
                <imgup @imgchange = "(data)=>{imgchange(data,'sForm','mainImg')}" :imglist = "Form.mainImg" :imglimit = "imglimit"></imgup>
              </el-form-item>
              <el-form-item label="内容多图上传" >
                <imgup @imgchange = "(data)=>{imgchange(data,'sForm','bannerImg')}" :imglist = "Form.bannerImg" :imglimit = "imglimit"></imgup>
              </el-form-item>
              <el-form-item label="图文编辑" >
               <editor @contentsave = "(val)=>{sForm.content = val;Form.content = val;}" 
               :defaultcontent = "Form.content">
               </editor>
              </el-form-item> 
              <el-form-item label="passage1" :label-width="formLabelWidth">
                <el-input v-model="Form.passage1" @input="sForm.passage1 = arguments[0]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="passage2" :label-width="formLabelWidth">
                <el-input v-model="Form.passage2" @input="sForm.passage2 = arguments[0]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="passage3" :label-width="formLabelWidth">
                <el-input v-model="Form.passage3" @input="sForm.passage3 = arguments[0]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="passage4" :label-width="formLabelWidth">
                <el-input v-model="Form.passage4" @input="sForm.passage4 = arguments[0]" auto-complete="off"></el-input>
              </el-form-item>
            </div>       
            
            <div v-if="dialogType=='model'">
              <el-form-item label="型号名称" :label-width="formLabelWidth" >
                <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
                </el-input>
              </el-form-item>
              <el-form-item label="价格" :label-width="formLabelWidth" >
                <el-input v-model="Form.price" @input="sForm.price = arguments[0]">
                </el-input>
              </el-form-item>
              <el-form-item label="库存" :label-width="formLabelWidth" >
                <el-input v-model="Form.stock_num" @input="sForm.stock_num = arguments[0]">
                </el-input>
              </el-form-item>    
              <el-form-item label="主图片上传" >
                <imgup @imgchange = "(data)=>{imgchange(data,'sForm','mainImg')}" :imglist = "Form.mainImg" :imglimit = "imglimit"></imgup>
              </el-form-item>
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="Form.listorder" @input="sForm.listorder = arguments[0]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="图文编辑" >
                <editor @contentsave = "(val)=>{sForm.content = val;Form.content = val;}" 
                 :defaultcontent = "Form.content">
                </editor>
              </el-form-item>

              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-switch
                  v-model="Form.onShelf"
                  active-text="上架"
                  inactive-text="下架"
                  @change="(val) =>{sForm.onShelf = val}">
                </el-switch>
              </el-form-item>
            </div>

            <div v-if="dialogType=='rec'">
              <el-form-item label="名称" :label-width="formLabelWidth" >
                <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
                </el-input>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth" >
                <el-input v-model="Form.description" @input="sForm.description = arguments[0]">
                </el-input>
              </el-form-item> 
              <el-form-item label="主图片上传" >
                <imgup @imgchange = "imgchange" :imglist = "Form.mainImg" :imglimit = "imglimit"></imgup>
              </el-form-item>      
              <el-form-item label="推送推荐位名称" :label-width="formLabelWidth">
                <el-cascader
                :options ="themeData"
                :props="defaultProps"
                v-model="Form.theme_array"
                @change="(value)=>{sForm.theme_id = value[value.length-1]}"
                change-on-select
                clearable>
                </el-cascader>
              </el-form-item>
            </div>

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
import {sendCategoryTree,sendProductList,sendProductEdit,sendProductDel,sendProductAdd,sendProductModelAdd,sendProductModelDel,sendProductModelEdit,ThemeTree,ThemeContentAdd} from '@/api/getData';
import {notify,sCallBack,cloneForm,formatDate,imgchange,getParentNames} from '@/api/commonFunc';
import imgup from '../common/UploadImg';
import editor from '../common/VueEditor'; 
  export default {
    watch: {
      
    },
    created(){
      this.initCategoryData();
      this.initMainData();
      this.initThemeData();
      
    },
    components: {
      imgup,
      editor
    },
    data() {
      return {
        filterText: '',
        Categorydata:[],
        themeData:[],
        tableData: [],//承载主列表数据
        dialogFormVisible: false,//dialog的显示参数，默认不显示
        Form: {},//承载页面数据装载
        standardForm:{
          
          name :'',
          content :'',
          listorder :'',
          mainImg :[],
          bannerImg :[],    
          Category_array: [],

        },
        modelStandardForm:{

          mainImg: [],
          price: '',
          stock_num: '',
          name: '',
          onShelf: true,
          listorder: '',
          content :'',

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

        recStandardForm:{
          theme_array: [],
          mainImg: [],
          name: '',
          description: '',
        },

        defaultProps: {
          children: 'child',
          label: 'name',
          value: 'id',
        },
        dialogType:'main',                       
      }
    },

    methods: {

      async initCategoryData(){
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
          self.Categorydata = res.data;
        };
  
      },

      async initThemeData(){
        const self =this;
        
        const postData  = self.paginate; 
        postData.token = self.token;
        try{
          var res = await ThemeTree(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        }; 
        if(res){
          self.themeData = res.data;
          console.log(self.themeData)
        };

        
      },
      
      async initMainData(){
        const self =this;
        self.tableData = [];
        const postData  = this.paginate;
        postData.searchItem = cloneForm(self.searchItem);
        postData.token = self.token; 
        try{
          var res = await sendProductList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
        if(res){
          self.paginate['count'] = res.data.total;
          self.tableData = res.data.data;
        };
         
      },

      

      
      

      //添加商品
      handleAdd(){
        const self = this;
        self.dialogType = 'main';
        self.Form = cloneForm(self.standardForm);
        self.sForm = {};
        self.sForm.type = 'add'; 
        self.sForm.token = self.token;  
        self.dialogFormVisible = true;
      },

      



      //编辑事件
      handleEdit(row) {
        const self = this;
        self.dialogType = 'main';
        self.Form = cloneForm(row);
        self.sForm = {};
        self.sForm.id = row.id;
        self.sForm.token = self.token;
        self.sForm.type = 'edit'; 
        self.Form['Category_array'] = getParentNames(self.Categorydata,self.Form.category_id);
        self.dialogFormVisible = true;
      },
      //删除事件
      handleDel(row){

          const self = this;
          self.sForm = {};
          self.sForm.id = row.id;
          self.sForm.token = self.token; 
          self.sForm.type = 'del'; 
          self.onSubmit();                    
          
      },

      //添加型号
      handleAddModel(row){
        const self = this;
        self.dialogType = 'model';
        self.sForm = {};
        self.Form = cloneForm(self.modelStandardForm);
        self.sForm.type = 'addModel'; 
        self.sForm.product_id = row.id; 
        self.sForm.token = self.token;     
        self.dialogFormVisible = true;
      },

      //添加型号
      handleEditModel(row){
        const self = this;
        self.dialogType = 'model';
        self.sForm = {};
        console.log(row);
        self.Form = cloneForm(row);
        self.Form.onShelf = eval(self.Form.onShelf.toLowerCase());
        self.sForm.type = 'editModel'; 
        self.sForm.id = row.id; 
        self.sForm.token = self.token; 
        self.dialogFormVisible = true;
      },

      //删除型号
      handleDelModel(row){

        const self = this;
        self.sForm = {};
        self.sForm.type = 'delModel'; 
        self.sForm.id = row.id; 
        self.sForm.token = self.token; 
        self.onSubmit();

      },


      //推送事件
      handleRec(row){
        const self = this;
        self.dialogType = 'rec';
        self.sForm = {};
        self.Form = cloneForm(self.recStandardForm);
        self.sForm.relation_id = row.id;
        self.sForm.token = self.token;
        self.sForm.type = 'Rec'; 
        self.dialogFormVisible = true;
      },


      

      
      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
        if (self.sForm.type == 'edit') {

          delete self.sForm.type;
          try {
            var res = await sendProductEdit(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'add'){

          delete self.sForm.type;
          if("category_id" in self.sForm){
            try {
              var res = await sendProductAdd(self.sForm); 
            } catch (err) {
                console.log(err); 
                notify('网络故障','error');                
            };
            
          }else{
            notify('请选择类别','error');
          };
          self.sForm.type = 'add';
                                                              
        }else if(self.sForm.type == 'del'){

          delete self.sForm.type;
          try{
            var res = await sendProductDel(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'del';

        }else if(self.sForm.type == 'addModel'){

          delete self.sForm.type;
          try{
            var res = await sendProductModelAdd(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'addModel';

        }else if(self.sForm.type == 'editModel'){

          delete self.sForm.type;
          try{
            var res = await sendProductModelEdit(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'editModel';

        }else if(self.sForm.type == 'delModel'){

          delete self.sForm.type;
          try{
            var res = await sendProductModelDel(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'delModel';

        }else if(self.sForm.type == 'Rec'){

          delete self.sForm.type;
          try{
            var res = await ThemeContentAdd(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'delModel';

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