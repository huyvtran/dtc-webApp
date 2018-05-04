import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from './../../messages/message/message';
import { SetupPage } from '../../setups/setup/setup';
import { ShoppingCartPage } from './../../orders/shopping-cart/shopping-cart';
import { AppConfig } from '../../../app/main';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import ECharts from 'echarts';

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {
  title = "销售业绩";
  loadMore: boolean = true;
  showUserImg = false;
  showMenu = true;
  constructor(public navCtrl: NavController, private httpService: HttpServiceProvider, public navParams: NavParams) {
  }
  getSaleReport(callback) {
    let id = this.navParams.get('id');
    console.log('id==',id);
    this.httpService.posts(AppConfig.API.getSaleChartsData, { id}).subscribe(res => {
      console.log(res);
      if (res.code == 100000) {
        callback && callback(res.data);
      } else {
        this.httpService.showToast(res.msg);
      }
    }, err => {
      this.httpService.dismissLoading();
    });
  }
  setOption(data) {
    let xData = [];
    let yData = [];
    data.xDate.forEach((value,i)=> {
      let y = (value + "").substring(0, 4);
      let m = (value + "").substring(4);
      if(i==0|| m=='01'){
        xData.push(m + "\n\n" + y);
      }else{
        xData.push(m);
      }
    });
    data.yDate.forEach(element => {
      yData.push(element/10000)
    });
    let options = {
      xAxis: {
        type: 'category',
        name: '单位: (月)',
        nameLocation: 'end',
        nameTextStyle: {
          padding: [100, 0, 0, -50]
        },
        data: xData,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel:{
          interval:0
        }
      },
      yAxis: {
        type: 'value',
        name: '单位: (万)',
        nameGap: 22,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel:{
          margin:2
        }
      },
      series: [{
        data: yData,
        type: 'line',
        itemStyle: {
          color: "#346792"
        },
        lineStyle: {
          color: "#346792"
        }
      }],
      backgroundColor: "#fff"
    };
    let myChart = ECharts.init(document.getElementById('echarts') as HTMLDivElement);
    myChart.setOption(options);
  }
  ionViewWillEnter() {
    this.title = "销售业绩";
    this.showMenu = true;
    this.getSaleReport(this.setOption);

  }
  ionViewWillLeave() {
    this.title = "";
    this.showMenu = false;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPage');
  }

  chatbubbles() {
    this.navCtrl.push(MessagePage)
  }
  settings() {
    this.navCtrl.push(SetupPage)
  }
  cart() {
    this.navCtrl.push(ShoppingCartPage)
  }

}
