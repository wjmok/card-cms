<template>
  <div>
    <el-container >
    <el-header>

      <el-select v-model="searchForm.order_step"  @change="(value) => { 
      if(!value){ delete searchItem.order_step;}else{searchItem.order_step = value;};initMainData();}" placeholder="请选择订单状态" clearable >
          <el-option v-for="item in stepOptions" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="searchForm.transport_status"  @change="(value) => { 
      if(!value){ delete searchItem.transport_status;}else{searchItem.transport_status = value;};initMainData();}" placeholder="请选择物流状态" clearable >
          <el-option v-for="item in transportOptions" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="searchForm.pay_status"  @change="(value) => { 
      if(!value){ delete searchItem.pay_status;}else{searchItem.pay_status = value;};initMainData();}" placeholder="请选择支付状态状态" clearable >
          <el-option v-for="item in payOptions" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input style="width:200px;"  @blur="(e)=>{if(e.target._value){searchItem.user_id = e.target._value}else{delete searchItem.user_id};initMainData();}" placeholder="请输入用户ID" clearable>
      </el-input>
      
    </el-header>
    <el-main style="height: 700px; border: 2px solid #eee">
      <el-table :data="mainData" style="width: 100%">  

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">

              <div v-if="props.row.snap_address.length>0">  
                <el-form-item label="收件人姓名">
                  <span>{{ props.row.snap_address.name }}</span>
                </el-form-item>
                <el-form-item label="收件人电话">
                  <span>{{ props.row.snap_address.phone }}</span>
                </el-form-item>
                <el-form-item label="收件人地址 ">
                  <span>
                    {{props.row.snap_address.province}}
                    {{props.row.snap_address.city }}
                    {{props.row.snap_address.country}}
                    {{props.row.snap_address.detail}}
                  </span>
                </el-form-item>
              </div>

              <el-form-item label="是否评论 ">
                <span>{{props.row.remark_num == '0'?'未评论':'已评论'}}</span>
              </el-form-item>
              <el-form-item label="下单时间">
                <span>{{ props.row.create_time }}</span>
              </el-form-item>
              <el-form-item label="产品名称" v-if="props.row.item[0].snap_product.product">
                
                  {{props.row.item[0].snap_product.product.name}}
                
              </el-form-item>
              <el-form-item label="产品类别" v-if="props.row.item[0].snap_product.category"  >
                  {{props.row.item[0].snap_product.category.name}}
              </el-form-item>
              <el-form-item v-if="props.row.puser" label="推荐人信息">
                姓名:<span>{{ props.row.puser.username }}</span>
                电话:<span>{{ props.row.puser.phone }}</span>
                user_id:<span>{{ props.row.puser.id }}</span>
              </el-form-item>
              <el-form-item label="passage1">
                  <template v-if="scope.row.passage1" >
                    <div v-if="scope.row.passage1.url" >    
                      <img :src="scope.row.headimgurl[0]['url']"  style="width: 90px;">
                    </div>
                    <span v-else >{{ props.row.passage1}}</span>
                  </template>
              </el-form-item>
              <el-form-item label="passage2">
                  <span>{{ props.row.passage2}}</span>
              </el-form-item>

              <div>
                <el-form-item label="订单详情">
                  <el-table :data="props.row.item" style="width: 100%">
                  <el-table-column
                    label="产品型号名称"
                    prop="snap_product.name" width="180">
                  </el-table-column>
                  <el-table-column
                    label="产品单价"
                    prop="snap_product.price" width="180">
                  </el-table-column>
                  <el-table-column
                    label="购买数量"
                    prop="count" width="180">
                  </el-table-column>
                  </el-table>
                </el-form-item>
              </div>

            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="order_no">
        </el-table-column>
        <el-table-column label="总价" prop="total_price">
        </el-table-column>
        <el-table-column label="用户ID" prop="user_id">
        </el-table-column>
        <el-table-column label="手机号" prop="user.phone">
        </el-table-column>
        <el-table-column label="微信昵称" prop="user.nickname">
        </el-table-column>
        <el-table-column label="创建时间" prop="create_time">
        </el-table-column>
        <el-table-column label="支付状态"  width="120">
          <template slot-scope="scope">   
            <span v-if="scope.row.pay_status == '0'">
              未支付
            </span>
            <span v-if="scope.row.pay_status == '1'">
              已支付
            </span>
            <span v-if="scope.row.pay_status == '2'">
              货到付款
            </span>
          </template>
        </el-table-column>

        <el-table-column label="订单状态"  width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.order_step == '0'">
              正常下单
            </span>
            <span v-if="scope.row.order_step == '1'">
              申请撤单
            </span>
            <span v-if="scope.row.order_step == '2'">
              同意撤单
            </span>
            <span v-if="scope.row.order_step == '3'">
              完结
            </span>      
          </template>
        </el-table-column>

        <el-table-column label="物流状态" width="120">
          <template slot-scope="scope">   
            <span v-if="scope.row.transport_status == '0'">
              未发货
            </span>
            <span v-if="scope.row.transport_status == '1'">
              已发货
            </span>
            <span v-if="scope.row.transport_status == '2'">
              已收货
            </span>  
          </template>
        </el-table-column>

        <el-table-column label="操作"  width="250">
          <template slot-scope="scope" >
            <el-button size="small" @click="sendGoods(scope.row)">
              发货
            </el-button>
            <el-button size="small" @click="Refund(scope.row)">
              撤单
            </el-button>
            <el-button size="small" @click="completeOrder(scope.row)">
              完结
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
  import {sendOrderList,sendOrderEdit,sendOrderDel} from '@/api/getData';
  import {notify,sCallBack,cloneForm,formatDate,imgchange} from '@/api/commonFunc';
  
  
   
  export default {

    data() {
      return {
        mainData: [],//承载主列表数据
        formLabelWidth: '120px',//设置的el-form-item的宽度
        paginate: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true,

        },//分页的基础设置参数
        searchForm:{
          order_step:'',
          transport_status:'',
          pay_status:'',
        },

        searchItem:{

        },       
        imglimit:2,//设置上传插件允许上传的张数      
        Form: {

        },//承载页面数据装载
        standardForm:{

        },
        stepOptions: [
          {
            value: '0',
            label: '正常下单'
          }, 
          {
            value: '1',
            label: '申请撤单'
          },
          {
            value: '2',
            label: '同意撤单'
          },
          {
            value: '3',
            label: '完结'
          },
        ],

        transportOptions: [
          {
            value: '0',
            label: '未发货'
          }, 
          {
            value: '1',
            label: '已发货'
          },
          {
            value: '2',
            label: '已收货'
          },
        ],

        payOptions: [
          {
            value: '0',
            label: '未支付'
          }, 
          {
            value: '1',
            label: '已支付'
          },
          {
            value: '2',
            label: '货到付款'
          },
        ],
        sForm: {},//承载提交数据装载
        passForm:{
          password:'',
        },
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
        postData.searchItem = cloneForm(self.searchItem);

        try{
          var res = await sendOrderList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        }; 
        if(res){
          self.paginate['count'] = res.data.total;
          self.mainData = res.data.data;
        };

      },




      //发货按钮触发事件
      sendGoods(row) {
        const self = this;       
        self.sForm = {};
        self.sForm.id = row.id;
        self.sForm.orderinfo ={};  
        self.sForm.orderinfo.transport_status = '1';   
        self.sForm.token = self.token;  
        self.sForm.type = 'edit'; 
        self.onSubmit();
      },

      //撤单按钮触发事件
      Refund(row) {
        const self = this;       
        self.sForm = {};
        self.sForm.id = row.id;
        self.sForm.orderinfo ={};  
        self.sForm.orderinfo.order_step = '2';  
        self.sForm.token = self.token;  
        self.sForm.type = 'edit'; 
        self.onSubmit();
      },

      //完结按钮
      completeOrder(row){
        const self = this;
        self.sForm = {};
        self.sForm.id = row.id;
        self.sForm.orderinfo ={};  
        self.sForm.orderinfo.order_step = '3'; 
        self.sForm.token = self.token;
        self.sForm.type = 'edit';
        self.onSubmit();
      },


      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
        if (self.sForm.type == 'edit'){

          delete self.sForm.type;
          try {
            var res = await sendOrderEdit(self.sForm); 
          } catch (err) {
              console.log(err); 
              notify('网络故障','error'); 
          };
          self.sForm.type = 'edit';

        }else if(self.sForm.type == 'del'){
       
          delete self.sForm.type;
          try{
            var res = await sendOrderDel(self.sForm);
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