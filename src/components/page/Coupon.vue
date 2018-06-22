<template>
  <div>
    <el-container >
    <el-header>
      <el-button type="primary" @click="handleAdd()">创建优惠券</el-button>
    </el-header>
    <el-main style="height: 700px; border: 2px solid #eee">
      <el-table :data="tableData" style="width: 100%">   
        
        <el-table-column label="优惠券" prop="name">
        </el-table-column>
        <el-table-column label="描述" prop="description">
        </el-table-column>
        <el-table-column label="有效期" :formatter="(row)=>{return formatDate(row.deadline)}">
        </el-table-column>
        <el-table-column label="折扣" prop="discount">
        </el-table-column>
        <el-table-column label="抵减额" prop="deduction">
        </el-table-column>
        
        <el-table-column
          label="创建时间"
          prop="create_time">
        </el-table-column>
        <el-table-column label="操作" width="250">
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
          </template>
        </el-table-column>
      </el-table>

      <el-dialog  title="优惠券信息" :visible.sync="dialogFormVisible"  id="dialog">
        <el-form :model="Form" ref="Form" >
      
          <el-form-item label="优惠券名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
            </el-input>
          </el-form-item>

          <el-form-item label="优惠券描述" :label-width="formLabelWidth" prop="description">
            <el-input v-model="Form.description" @input="sForm.description = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="优惠券折扣" :label-width="formLabelWidth" prop="discount">
            <el-input v-model="Form.discount" @input="sForm.discount = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="优惠券抵减" :label-width="formLabelWidth" prop="deduction">
            <el-input v-model="Form.deduction" @input="sForm.deduction = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="deadline" :label-width="formLabelWidth" label="有效期">
            <el-date-picker type="date" placeholder="有效期" v-model="Form.deadline" @change="(val)=>{const time = new Date(val).getTime();sForm.deadline = time/1000 }" ></el-date-picker>
          </el-form-item>

          
          <el-form-item label="内容编辑" >
             <my-editor @contentsave = "(val)=>{sForm.content = val;Form.content = val;}" 
             :defaultcontent = "Form.content">
             </my-editor>
            </el-form-item> 
                             
          <el-form-item label="主图上传" prop="mainImg">
          <imgup @imgchange = "(data) => imgchange(data,'mainImg')" :imglist = "Form.mainImg" :imglimit = "imglimit"></imgup>
          </el-form-item>
          <el-form-item label="详情轮播上传" prop="bannerImg">
          <imgup @imgchange ="(data) => imgchange(data,'bannerImg')"  :imglist = "Form.bannerImg" :imglimit = "imglimit"></imgup>
          </el-form-item>
          <el-form-item label="预留字段1" :label-width="formLabelWidth" prop="passage1">
            <el-input v-model="Form.passage1" @input="sForm.passage1 = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="预留字段2" :label-width="formLabelWidth" prop="passage2">
            <el-input v-model="Form.passage2" @input="sForm.passage2 = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="预留字段3" :label-width="formLabelWidth" prop="passage3">
            <el-input v-model="Form.passage3" @input="sForm.passage3 = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="预留字段4" :label-width="formLabelWidth" prop="passage4">
            <el-input v-model="Form.passage4" @input="sForm.passage4 = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>

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
  import {CouponList,CouponEdit,CouponAdd,CouponDel,uptPass} from '@/api/getData';
  import {notify,sCallBack,cloneForm,formatDate,imgchange} from '@/api/commonFunc';
  
  
   
  export default {

    data() {
      return {
        tableData: [],//承载主列表数据
        dialogFormVisible: false,//dialog的显示参数，默认不显示
        dialogPassVisible: false,//dialog的显示参数，默认不显示
        formLabelWidth: '120px',//设置的el-form-item的宽度
        paginate: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true,

        },//分页的基础设置参数

        searchItem:{

        },       
        imglimit:2,//设置上传插件允许上传的张数      
        Form: {

          

        },//承载页面数据装载
        standardForm:{

          name:'',
          description:'',
          content:'',
          discount:'',
          deduction:'',
          mainImg:[],
          bannerImg:[],
          deadline:'',
          passage1:'',
          passage2:'',
          passage3:'',
          passage4:'',

        },
        sForm: {},//承载提交数据装载
        cardOptions: [
          {
            value: '1',
            label: '分值卡'
          }, 
          {
            value: '2',
            label: '时间卡'
          },
          {
            value: '3',
            label: '单次卡'
          },
        ],
        userKey:this.$store.getters.getUserInfo.username,
        token:this.$store.getters.getUserInfo.token,
        thirdapp_id:this.$store.getters.getUserInfo.thirdapp_id,

      }
    },
    created(){
      this.initMainData();
      
    },
    components: {
      'my-editor':editor,
      imgup,

    },
    methods: {

      

      //页面数据初始化
      async initMainData(){
        const self = this;
        self.tableData = [];

        const postData  = self.paginate;        
        postData.token = self.token; 

        try{
          var res = await CouponList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.paginate['count'] = res.data.total;
          self.tableData = res.data.data;
        };
      },


      //add按钮触发事件
      handleAdd(){

        const self = this;
        self.Form = cloneForm(self.standardForm);
        self.sForm = {};
        
        self.sForm.type = 'add';
        self.sForm.token = self.token; 

        this.dialogFormVisible = true;
      },


      //edit按钮触发事件
      handleEdit(row) {

        const self = this; 
        self.Form = cloneForm(row);
        self.sForm = {};
        

        self.Form.deadline = row.deadline*1000;
        self.sForm.id = row.id;
        self.sForm.token = self.token;  
        self.sForm.type = 'edit';

        this.dialogFormVisible = true;
      },


      //delete按钮触发事件
      async handleDel(row){

        const self = this;
        self.sForm = {};
        
        self.sForm.id = row.id;
        self.sForm.token = self.token;
        self.sForm.type = 'del';

        self.onSubmit();
        
        
        
      },

     

      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
       

        if (self.sForm.type == 'edit') {

          delete self.sForm.type;
          try {
            var res = await CouponEdit(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'add'){
        
          delete self.sForm.type;
          try {
            var res = await CouponAdd(self.sForm); 
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
            var res = await CouponDel(self.sForm);
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'del';

        };

        

        if(res){
          var fCall =  sCallBack(res);
          if(fCall == 'success'){
            if(self.sForm.type == 'upPassword'){
              self.dialogPassVisible = false;
            }else{
              self.dialogFormVisible = false;
            };
            self.initMainData();
          };
        };
        

      },
     



      //图片上传的回调
      imgchange(data,item){
          return imgchange(this,data,'sForm',item);
      },

      //时间处理
      formatDate(data) {
          var date = new Date(data*1000);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
      },
      
      
    
 

    }
  }
</script>