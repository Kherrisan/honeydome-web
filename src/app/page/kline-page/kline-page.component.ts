import {Component, OnInit} from '@angular/core';
import {DataService, Kline} from '../../api';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormGroup} from '@angular/forms';
import format from 'date-fns/format';

@Component({
  selector: 'app-kline-page',
  templateUrl: './kline-page.component.html',
  styleUrls: ['./kline-page.component.css']
})
export class KlinePageComponent implements OnInit {

  initial = false;
  formGroup: FormGroup;
  listOfData: Array<Kline> = [];
  totalElements = 10;
  pageSize = 10;
  pageIndex = 1;
  isTableLoading = false;
  exchange = 'HUOBI';
  symbol = 'BTC/USDT';
  period: 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' = 'DAY';
  startDatetime = null;
  endDatetime = null;
  isSearched = false;

  constructor(private message: NzMessageService, private data: DataService, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({});
  }

  ngOnInit(): void {
  }

  resetForm(): void {
    this.startDatetime = null;
    this.endDatetime = null;
    this.symbol = null;
    this.period = 'DAY';
    this.exchange = 'HUOBI';
  }

  async onQueryParamsChange(params: NzTableQueryParams): Promise<void> {
    if (this.isSearched) {
      this.isSearched = false;
      return;
    }
    console.log(params);
    const {pageSize, pageIndex} = params;
    await this.loadKlineList(pageIndex, pageSize);
  }

  async loadKlineList(pageIndex: number, pageSize: number): Promise<void> {
    this.isTableLoading = true;
    let resp;
    try {
      let start, end: string | null;
      if (this.startDatetime !== null) {
        start = format(this.startDatetime, 'yyyy-MM-dd\'T\'hh:mm:ssXXX');
      }
      if (this.endDatetime !== null) {
        end = format(this.endDatetime, 'yyyy-MM-dd\'T\'hh:mm:ssXXX');
      }
      resp = await this.data.getKlines(this.exchange, this.symbol, this.period, pageIndex, pageSize, start, end).toPromise();
    } catch (e) {
      this.message.error(e.message);
    }
    this.isTableLoading = false;
    this.listOfData = resp.data;
    this.totalElements = resp.page.totalElements;
    this.pageSize = resp.page.size;
  }

  async search(): Promise<void> {
    await this.loadKlineList(this.pageIndex, this.pageSize);
    this.isSearched = false;
  }
}
