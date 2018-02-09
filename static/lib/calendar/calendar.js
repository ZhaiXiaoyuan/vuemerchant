/**
 * 完整代码
 */


// 关于月份： 在设置时要-1，使用时要+1
(function ($, window, document, undefined) {

  var Calendar = function (elem, options) {
    this.$calendar = elem;

    this.defaults = {
      ifSwitch: true,
      hoverDate: false,
      backToday: false
    };

    this.opts = $.extend({}, this.defaults, options);
    this.dateObj=new genDateObj();
    this.curDate=new Date();
    // console.log(this.opts);
  };

  Calendar.prototype = {
    showHoverInfo: function (obj) { // hover 时显示当天信息
      var _dateStr = $(obj).attr('data');
      var offset_t = $(obj).offset().top + (this.$calendar_today.height() - $(obj).height()) / 2;
      var offset_l = $(obj).offset().left + $(obj).width();
      var changeStr = addMark(_dateStr);
      var _week = changingStr(changeStr).getDay();
      var _weekStr = '';

      this.$calendar_today.show();

      this.$calendar_today
            .css({left: offset_l + 30, top: offset_t})
            .stop()
            .animate({left: offset_l + 16, top: offset_t});

      switch(_week) {
        case 0:
          _weekStr = 'Sunday';
        break;
        case 1:
          _weekStr = 'Monday';
        break;
        case 2:
          _weekStr = 'Tuesday';
        break;
        case 3:
          _weekStr = 'Wednesday';
        break;
        case 4:
          _weekStr = 'Thursday';
        break;
        case 5:
          _weekStr = 'Friday';
        break;
        case 6:
          _weekStr = 'Saturday';
        break;
      }

      this.$calendarToday_date.text(changeStr);
      this.$calendarToday_week.text(_weekStr);
    },

    showCalendar: function () { // 输入数据并显示
      var self = this;
      var year = self.dateObj.getDate().getFullYear();
      var month = self.dateObj.getDate().getMonth() + 1;
      var dateStr = returnDateStr(self.dateObj.getDate());
      var dateArr=dateStr.split('-');
      var firstDay = new Date(year, month - 1, 1); // 当前月的第一天

      this.$calendarTitle_text.text(dateArr[0] + '-' + dateArr[1]);

      this.$calendarDate_item.each(function (i) {
        // allDay: 得到当前列表显示的所有天数
        var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
        var allDay_str = returnDateStr(allDay);

        $(this).text(allDay.getDate()).attr('data', allDay_str);
        if (returnDateStr(new Date()) === allDay_str) {
          $(this).attr('class', 'item item-curDay');
        } else if (new Date(firstDay).getMonth()== new Date(allDay_str).getMonth()) {
          $(this).attr('class', 'item item-curMonth');
        } else {
          $(this).attr('class', 'item');
        }
        if(self.opts.minDate&&self.opts.minDate>changingStr(allDay_str)){
          $(this).addClass('disabled');
        }
        if(self.opts.maxDate&&self.opts.maxDate<changingStr(allDay_str)){
          $(this).addClass('disabled');
        }
      });

      // 已选择的情况下，切换日期也不会改变
      if (self.selected_data) {
        var selected_elem = self.$calendar_date.find('[data='+self.selected_data+']');

        selected_elem.addClass('item-selected');
      }

      //
      self.renderRange&&self.renderRange();
    },

    renderDOM: function () { // 渲染DOM
      this.$calendar_title = $('<div class="calendar-title"></div>');
      this.$calendar_week = $('<ul class="calendar-week"></ul>');
      this.$calendar_date = $('<ul class="calendar-date"></ul>');
      this.$calendar_today = $('<div class="calendar-today"></div>');


      var _titleStr =
                      '<a href="javascript:;" id="backToday">T</a>'+
                      '<div class="arrow">'+
                       '<span class="arrow-prev"><</span>'+
                      '<a href="#" class="title"></a>'+
                        '<span class="arrow-next">></span>'+
                      '</div>';
      var _weekStr = '<li class="item">日</li>'+
                      '<li class="item">一</li>'+
                      '<li class="item">二</li>'+
                      '<li class="item">三</li>'+
                      '<li class="item">四</li>'+
                      '<li class="item">五</li>'+
                      '<li class="item">六</li>';
      var _dateStr = '';
      var _dayStr = '<i class="triangle"></i>'+
                    '<p class="date"></p>'+
                    '<p class="week"></p>';

      for (var i = 0; i < 6; i++) {
        _dateStr += '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>'+
                    '<li class="item">26</li>';
      }

      this.$calendar_title.html(_titleStr);
      this.$calendar_week.html(_weekStr);
      this.$calendar_date.html(_dateStr);
     /* this.$calendar_today.html(_dayStr);*/

      this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
      this.$calendar.show();
    },

    inital: function () { // 初始化
      var self = this;

      this.renderDOM();

      this.$calendarTitle_text = this.$calendar_title.find('.title');
      this.$backToday = $('#backToday');
      this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
      this.$arrow_next = this.$calendar_title.find('.arrow-next');
      this.$calendarDate_item = this.$calendar_date.find('.item');
      this.$calendarToday_date = this.$calendar_today.find('.date');
      this.$calendarToday_week = this.$calendar_today.find('.week');

      this.selected_data = 0;

      this.showCalendar();

      if (this.opts.ifSwitch) {
        this.$arrow_prev.bind('click', function () {
          console.log(23322);
          var _date =  self.dateObj.getDate();

          self.dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));

          self.showCalendar();

          //
          self.renderRange();
        });

        this.$arrow_next.bind('click', function () {
          var _date = self.dateObj.getDate();
        /*  console.log("dateObj:",_date);*/

          self.dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));

          self.showCalendar();

          //
          self.renderRange();
        });
      }

      if (this.opts.backToday) {
        var cur_month = self.dateObj.getDate().getMonth() + 1;

        this.$backToday.bind('click', function () {
          var item_month = $('.item-curMonth').eq(0).attr('data').substr(4, 2);
          var if_lastDay = (item_month != cur_month) ? true : false;

          if (!self.$calendarDate_item.hasClass('item-curDay') || if_lastDay) {
            self.dateObj.setDate(new Date());

            self.showCalendar();
          }
        });
      }

      /*this.$calendarDate_item.hover(function () {
        self.showHoverInfo($(this));
      }, function () {
        self.$calendar_today.css({left: 0, top: 0}).hide();
      });*/

      //对比时间
      var compareTime=function (smaller,larger) {
        var genDate=function(value){
          var type=typeof value;
          var date=null;
          if(type=='string'||type=='number'){
            date=new Date(value);
          }else if(type=='object'){
            date=value;
          }
          return date;
        }
        return genDate(smaller).getTime()<=genDate(larger).getTime();
      }
      //根据时间范围渲染日历选中状态
      var selectedDate1=null;
      var selectedDate2=null;
      this.renderRange=function () {
        var $dateItemList=$('.calendar-date .item');
        if(self.opts.dateRange&&selectedDate1&&selectedDate2){
          $dateItemList.each(function (i,item) {
            var $item=$(this);
            var itemDate=$item.attr('data');
            if(compareTime(selectedDate1,itemDate)&&compareTime(itemDate,selectedDate2)){
              $item.addClass('item-selected');
            }
            if(itemDate==selectedDate1){
              $item.addClass('start');
            }
            if(itemDate==selectedDate2){
              $item.addClass('end');
            }
          });
        }else if(selectedDate1){
          $dateItemList.removeClass('item-selected start end');
          $("[data="+selectedDate1+"]").addClass('item-selected');
        }
      }
      self.renderRange();
      //
      var _that=this;
      this.$calendarDate_item.click(function () {
        var _dateStr = $(this).attr('data');
        var _date = changingStr(addMark(_dateStr.split('-').join('')));
        var $curClick = null;

        self.selected_data = $(this).attr('data');

        _that.dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));

        if (!$(this).hasClass('item-curMonth')) {
          setTimeout(function () {
            self.showCalendar();
          },200);
        }

        $curClick = self.$calendar_date.find('[data='+_dateStr+']');
        $curDay = self.$calendar_date.find('.item-curDay');
        if (!$curClick.hasClass('item-selected')) {
          self.$calendarDate_item.removeClass('item-selected');

          $curClick.addClass('item-selected');
        }
        //
        if(self.opts.dateRange){
          if(!selectedDate1){
            selectedDate1=_dateStr;
          }else{
            if(!selectedDate2){
              if(compareTime(selectedDate1,_dateStr)){
                selectedDate2=_dateStr;
              }else{
                selectedDate2=selectedDate1;
                selectedDate1=_dateStr;
              }
            }else{
              selectedDate1=_dateStr;
              selectedDate2=null;
            }
          }
        }else{
          selectedDate1=_dateStr;
        }
        self.renderRange();
        _that.opts&&_that.opts.callback&&_that.opts.callback(selectedDate1,selectedDate2);
      });
    },

    constructor: Calendar
  };

  $.fn.calendar = function (options) {
    var calendar = new Calendar(this, options);

    return calendar.inital();
  };


  // ========== 使用到的方法 ==========

