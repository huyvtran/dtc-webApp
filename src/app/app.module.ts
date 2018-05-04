import { ActivityDeliverPage } from './../pages/activi/activity-deliver/activity-deliver';
import { ActiviAgainPage } from './../pages/activi/activi-again/activi-again';
import { ActiviGiftPage } from './../pages/activi/activi-gift/activi-gift';
import { ActiviUpdatePage } from './../pages/activi/activi-update/activi-update';
import { ActiviStatePage } from './../pages/activi/activi-state/activi-state';
import { ActiviInvoicePage } from './../pages/activi/activi-invoice/activi-invoice';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule  } from '@ionic/storage';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Keyboard } from '@ionic-native/keyboard';
// 登录注册
import { LoginPage } from '../pages/log_in/login/login';
import { ForgetPage } from '../pages/log_in/forget/forget';
import { SetpassPage } from '../pages/log_in/setpass/setpass';
import { PhoneverifyPage } from '../pages/log_in/phoneverify/phoneverify';
import { EmailverifyPage } from '../pages/log_in/emailverify/emailverify';

import { MessagePage } from '../pages/messages/message/message';

import { FinishMessagePage } from '../pages/messages/finish-message/finish-message';
import { CustomerPage } from '../pages/customer/customer';
import { ProductPage } from '../pages/products/product/product';
import { ActivityPage } from '../pages/activi/activity/activity';
import { ReportPage } from '../pages/reports/report/report';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { ReminderPage } from '../pages/test/reminder/reminder';

//Rick模块
import {ProductListPage} from '../pages/products/product-list/product-list';
import {ProductDetailPage} from '../pages/products/product-detail/product-detail';
import {ProductClassifyPage} from '../pages/products/product-classify/product-classify'
import {OrderAllPage} from '../pages/orders/order-all/order-all'
import {PlaceOrderPage } from '../pages/orders/place-order/place-order'
import {AddressPage} from '../pages/orders/address/address';
import {InvoicePage} from '../pages/orders/invoice/invoice';
import {LogisticsPage} from '../pages/orders/logistics/logistics'
import {QrCodePage} from '../pages/orders/qr-code/qr-code'
import {GiftListPage} from '../pages/orders/gift-list/gift-list'
import {ClientSortPage} from '../pages/reports/client-sort/client-sort'
import {ShoppingCartPage} from '../pages/orders/shopping-cart/shopping-cart'
import {OrderDetailPage} from '../pages/orders/order-detail/order-detail'
import {ReceiptPage} from '../pages/orders/receipt/receipt'
import {PaymentVoucherPage} from '../pages/orders/payment-voucher/payment-voucher'


import { LabelManagementPage } from '../pages/customer/label-management/label-management';
import { LabelEstablishPage } from '../pages/customer/label-establish/label-establish';
import { AddCustomerPage } from '../pages/customer/add-customer/add-customer';
import { ChoiceCustomerPage } from '../pages/customer/choice-customer/choice-customer';
import { LabelUpdatePage } from '../pages/customer/label-update/label-update';
import { ConsumptionCurvePage} from "../pages/customer/consumption-curve/consumption-curve"
//活动模块
import { NewsPage } from '../pages/activi/news/news';
import { ActivitydetailsPage } from '../pages/activi/activitydetails/activitydetails';
import { CreateactivityPage } from '../pages/activi/createactivity/createactivity';
import { ActivitycodePage } from '../pages/activi/activitycode/activitycode';
import { MailistPage } from '../pages/activi/mailist/mailist';
import { WriteoffPage } from '../pages/activi/writeoff/writeoff';
import { ViewwriteoffPage } from '../pages/activi/viewwriteoff/viewwriteoff';
import { AllactivityPage } from "../pages/activi/allactivity/allactivity";
import { SiteInformationPage } from "../pages/activi/site-information/site-information";
import { MaterialsPage } from "../pages/activi/materials/materials";
import { ApprovePage } from "../pages/activi/approve/approve";
import { OrganizerPage } from "../pages/activi/organizer/organizer";
import {MaterialdetailsPage} from "../pages/activi/materialdetails/materialdetails";
import { OrderPlacePage } from './../pages/activi/order-place/order-place';
import { ActiviCustomerPage } from './../pages/activi/activi-customer/activi-customer';
import { ActiviDetailPage } from './../pages/activi/activi-detail/activi-detail';
import { SetupPage} from '../pages/setups/setup/setup';
import { CustomersPage} from '../pages/activi/customers/customers';

