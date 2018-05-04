import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { Storage } from '@ionic/storage';


platformBrowserDynamic().bootstrapModule(AppModule);

export class AppConfig{ 
    //图片加载
    public static gateway = "http://dtc.ocheng.me/api/";//
    // public static gateway = "https://edrington.shop/api/";//
    public static logo_img = 'assets/images/login/loginlogo_02.png';//login
    public static username_img = 'assets/images/login/mobilecopy@2x.png';//账号
    public static password_img = 'assets/images/login/lockcopy@2x.png';//密码
    public static code_img = 'assets/images/login/code@2x.png';//
    public static email_img = 'assets/images/login/email@2x.png';
    public static head_img = 'assets/product/heard.png';//头像
    public static head = 'assets/icon/moren.png';//头像
    public static sjx_img = 'assets/icon/xsjx.png';//头像
    public static sqjp_img = 'assets/icon/sqjp.png';//头像
    //客户管理
    public static tixing_img = 'assets/images/customer/tixing.png';//提醒设置
    public static shaiXuan_img = 'assets/images/customer/shaixuan.png';//筛选客户
    public static biaoQian_img = 'assets/images/customer/biaoqianguanli.png';//标签管理
    public static tianJia_img = 'assets/images/customer/tianjiakehu.png';//添加客户
    public static search_img = 'assets/product/search.png';//搜索
    //活动中心
    public static Activity_img = 'assets/icon/activity.png';//创建活动
    //添加客户
    public static erWeima_img = 'assets/icon/qrcode.png';//二维码
    //客户详情
    public static jiBen_img = 'assets/images/customer/main-inform.png';//基本信息
    public static qiTa_img = 'assets/images/customer/others.png';//其他信息
    public static shouHuo_img = 'assets/images/customer/take.png';//收货信息
    public static faPiao_img = 'assets/images/customer/fapiao.png';//发票信息
    public static gouMai_img = 'assets/images/customer/goumai.png';//购买记录
    public static tiXing_img = 'assets/images/customer/yel-tixing.png';//提醒设置
    //编辑客户信息
    public static tianJiabiaoQian_img = 'assets/images/customer/added.png';//添加标签
    public static jianTou_img = 'assets/product/jiantou.png';//箭头指向
    //添加标签
    public static biaoQian2_img = 'assets/product/biaoqian.png'//固定(自定义)标签
    //添加地址
    public static zhiXiang_img = 'assets/images/customer/zhixiang.png';//详细地址
    //订单详情
    public static commodity_img = 'assets/product/logistics-img.png';//商品图片
    public static car_img = 'assets/images/customer/yunshu.png';//运输车
    public static coordinate_img = 'assets/icon/coordinate.png';//坐标地址
    public static liPin_img = 'assets/images/customer/lipin.png';//添加礼品
    public static appRoved_img = 'assets/images/customer/shenpi.png';//审批订单
    public static payment_img = 'assets/images/customer/fukuan.png';//付款方式
    //筛选客户
    public static ggengDuo_img = 'assets/images/customer/zhixiang.png';//更多
    //标签管理
    public static chuangJian_img = 'assets/icon/addto.png';//创建标签
    //产品中心
    public static classiFication_img = 'assets/product/classify.png';//分类
    public static gouWucar_img = 'assets/product/shopp.png';//购物车
    //提醒设置
    public static genJin_img = 'assets/product/genjin.png';//跟进
    public static yiGenjin_img = 'assets/product/yigenjin.png';//已跟进

    public static version = 'version 2.0.0'; //版本号
    
