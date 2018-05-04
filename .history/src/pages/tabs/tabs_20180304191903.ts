import { Component } from '@angular/core';

import { OrderPage } from '../orders/order/order';
import { CustomerPage } from '../customer/customer';
import { ProductPage } from '../products/product/product';
import { ActivityPage } from '../activi/activity/activity';
import { ReportPage } from '../reports/report/report';


@Component({
  selector:'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  orderTabRoot = OrderPage;
  customerTabRoot = CustomerPage;
  productTabRoot = ProductPage;
  activityTabRoot = ActivityPage;
  reportTabRoot = ReportPage;
  constructor() {
  }
}
