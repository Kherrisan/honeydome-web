import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Config, ConfigListPage, ConfigService} from '../../api';
import {NzTableQueryParams} from 'ng-zorro-antd/table';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.css'],
})
export class ConfigPageComponent implements OnInit {
  listOfData = [];
  modalKey = '';
  modalValue = '';
  isModalVisible = false;
  isModalLoading = false;
  isKeyEditable = true;
  pageIndex = 1;
  pageSize = 10;
  totalElements = 10;
  isTableLoading = false;

  constructor(
    private service: ConfigService,
    private message: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.loadConfigList(this.pageIndex, this.pageSize);
  }

  async onQueryParamsChange(params: NzTableQueryParams): Promise<void> {
    console.log(params);
    const {pageSize, pageIndex} = params;
    await this.loadConfigList(pageIndex, pageSize);
  }

  async loadConfigList(pageIndex: number, pageSize: number): Promise<void> {
    this.isTableLoading = true;
    let resp;
    try {
      resp = await this.service.getConfigList({page: pageIndex, size: pageSize}).toPromise();
    } catch (e) {
      this.message.error(e.message);
    }
    this.isTableLoading = false;
    this.listOfData = resp.data;
    this.totalElements = resp.page.totalElements;
    this.pageSize = resp.page.size;
  }

  addConfig(): void {
    this.isKeyEditable = true;
    this.isModalVisible = true;
    this.modalKey = '';
    this.modalValue = '';
  }

  cancelModal(): void {
    this.isModalVisible = false;
  }

  async submitConfig(): Promise<void> {
    this.isModalLoading = true;
    try {
      const config = await this.service.upsertConfig(this.modalKey, this.modalValue).toPromise();
      this.message.success(`更新配置项 ${config.key}:${config.value} 成功`);
    } catch (e) {
      this.message.error(e.message);
    }
    this.isModalLoading = false;
    this.isModalVisible = false;
    await this.loadConfigList(this.pageIndex, this.pageSize);
  }

  async deleteConfig(data: Config): Promise<void> {
    try {
      await this.service.deleteConfig(data.key).toPromise();
      this.message.success(`删除配置项 ${data.key} 成功`);
    } catch (e) {
      this.message.error(e);
    }
    await this.loadConfigList(this.pageIndex, this.pageSize);
  }

  modifyConfig(data: Config): void {
    this.isKeyEditable = false;
    this.isModalVisible = true;
    this.modalKey = data.key;
    this.modalValue = data.value;
  }
}
