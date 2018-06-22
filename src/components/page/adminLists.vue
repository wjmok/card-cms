<template>
  <div>
    <el-container >
    <el-header>
      <el-button type="primary" @click="handleAdd()">创建用户</el-button>
    </el-header>
    <el-main style="height: 700px; border: 2px solid #eee">
      <el-table :data="mainData" style="width: 100%">   
        <el-table-column label="用户名" prop="name">
        </el-table-column>
        <el-table-column label="真实姓名" prop="realname">
        </el-table-column>
        <el-table-column label="手机号" prop="phone">
        </el-table-column>
        <el-table-column
          label="头像"
          width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.img" >
              <div v-for="item in scope.row.img" style="display: inline-block;">
                <img :src="item.url"  style="width: 60px;border-radius: 50%;">
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="权限参数" prop="primary_scope">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="create_time">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.row)">
              编辑
            </el-button>

            <el-button
            size="small"
            v-if="userKey == scope.row.name" @click="handleEditPassword(scope.row)">变更密码
            </el-button>

            <el-button
            size="small"
            @click="handleDel(scope.row)">
            删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog  title="项目信息" :visible.sync="dialogFormVisible"  id="dialog">
        <el-form :model="Form" ref="Form" >
          <div v-if="dialogType=='two'">
            <el-form-item label="用户密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="Form.password" @change="sForm.password = arguments[0]">
              </el-input>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
            </el-input>
            </el-form-item>
            <el-form-item v-if="sForm.type == 'add'" label="密码" :label-width="formLabelWidth" prop="password">
              <el-input v-model="Form.password" @input="sForm.password = arguments[0]">
              </el-input>
            </el-form-item>
            <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realname">
              <el-input v-model="Form.realname" @input="sForm.realname = arguments[0]" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="Form.phone"  @change="sForm.phone = Form.phone" auto-complete="off"></el-input>
            </el-form-item>                    
            <el-form-item label="头像上传" prop="img">
            <imgup @imgchange ="(val)=>{imgchange(val,'sForm','img')}" :imglist = "Form.img" :imglimit = "imglimit"></imgup>
            </el-form-item>
          </div>
          

          <el-button type="primary" @click="onSubmit()">确 定</el-button>
          
        </el-form>              
      </el-dialog>

    </el-main>
    <el-footer>
      <el-pagination
        @size-change="(val) => {paginate.pagesize = val;initMainData();}"
        @current-change="(val) => {paginate.currentPage = val;initMainData();}"
        :current-page="paginate.currentPage"
        :page-sizes="[10, 50, 70, 100]"
        :page-size="paginate.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginate.count">
      </el-pagination>
    </el-footer>
  </el-container>

  </div>
  

  
  
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  
  import editor from '../common/VueEditor'; 
  import imgup from '../common/UploadImg'; 
  import {getAdminLists,editAdmin,addAdmin,delAdmin,uptPass} from '@/api/getData';
  import {notify,sCallBack,cloneForm,formatDate,imgchange} from '@/api/commonFunc';
  
  
   
  export default {

    data() {
      return {
        mainData: [],//承载主列表数据
        dialogFormVisible: false,//dialog的显示参数，默认不显示
        formLabelWidth: '120px',//设置的el-form-item的宽度
        paginate: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true,
        },//分页的基础设置参数
        searchItem:{},       
        imglimit:2,//设置上传插件允许上传的张数      
        Form: {},//承载页面数据装载
        standardForm:{
          name: '',
          appid: '',
          appsecret: '',
          app_description: '',
          scope: '',
          scope_description: '',
          app_type: '',
          img: [],
          phone: '',
          picstandard: '',
          mchid: '',
          wxkey: '',
          password: '',

        },
        sForm: {},//承载提交数据装载
        passForm:{
          password:'',
        },
        dialogType:'one',
        userKey:this.$store.getters.getUserInfo.username,
        token:this.$store.getters.getUserInfo.token,
        thirdapp_id:this.$store.getters.getUserInfo.thirdapp_id,

      }
    },
    created(){
      this.initMainData();
    },
    components: {
      editor,
      imgup,
    },
    methods: {


      //页面数据初始化
      async initMainData(){
        const self = this;
        self.mainData = [];
        const postData  = self.paginate;        
        postData.token = self.token; 
        try{
          var res = await getAdminLists(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        }; 
        if(res){
          self.paginate['count'] = res.data.total;
          self.mainData = res.data.data;
        };
      },


      //add按钮触发事件
      handleAdd(){
        const self = this;
        self.dialogType = 'one';
        self.Form = cloneForm(self.standardForm);
        self.sForm = {};
        self.sForm.type = 'add';
        self.sForm.token = self.token; 
        self.dialogFormVisible = true;
      },


      //edit按钮触发事件
      handleEdit(row) {
        const self = this;
        self.dialogType = 'one';
        self.Form = cloneForm(row);
        self.sForm = {};
        self.sForm.id = row.id;
        self.sForm.token = self.token;  
        self.sForm.type = 'edit';
        self.dialogFormVisible = true;
      },


      //delete按钮触发事件
      handleDel(row){
        const self = this;
        self.sForm = {};
        self.sForm.id = row.id;
        self.sForm.token = self.token;
        self.sForm.type = 'del';
        self.onSubmit();    
      },

      //变更密码
      handleEditPassword(row){
        const self = this;
        self.dialogType = 'two';
        self.sForm = {};
        self.Form = {};
        self.Form.password = "";
        self.sForm.id = row.id;
        self.sForm.token = self.token;
        self.sForm.type = 'upPassword';
        self.dialogFormVisible = true;
      },


      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
       
        if (self.sForm.type == 'edit') {

          delete self.sForm.type;
          try {
            var res = await editAdmin(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'add'){
        
          delete self.sForm.type;
          try {
            var res = await addAdmin(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error');              
          };
          self.sForm.type = 'add';

                                                              
        }else if(self.sForm.type == 'upPassword'){

          delete self.sForm.type;
          try {
            var res = await uptPass(self.sForm); 
  
          } catch (err) {
              console.log(err); 
              notify('网络故障','error');
          };
          self.sForm.type = 'upPassword';
          
        }else if(self.sForm.type == 'del'){
       
          delete self.sForm.type;
          try{
            var res = await delAdmin(self.sForm);
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