import { ModifyPage } from './modify/modify';
// import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReminderPage } from './reminder/reminder';
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DatePipe } from "@angular/common";
import { SetupPage } from '../setups/setup/setup';
import { MessagePage } from './../messages/message/message';
import { ShoppingCartPage } from './../orders/shopping-cart/shopping-cart';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../../app/main';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
  providers: [DatePipe]
})
export class TestPage {
  
  @Input('inputDate') currentDate: Date = new Date();
  @Input() events: any = [];
  @Input() disablePastDates: boolean = false;
  @Input() weekDaysToDisable: number[] = [];
  @Input() daysToDisable: number[] = [];
  @Input() useSwipe: boolean = true;
  @Input() showEventsList: boolean = true;
  @Input() showTodayButton: boolean = true;
  @Input() todayText: string = "Today";

  @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onEventClicked: EventEmitter<any> = new EventEmitter<any>();

  /* 加载图片 */
  Genjin_img = AppConfig.genJin_img;
  Yigenjin_img = AppConfig.yiGenjin_img;
  /* 动态添加类型 */
  contentEr = false;  
  showUserImg=false;
  showMenu = true;
  /* 存储textarea的值 */
  textVal = this.textVal;
  id:any;
  /* 接受跟进的参数 */
  forWode:string;

  /////////////
  Idwode:string;

  //底部标签显隐
  show:boolean = false;
  
  /* 显示星期几 */
  weekDays: string[] = [];
  /*  */
  pastDates: number[] = [];

  rows = [];
  stop = false;
  todayEvents = [];
  news=false;
  listMessage=[];
  /*第二个接口的调用 */
  DesId:string ;
  //当前事件的时间
  youWant:any;
  
  /* 所有的事件 */
  memberNames:string = '';//接收客户名
  noticeEvent:any;//事件
  noticeTime:any;//时间

  /* 标题 */
  title = '提醒设置';

