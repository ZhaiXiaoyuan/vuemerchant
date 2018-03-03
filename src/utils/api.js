/**
 * Created by Designer on 2017/12/21.
 */
import router from '../router'


export default {
  install: function (Vue, options) {


    Vue.http.options.emulateJSON = true;
    Vue.http.interceptors.push((request, next)  =>{

      next((response) => {
        //对于有作登录状态的接口你，未未登录时跳转到登录页
        if(response.status==401){
          router.push({name:'login'});
        }
        return response
      });

    });
    /*自定义ajax函数，自带的不好用*/
    Vue.http.ajax = async function (options) {
      if(options.method.toUpperCase() == 'GET'){
        let res = await Vue.http.get(options.url, {params: options.params});
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }else if(options.method.toUpperCase() == 'POST'){
        let res = await Vue.http.post(options.url, options.params);
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }
    }

    /**/
    Vue.api={
      //登录
      login:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: '/lyy/rest/group/distributor/login',
          params: params
        });
      },
      //获取首页数据
      homePageData:function (params) {
        return Vue.http.ajax({
          method: 'get',
          url: '/lyy/rest/group/distributor/homepageData',
          params: params
        });
      },
      //获取手机验证码
      getCode:function (params,url,method) {
        method=method?method:'get';
        return Vue.http.ajax({
          method: method,
          url: url,
          params: params
        });
      },
      //验证注册手机验证码
      checkRegisterCode:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: '/lyy/rest/group/distributor/verifyRegisterCode',
          params: params
        });
      },
      //注册
      register:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: '/lyy/rest/group/distributor/register',
          params: params
        });
      },
      //验证重置密码手机验证码
      checkResetPasswordCode:function (params) {
        return Vue.http.ajax({
          method: 'get',
          url: '/lyy/rest/group/distributor/getForgetCode',
          params: params
        });
      },
      //临时测试
      test:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: 'http://sandbox.insoho.cn:8080/iou/domain/login',
          params: params
        });
      },
    }
  },

}
