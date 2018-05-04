import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import echarts  from 'echarts';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { AppConfig } from '../../../app/main';

/**
 * Generated class for the ConsumptionCurvePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consumption-curve',
  templateUrl: 'consumption-curve.html',
})
export class ConsumptionCurvePage {
  title="";
  timeList=[];
  moneyList=[];
  xData=[];
  showUserImg = false;
  showMenu = true;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private httpService: HttpServiceProvider) {
  }
    ionViewWillLeave() {
        this.title='';
        this.showMenu = false;
    }

  ionViewWillEnter (){
    this.title = "消费趋势";
    this.showMenu = true;
    this.getCurve();
  }
  //获取消费趋势数据
  getCurve(){
    var data = {id:this.navParams.get("id")}
    this.httpService.posts(AppConfig.API.customerCurve,data).subscribe(res => {
        let code = res.code;
        if (code === 100000) {
          this.timeList=res.data.xDate;
          this.moneyList = res.data.yDate;
          this.setEchart(echarts);
        } else {
          this.httpService.showToast(res.msg, '');
        }
      }, error => {
        this.httpService.dismissLoading();
        this.httpService.showToast('请检查参数或路径是否正确');
      });
  }
  setOption() {
    this.timeList.forEach((value,i)=> {
            let y = (value + "").substring(0, 4);
            let m = (value + "").substring(4);
            if(i==0|| m=='01'){
                this.xData.push(m + "\n\n" + y);
            }else{
                this.xData.push(m);
            }
        })
    }
  setEchart(ec) {
    this.setOption();
    var myChart = ec.init(document.getElementById('main'));
    let options = {
        xAxis: {
            type: 'category',
            name: '单位: (月)',
            nameLocation: 'end',
            nameTextStyle: {
            padding: [100, 0, 0, -50]
            },
            data: this.xData,
            axisLine: {
                show: true
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
            name: '单位: (元)',
            nameGap: 22,
            axisLine: {
                show: true
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            data: this.moneyList,
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
    myChart.setOption(options);
}

}
