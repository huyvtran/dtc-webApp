import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/log_in/login/login';
import { ActivityPage } from '../pages/activi/activity/activity';
import { TabsPage } from '../pages/tabs/tabs';

//开发引用
import {ProductPage} from '../pages/products/product/product' //品牌列表
import {ProductListPage} from '../pages/products/product-list/product-list' //产品列表
import {ProductDetailPage} from '../pages/products/product-detail/product-detail' //产品详情
import {ProductClassifyPage} from '../pages/products/product-classify/product-classify' //产品分类
import {OrderAllPage} from '../pages/orders/order-all/order-all' //全部订单
import {AddressPage} from '../pages/orders/address/address' //地址
import {InvoicePage} from '../pages/orders/invoice/invoice' //发票
import {LogisticsPage} from '../pages/orders/logistics/logistics' //物流信息
import {QrCodePage} from '../pages/orders/qr-code/qr-code' //付款码
import {GiftListPage} from '../pages/orders/gift-list/gift-list' //礼品列表
import {ReportPage} from '../pages/reports/report/report' //报表中心
import {ClientSortPage} from '../pages/reports/client-sort/client-sort' //客户排名
import {ShoppingCartPage} from '../pages/orders/shopping-cart/shopping-cart' //购物车
import {OrderDetailPage} from '../pages/orders/order-detail/order-detail' //订单详情
import {ReceiptPage} from '../pages/orders/receipt/receipt' //收据
import {PaymentVoucherPage} from '../pages/orders/payment-voucher/payment-voucher' //付款凭证

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  // rootPage:any = ActivityPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      // statusBar.backgroundColorByHexString('#ffffff');
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }
}
