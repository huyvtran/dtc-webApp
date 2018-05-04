import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { AddproductsPage } from '../addproducts/addproducts';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from './../../../app/main';

/**
 * Generated class for the MaterialsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-materials',
  templateUrl: 'materials.html',
})
export class MaterialsPage {


  dataList = [];   // 最终展示的列表
  list = [];   // 
  type;
  isEdit = false;
  chooseIndex = 0;
  number = 9;
  resolve: any;
  warehouse;  // 仓库
  isBtnShow=false;
  loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpService: HttpServiceProvider,public loadingCtrl: LoadingController ) {
  }

  ionViewDidLoad() {

    // this.list = [{sku:"1233",name:"物料1",number:1,edit:false},{sku:"12334",name:"物料2",number:2,edit:false}];
   
    this.resolve = this.navParams.get("resolve");
    this.list = this.navParams.get("list");
    this.type = this.navParams.get("type");
    this.isBtnShow = this.navParams.get("isBtnShow");
    let cityName = this.navParams.get("cityName");
    console.log(this.list);
    console.log(this.isBtnShow);

    this.getWareHouse(cityName, this.type);
  }

  ionViewWillEnter (){
    this.loading = this.loadingCtrl.create({ content:"loading...",dismissOnPageChange:true, showBackdrop:true });
    this.loading.present();
  }


  // 首先根据城市获取仓库
  getWareHouse(city, type) {
    let self = this;
    this.httpService.posts(AppConfig.API.wareHouse, { city: city }).subscribe(res => {
      console.log(res);
      if (res.code == 100000) {
        if (res.data) {
          // self.warehouse = res.data;
          self.warehouse =  "CNDA";   // 暂时先写死
          if (this.list.length > 0 && this.list) {
            self.getListWithWarHouse(this.list);
          } else {
            self.getList(type);
          }

        } else {

          self.warehouse =  "CNDA";   // 暂时先写死
          if (this.list.length > 0 && this.list) {
            self.getListWithWarHouse(this.list);
          } else {
            self.getList(type);
          }


          // 无匹配仓库则无法创建 提示回到上一页
          // self.httpService.customAlert("提示", "该城市暂无仓库,请重新选择城市", function () {
          //   self.navCtrl.pop();
          // }, function () {
          //   self.navCtrl.pop();
          // })

        }
      } else {

      }
    })

  }


  // 获取物料清单 (未加库存限制)
  getList(type) {
    let self = this;
    this.httpService.posts(AppConfig.API.materialList + type, {}).subscribe(res => {
      console.log(res);
      if (res.code == 100000) {
        //  self.list = res.data;
        self.getListWithWarHouse(res.data);
      } else {
        self.showToast("匹配物料清单失败");
      }
    })
  }

  // 库存判断
  getListWithWarHouse(list) {
    var sub = [];
    for (let index in list) {
      sub.push(list[index].productId);
    }
    var data = {
      productIds: sub,
      warehouseCode: this.warehouse
    }
    let self = this;
    this.httpService.posts(AppConfig.API.wareHouseList, data).subscribe(res => {
      console.log(res);
      if (res.data && res.code == 100000) {

        self.dataList = [];
        for (let i = 0; i < res.data.length; i++) {
          var item = list[i];
          // 库存判断 如果库存大于清单对应的数量        
          self.dataList.push(res.data[i]);
          var temp = self.dataList[i];
          temp.id = item.id;
          temp.eventType = item.eventType;
          temp.productId = item.productId;
          temp.max = res.data[i].activitySaleStock;
          temp.productName = res.data[i].productName;
          temp.edit = false;
          temp.sku = res.data[i].productSku;

          if (res.data[i].activitySaleStock >= item.productNum) {
            temp.productNum = item.productNum;
            // self.dataList.push(
            //   {
            //     id: item.id,
            //     eventType: item.eventType,
            //     productId: item.productId,
            //     productNum: item.productNum,
            //     max: res.data[i].activitySaleStock,
            //     productName: res.data[i].productName,
            //     edit: false
            //   }
            // );
          } else {   // 如果库存不够
            temp.productNum = res.data[i].activitySaleStock;
            // self.dataList.push(
            //   {
            //     id: item.id,
            //     eventType: item.eventType,
            //     productId: item.productId,
            //     productNum: res.data[i].activitySaleStock,
            //     max: res.data[i].activitySaleStock,
            //     productName: res.data[i].productName,
            //     edit: false
            //   }
            // );
          }

        }
        this.loading.dismiss();
        console.log(this.dataList)
        // alert(JSON.stringify(this.dataList));
      } else {
        this.showToast("库存校验失败");
      }
    },error=>{
      this.loading.dismiss();
      this.showToast("网络连接出错,请稍后再试");
    })

  }

  showToast(msg) {
    this.httpService.showToast(msg);
  }

  // 开启编辑模式
  edit(index) {
    this.dataList[index].edit = true;
  }

  // 完成编辑
  complete(index) {
    if (this.dataList[index].productNum <= this.dataList[index].max) {
      this.dataList[index].edit = false;
    } else {
      this.showToast("数量已达上限,请修改后保存");
    }

  }

  // 数量递减
  remove(index) {
    var item = this.dataList[index];
    if (item.productNum > 1) {
      item.productNum--;
    } else {
      this.showToast("数量已达下限");
    }

  }

  // 数量累加
  add(index) {
    var item = this.dataList[index];
    if (item.productNum >= item.max) {
      this.showToast("数量已达上限");
    } else {
      item.productNum++;
    }
  }

  getAddproducts() {
    this.navCtrl.push(AddproductsPage, { resolve: this.addMaterialCallback, list: this.dataList, type: this.type, wareHouse:this.warehouse });
  }

  addMaterialCallback = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.getListWithWarHouse(this.dataList);
      resolve();
    });
  }


  // 活动删除

  delete(index) {
    this.dataList.splice(index, 1);
  }

  //保存
  save() {
    var canSave = true;
    for (var index in this.dataList) {
      if (this.dataList[index].productNum > this.dataList[index].max) {
        canSave = false;
      }
    }

    var haveEmpty = false;

    for (var index in this.dataList) {
      if (this.dataList[index].productNum == 0) {
        haveEmpty = true;
      }
    }

    if (canSave && (haveEmpty == false)) {
      this.resolve({list:this.dataList, warehouse:this.warehouse}).then((result) => { });
    
      this.navCtrl.pop();
    } else if (canSave == false) {
      this.showToast("数量已达上限,请修改后保存");
      return;
    } else if (haveEmpty) {
      this.showToast("请修改数量为0的物料");
      return;
    }
  }


}
