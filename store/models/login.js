import Vue from 'Vue'
import $axios from '../../src/http.js';
import router from '../../src/router/index';
import {notify,sCallBack} from '@/api/commonFunc';

/*Vue.prototype.$$axios = axios;*/


const state = {


    currentUser: {
        get username() {
            return localStorage.getItem("username");
        },
        get password() {
            return localStorage.getItem("password");
        },
        get token() {
            return localStorage.getItem("token");
        },
        get userInfo() {
            return localStorage.getItem("userInfo");
        }
    }

}

const getters = {

    getUserInfo: state => state.currentUser


}

const actions = {

    userLogin(commit, { username, password }) {
        var qs = require('qs');


        $axios.post('Admin/Login', qs.stringify({
                name: username,
                password: password
            }), {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            })
            .then(function(res) {
                console.log(res);

                


                if(res){
                  var fCall =  sCallBack(res);
                  if(fCall == 'success'){

                    commit.commit("setUser", 
                        { "username": username, 
                        "password": password,
                        "token": res.data.token,
                        "userInfo":  JSON.stringify(res.data.userInfo),
                        
                        }); 
                    router.push('/readme');
                        
                  };
                };

                

            })
            .catch(function(error) {
            	console.log(error);
                //alert(error.msg);
                notify('网络故障','error'); 
            });
    }



}

const mutations = {


    setUser(state, { username, password,token,userInfo, }) {
        // 在这里把用户名和token保存起来
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", userInfo);
        
    },


    logout(state) {
        // 在这里把用户名和token保存起来
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        
    },



}



export default {

    state,
    getters,
    actions,
    mutations,


}
