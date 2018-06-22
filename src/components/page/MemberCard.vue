<template>
  <div>
    <el-container >
    <el-header>
      <el-button type="primary" @click="handleAdd()">创建卡类型</el-button>
    </el-header>
    <el-main style="height: 700px; border: 2px solid #eee">
      <el-table :data="tableData" style="width: 100%">   
        <el-table-column label="会员卡级别" prop="cardLevel">
        </el-table-column>
        <el-table-column label="卡名称" prop="name">
        </el-table-column>
        <el-table-column label="积分" prop="scoreValue">
        </el-table-column>
        <el-table-column label="价格" prop="price">
        </el-table-column>
        <el-table-column label="卡描述" prop="description">
        </el-table-column>
        <el-table-column label="有效期" prop="deadline">
        </el-table-column>
        <el-table-column label="价格" prop="price">
        </el-table-column>
        <el-table-column label="卡类型" >
          <template slot-scope = "scope">
            <span v-if="scope.row.cardType == 1">
              分值卡
            </span>
            <span v-if="scope.row.cardType == 2">
              时间卡
            </span>
            <span v-if="scope.row.cardType == 3">
              单次卡
            </span>
          </template>
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
            @click="handleDel(scope.row)">
            删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog  title="卡信息" :visible.sync="dialogFormVisible"  id="dialog">
        <el-form :model="Form" ref="Form" >
      
          <el-form-item label="卡名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
            </el-input>
          </el-form-item>
          
          <el-form-item label="卡等级" :label-width="formLabelWidth" prop="cardLevel">
            <el-input v-model="Form.cardLevel" @input="sForm.cardLevel = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="卡描述" :label-width="formLabelWidth" prop="description">
            <el-input v-model="Form.description" @input="sForm.description = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
            <el-input v-model="Form.price" @input="sForm.price = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="积分" :label-width="formLabelWidth" prop="scoreValue">
            <el-input v-model="Form.scoreValue" @input="sForm.scoreValue = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="有效期" :label-width="formLabelWidth" prop="deadline">
            <el-input v-model="Form.deadline"  @change="sForm.deadline = Form.deadline" auto-complete="off"></el-input>
          </el-form-item> 

          <el-form-item label="卡类型" :label-width="formLabelWidth" prop="cardType">
            
            <el-select v-model="Form.cardType"  @change="(value) => { 
            Form.cardType = value;sForm.cardType = value}" placeholder="请选择卡类型" clearable >

              <el-option v-for="item in cardOptions" :label="item.label" :value="item.value"></el-option>

            </el-select>

          </el-form-item>

         

          <el-form-item label="内容编辑" >
             <editor @contentsave = "(val)=>{sForm.content = val;Form.content = val;}" 
             :defaultcontent = "Form.content">
             </editor>
            </el-form-item> 
                             
          <el-form-item label="主图上传" prop="mainImg">
          <imgup @imgchange ="(val)=>{imgchange(val,'mainImg')}"  :imglist = "Form.mainImg" :imglimit = "imglimit"></imgup>
          </el-form-item>
          <el-form-item label="详情轮播上传" prop="bannerImg">
          <imgup @imgchange ="(val)=>{imgchange(val,'bannerImg')}" :imglist = "Form.bannerImg" :imglimit = "imglimit"></imgup>
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
  import {MemberCardList,MemberCardEdit,MemberCardAdd,MemberCardDel,uptPass} from '@/api/getData';
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

          name: '',
          cardLevel: '',
          description: '',
          content: '',
          price: '',
          mainImg: [],
          bannerImg: [],
          scoreValue: '',
          deadline: '',
          cardType: '',
         

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
      editor,
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
          var res = await MemberCardList(postData);
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
            var res = await MemberCardEdit(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'add'){
        
          delete self.sForm.type;
          try {
            var res = await MemberCardAdd(self.sForm); 
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
            var res = await MemberCardDel(self.sForm);
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
      
      
    
 

    }
  }
</script>