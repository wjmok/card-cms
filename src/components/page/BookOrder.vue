<template>
  <div>
    <el-container >
    <el-header>
      <div>
        选择菜单查询文章列表:
        <el-cascader
          :options="bookData"
          :props="defaultProps"
          @change="(val) => {searchItem.book_id  =  val[val.length-1];initMainData();}"
          change-on-select
          clearable
          >
        </el-cascader>
      </div>
    </el-header>
    <el-main style="height: 700px; border: 2px solid #eee">
      <el-table :data="tableData" style="width: 100%">   
        
        <el-table-column label="预约订单编号" prop="id">
        </el-table-column>
        <el-table-column label="预约人姓名" prop="user.nickname">
        </el-table-column>
        <el-table-column label="预约类型" prop="book.name">
        </el-table-column>
        <el-table-column
          label="创建预约时间"
           :formatter="(row)=>{return formatDate(row.book_time)}">
        </el-table-column>
        <el-table-column
          label="取消预约时间"
           :formatter="(row)=>{return formatDate(row.cancel_time)}">
        </el-table-column>
        <el-table-column label="预约订单状态">
          <template slot-scope="scope">
            <el-select :value="scope.row.book_status.toString()" @change="(val)=>{scope.row.book_status=val;handleEditBookstatus(scope.row.id,val)}">
              <el-option v-for="item in BookOrderOptions" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            
            <!--<el-button
              size="small"
              @click="handleEdit(scope.row)">
              编辑
            </el-button>-->

            <el-button
            size="small"
            @click="handleDel(scope.row)">
            删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog  title="预约订单信息" :visible.sync="dialogFormVisible"  id="dialog">
        <el-form :model="Form" ref="Form" >
      
          <el-form-item label="预约订单名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="Form.name" @input="sForm.name = arguments[0]">
            </el-input>
          </el-form-item>
          
          <el-form-item label="预约订单数量" :label-width="formLabelWidth" prop="BookOrderNum">
            <el-input v-model="Form.BookOrderNum" @input="sForm.BookOrderNum = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="预约订单描述" :label-width="formLabelWidth" prop="description">
            <el-input v-model="Form.description" @input="sForm.description = arguments[0]" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="预约订单价格" :label-width="formLabelWidth" prop="price">
            <el-input v-model="Form.price" @input="sForm.price = arguments[0]" auto-complete="off"></el-input>
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
  import {BookOrderList,BookOrderEdit,BookOrderDel,uptPass,BookList} from '@/api/getData';
  import {notify,sCallBack,cloneForm,formatDate,imgchange} from '@/api/commonFunc';
  
  
   
  export default {

    data() {
      return {
        tableData: [],//承载主列表数据
        bookData: [],//承载主列表数据
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

          book_status:'',
         

        },
        sForm: {},//承载提交数据装载
        BookOrderOptions: [
          {
            value: '1',
            label: '成功 '
          }, 
          {
            value: '2',
            label: '排队'
          },
          {
            value: '3',
            label: '取消'
          },
        ],
        userKey:this.$store.getters.getUserInfo.username,
        token:this.$store.getters.getUserInfo.token,
        thirdapp_id:this.$store.getters.getUserInfo.thirdapp_id,
        defaultProps: {
          children: 'child',
          label: 'name',
          value: 'id',
        }

      }
    },
    created(){
      this.initMainData();
      this.initBookData();
      
    },
    components: {
      editor,
      imgup,

    },
    filters: {
        
    },
    methods: {


      formatDate(data) {
          var date = new Date(data*1000);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
      },


      async initBookData(){
        const self =this;
        const postData = {};
        postData.token = self.token;
        postData.is_page = false;

        try{
          var res = await BookList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.bookData = res.data;
        };

        
      },

      

      //页面数据初始化
      async initMainData(){
        const self = this;
        self.tableData = [];

        const postData  = self.paginate;  
        postData.searchItem = cloneForm(self.searchItem);      
        postData.token = self.token; 

        try{
          var res = await BookOrderList(postData);
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

      handleEditBookstatus(id,data){
        console.log(id+data);
        const self = this;
        self.sForm = {};
        self.sForm.token = self.token;
        self.sForm.id = id;
        self.sForm.book_status = data;
        self.sForm.type = 'edit';
        self.onSubmit();

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
            var res = await BookOrderEdit(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'add'){
        
          delete self.sForm.type;
          try {
            var res = await BookOrderAdd(self.sForm); 
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
            var res = await BookOrderDel(self.sForm);
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