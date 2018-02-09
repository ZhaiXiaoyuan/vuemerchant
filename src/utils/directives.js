/**
 * Created by Administrator on 2016/9/28 0028.
 */

/**
 * vue所需要的directives都放在这里
 * */
import Vue from 'vue'

/*输入框聚焦*/
Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
})

/*输入框内容清除*/
/*Vue.directive('input-clear', {
  inserted: function (el,binding) {
    let $el=$(el);
    let $clearBtn=$('<span class="clear-btn">&times;</span>');
    $el.append($clearBtn);
    $clearBtn.click(function () {
      $el.find('input').val('');
    });
  },
  update:function (el,binding,vnode,oldVnode) {
    let $el=$(el);
    let $clearBtn=$el.find('.clear-btn');
    if($el.find('input').val().length>0){
      $clearBtn.css('display','inline-block');
    }else{
      $clearBtn.css('display','none');
    }
  }
})*/