  /* 时间 */
  firstDay:any;//当月第一天
  lastDay:any;//当月最后一天
  allDay:any;//每一天
  /* 接收modify页传来的时间 */
  changTime:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private datePipe: DatePipe,
    private httpService: HttpServiceProvider,
    public formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private storage: Storage,
    private keyboard: Keyboard
    ) {
    this.setUpWeekDaysLabels();
  }

  //页面离开执行
  ionViewWillLeave(){
    this.title = '';
    this.showMenu = false;
  }
  //进来就会执行
  ionViewWillEnter() {
    this.showMenu = true;
    this.title = '提醒设置';//标题
    this.contentEr = false;//弹框消失
    this.youWant = this.currentDate.getFullYear() + '-' + (this.currentDate.getMonth() + 1) + '-' + this.currentDate.getDate();
    //调用接口显示事件 
    this.establish();
    
    // //判断弹框是否显示
    // if(this.contentEr == false){//没有显示
    //   // document.body.style.overflow='';//出现滚动条
    //   // document.removeEventListener("touchmove",mo,false);
    // }else{
    //   var mo=function(e){e.preventDefault();};
    //   document.body.style.overflow='hidden';//隐藏滚动条
    //   document.addEventListener("touchmove",mo,false);//禁止页面滑动
    // }
    
    //获取当前月份的第一天和最后一天
    let y = this.currentDate.getFullYear(), m = this.currentDate.getMonth()+1;
    this.firstDay =  y+ '-' + m + '-' + '01';
    console.log(this.firstDay);
    let end = new Date(y, m, 0)
    this.lastDay =  end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
    console.log(this.lastDay);
    //调用接口：有事件的日期显示特殊样式
    this.currenDay(this.firstDay, this.lastDay);
    //接收修改事件传过来的时间
    console.log(this.changTime);
  }

  ionViewDidLoad(){
    this.keyboard.hideKeyboardAccessoryBar(true);
    this.keyboard.disableScroll(true);

    //键盘弹出
    this.keyboard.onKeyboardShow().subscribe((e) => {
      var height = e.keyboardHeight;
      console.log(e.keyboardHeight);
      let styles=document.getElementById('height');
      styles.style.bottom=height+"px";
    });
    //键盘收回
    this.keyboard.onKeyboardHide().subscribe((e) => {
      let sty = document.getElementById('height');
       sty.style.bottom = 0+'px';
    });
  }



  //日期组件-------开始
  setUpWeekDaysLabels() {
    let date = new Date(2017, 0, 1); /* This date has to be a Sunday */
    for(let i=0; i < 7; i++, date.setDate(date.getDate() + 1)) {
      let str: string = this.datePipe.transform(date, "E");
      str = str[0].toUpperCase() + str.slice(1);
      this.weekDays.push(str);
      /* 打印出星期几的首字母 */
      // console.log(this.weekDays);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    /* If the currentDate was changed outside (in the parent component), we need to call this.calc() */
    /* But only if the month is changed */
    if(changes["currentDate"] && !changes["currentDate"].isFirstChange()) {
      if (changes["currentDate"].currentValue.getMonth() != changes["currentDate"].previousValue.getMonth()) {
        this.calc();
        console.log("dianji")
      }
    }

    if(changes["events"] && !changes["events"].isFirstChange()) {
      let listToRemoveClasses: HTMLCollection = document.getElementsByClassName("hasEvents");
      let n: number = listToRemoveClasses.length;

      for(let i=0; i < n; i++)
        if(listToRemoveClasses[0])
          listToRemoveClasses[0].classList.remove("hasEvents"); /* Using index zero because the object is updated after we remove an item */

      this.setHasEventsClass();
      this.showTodayEvents();
    }
  }

  ngAfterViewInit(){
    /* Calls `this.calc()` after receiving an initial date */
    this.currentDate.setHours(0, 0, 0, 0);
    setTimeout(() => {
      this.calc();
      this.updateSelectedDate();
    });
  }



  setHasEventsClass(){
    let firstDayOfTheMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        
    );

    let lastDayOfTheMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        
    );

    if(this.events)
      this.events.forEach((item, index) => {
        if(item.starts.getTime() >= firstDayOfTheMonth.getTime() && item.ends.getTime() < lastDayOfTheMonth.getTime()) {
          if(document.getElementById("calendar-day-" + item.starts.getDate()))
            document.getElementById("calendar-day-" + item.starts.getDate()).classList.add('hasEvents');
        }
      });
  }

  setTodayClass() {
    /* Checks if the selected month and year are the current */
    let tmp = new Date();
    if (tmp.getFullYear() == this.currentDate.getFullYear() && tmp.getMonth() == this.currentDate.getMonth()){
      var element = document.getElementById("calendar-day-" + tmp.getDate());
      // console.log(element);
      if (element) {
        element.classList.remove("button-clear", "button-clear-md");
        element.classList.add("button-outline", "button-outline-md","selected");
      }
    }
    
  }
  //添加类名
  setSelectedClass() {
    /* Removes previous selectedDate class */
    let listToRemoveClasses: HTMLCollection = document.getElementsByClassName("selected");
    let n: number = listToRemoveClasses.length;
    for(let i=0; i < n; i++)
      listToRemoveClasses[0].classList.remove("selected"); /* Using index zero because the object is updated after we remove an item */
    
             
      let element = document.getElementById("calendar-day-" + this.currentDate.getDate());//指向当天的日期
      if(element){
        element.classList.add("selected");
        }
  }

  setToday(){
    let tmp = new Date();
    tmp.setHours(0,0,0,0);

    let calc: boolean = tmp.getMonth() + "" + tmp.getFullYear() + "" != this.currentDate.getMonth() + "" + this.currentDate.getFullYear() + "";

    this.updateSelectedDate(tmp);

    calc && this.calc();
  }

  /**
   * Recalculates the rows and columns needed to represent the new month selected
   */
  calc(){
    /* Resets the rows */
    this.rows = [];

    let tmp = new Date(this.currentDate.getTime()); tmp.setDate(1);

    while(tmp.getMonth() == this.currentDate.getMonth()){
      /* Pushes a new empty row */
      this.rows.push(['', '', '', '', '', '', '']);
      while(tmp.getDay() < 6 && tmp.getMonth() == this.currentDate.getMonth()){
        /* Populates the row only where needed */
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
        tmp.setDate(tmp.getDate() + 1);
      }
      if(tmp.getMonth() == this.currentDate.getMonth()){
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
        tmp.setDate(tmp.getDate() + 1);
      }
    }

    setTimeout(() => {
      /* Needs to be executed only after the DOM has been updated */
      this.setHasEventsClass();
      this.setTodayClass();
      this.disableDates();
    });
  }

  disableDates(){
    // Disabling past dates
  	if(this.disablePastDates){
      this.pastDates = [];
      let today = new Date();
		  // Checks if the current month is being shown
		  if (today.getFullYear() == this.currentDate.getFullYear() && today.getMonth() == this.currentDate.getMonth()) {
		  	// If current month is being shown, disable only the past days
			  for(let i = 1; i < today.getDate(); i++){
          this.pastDates.push(i);
			  }
		  } else if(this.currentDate.getTime() < today.getTime()){
		  	// If a previous month is being show (disable all days)
			  for(let i = 1; i <= 31; i++){
          this.pastDates.push(i);
			  }
		  }
	  }

	  // Disable chosen week days
	  if(this.weekDaysToDisable.length){

	  }
  }

  /**
   * Function fired when a date is clicked
   * (no need to call this.calc() because the user can't click a date on a different month)
   * @param day number The day that was clicked
   */
  //点击每一天
  dateClicked(day){
    let clickedDate = new Date(this.currentDate);
    clickedDate.setDate(day);
    this.youWant = clickedDate.getFullYear() + '-' + (clickedDate.getMonth() + 1) + '-' + clickedDate.getDate(); 
    console.log(this.youWant);
    this.updateSelectedDate(clickedDate);
    this.establish();
    this.setSelectedClass();
  }

  //左边
  previousMonth(){

    let tmp = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        this.currentDate.getDate()
    );
    //获取当前的日期的第一天
    let y = tmp.getFullYear(), m = tmp.getMonth() + 1;
    this.firstDay = y + '-' + m + '-' + '01';
    console.log(this.firstDay)
    //获取当前的日期的最后一天
    let end = new Date(y, m, 0);
    this.lastDay = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
    console.log(this.lastDay);
    this.currenDay(this.firstDay,this.lastDay);//调用接口：有事件的日期显示特殊样式
    /* Prevents skipping a month if the previous month doesn't have the selected day */
    /* Ex: Mar 31st -> Feb 28th (because Feb doesn't have a 31st) */
    while(tmp.getMonth() > this.currentDate.getMonth() - 1 && tmp.getFullYear() == this.currentDate.getFullYear()) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.updateSelectedDate(tmp);

    this.calc();
    //调用接口
    let a = new Date();
    this.youWant = tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + a.getDate();
    console.log(this.youWant);


    this.establish();
  }

  //右边
  nextMonth(){ 

    let tmp = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        this.currentDate.getDate()
    );
     //获取当前的日期的第一天
     let y = tmp.getFullYear(), m = tmp.getMonth() + 1;
     this.firstDay = y + '-' + m + '-' + '01';
    //获取当前的日期的最后一天
     let end = new Date(y, m, 0);
     this.lastDay = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
    
    this.currenDay(this.firstDay, this.lastDay);//调用接口：有事件的日期显示特殊样式
    while(tmp.getMonth() > this.currentDate.getMonth() + 1) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.updateSelectedDate(tmp);

    this.calc();
    //调用接口
   let a = new Date();
    this.youWant = tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + a.getDate();
    console.log(this.youWant);
    this.establish();
  }

  updateSelectedDate(newDate: Date = null){
    if(newDate) {
      this.currentDate = newDate;
    }
    this.onChange.emit(this.currentDate);

    setTimeout(() => {
      this.showTodayEvents();
      
    });
  }

  showTodayEvents(){
    let tmp = [];

    /* Checks for events on the new selected date */
    this.events.forEach((item) => {
      var itemDay = new Date(item.starts);
      itemDay.setHours(0,0,0,0);

      if(itemDay.getTime() == this.currentDate.getTime())
        tmp.push(item);
    });

    this.todayEvents = tmp;
  }

  eventClicked(event) {
    this.onEventClicked.emit(event);
  }


  toLocaleString = function () {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + "-";
  };
  //日期组件---------结束

  //判断弹出框的显隐
  ClassIds(item){
    this.news=true;
    this.DesId = item.id;
    this.textVal = item.followRecord;
    console.log(item);
    this.contentEr = true;
    this.show = true;
    
  }
  //判断是否显示弹框
  erClass(){
    this.news = false;
    this.contentEr = !this.contentEr;
    this.show = false;
  }

  //头部右侧小图标的跳转
  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings() {
    this.navCtrl.push(SetupPage)
  }
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }

  //点击跳转提醒页面
  update(id){
    this.navCtrl.push(ModifyPage,{
      'id': id, "username": this.navParams.get('username')
    })
  }

  //跳转创建提醒页面，用户的id和用户名出过去
  ionReminder(){
    console.log("new" + this.youWant);
    this.navCtrl.push(ReminderPage,{"id":this.navParams.get('id'),"username":this.navParams.get('username'),'currentDay':this.youWant});
  }

  //提醒列表
  establish() {
    var id='';
    var username='';
    if (this.navParams.get('id')){
       id = this.navParams.get('id');
    }
    if (this.navParams.get('username')){
      username = this.navParams.get('username');
    }
    let data = {
      "page":1, //不传默认值为1
	    "pageSize":10, //不传默认值为10
      "noticeTime":this.youWant,//日期
      "memberId":id+'',//传入用户的id
      "memberName":username.trim() //用户的名字
    }
    console.log(data);
    this.httpService.post(AppConfig.API.seeList, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.listMessage = res.data.data;
        for(let j=0;j < this.listMessage.length; j++) {
            this.id = this.listMessage[j].id; //接收提醒事件的id
            this.memberNames = this.listMessage[j].memberNames;//接收提醒事件的客户名
            this.noticeEvent = this.listMessage[j].noticeEvent;//接收提醒事件的事件
            this.noticeTime = this.listMessage[j].noticeTime;//接收提醒事件的时间
            //判断跟进记录是否有内容，进行插值
            if(this.listMessage[j].followRecord == null){
              this.listMessage[j].genjin = "跟进";
              this.listMessage[j].Url = this.Genjin_img;
            }else{
              this.listMessage[j].genjin = "已跟进";
              this.listMessage[j].Url = this.Yigenjin_img;
            }
            var t = new Date(this.listMessage[j].noticeTime); 
            this.listMessage[j].noticeTime= t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate(); 
            var idss = this.listMessage[j].memberIds;
            idss = idss.split(',');
            var newL=[];
            for (let i = 0; i < idss.length;i++){
              newL.push( parseInt(idss[i]) )
            }
           this.listMessage[j].memberIds=newL;
        }
        console.log(this.listMessage)
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  //获取本地存储的数据
  takeDate() {
    this.storage.get('wodedate').then((val) => {
      if (val) {
        console.log(val);
        this.listMessage = JSON.parse(val);
      } else {
      }
    });
    console.log(this.listMessage);
  }
  //跟进记录弹框
  erRead(){
    this.show = false;
    this.contentEr = false;
    console.log(this.Idwode);
    let data = {
      "noticeEvent":this.noticeEvent, //提醒事件
      "noticeTime":this.noticeTime, //此处传unix事件戳也可以，但必须是毫秒级别
      "memberIds":this.Idwode, //此处为逗号分隔的字符串
      "followRecord":this.textVal //跟进记录（可为空）
    }
    this.httpService.put(AppConfig.API.update + this.DesId, data).subscribe(res => {
      console.log(res);
      let code = res.code
      if (code === 100000) {
        this.listMessage = res.data;
        this.establish();
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
    
  }

  //删除
  delete(item){ 
    for(let i=0; i<this.listMessage.length;i++){
      if(this.listMessage[i] == item){
        let ids = {ids:[this.listMessage[i].id]};
        this.listMessage.splice(i,1);
        this.httpService.put(AppConfig.API.delete, ids).subscribe(res => {
          console.log(res)
          let code = res.code
          if (code === 100000) {
            let firstDay = this.firstDay;
            let lastDay = this.lastDay;
            console.log(firstDay);
            console.log(firstDay);
            this.currenDay(firstDay,lastDay);
          } else {
            this.httpService.showToast(res.msg, '');
          }
        }, error => {
          this.httpService.dismissLoading();
          this.httpService.showToast('请检查参数或路径是否正确');
        });
      }
    }
  }

  //接口---传给我有事件的时间
  currenDay(firstDay,lastDay){
    var id = '';
    var username = '';
    if (this.navParams.get('id')) {
      id = this.navParams.get('id');
    }
    if (this.navParams.get('username')) {
      username = this.navParams.get('username');
    }
    let data = {
      "startTime":firstDay,
      "endTime":lastDay,
      "memberId": id+'',
      "memberName": username.trim()
    }
    console.log(data);
    this.httpService.posts(AppConfig.API.dateUrl, data).subscribe(res => {
      console.log(res);
      let code = res.code
      if (code === 100000) {
        this.allDay = res.data;
        var d = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth());
        var curMonthDays = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate();
        console.log("本月共有 " + curMonthDays + " 天");
        let dayArr = [];
        for(let a=1; a<=curMonthDays; a++){
          dayArr.push(a);
        }
        for(let b=1; b<dayArr.length; b++){
          let rem = parseInt(dayArr[b]);
          let removeStyle = document.getElementById('calendar-day-' + rem);
          removeStyle.style.border = "none";
        }
        for(let i=0; i< this.allDay.length; i++){
          let num = parseInt(this.allDay[i])
          let toAllday = document.getElementById('calendar-day-' + num);
          toAllday.style.border = "1px solid #fa9d3b";
        }
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.showToast('请检查参数或路径是否正确');
    });  
  }

}
