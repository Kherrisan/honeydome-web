import {Component, OnInit} from '@angular/core';
import {DataService, Kline} from '../../api';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-kline-page',
  templateUrl: './kline-page.component.html',
  styleUrls: ['./kline-page.component.css']
})
export class KlinePageComponent implements OnInit {

  initial = false;
  formGroup: FormGroup;
  listOfData: Array<Kline> = [{open: 1, close: 2, high: 3, low: 4, vol: 5, time: '1997-05-14 11:11:11'}];
  totalElements = 10;
  pageSize = 10;
  pageIndex = 1;
  isTableLoading = false;
  exchange = 'HUOBI';
  symbol = 'BTC/USDT';
  period: 'MINUTE' | 'HOUR' | 'DAY' | 'WEEK' = 'DAY';
  startDatetime = null;
  endDatetime = null;

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
    if (!this.initial) {
      this.initial = true;
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
      resp = await this.data.getKlines(this.exchange, this.symbol, this.period, null, null, {
          page: pageIndex,
          size: pageSize
        }
      ).toPromise();
    } catch (e) {
      this.message.error(e.message);
    }
    this.isTableLoading = false;
    this.listOfData = resp.data;
    this.totalElements = resp.page.totalElements;
    this.pageSize = resp.page.size;
  }
}