import { PurchaseRecordPage } from './../pages/customer/purchase-record/purchase-record';

import { ChangeAvatarPage } from '../pages/change-avatar/change-avatar';
import { ModifyPasswordPage } from '../pages/modify-password/modify-password';
import { DetailsPage } from '../pages/customer/details/details';
import { TestPage } from '../pages/test/test';
import { EditPage } from '../pages/customer/edit/edit';
import { ChoosePage } from '../pages/customer/choose/choose';
import { InvoicesPage } from '../pages/customer/invoices/invoices';
import { InvoiceStatePage } from '../pages/customer/invoice-state/invoice-state';
import { DeliveryPage } from '../pages/customer/delivery/delivery';
import { NewaddPage } from '../pages/customer/newadd/newadd';
import { HistoryPage } from '../pages/customer/history/history';
import { FortgPage } from '../pages/customer/fortg/fortg';
import { JoinCustomerPage } from '../pages/customer/join-customer/join-customer';
import { ManualAddPage } from '../pages/customer/manual-add/manual-add';
import { UpdatePage } from '../pages/customer/update/update';
import { DetailsInvoicePage } from './../pages/customer/details-invoice/details-invoice';
import { AddShaixuanPage } from './../pages/customer/add-shaixuan/add-shaixuan';
import { LabelCustomerPage } from './../pages/customer/label-customer/label-customer';
import { FilterPage } from './../pages/customer/filter/filter';
import { FiltersPage} from './../pages/customer/filters/filters';

import {AddproductsPage} from '../pages/activi/addproducts/addproducts';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import {RejectPage} from "../pages/activi/reject/reject";
import {OrderPage} from "../pages/orders/order/order";
import { MaterialListsPage } from "../pages/activi/material-lists/material-lists";
import {TrainerPage } from "../pages/activi/trainer/trainer"

//下单
import { OnlineCustomerPage } from './../pages/orders/online-customer/online-customer';
import { OrderAddressPage } from './../pages/orders/order-address/order-address';
import { ChooseAddressPage } from './../pages/orders/choose-address/choose-address';
import { ChooseInvoicePage } from './../pages/orders/choose-invoice/choose-invoice';
import { ModifyPage} from "../pages/test/modify/modify";
import { FilterCustomersPage} from "../pages/test/filter-customers/filter-customers";
import { RejectOrderPage } from './../pages/orders/reject-order/reject-order';
import { ReturnOrderPage } from './../pages/orders/return-order/return-order';
import { LogisticsOrderPage } from './../pages/orders/logistics-order/logistics-order';

//报表模块
import { SalesPage } from './../pages/reports/sales/sales';



import { Camera } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Crop } from '@ionic-native/crop';

import { JPush } from 'ionic3-jpush'; // 极光
import { Device } from '@ionic-native/device'; // 获取设备信息

import { MyNavComponent } from '../components/my-nav/my-nav';  // 头部组件
import { ComponentsModule } from '../components/components.module';

// import {EChartsModule} from 'echarts';

