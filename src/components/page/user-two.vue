<template>
  <div>
    <el-container >
    
    <el-header>
      
      <el-input style="width:200px;" v-model="searchForm.phone" @blur="(e)=>{if(e.target._value){searchItem.phone = e.target._value}else{delete searchItem.phone};initMainData();}" placeholder="请输入电话号码" clearable>
      </el-input>

      <el-input style="width:200px;" v-model="searchForm.username" @blur="(e)=>{if(e.target._value){searchItem.username = e.target._value}else{delete searchItem.username};initMainData();}" placeholder="请输入商户名称" clearable>
      </el-input>

      

    </el-header>
    <el-main>
        <div>    
          <el-button type="primary" @click="handleAdd()">添加商户</el-button>
        </div>
      </el-main>
    <el-main style="height: 700px; border: 2px solid #eee">
      <el-table :data="mainData" style="width: 100%">   
        <el-table-column label="商户ID" prop="id">
        </el-table-column>
        
        
        <el-table-column label="商户名称" prop="username">
        </el-table-column>
        <el-table-column label="手机号" prop="phone">
        </el-table-column>
        <el-table-column label="积分" prop="user_score">
        </el-table-column>
        
        <el-table-column
          label="创建时间"
          prop="create_time">
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template scope="scope">
            
            
            <el-button size="small" @click="handleEdit(scope.row)">
            编辑
            </el-button>
            <el-button size="small" @click="handleDel(scope.row)">
            删除
            </el-button>
            
          </template>
        </el-table-column>
      </el-table>

      <el-dialog  title="修改商户信息" :visible.sync="dialogFormVisible"  id="dialog">
        

          <div v-if="dialogType=='coupon'">
            <el-table :data="tableDataCoupon" style="width: 100%">
              <el-table-column prop="" label="优惠券名称"></el-table-column>
              <el-table-column prop="" label="优惠券内容"></el-table-column>
              <el-table-column prop="receive_time" label="优惠券领取时间"></el-table-column>
              <el-table-column prop="deadline" label="有效期"></el-table-column>
              <el-table-column prop="use_time" label="使用时间"></el-table-column>
              <el-table-column  label="优惠券状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.coupon_status == 0">未使用</span>
                  <span v-if="scope.row.coupon_status == 1">已使用</span>
                  <span v-if="scope.row.coupon_status == -1">已失效</span>
                </template>
              </el-table-column>
              <!--<el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
                </template>
              </el-table-column>-->
            </el-table>
            <el-pagination
              @size-change="(val) => {paginateCoupon.pagesize = val;initMainData();}"
              @current-change="(val) => {paginateCoupon.currentPage = val;initMainData();}"
              :current-page="paginateCoupon.currentPage"
              :page-sizes="[10, 50, 70, 100]"
              :page-size="paginateCoupon.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="paginateCoupon.count">
            </el-pagination>
          </div>

          <div v-if="dialogType=='card'">
            <el-table :data="tableDataCustomerCard" style="width: 100%">
              <el-table-column prop="card.name" label="会员卡名称"></el-table-column>
              <el-table-column prop="card.cardLevel" label="会员卡等级"></el-table-column>
              <el-table-column prop="card.description" label="会员卡内容"></el-table-column>
              <el-table-column prop="card.price" label="会员卡价格"></el-table-column>
              <el-table-column prop="pay_time" label="会员卡购买时间" ></el-table-column>
              <el-table-column prop="deadline" label="有效期"></el-table-column>
              <el-table-column prop="score" label="积分"></el-table-column>
              <el-table-column  label="会员卡类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.cardType == 1">分值卡</span>
                  <span v-if="scope.row.cardType == 2">时间卡</span>
                  <span v-if="scope.row.cardType == 3">单次卡</span>
                </template>
              </el-table-column>
              <!--<el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
                </template>
              </el-table-column>-->
            </el-table>
            <el-pagination
              @size-change="(val) => {paginateCoupon.pagesize = val;initMainData();}"
              @current-change="(val) => {paginateCoupon.currentPage = val;initMainData();}"
              :current-page="paginateCoupon.currentPage"
              :page-sizes="[10, 50, 70, 100]"
              :page-size="paginateCoupon.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="paginateCoupon.count">
            </el-pagination>
          </div>

          <div v-if="dialogType=='main'">
            <el-form :model="Form" ref="Form" >
              <el-form-item label="商户名称" :label-width="formLabelWidth" prop="username">
                <el-input v-model="Form.username" @input="sForm.username = arguments[0]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="Form.phone"  @change="sForm.phone = Form.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input type="password" v-model="Form.password"  @change="sForm.password = Form.password" auto-complete="off"></el-input>
              </el-form-item>
              
                                 
              <el-button type="primary" @click="onSubmit()">确 定</el-button>
            </el-form> 
          </div>
          <div v-if="dialogType=='scoreAndBalance'">
            <el-form :model="Form" ref="Form" >
              <el-form-item label="修改内容" :label-width="formLabelWidth">
                <el-select v-model="Form.type" @change="sForm.type = Form.type">
                  <el-option value="score" label="积分"></el-option>
                  <el-option value="balance" label="佣金"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select v-model="Form.trade_type" @change="sForm.trade_type = Form.trade_type">
                  <el-option value="1" label="增加"></el-option>
                  <el-option value="2" label="减少"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="变动值" :label-width="formLabelWidth" prop="score">
                <el-input v-model="Form.score"  @change="sForm.score = Form.score" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item  label="变动原因" :label-width="formLabelWidth" prop="trade_info">
                <el-input v-model="Form.trade_info"  @change="sForm.trade_info = Form.trade_info" auto-complete="off"></el-input>
              </el-form-item>
              <el-button type="primary" @click="onSubmit()">确 定</el-button>
            </el-form> 
          </div>
                     
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
  import {UserList,UserEdit,CustomerCouponList,CustomerCardList,getMenutree,UserAdd,UserDel} from '@/api/getData';
  import {notify,sCallBack,cloneForm,formatDate,imgchange,getParentNames} from '@/api/commonFunc';
  
  
   
  export default {

    data() {
      return {
        mainData: [],//承载主列表数据
        menudata: [],//承载主列表数据
        tableDataCoupon: [],//承载主列表数据
        tableDataCustomerCard: [],//承载主列表数据
        dialogFormVisible: false,//dialog的显示参数，默认不显示
        userId: '',//dialog的显示参数，默认不显示
        formLabelWidth: '120px',//设置的el-form-item的宽度
        paginate: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true,

        },//分页的基础设置参数
        paginateCoupon: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true,

        },//分页的基础设置参数
        paginateCustomerCard: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true,

        },//分页的基础设置参数

        searchItem:{
          user_class:'merchant'
        }, 
        searchForm:{
          phone:'',
          username:'',
        },  
        imglimit:2,//设置上传插件允许上传的张数      
        Form: {

          

        },//承载页面数据装载
        standardForm:{
         

        },
        sForm: {},//承载提交数据装载
        passForm:{
          password:'',
        },
        scoreForm:{
        
          trade_type:'',
          trade_info:'',
          score:'',
          type:'',

        },
        dialogType:'main',
        userKey:this.$store.getters.getUserInfo.username,
        token:this.$store.getters.getUserInfo.token,
        thirdapp_id:this.$store.getters.getUserInfo.thirdapp_id,
        defaultProps: {
          children: 'child',
          label: 'name',
          value: 'id',
        },

      }
    },
    created(){
      this.initMainData();
      this.initMenuData();
      
    },
    components: {
      editor,
      imgup,

    },
    methods: {

      async initMenuData(){
        const self =this;
        const postData = {};
        postData.token = self.token;
        postData.searchItem = {
          parentid:6
        };
        try{
          var res = await getMenutree(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
        if(res){
          self.menudata = res.data;
        };
      },


      

      

      //页面数据初始化
      async initMainData(){
        const self = this;
        self.mainData = [];
        const postData  = self.paginate;        
        postData.token = self.token; 
        if(self.searchItem){
          postData.searchItem = cloneForm(self.searchItem);
        };
        try{
          var res = await UserList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
        if(res){
          self.paginate['count'] = res.data.total;
          self.mainData = res.data.data;
        };
      },

      async initCouponData(){
        const self = this;
        self.tableDataCoupon = [];
        const postData  = self.paginateCoupon;        
        postData.token = self.token;
        postData.id = self.userId;
        try{
          var res = await CustomerCouponList(postData);
          self.dialogFormVisible = true;
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
        if(res){
          self.paginateCoupon['count'] = res.data.total;
          self.tableDataCoupon = res.data.data;
        };
      },

      async initCustomerCardData(){
        const self = this;
        self.tableDataCoupon = [];
        const postData  = self.paginateCustomerCard;        
        postData.token = self.token;
        postData.searchItem = {};
        postData.searchItem.user_id = self.userId;
        try{
          var res = await CustomerCardList(postData);
          self.dialogFormVisible = true;
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };   
        if(res){
          self.paginateCustomerCard['count'] = res.data.total;
          self.tableDataCustomerCard = res.data.data;
        };
      },

      //Coupon按钮触发事件
      findCoupon(row){
        const self = this;
        self.dialogType = 'coupon';
        self.userId = row.id;
        self.initCouponData();
      },

      //Card按钮触发事件
      findCard(row){
        const self = this;
        self.dialogType = 'card';
        self.userId = row.id;
        self.initCustomerCardData();
      },



      //添加文章
      handleAdd(){
        const self = this;
        self.dialogType = 'main';
        self.Form = {};
        self.sForm = {};
        self.sForm.type = 'add'; 
        self.sForm.user_class = "merchant"; 
        self.sForm.token = self.token;  
        this.dialogFormVisible = true;
      },




      //edit按钮触发事件
      handleEdit(row) {

        const self = this;
        self.dialogType = 'main';
        self.Form = cloneForm(row);
        self.sForm = {}; 
        self.sForm.id = row.id;
        self.sForm.token = self.token;  
        self.sForm.type = 'edit';

        const results=[];
        getParentNames(self.menudata,parseInt(self.Form.passage1),results);
        results.push(parseInt(self.Form.passage1)); 
        self.Form['menu_array'] = results;
        console.log(self.Form['menu_array']);

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



      //处理积分以及余额
      handleScoreAndBalance(row){
        const self = this; 
        self.dialogType = 'scoreAndBalance';
        self.Form = cloneForm(self.scoreForm);
        self.sForm = {};
        self.sForm.user_id = row.id;
        self.sForm.token = self.token;  
        self.dialogFormVisible = true;
      },

      



      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
        if (self.sForm.type == 'edit') {

          delete self.sForm.type;
          try {
            var res = await UserEdit(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';
                        
        }else if(self.sForm.type == 'score'){
       
          delete self.sForm.type;
          try{
            var res = await scoreAdd(self.sForm);
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'score';

        }else if(self.sForm.type == 'balance'){
       
          delete self.sForm.type;
          try{
            var res = await balanceAdd(self.sForm);
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'balance';

        }else if(self.sForm.type == 'add'){
       
          delete self.sForm.type;
          try{
            var res = await UserAdd(self.sForm);
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'add';

        }else if(self.sForm.type == 'del'){
       
          delete self.sForm.type;
          try{
            var res = await UserDel(self.sForm);
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
     
      
      
    
 

    }
  }
</script>