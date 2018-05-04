import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlaceOrderPage } from '../place-order/place-order';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { AppConfig } from '../../../app/main';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { OnlineCustomerPage } from './../online-customer/online-customer';
import { Events } from 'ionic-angular';
/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  title = '购物车';
  showUserImg = false;
  showMenu = true;
  shows = true;
  hide = false;
  ds=true;
  dw=false;
  memberId: any;
  lists = [];
  list = [];
  newLists = [];
  newList = [];
  updates = [];
  submit = [];
  allChecked: any;
  tol: any;
  loadMore: boolean = true;
  orderType = 1;
  pageId = 1;
  submits = [];
  returnList=[];
  id:any;
  name:any;
  length:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService: HttpServiceProvider,
    private storage: Storage,
    public events: Events ) {
  }

  publishEvents() {
    this.events.publish('number:shopping', Date.now());
  }

  ionViewWillLeave() {
    this.title = ' ';
    this.showMenu = false;
  }
  ionViewWillEnter() {
    this.storage.get('userinfo').then((val) => {
      if (val) {
        if (val.role.name != "DTC Head" && val.role.name != "DTC Sales") {
          this.dw = true;
          this.ds = false;
        }
      } else {

      }
    });
    
    this.length=0;
    this.list = [];
    this.lists = [];
    // this.newLists=[];
    this.allChecked = false;
    this.showMenu = true;
    this.tol = 0;
    this.title = '购物车';
    console.log(this.id,this.name);
    let self = this;
    this.httpService.getContent(function (res) {
      if (res.code === 100000) {
        self.memberId = res.data.id;
        self.cart(1, function () {
          console.log(self.lists, self.returnList)
          if (self.returnList.length > 0 && self.lists.length > 0) {
            for (let i = 0; i < self.returnList.length; i++) {
              for (let j = 0; j < self.lists.length; j++) {
                for (let x = 0; x < self.lists[j].list.length; x++) {
                  if (self.returnList[i].customerId != 0) {
                    if (self.returnList[i].customerId == self.lists[j].list[x].customerId) {
                      if (self.returnList[i].productId == self.lists[j].list[x].productId && self.returnList[i].id == self.lists[j].list[x].id) {
                        self.lists[j].list[x].checked = true;
                      }
                    }
                  } else{
                    if (self.returnList[i].productId == self.lists[j].list[x].productId && self.returnList[i].id == self.lists[j].list[x].id) {
                        self.lists[j].list[x].checked = true;
                      }
                  }                             
                }
              }
            }
          }
         
          // self.len();
        });
      }
      console.log(self.memberId)
    });
    
  }

  len(){
    if (this.lists.length > 0) {
      for (let i = 0; i < this.lists.length; i++) {
        this.length += this.lists[i].list.length
        console.log(this.length);
      }
      this.title = `购物车(${this.length})`
    }
  }
  downList() {
    this.submit = [];
    this.list = [];
    for (let i = 0; i < this.lists.length; i++) {
      for (let j = 0; j < this.lists[i].list.length; j++) {
        if (this.lists[i].list[j].checked == true) {
          this.submit.push(this.lists[i].list[j]);
        }
      }
    }
    this.Total();
    console.log(this.submit);
    console.log(this.list);
    for (let i = 0; i < this.submit.length; i++) {
      if (this.submit[i].customerId) {
        var a = this.submit[i].customerId;
        var index = this.list.indexOf(a);
        if (index >= 0) {

        } else {
          this.list.push(a);
        }
      }
    }

    console.log(this.newLists);
    if (this.newLists.length > 0) {
      this.list.push(this.newLists[0].id)
    }
    console.log(this.list);


    if (this.list.length > 1) {
      this.httpService.showToast('一次只能为一位客户下单,请重新选择');
    } else if (this.list.length == 0) {
      this.httpService.showToast('请选择客户');
    } else if (this.submit.length == 0) {
      this.httpService.showToast('请选择商品');
    } else {
      this.confirmGoods();          
    }
  }


  downLists(){
    this.httpService.showToast('您无法下单');
    return;
  }

  jump() {
    this.navCtrl.push(PlaceOrderPage, { orders: this.submit, list: this.list, orderType: this.orderType })
    this.returnList = [];
    this.newLists = [];
  }
   // 下单
   confirmGoods() {
     this.storage.get('activityMessage').then((val) => {
       if (val) {
         console.log(val);
         var name = val.name;
         let self = this;
         this.httpService.activityAlert('提示', '是否为'+name+'活动的订单', function () {
           self.jump();
         }, function () {
           self.storage.remove('activityMessage');
           self.jump();
         })
       } else {
         let self = this;
         this.httpService.customAlert('提示', '该订单为非活动订单', function () {
           self.jump();
         }, function () {
           
         })
       }
     });   
  }

  selects() {
    console.log(this.lists)
    this.submit = [];
    if (this.allChecked) {
      for (let i = 0; i < this.lists.length; i++) {
        for (let j = 0; j < this.lists[i].list.length; j++) {
          this.lists[i].list[j].checked = true;
          if (this.lists[i].list[j].checked == true) {
            this.submit.push(this.lists[i].list[j]);
            this.Total();
          }
        }
      }
    } else {
      for (let i = 0; i < this.lists.length; i++) {
        for (let j = 0; j < this.lists[i].list.length; j++) {
          this.lists[i].list[j].checked = false;

        }
      }
    }
  }

  selectProduct() {
    console.log(this.lists);
    this.submit = [];
    this.submits = [];
    for (let i = 0; i < this.lists.length; i++) {
      for (let j = 0; j < this.lists[i].list.length; j++) {
        if (this.lists[i].list[j].checked == true) {
          this.submit.push(this.lists[i].list[j]);
        }
      }
    }
    this.Total();
    for (let i = 0; i < this.lists.length; i++) {
      for (let j = 0; j < this.lists[i].list.length; j++) {
        this.submits.push(this.lists[i].list[j]);
      }
    }
    this.allChecked = this.submits.length == this.submit.length ? true : false;
  }

  cart(pageId, calback) {
    this.length=0;
    let data = {
      memberId: this.memberId,
      channel: 3,
      page: pageId,
      pageSize: 15
    }
    console.log(data)
    this.httpService.posts(AppConfig.API.cart, data).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        if (pageId == 1 && res.data.data.length > 0) {
          this.lists = this.lists.concat(res.data.data); 
          
        }
        if (pageId != 1 && res.data.data.length > 0) {
          let d = res.data.data;
          for (let z = 0; z < this.lists.length; z++) {
            for (let y = 0; y < d.length; y++) {
              if (this.lists[z].customerId == d[y].customerId) {
                this.lists[z].list = this.lists[z].list.concat(d[y].list);
                var index = d.indexOf(d[y]);
                if (index >= 0) {
                  d.splice(index, 1)
                }
              }
            }
          }
          this.lists = this.lists.concat(d);        
        }

        console.log(this.lists);
        this.Total();
        if (res.data.data.length == 0 && pageId != 1) {
          this.loadMore = false;
          this.httpService.showToast('暂无更多');
        }else{
          this.loadMore = true;
        }
        calback && calback();
      } else {
        this.loadMore = false;
        // this.httpService.showToast(res.msg, '');
      }
    }, error => {
      // this.httpService.dismissLoading();
      // this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  delete(id) {
    let ids = [id];
    console.log(ids)
    this.httpService.post(AppConfig.API.deleteShopping, ids).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.lists = [];
        this.length=0;
        this.cart(1, function () { });
        this.publishEvents();
        // this.len();              
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });
  }

  addCustomer() {
    this.submit = [];
    this.list = [];
    for (let i = 0; i < this.lists.length; i++) {
      for (let j = 0; j < this.lists[i].list.length; j++) {
        if (this.lists[i].list[j].checked == true) {
          this.submit.push(this.lists[i].list[j]);
        }
      }
    }
    this.Total();
    console.log(this.submit);
    console.log(this.list);
    for (let i = 0; i < this.submit.length; i++) {
      if (this.submit[i].customerId) {
        var a = this.submit[i].customerId;
        var index = this.list.indexOf(a);
        if (index >= 0) {

        } else {
          this.list.push(a);
        }
      }
    }

    console.log(this.newLists);
    if (this.newLists.length > 0) {
      this.list.push(this.newLists[0].id)
    }
    console.log(this.list);



    this.navCtrl.push(OnlineCustomerPage, { resolve: this.callback, lists: this.submit });
  }

  callback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.list = [];
      this.newLists = [];
      this.returnList=[];
      this.newLists = data[0];
      this.returnList = data[1];
      console.log(this.returnList);
      resolve();
    });
  }

  edit() {
    this.shows = false;
    this.hide = true;
  }

  update() {
    console.log(this.lists)
    this.updates = [];
    for (let i = 0; i < this.lists.length; i++) {
      for (let j = 0; j < this.lists[i].list.length; j++) {

        var item = this.lists[i].list[j];

        var data = {
          id: item.id,
          counts: item.counts,
          channel: 3
        }
        this.updates.push(data);
      }

    }
    this.httpService.post(AppConfig.API.updateShopping, this.updates).subscribe(res => {
      console.log(res)
      let code = res.code
      if (code === 100000) {
        this.shows = true;
        this.hide = false;
      } else {
        this.httpService.showToast(res.msg, '');
      }
    }, error => {
      this.httpService.dismissLoading();
      this.httpService.showToast('请检查参数或路径是否正确');
    });

  }

  add(x, y) {
    var obj = this.lists[x].list[y];
    console.log(obj);
    if (obj.isLimit == 1 && obj.counts >= obj.limitCounts) {
      this.httpService.showToast('数量已达上限');
      return;
    } else {
      obj.counts++
    }
  }
  reduce(x, y) {
    var obj = this.lists[x].list[y];
    console.log(obj);
    if (obj.counts > 1) {
      obj.counts--
    } else {
      this.httpService.showToast('数量已达下限');
    }
  }

  Total() {
    var alltol = 0;
    if (this.submit.length == 0) {
      this.tol = 0;
    }
    for (let i = 0; i < this.submit.length; i++) {
      let a = this.submit[i].counts;
      let b = this.submit[i].stringMoney;
      alltol += a * b;
      this.tol = alltol.toFixed(2);
      // console.log(alltol);
    }
  }

  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings() {
    this.navCtrl.push(SetupPage)
  }

  // 下拉刷新
  doRefresh(refresher) {
    let self = this; 
    this.loadMore = false;
    this.lists = [];
    this.cart(1, function () {
      refresher.complete();
    });
  }

  // 上拉加载
  doInfinite(infiniteScroll) {
    this.allChecked = false;
    this.pageId++
    this.cart(this.pageId, function () {
      infiniteScroll.complete();
    });
  }



}
