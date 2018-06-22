<template>
  <div>
    <el-container >
    <el-header>
      <el-select v-model="searchForm.art_id"  @change="(value) => { 
      if(!value){ delete searchItem.art_id;}else{searchItem.art_id = value;};initMainData();}" placeholder="请选择文章" clearable >
          <el-option v-for="item in artData" :label="item.title" :value="item.id">
          </el-option>
      </el-select>
      <el-select v-model="searchForm.product_id"  @change="(value) => { 
      if(!value){ delete searchItem.product_id;}else{searchItem.product_id = value;};initMainData();}" placeholder="请选择商品" clearable >
          <el-option v-for="item in productData" :label="item.name" :value="item.id">
          </el-option>
      </el-select>
      <el-input style="width:200px;" v-model="searchForm.user_id" @blur="(e)=>{if(e.target._value){searchItem.user_id = e.target._value;}else{delete searchItem.user_id};initMainData(e.target._value);}" 
      placeholder="请输入评论人ID"
      clearable
      ></el-input>
    </el-header>
    <el-main style="height: 700px; border: 2px solid #eee">
      <el-table :data="mainData" style="width: 100%">   
        <el-table-column label="用户ID" prop="user_id">
        </el-table-column>
        <el-table-column label="用户昵称" prop="user_name">
        </el-table-column>
        <el-table-column
          label="用户头像"
          width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.user_headimg" >
              
                <img :src="scope.row.user_headimg[0]['url']"  style="width: 60px;border-radius: 50%;">
              
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评论内容" prop="content" width="250">
        </el-table-column>
        
        <el-table-column label="真实姓名" prop="user.username">
        </el-table-column>
        
        <el-table-column label="学号/工号" prop="user.passage1">
        </el-table-column>
        <el-table-column label="学院/部门" prop="user.passage2">
        </el-table-column>
        <el-table-column label="联系方式" prop="user.phone">
        </el-table-column>
        
        
        <el-table-column
          label="创建时间"
          prop="create_time">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
            size="small"
            @click="handleDel(scope.row)">
            删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      
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
  import {sendRemarkList,remarkDel,getArtList,sendProductList} from '@/api/getData';
  import {notify,sCallBack,cloneForm,formatDate,imgchange} from '@/api/commonFunc';
  
  
   
  export default {

    data() {
      return {
        
        mainData: [],//承载主列表数据
        artData: [],//承载主列表数据
        productData: [],//承载主列表数据
        paginate: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true,

        },//分页的基础设置参数

        searchItem:{
          book_id:''
        },
        searchForm:{
          book_id:'',
          user_id:''
        },       
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
      this.initArtData();
      this.initProductData();
      
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

        const postData  = cloneForm(self.paginate);        
        postData.token = self.token; 
        postData.searchItem = cloneForm(self.searchItem); 

        try{
          var res = await sendRemarkList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.paginate['count'] = res.data.total;
          self.mainData = res.data.data;
        };
      },

      //页面数据初始化
      async initArtData(){
        const self = this;
        self.artData = [];

        const postData  = {};
        postData.is_page = false;        
        postData.token = self.token; 

        try{
          var res = await getArtList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.artData = res.data;
          console.log(self.artData);
        };
      },


      //页面数据初始化
      async initProductData(){
        const self = this;
        self.artData = [];
        const postData  = {};
        postData.is_page = false;        
        postData.token = self.token;

        try{
          var res = await sendProductList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.productData = res.data;
        };

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
        if(self.sForm.type == 'del'){
          delete self.sForm.type;
          try{
            var res = await remarkDel(self.sForm);
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'del';
        };
        if(res){
          var fCall =  sCallBack(res);
          if(fCall == 'success'){  
            self.initMainData();
          };
        };
        

      },
     
      
      
    
 

    }
  }
</script>