/*  var dateObj = (function () {
    var _date = new Date();

    return {
      getDate: function () {
        return _date;
      },

      setDate: function (date) {
        _date = date;
      }
    }
  })();*/
var genDateObj=function () {
  var _date = new Date();

  return {
    getDate: function () {
      return _date;
    },

    setDate: function (date) {
      _date = date;
    }
  }
}

  function returnDateStr(date) { // 日期转字符串
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    month = month <= 9 ? ('0' + month) : ('' + month);
    day = day <= 9 ? ('0' + day) : ('' + day);

    return year +'-'+ month+'-' + day;
  };

  function changingStr(fDate) { // 字符串转日期
    var fullDate = fDate.split("-");

    return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
  };

  function addMark(dateStr) { // 给传进来的日期字符串加-
    return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
  };

  // 条件1：年份必须要能被4整除
  // 条件2：年份不能是整百数
  // 条件3：年份是400的倍数
  function isLeapYear(year) { // 判断闰年
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
  }

})(jQuery, window, document);

/**
 * 日历组件重新封装
 */
function setDateModal(options) {
  options=$.extend({
    title:'已选时间',//单个日期标题
    titleArr:['开始时间','结束时间'],//两个日期标题
    showBtn:true,//是否显示底部取消、确认按钮
    minDate:null,//date对象，最小日期
    maxDate:null,//date对象，最大日期
    /*dateRange:{//日期范围对象，当该对象为null时选择单个日期
      count:183,//范围天数
      tipsCallback:function () {超出范围时的回调

      }
    },*/
    callback:function (date1,date2) {//选择日期回调

    }
  },options);
  var $html=$('html');
  var $parent=$(options.parent?options.parent:'body');
  $html.css('overflow','hidden')
  $parent.css('overflow','hidden');
  var $modal=$(' <div class="date-popover-modal '+(options.showBtn?'':'no-btn')+'" id="set-date-modal">' +
      '<div class="modal-mask"> <div class="modal-content">' +
      '<div class="modal-header">' +
      '<div class="btn-list">' +
      '<div class="handle-btn your-date"> <p class="label-text">'+options.title+'</p> <p class="selected-val">请选择</p> </div>' +
      '<div class="handle-btn start-date"> <p class="label-text">'+options.titleArr[0]+'</p> <p class="selected-val">请选择</p> </div>' +
      '<div class="handle-btn end-date"> <p class="label-text">'+options.titleArr[1]+'</p> <p class="selected-val">请选择</p> </div>' +
      '</div>' +
      '</div>' +
      '<div class="modal-body"><div class="wrapper"><div class="select-panel"></div><div class="handle-list"><div class="cancel-btn">取消</div><div class="ok-btn">确定</div></div></div></div>' +
      '</div>' +
      '</div>' +
      '</div>');
  $parent.append($modal);
  var $modalContent=$modal.find('.modal-content');
  var $modalMask=$modal.find('.modal-mask');
  $modalContent.slideDown(300,function (data) {

  });

  /*时间范围提示*/
  var dateRange=options.dateRange;//{count:天数，text:提示文本}

  //
  if(dateRange){
    $modal.find('.start-date').addClass('show');
    $modal.find('.end-date').addClass('show');
  }else{
    $modal.find('.your-date').addClass('show');
  }

  /*初始化日历*/
  var initCalendar=function (parent,options) {
    var defaults={
      ifSwitch: true, // 是否切换月份
      hoverDate: false, // hover是否显示当天信息
      backToday: true, // 是否返回当天
      dateRange:dateRange,//是否是选择时间段
      callback:function (data) {

      }
    };
    options=$.extend({minDate:options.minDate,maxDate:options.maxDate},defaults,options)
    $(parent).calendar(options);
  }

  /*设置当前选择类型*/
  var date1=null;
  var date2=null;
  var $startDateBtn=$modal.find('.handle-btn.start-date');
  var $endDateBtn=$modal.find('.handle-btn.end-date');
  var $yourDateBtn=$modal.find('.handle-btn.your-date');
  initCalendar('.date-popover-modal .select-panel',{
    minDate:options.minDate,
    maxDate:options.maxDate,
    callback:function (data1,data2) {
      date1=data1;
      date2=data2;
      /*  console.log('date1:',date1);
       console.log('date2:',date2);*/
      if(dateRange){
        if(date1){
          $startDateBtn.find('.selected-val').html(date1).addClass('active');
        }
        if(date2){
          $endDateBtn.find('.selected-val').html(date2).addClass('active');
        }else{
          $endDateBtn.find('.selected-val').html('请选择').removeClass('active');
        }
        if(date1&&date2&&!options.showBtn){
           setTimeout(function () {
           ok();
           },500)
        }else if(date1){
          setSelectType('endDate');
        }
      }else{
        if(date1){
          $yourDateBtn.find('.selected-val').html(date1).addClass('active');
          if(!options.showBtn){
            setTimeout(function () {
              ok();
            },500)
          }
        }
      }
    }
  });
  var setSelectType=function (type) {
    $modal.find('.handle-btn').removeClass('active');
    /*   $modal.find('.item-curMonth').removeClass('item-selected');*/
    if(type=='startDate'){
      $startDateBtn.addClass('active');
    }else if(type=='endDate'){
      $endDateBtn.addClass('active');
    }else if(type=='yourDate'){
      $yourDateBtn.addClass('active');
    }
  }
  if(dateRange){
    setSelectType('startDate');
  }else{
    setSelectType('yourDate');
  }

  /*计算天数差的函数，通用*/
  function  DateDiff($time1,  $time2){    //sDate1和sDate2是2006-12-18格式
    var time1 = arguments[0], time2 = arguments[1];
    time1 = Date.parse(time1)/1000;
    time2 = Date.parse(time2)/1000;
    var time_ = time1 - time2;
    return Math.abs(time_/(3600*24))+1;
  }

  /*终止事件冒泡*/
  var stopPropagation=function(e){
    if(e){
      if(e.cancelBubble){
        e.cancelBubble = true;
      }
      else if(e.stopPropagation){
        e.stopPropagation();
      }
    }
  };
  /**/
  var close=function () {
    $modal.fadeOut(300,function () {
      $html.css('overflow','visible');
      $parent.css('overflow','visible');
      $modal.remove();
    });
  }
  var ok=function () {
    if(!date1){
      alert('请选择日期');
      return;
    }
    if(dateRange){
      if(date1&&date2&&DateDiff(date1, date2)>dateRange.count){
        options.dateRange.tipsCallback&&options.dateRange.tipsCallback();
        return;
      }else if(date1&&!date2){
        date2=date1;
      }
    }
    options&&options.callback&&options.callback(date1,date2);
    close();
  }
  var cancel=function () {

  }

  /*事件绑定*/
  //
  /*  $modal.find('.start-date').click(function () {
   setSelectType('startDate');
   });*/
  //
  $modalMask.on('click',function (e) {
    stopPropagation(e);
    close();
  })
  //
  $modalContent.on('click',function (e) {
    stopPropagation(e);
  })
  //
  $modalContent.find('.handle-btn').on('click',function (e) {
    var $this=$(e.currentTarget);
    if($this.hasClass('start-date')){
      initCalendar('startDate');
    }else if($this.hasClass('end-date')){
      /*  initCalendar('endDate');*/
    }
  });
  //
  $modalContent.find('.ok-btn').on('click',function (e) {
    ok();
  });
  //
  $modalContent.find('.cancel-btn').on('click',function (e) {
    close();
  });

}
