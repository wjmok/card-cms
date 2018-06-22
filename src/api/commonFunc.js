
import { Notification } from 'element-ui';




/**
 * 混合了消息弹出框的函数
 */




function iNotify (title,type,msg) {
    Notification({
      title: title,
      message: msg,
      type: type
    });
};

export const sCallBack = (res) => {        

    if(res.data.solely_code == '100000'){                 
      iNotify(res.data.msg,'success');           
      return 'success';
    }else{
      iNotify(res.data.msg,'error'); 
      return 'false';
    };
            
};

export const notify = (title,type,msg) => {

    Notification({
      title: title,
      message: msg,
      type: type
    });         
            
};

export const cloneForm = (form) => {

    var res =  JSON.parse(JSON.stringify(form));   
    return res;     
          
};

export const imgchange = (self,data,formName,attrName) => {

        
        data.forEach((item, index) => {

          if(item['response']){
          item['url'] = item['response'];
          };
          delete item['percentage']; 
          delete item['raw']; 
          delete item['size']; 
          delete item['status'];
          delete item['response'];
          delete item['uid'];   

        });

          
        if(data.length){
        self[formName][attrName] = data;
        }else{
        self[formName][attrName] = 'empty';       
        }; 

        console.log(self.sForm); 

        //console.log(self);    
	        
};




export const resetForm = (formName) => {
  self.$refs[formName].resetFields();
  console.log('restform');
  if(formName == 'searchform'){
    self[formName] = {};
  }
};


function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};


export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};





function getParentId(array,id,results){
  
  for(var i=0;i<array.length;i++)
  {
      var item=array[i];
      if(item.id==id){
        console.log(item.parentid)
        results.push(item.parentid);
        getParentId(item.parentid);    
      }
      if(item.child&&item.child.length>0){                
        getParentId(item.child,id); 
      }
  } 

  return false;
};





export const getParentNames = (array,id) => {
  var results = [] ;
  getParentId(array,id,results);
  results.push(id);
  return results;
};

function getItemsBytarget(array,results,targetName,target){
  
  for(var i=0;i<array.length;i++)
  {
      var item=array[i]; 
      if(item[targetName] == target){    
        results.push(item);
      }
      if(item.child&&item.child.length>0){            
        getItemsBytarget(item.child,results,targetName,target);
      }
  }
  return false;
};



export const getArrayByTarget = (array,targetName,target) => {
  var results = [] ;
  getItemsBytarget(array,results,targetName,target);
  return results;  
  
};



export const isArrayFn = (value)=>{
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  }else{
    return Object.prototype.toString.call(value) === "[object Array]";
  }
};




