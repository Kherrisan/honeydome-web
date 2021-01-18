import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './authentication.interceptor';
import {LoggingInterceptor} from './logging.interceptor';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {OauthService} from './oauth.service';
import {RouterModule, Routes} from '@angular/router';
import {AbstractPageComponent} from './page/abstract-page/abstract-page.component';
import {StrategyPageComponent} from './page/strategy-page/strategy-page.component';
import {ConfigPageComponent} from './page/config-page/config-page.component';
import {IconsProviderModule} from './icons-provider.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzFormModule} from 'ng-zorro-antd/form';
import {ConfigService, DataService, ProcessService, StrategyService} from './api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {KlinePageComponent} from './page/kline-page/kline-page.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';

import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NzStatisticModule} from 'ng-zorro-antd/statistic';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {ProcessPageComponent} from './page/process-page/process-page.component';

registerLocaleData(zh);

const routes: Routes = [
  {
    path: '', redirectTo: 'abstract', pathMatch: 'full'
  },
  {
    path: 'abstract',
    component: AbstractPageComponent,
    data: {breadcrumb: '概要信息'},
  },
  {
    path: 'strategy',
    component: StrategyPageComponent,
    data: {breadcrumb: '策略列表'},
  },
  {
    path: 'config',
    component: ConfigPageComponent,
    data: {breadcrumb: '配置列表'},
  },
  {
    path: 'kline',
    component: KlinePageComponent,
    data: {breadcrumb: 'K线历史数据'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AbstractPageComponent,
    ConfigPageComponent,
    StrategyPageComponent,
    KlinePageComponent,
    ProcessPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserModule,
    NzMessageModule,
    NzFormModule,
    IconsProviderModule,
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDividerModule,
    NzGridModule,
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    NzSelectModule,
    NzRadioModule,
    NzFormModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzStatisticModule,
    NzListModule,
    NzProgressModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    OauthService,
    ConfigService,
    StrategyService,
    ProcessService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
