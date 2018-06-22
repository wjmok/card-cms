/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import router from './router/index'


// axios 配置
axios.defaults.timeout = 500000;
//*axios.defaults.baseURL = 'http://localhost:88/cmsapi/public/api/v1/';*/
axios.defaults.baseURL = 'http://www.yj-member.com/api/public/index.php/api/v1/';


//axios.defaults.baseURL = 'http://huaxiafc.w122.idchz.com/public/index.php/api/v1/';
//axios.defaults.baseURL = 'http://test.solelytech.com/ruinuo/public/index.php/api/v1/';
var token = '$store.getters.getUserInfo.token';





// http response 拦截器
axios.interceptors.response.use(

    //config => {
        //return config;
    //},

    response => {
        
        
        if(response.data.solely_code == '200000'){
            store.commit('logout');
            router.push('/login');

        };
        return response;
        
    },
    //error => {
        //if (error.response) {
            //switch (error.response.data.code) {
                //case -1:
                    // 401 清除token信息并跳转到登录页面
                    //store.commit('logout');
                    //router.push('/login');
            //}
        //}
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        //return Promise.reject(error.response.data)
    //}
    );

export default axios;