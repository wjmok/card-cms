
<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <el-input style="width:200px;"  @blur="(e)=>{if(e.target.value){searchItem.name=e.target.value}else{delete searchItem.name};initMainData();}" placeholder="请输入name" clearable></el-input>

          <el-input style="width:200px;"  @blur="(e)=>{if(e.target.value){searchItem.phone=e.target.value}else{delete searchItem.phone};initMainData();}" placeholder="请输入phone" clearable>
          </el-input>

          <el-input style="width:200px;"  @blur="(e)=>{if(e.target.value){searchItem.passage1=e.target.value}else{delete searchItem.passage1};initMainData();}" placeholder="请输入passage1" clearable>
          </el-input>

          <el-input style="width:200px;"  @blur="(e)=>{if(e.target.value){searchItem.passage2=e.target.value}else{delete searchItem.passage2};initMainData();}" placeholder="请输入passage2" clearable>
          </el-input>

          <el-input style="width:200px;"  @blur="(e)=>{if(e.target.value){searchItem.passage3=e.target.value}else{delete searchItem.passage3};initMainData();}" placeholder="请输入passage3" clearable>
          </el-input>
          
          
          <el-select v-model="searchForm.is_deal"  @change="(value) => { 
          if(!value){ delete searchItem.is_deal;}else{searchItem.is_deal = value;};initMainData();}" placeholder="请选择状态" clearable >
              <el-option v-for="item in statusOptions" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>

      </el-header>
      
      <el-main style="height: 600px; border: 2px solid #eee">
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="姓名" prop="name">
            </el-table-column>
            <el-table-column label="联系方式" prop="phone">
            </el-table-column>
            <el-table-column
              label="passage1"
              prop="passage1">
            </el-table-column>
            <el-table-column
              label="passage2"
              prop="passage2">
            </el-table-column>
            <el-table-column
              label="passage3"
              prop="passage3">
            </el-table-column>
            <el-table-column
              label="content"
              prop="content">
            </el-table-column>
            <el-table-column
              label="创建时间"
              prop="create_time">
            </el-table-column>
            
            <el-table-column label="操作" width="350">
              <template slot-scope="scope" >
                
                <el-button
                size="small"
                @click="handleDel(scope.row)">删除</el-button>
                
                <el-button 
                size="small"
                @click="handleDeal(scope.row)">处理</el-button>
                
              </template>
            </el-table-column>
          </el-table>
        </div>





        <el-dialog  title="编辑积分或佣金" :visible.sync="dialogScoreVisible"  id="dialog">
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
import {messageList,messageDel,messageDeal,scoreAdd,balanceAdd} from '@/api/getData';
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

      this.initMainData();
      
    },
    components: {
      imgup,
      editor
    },
    data() {
      return {

        tableData: [],//承载主列表数据
        dialogScoreVisible: false,//dialog的显示参数，默认不显示
        Form: {},//承载页面数据装载
        standardForm:{},
        statusOptions: [
          {
            value: 'false',
            label: '未处理'
          }, 
          {
            value: 'true',
            label: '已处理'
          },
        ],
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
        searchItem:{},
        options: [],
        PosOptions:[],
        searchForm:{
          is_visit:'',
          is_deal:'',
        },
        paginate: {
            count: 0,
            currentPage: 1,
            pagesize:10,
            is_page:true
        },//分页的基础设置参数

        defaultProps: {
          children: 'child',
          label: 'title',
          value: 'id',
        },
                            
      }
    },

    methods: {

      async initMainData(){
        const self =this;
        self.tableData = [];

        const postData  = this.paginate;
        postData.searchItem = cloneForm(self.searchItem);
        postData.token = self.token; 


        try{
          var res = await messageList(postData);
        }catch(err){
          console.log(err); 
          notify('网络故障','error');
        };
         
        if(res){
          self.paginate['count'] = res.data.total;
          self.tableData = res.data.data;
        };
         
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

      //处理事件
      async handleDeal(row){

          const self = this;
          self.sForm = {};
          self.sForm.id = row.id;
          self.sForm.token = self.token; 
          self.sForm.type = 'deal'; 
          self.onSubmit();         
                   
          
      },







      

      
      //dialog中提交按钮事件
      async onSubmit() {

        const self = this;
        if(self.sForm.type == 'del'){

          delete self.sForm.type;
          try{
            var res = await messageDel(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'del';

        }else if(self.sForm.type == 'deal'){

          delete self.sForm.type;
          try{
            var res = await messageDeal(self.sForm); 
          }catch(err){
            console.log(err);
            notify('网络故障','error');
          };
          self.sForm.type = 'deal';

        }

        

        if(res){
          var fCall =  sCallBack(res);
          if(fCall == 'success'){
            self.initMainData();
          };
        };
        

      },
      



      formatDate(data){
        var date = new Date(data*1000);
        return formatDate(date, 'yyyy-MM-dd');
      }
      
      




    }   
  }
</script>