    //API加载
    public static API = {
       loginUrl:'user/login',     // 登录接口 
       getyzmUrl: 'user/front/sendVerificationCode',     // 获取验证码接口 
       authentication: 'user/front/checkVerificationCode',   //认证  
       fortpasswordUrl: 'user/front/resetPassword', // 忘记密码接口
       classiFication:'product/productInfo/category/tree?companyId=36&store=app',//产品分类
       productList:'product/productInfo/brand/list?companyId=36',   // 产品列表接口  
       merchandisetList:'product/productInfo/lists',  //商品列表接口
       merchandDetails:'product/productInfo/',  //商品详情接口     
       personnelMessage: 'company/employeeController/selectByUserId',    // 人员信息接口
       personnelList: 'member/front/query/member',  //客户列表接口 
       personnelDetails: 'member/web/find/member/',  //客户详情接口
       chooseCustomers:'member/front/query/member/single', //选择客户
       addProvince: 'order/city/list/',  //添加省市
       addCustomer:'member/front/add/member', //添加客户
       sourceActivity:'marketing/event/findAll',  //活动来源接口
       employeeController: 'company/employeeController/findAllEmployee ',  //负责销售接口
       customerType:'member/front/get/cardLevel/list/', //客户类型 
       joinList:'member/front/tag/all/', //获取标签接口
       editCustomer:'member/front/update/member', //编辑客户
       modifyPassword:'user/front/update/user', //修改密码
       //购买记录
        record:'order/query/member/order/list/app',//全部购买记录
       //设置提醒
        reminderUrl:'member/notice/' ,//新增设置
        seeList:'member/notice/list',//提醒列表
        update:'member/notice/',//提醒修改
        display:'member/notice/',//提醒详情
        delete:'member/notice/del',//删除提醒
        dateUrl:'member/notice/dates',//有事件的日期
       // 收货
        addMessage:'member/app/create/member/address',  // 新增收货地址
        deliveryMessage:'member/app/find/member/address/',//发货信息接口   
        default:'member/app/update/member/address/default',//设置默认
        message:'member/app/get/address/ ',//地址详情
        updateMessage: 'member/app/update/member/address/info',//更新收货地址
        deleteMessage:'member/app/delete/member/address/',//删除收货地址
        // 发票  
        invoiceMessage: 'member/web/find/member/invoice/',  //发票信息接口
        addInvoice:'member/app/create/member/invoice',//添加发票
        invoiceList: 'member/app/find/member/invoice/',//发票列表
        dateleInvoice:'member/app/update/member/invoice/status/',//删除发票
        setupInvoice:'member/app/update/member/invoice/default',//设置默认
        detailsInvoice: 'member/app/get/address/invoice/',//发票详情
        updateInvoice: 'member/app/update/member/invoice/info',//更新发票
        //筛选
        screenList:'member/front/tag/private',//筛选列表
        //标签
        labelList:'member/front/tag/list',//标签列表
        addLabel:'member/front/add/tag',//创建标签
        queryLabel:'member/front/find/tag/',//查询
        deleteLabel:'member/front/del/tag/',//删除 
        updateLabel:'member/front/update/tag',//更新
        //图片上传
        updataImg:'product/productInfo/upload',//上传图片      
        changeImage: 'company/employeeController/update/img', // 更换头像


        //订单模块
        newOnline:'order/app/sale/resubmit/order',//下单接口
        online: 'order/submit/order/online',//下单接口
        getDefault:'member/app/get/default/address/',//获取会员默认地址
        getInovice: 'member/app/get/default/invoice/',//获取会员默认发票信息
        shopping:'order/add/shopping/cart/app',//加入购物车
        cart:'order/query/shopping/cart/app',//购物车列表
        deleteShopping:'order/delete/shopping/cart/batch',//删除购物车
        updateShopping:'order/update/shopping/cart/counts',//更新购物车
        payment:'payment/pay',//支付
        getStatus:'order/get/order/status/',//查看订单状态
        submitImg:'order/app/submit/payment/voucher',//提交凭证
        orderList:'order/query/order/list/app',  //订单列表
        approvalList:'order/query/order/verify/list/app', // 审批列表
        orderDetails:'order/get/online/order/info/',     //订单详情
        changeOrderStatus:'order/update/order/status/',  // 更改订单状态
        examine:'order/app/judge/examine',//是否需要审批
        cancel:'order/app/sales/cancel/order',//取消订单
        returnGoods:'order/app/apply/refund',//退货
        logistics:'order/perfect/refund/order/info',//完善物流信息
        role:'company/employeeController/get/employee/',//获取dtc
        getLogistics:'order/get/express/info/online/',//获取物流信息


        //活动模块
        createActivity:'marketing/event/add',//添加活动
        getAllActivity:'marketing/event/list',//获取全部活动
        getActivityStatus:'marketing/event/list',//查看不同状态下的活动
        confirmActivity:'marketing/event/update/true',//确认活动
        cancelActivity:'marketing/event/update/false',//驳回活动
        getActivityCode:'',//获取活动二维码
        verifyActivity:'',//核销活动
        checkMaterial:'',//检查核销材料
        eventDetails:'marketing/event/',//活动详情
        materialList:'marketing/eventProduct/queryTemplate/'
    }
}


