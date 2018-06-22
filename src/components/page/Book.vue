<template>
  <div>
    <el-container >
    <el-header>
      <el-button type="primary" @click="handleAdd()">创建预约</el-button>
    </el-header>
    <el-main style="height: 700px; border: 2px solid #eee">
      <el-table :data="tableData" style="width: 100%">   
        
        <el-table-column label="预约名称" prop="name">
        </el-table-column>
        
        <el-table-column label="数量限制" prop="limitNum">
        </el-table-column>
        <el-table-column label="价格" prop="price">
        </el-table-column>
        <el-table-column label="预约描述" prop="description">
        </el-table-column>
        <el-table-column
          label="开始时间"
           :formatter="(row)=>{return formatDate(row.start_time)}">
        </el-table-column>
        <el-table-column
          label="截止时间"
           :formatter="(row)=>{return formatDate(row.end_time)}">
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

      <el-dialog  title="预约信息" :visible.sync="dialogFormVisible"  id="dialog">
        <el-form :model="Form" ref="Form" >
      
          <el-form-item label="预约名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
            </el-input>
          </el-form-item>
          
          <el-form-item label="预约数量" :label-width="formLabelWidth" prop="bookNum">
            <el-input v-model="Form.bookNum" @input="sForm.bookNum = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="预约描述" :label-width="formLabelWidth" prop="description">
            <el-input v-model="Form.description" @input="sForm.description = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="预约价格" :label-width="formLabelWidth" prop="price">
            <el-input v-model="Form.price" @input="sForm.price = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="start_time" :label-width="formLabelWidth" label="活动开始时间">

              <el-date-picker
                v-model="Form.start_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择开始时间"
                @change="(val)=>{sForm.start_time = val/1000 }">
              </el-date-picker>

          </el-form-item>
          <el-form-item prop="end_time" :label-width="formLabelWidth" label="活动结束时间">

            <el-date-picker
                v-model="Form.end_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择结束时间"
                @change="(val)=>{sForm.end_time = val/1000 }">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="book_stime" :label-width="formLabelWidth" label="预约开始时间">

              <el-date-picker
                v-model="Form.book_stime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择开始时间"
                @change="(val)=>{sForm.book_stime = val/1000 }">
              </el-date-picker>

          </el-form-item>

          <el-form-item prop="book_etime" :label-width="formLabelWidth" label="预约结束时间">

            <el-date-picker
                v-model="Form.book_etime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择结束时间"
                @change="(val)=>{sForm.book_etime = val/1000 }">
            </el-date-picker>

          </el-form-item>

          <el-form-item label="数量限制" :label-width="formLabelWidth" prop="limitNum">
            <el-input v-model="Form.limitNum" @input="sForm.limitNum = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="内容编辑" >
           <editor @contentsave = "(val)=>{sForm.content = val;Form.content = val;}" 
           :defaultcontent = "Form.content">
           </editor>
          </el-form-item> 
                             
          <el-form-item label="主图上传" prop="mainImg">
          <imgup @imgchange = "(data) => imgchange(data,'mainImg')" :imglist = "Form.mainImg" :imglimit = "imglimit"></imgup>
          </el-form-item>
          <el-form-item label="详情轮播上传" prop="bannerImg">
          <imgup @imgchange ="(data) => imgchange(data,'bannerImg')"  :imglist = "Form.bannerImg" :imglimit = "imglimit"></imgup>
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
  import {BookList,BookEdit,BookAdd,BookDel,uptPass} from '@/api/getData';
  import {notify,sCallBack,cloneForm,formatDate,imgchange} from '@/api/commonFunc';
  
  
   
  export default {

    data() {
      return {
        value1:'',
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

        searchItem:{},       
        imglimit:2,//设置上传插件允许上传的张数      
        Form: {},//承载页面数据装载
        standardForm:{
          name: '',
          description: '',
          content: '',
          mainImg: [],
          bannerImg: [],
          limitNum: '',
          price: '',
          bookNum: '',
          start_time:'',
          end_time:''
         

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
      test(){
        console.log(this.value1)
      },
      
      //页面数据初始化
      async initMainData(){
        const self = this;
        self.tableData = [];

        const postData  = self.paginate;        
        postData.token = self.token; 

        try{
          var res = await BookList(postData);
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
        self.Form.start_time =  row.start_time*1000;
        self.Form.end_time =  row.end_time*1000;
        self.Form.book_stime =  row.book_stime*1000;
        self.Form.book_etime =  row.book_etime*1000;
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
            var res = await BookEdit(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'add'){
        
          delete self.sForm.type;
          try {
            var res = await BookAdd(self.sForm); 
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
            var res = await BookDel(self.sForm);
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

      formatDate(data) {
          var date = new Date(data*1000);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
      },
      
      
    
 

    }
  }
</script>