/**
 * Created by Designer on 2017/12/21.
 */
import router from '../router'
import axios from 'axios'


export default {
  install: function (Vue, options) {
    /*添加请求拦截器*/
    axios.interceptors.request.use(function (config) {
      return config;
    }, function (error) {
      return Promise.reject(error);
    });
    /*添加响应拦截器*/
    axios.interceptors.response.use(function (response) {
      return response.data;
    }, function (error) {
      //对于有作登录状态的接口你，未未登录时跳转到登录页
      if(error.response.status==401){
        router.push('login');
      }
      return Promise.reject(error);
    });

    /**/
    Vue.api={
      //登录
      login:function (params) {
        return axios({
          method: 'post',
          url: '/lyy/rest/group/distributor/login',
          params: params
        });
      },
      //获取首页数据
      homePageData:function (params) {
        return axios({
          method: 'post',
          url: '/lyy/rest/group/distributor/homepageData',
          params: params
        });
      },
    }
  },

}
