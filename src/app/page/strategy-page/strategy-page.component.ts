import {Component, OnInit} from '@angular/core';
import {Arg, Process, ProcessService, ProcessType, StrategyService} from '../../api';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-strategy-page',
  templateUrl: './strategy-page.component.html',
  styleUrls: ['./strategy-page.component.css']
})
export class StrategyPageComponent implements OnInit {
  listOfData: Array<string> = [];
  listOfControl: Array<{ id: number; keyControl: string; valueControl: string }> = [];
  isModalVisible = false;
  isModalLoading = false;
  processName = '';
  processType = 'Backtest';
  argsForm!: FormGroup;

  constructor(private strategyService: StrategyService,
              private processService: ProcessService,
              private formBuilder: FormBuilder,
              private message: NzMessageService) {
    this.argsForm = formBuilder.group({});
  }

  ngOnInit(): void {
    this.loadStrategyList();
  }

  processTypeChange(value: string): void {
    this.argsForm = this.formBuilder.group({});
    this.listOfControl = [];
    if (this.processType === 'Backtest') {
      this.addField(null, Validators.pattern('^\\d{4}-\\d{1,2}-\\d{1,2} ((1|0?)[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])'));
      this.argsForm.controls[this.listOfControl.slice(-1)[0].keyControl].setValue('start');
      this.addField(null, Validators.pattern('^\\d{4}-\\d{1,2}-\\d{1,2} ((1|0?)[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])'));
      this.argsForm.controls[this.listOfControl.slice(-1)[0].keyControl].setValue('end');
    }
  }

  async loadStrategyList(): Promise<void> {
    try {
      this.listOfData = await this.strategyService.getStrategyList().toPromise();
    } catch (e) {
      this.message.error(e.message);
    }
  }

  showModal(name: string): void {
    this.processName = name;
    this.isModalVisible = true;
    this.isModalLoading = false;
    this.processTypeChange(this.processType);
  }

  cancelModal(): void {
    this.processName = '';
    this.isModalVisible = false;
    this.isModalLoading = false;
  }

  async submitNewProcess(): Promise<void> {
    for (const i in this.argsForm.controls) {
      this.argsForm.controls[i].markAsDirty();
      // this.argsForm.controls[i].updateValueAndValidity();
    }
    const args: { [p: string]: string } = {};
    this.listOfControl.forEach(ctl => {
      args[this.argsForm.controls[ctl.keyControl].value] = this.argsForm.controls[ctl.valueControl].value;
    });
    args.start = '2020-12-01 00:00:00';
    args.end = '2020-12-31 00:00:00';
    args.symbol = 'btc/usdt';
    args.exchange = 'huobi';
    args['assets#huobi#usdt'] = '10000';
    this.isModalLoading = true;
    try {
      const resp: Process = await this.processService.createNewProcess({
        name: this.processName,
        type: ProcessType[this.processType],
        args: args
      }).toPromise();
      this.message.success(`启动新的 ${this.processType} 进程成功，进程 ID: ${resp.pid}`);
    } catch (e) {
      this.message.error(e.message);
    }
    this.isModalLoading = false;
    this.isModalVisible = false;
  }

  removeField(i: { id: number; keyControl: string; valueControl: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 0) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      console.log(this.listOfControl);
      this.argsForm.removeControl(i.keyControl);
      this.argsForm.removeControl(i.valueControl);
    }
  }

  addField(e: MouseEvent, valueValidatorFn?: ValidatorFn): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      keyControl: `key${id}`,
      valueControl: `value${id}`
    };
    const index = this.listOfControl.push(control);
    console.log(this.listOfControl[this.listOfControl.length - 1]);
    this.argsForm.addControl(this.listOfControl[index - 1].keyControl, new FormControl(null, Validators.required));
    if (valueValidatorFn === undefined) {
      this.argsForm.addControl(this.listOfControl[index - 1].valueControl, new FormControl(null, Validators.required));
    } else {
      this.argsForm.addControl(this.listOfControl[index - 1].valueControl, new FormControl(null, [Validators.required, valueValidatorFn]));
    }
  }
}
