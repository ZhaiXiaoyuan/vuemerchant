/**
 * Created by Administrator on 2016/9/27 0027.
 */


/*一般的工具方法*/
import Vue from 'vue'
import router from '../router'
import App from '../App.vue'

export default {
    install: function (Vue, options) {
        //常用正则
        window.regex={
          illegal :new RegExp("((?=[\x21-\x7e]+)[^A-Za-z0-9])"),
          illegalAlert:'请勿输入非法字符',
          pNum:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,//正数
          pNumAlert:'请输入大于0的数值，限制2位小数',
          pInt:/^[1-9]*[1-9][0-9]*$/,//正整数
          pIntAlert:'请输入大于0的整数',
          nNum:/^(0|[1-9][0-9]*)$/,//自然数
          nNumAlert:'请输入大于等于0的整数',
          chn:/^[\u4e00-\u9fa5]{0,}$/,
          chnAlert:'请输入纯中文字符串',

          float:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
          floatAlert:'数值格式有误，请输入小数点前不多于8位、小数点后不多于2位的数值！',

          percent:/^((100(\.00|\.0)?)|((\d|[1-9]\d)(\.\d{1,2})?))$/,
          percentAlert:'百分数格式错误，请输入0~100间数值，可保留两位小数！',

          contact:/^(0\d{2,3}-?\d{7,8})|(1\d{10})$/,
          contactAlert:'请输入正确格式的手机号码或电话号码！',

          phone:/^1\d{10}$/,
          phoneAlert:'请输入正确格式的手机号！',

          mail:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
          mailAlert:'请输入正确格式的邮箱！',

          idCard:/^[a-zA-Z0-9]{1,20}$/,
          idCardAlert:'身份证号码格式错误！',

          shortCode:/^(?![0-9]+$)[0-9A-Za-z]{7,20}$/,
          shortCodeAlert:'域名格式有误，请输入7到20位字母或数字，不可为纯数字！'
        }
        //
        Vue.tools = {
          access:{
            home:[
              {id: '#h1000001', name:'header', value: '1000001'},
              {id: '#1000027', name:'设备管理', value: '1000027'},
              {id: '#1000010', name:'优惠设置', value: '1000010', group: 'group1'},
              {id: '#1000001', name:'收益统计', value: '1000001', group: 'group1'},
              // {id: '#1000029', name:'礼品统计', value: '1000073', group: 'group1'},
              {id: '#1000029', name:'礼品统计', value: '1000029', group: 'group1'},
              {id: '#1000007', name:'远程上分', value: '1000007', group: 'group2'},
              {id: '#1000028', name:'订单查询', value: '1000028', group: 'group2'},
              //{id: '#1000099', name:'会员管理', value: '1000099', group: 'group2'},//开发
              //{id: '#p1000099', name:'会员派币', value: '1000099', group: 'group2'}
              //临时测试
              {id: '#1000093', name:'会员管理', value: '1000093', group: 'group2'},//测试
              {id: '#p1000093', name:'会员派币', value: '1000093', group: 'group2'}
              //{id: '#1000059', name:'会员管理', value: '1000059', group: 'group2'},//生产
              //{id: '#p1000059', name:'会员派币', value: '1000059', group: 'group2'}
            ]
          }
        }
    },
}
