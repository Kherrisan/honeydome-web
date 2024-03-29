export * from './config.service';
import { ConfigService } from './config.service';
export * from './data.service';
import { DataService } from './data.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './process.service';
import { ProcessService } from './process.service';
export * from './strategy.service';
import { StrategyService } from './strategy.service';
export const APIS = [ConfigService, DataService, DefaultService, ProcessService, StrategyService];