// import { AlphaScrollModule } from 'ion-alpha-scroll';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ForgetPage,
    SetpassPage,
    PhoneverifyPage,
    EmailverifyPage,
    OrderPage,
    MessagePage,
    CustomerPage,
    ProductPage,
    ActivityPage,
    ReportPage,
    AboutPage,
    ContactPage,
    TabsPage,
    ReminderPage,

    //Rick
    ProductListPage,
    ProductDetailPage,
    ProductClassifyPage,
    OrderAllPage,
    AddressPage,
    InvoicePage,
    LogisticsPage,
    QrCodePage,
    GiftListPage,
    ClientSortPage,
    ShoppingCartPage,
    OrderDetailPage,
    ReceiptPage,
    PaymentVoucherPage,

    RejectPage,
    NewsPage,
    ActivitydetailsPage,
    CreateactivityPage,
    ActivitycodePage,
    MailistPage,
    WriteoffPage,
    ViewwriteoffPage,
    AllactivityPage,
    SiteInformationPage,
    MaterialsPage,
    LabelUpdatePage,
    ConsumptionCurvePage,
    FiltersPage,
    ApprovePage,
    OrganizerPage,

    PurchaseRecordPage,
    ActivityDeliverPage,


    FinishMessagePage,
    PlaceOrderPage,
    LabelManagementPage,
    LabelEstablishPage,
    AddCustomerPage,
    ChangeAvatarPage,
    ModifyPasswordPage,
    ModifyPage,
    LabelCustomerPage,

    OnlineCustomerPage,
    OrderAddressPage,
    ChooseAddressPage,
    ChooseInvoicePage,
    RejectOrderPage,
    ReturnOrderPage,
    LogisticsOrderPage,
    OrderPlacePage,
    
    DetailsPage,
    TestPage,
    EditPage,
    ChoosePage,
    InvoicesPage,
    InvoiceStatePage,
    DeliveryPage,
    NewaddPage,
    HistoryPage,
    FortgPage,
    ChoiceCustomerPage,
    UpdatePage,
    DetailsInvoicePage,
    SetupPage,

    AddproductsPage,
    MaterialListsPage,
    TrainerPage,
    JoinCustomerPage,
    ManualAddPage,
    AddShaixuanPage,
    FilterPage,
    FilterCustomersPage,

    MaterialdetailsPage,
    ActiviCustomerPage,
    ActiviDetailPage,
    ActiviInvoicePage,
    ActiviUpdatePage,
    ActiviStatePage,
    ActiviGiftPage,
    CustomersPage,
    ActiviAgainPage,
    SalesPage,
    MyNavComponent
    

  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{backButtonText: '',backButtonColor:'white',tabsHideOnSubPages: 'true'}),
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    NgxQRCodeModule,
    ComponentsModule
    // EChartsModule
    // AlphaScrollModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ForgetPage,
    SetpassPage,
    PhoneverifyPage,
    EmailverifyPage,
    OrderPage,
    MessagePage,
    CustomerPage,
    ProductPage,
    ActivityPage,
    ReportPage,
    ContactPage,
    AboutPage,
    TabsPage,
    ReminderPage,
    LabelUpdatePage,
    ConsumptionCurvePage,
    LabelCustomerPage,

    //Rick
    ProductListPage,
    ProductDetailPage,
    ProductClassifyPage,
    OrderAllPage,
    AddressPage,
    InvoicePage,
    LogisticsPage,
    QrCodePage,
    GiftListPage,
    ClientSortPage,
    ShoppingCartPage,
    OrderDetailPage,
    ReceiptPage,
    PaymentVoucherPage,

    OnlineCustomerPage,
    OrderAddressPage,

    RejectPage,
    NewsPage,
    ActivitydetailsPage,
    CreateactivityPage,
    ActivitycodePage,
    MailistPage,
    WriteoffPage,
    ViewwriteoffPage,
    AllactivityPage,
    SiteInformationPage,
    MaterialsPage,
    FiltersPage,
    ApprovePage,
    OrganizerPage,

    PurchaseRecordPage,
    ActivityDeliverPage,

    
    FinishMessagePage,
    PlaceOrderPage,
    LabelManagementPage,
    LabelEstablishPage,
    AddCustomerPage,
    ChangeAvatarPage,
    ModifyPasswordPage,
    SetupPage,
    ModifyPage,
    DetailsInvoicePage,

    AddproductsPage,
    MaterialListsPage,
    TrainerPage,
    ChoiceCustomerPage,
    ChooseAddressPage,
    ChooseInvoicePage,
    RejectOrderPage,
    ReturnOrderPage,
    LogisticsOrderPage,

    DetailsPage,
    TestPage,
    EditPage,
    ChoosePage,
    InvoicesPage,
    InvoiceStatePage,
    DeliveryPage,
    NewaddPage,
    HistoryPage,
    FortgPage,
    JoinCustomerPage,
    ManualAddPage,
    UpdatePage,
    AddShaixuanPage,
    FilterPage,
    FilterCustomersPage,

    MaterialdetailsPage,
    OrderPlacePage,
    ActiviCustomerPage,
    ActiviDetailPage,
    ActiviInvoicePage,
    ActiviUpdatePage,
    ActiviStatePage,
    ActiviGiftPage,
    CustomersPage,
    ActiviAgainPage,
    SalesPage,
    MyNavComponent
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    BarcodeScanner,
    ImagePicker,
    FileTransfer,
    File,
    Camera,
    Keyboard,
    Crop,
    JPush,
    Device
  ]
})
export class AppModule {}
