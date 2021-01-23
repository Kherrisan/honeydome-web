/**
 * Honeydome API
 * Honeydome-Web 调用 Honeydome-Engine 的 API 的接口规约。
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ProcessType } from './processType';


export interface Process { 
    /**
     * 进程的id
     */
    pid?: string;
    /**
     * 进程所实例化的策略名
     */
    name?: string;
    type?: ProcessType;
    /**
     * 进程的启动时间
     */
    launchTime?: string;
    /**
     * 进程的终结时间
     */
    terminateTime?: string;
    /**
     * 收益率
     */
    earningsRate?: number;
    /**
     * 回撤率
     */
    retracementRate?: number;
    args?: { [key: string]: string; };
}

