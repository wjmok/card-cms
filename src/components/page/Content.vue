
<template>
  <div>
    <el-container>
      <el-header>
        <div>
          选择菜单查询文章列表:
          <el-cascader
            :options="menudata"
            :props="defaultProps"
            @change="(val) => {searchItem.menu_id = val[val.length-1];initMainData();}"
            change-on-select
            clearable
            >
          </el-cascader>
        </div>
      </el-header>
      <el-main>
        <div>    
          <el-button type="primary" @click="handleAdd()">添加门店</el-button>
        </div>
      </el-main>
      <el-main style="height: 600px; border: 2px solid #eee">
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="标题" prop="title">
            </el-table-column>
            <el-table-column
              label="关键词"
              prop="keywords">
            </el-table-column>
            <el-table-column
              label="副标题"
              prop="small_title">
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
                <el-button
                size="small"
                @click="handleCopy(scope.row)">推送</el-button>
                <el-button
                size="small"
                @click="handleRec(scope.row)">推送到</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog  title="文章信息" :visible.sync="dialogFormVisible" >
          <el-form autocomplete="off" > 
            <div v-if="dialogType=='main'">
              <el-form-item label="主标题" :label-width="formLabelWidth" >
                <el-input v-model="Form.title" @input="sForm.title = arguments[0]">
                </el-input>
              </el-form-item>
              <el-form-item label="副标题" :label-width="formLabelWidth" >
                <el-input v-model="Form.small_title" @input="sForm.small_title = arguments[0]">
                </el-input>
              </el-form-item>                   
              <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="Form.listorder" @input="sForm.listorder = arguments[0]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="所属菜单" :label-width="formLabelWidth">
                <el-cascader
                :options="menudata"
                :props="defaultProps"
                v-model="Form.menu_array"
                @change="(val)=>{sForm.menu_id = val[val.length-1];}"
                change-on-select
                clearable>
                </el-cascader>
              </el-form-item>
              <el-form-item label="描述" :label-width="formLabelWidth" >
                <el-input v-model="Form.description" @input="sForm.description = arguments[0]">
                </el-input>
              </el-form-item>
              <el-form-item label="关键词" :label-width="formLabelWidth" >
                <el-input v-model="Form.keywords" @input="sForm.keywords = arguments[0]">
                </el-input>
              </el-form-item>
              <el-form-item label="内容电话（特有）" :label-width="formLabelWidth" >
                <el-input v-model="Form.contactPhone" @input="sForm.contactPhone = arguments[0]">
                </el-input>
              </el-form-item>
              <el-form-item label="封面图片上传" >
                <imgup @imgchange = "(val)=>{imgchange(val,'sForm','img')}" :imglist = "Form.img" :imglimit = "imglimit"></imgup>
              </el-form-item>
              <el-form-item label="内容多图上传" >
                <imgup @imgchange = "(val)=>{imgchange(val,'sForm','bannerImg')}" :imglist = "Form.bannerImg" :imglimit = "imglimit"></imgup>
              </el-form-item>
              <el-form-item label="图文编辑" >
               <editor @contentsave = "(val)=>{sForm.content = val;Form.content = val;}" 
               :defaultcontent = "Form.content">
               </editor>
              </el-form-item>
            </div>
            <div v-if="dialogType=='copy'">
              <el-form-item label="菜单名称" :label-width="formLabelWidth">
                <el-cascader
                :options ="menudata"
                :props="defaultProps"
                v-model="Form.menu_array"
                @change="(value)=>{sForm.menu_id = value[value.length-1]}"
                change-on-select
                clearable
                >
                </el-cascader>
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
                clearable
                >
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
import {getMenutree,getArtList,sendEditArt,sendArtDel,sendArtAdd,ThemeTree,ThemeContentAdd} from '@/api/getData';
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
      this.initMenuData();
      this.initThemeData();
      this.initMainData();
      
    },
    components: {
      imgup,
      editor
    },
    data() {
      return {
        filterText: '',
        menudata:[],
        themeData:[],
        tableData: [],//承载主列表数据
        dialogFormVisible: false,//dialog的显示参数，默认不显示
        recDialogFormVisible: false,//dialog的显示参数，默认不显示
        copyDialogFormVisible: false,//dialog的显示参数，默认不显示
        Form: {},//承载页面数据装载
        standardForm:{
          
          title :'',
          small_title :'',
          description :'',
          keywords :'',
          small_title :'',
          content :'',
          listorder :'',
          img :[],
          bannerImg :[],
          contactPhone :'',
          menu_array: [],

        },
        copyStandardForm:{
          menu_array: [],
        },
        recStandardForm:{
          theme_array: [],
          mainImg: [],
          name: '',
          description: '',
        },
        sForm: {},//承载提交数据装载
        imglimit:10,//设置上传插件允许上传的张数
        formLabelWidth: '120px',//设置的el-form-item的宽度
        

        token:this.$store.getters.getUserInfo.token,
        searchItem:{
          menu_id:15
        },
        options: [],
        PosOptions:[],
        
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
        },
        dialogType:'main',                       
      }
    },

    methods: {



      async initMenuData(){
        const self =this;
        const postData = {};
        postData.token = self.token;
        postData.searchItem = {
          parentid:8
        };

        try{
          var res = await getMenutree(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.menudata = res.data[0].child;
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
          var res = await getArtList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.paginate['count'] = res.data.total;
          self.tableData = res.data.data;
        };
         
      },

      
      

      
      

      //添加文章
      handleAdd(){
        const self = this;
        self.dialogType = 'main';
        self.Form = cloneForm(self.standardForm);
        self.sForm = {};
        self.sForm.type = 'add'; 
        self.sForm.token = self.token;  
        self.sForm.menu_id = 15;  
        this.dialogFormVisible = true;
      },

      



      //编辑事件
      handleEdit(row) {
        const self = this;
        self.dialogType = 'main';
        self.Form = cloneForm(row);
        self.sForm = {};
        self.Form['content'] =  row['article_content']['content'];
        self.sForm.id = row.id;
        self.sForm.token = self.token;
        self.sForm.type = 'edit';
        const results=[];
        getParentNames(self.menudata,self.Form.menu_id,results);
        results.push(self.Form.menu_id); 
        self.Form['menu_array'] = results;  
        self.dialogFormVisible = true;
      },
      //删除事件
      async handleDel(row){

          const self = this;
          self.sForm = {};
          self.sForm.id = row.id;
          self.sForm.token = self.token; 
          self.sForm.type = 'del'; 
          self.onSubmit();         
                   
          
      },

      //复制事件
      handleCopy(row){

        const self = this;
        self.dialogType = 'copy';
        self.sForm = cloneForm(row);
        self.Form = cloneForm(self.copyStandardForm);
        delete self.sForm.id;
        delete self.sForm.create_time;
        delete self.sForm.delete_time;
        delete self.sForm.menu_id;
        delete self.sForm.thirdapp_id;
        delete self.sForm.update_time;
        delete self.sForm.view_count;
        delete self.sForm.status;
        delete self.sForm.article_content;
        self.sForm.content = row.article_content.content;
        self.sForm.type = 'add'; 
        self.sForm.token = self.token; 
        self.dialogFormVisible = true;

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
            var res = await sendEditArt(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'add'){

          delete self.sForm.type;
          if("menu_id" in self.sForm){
            try {
              var res = await sendArtAdd(self.sForm); 
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
            var res = await sendArtDel(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'del';

        }else if(self.sForm.type == 'Rec'){

          delete self.sForm.type;
          try{
            var res = await ThemeContentAdd(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'Rec';

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