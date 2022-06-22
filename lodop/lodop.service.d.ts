import { OnDestroy } from '@angular/core';
import { AlainConfigService, AlainLodopConfig } from '@delon/util/config';
import { LazyService } from '@delon/util/other';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';
import { LodopPrintResult, LodopResult } from './lodop.types';
export declare class LodopService implements OnDestroy {
    private scriptSrv;
    private defaultConfig;
    private _cog;
    private pending;
    private _lodop;
    private _init;
    private _events;
    private printBuffer;
    constructor(scriptSrv: LazyService, configSrv: AlainConfigService);
    /**
     * Get or set configuration, **Note:** Resetting will invert and reload script resources
     *
     * 获取或重新设置配置，**注：**重新设置会倒置重新加载脚本资源
     */
    get cog(): AlainLodopConfig;
    set cog(value: AlainLodopConfig);
    /**
     * Event change notification
     *
     * 事件变更通知
     */
    get events(): Observable<LodopPrintResult>;
    /**
     * Get lodop object
     *
     * 获取 lodop 对象
     */
    get lodop(): Observable<LodopResult>;
    /**
     * Get printer list
     *
     * 获取打印机列表
     */
    get printer(): string[];
    private check;
    private request;
    /**
     * Reset lodop object
     *
     * 重置 lodop 对象
     */
    reset(): void;
    /**
     * Attach code to the `lodop` object, the string class supports dynamic parameters of `{{key}}`,
     * **Note:** The code refers to the string data generated by the print design
     *
     * 附加代码至 `lodop` 对象上，字符串类支持 `{{key}}` 的动态参数，**注：** 代码是指打印设计所产生字符串数据
     */
    attachCode(code: string, contextObj?: NzSafeAny, parser?: RegExp): void;
    /**
     * The code is automatically returned after opening the print design and closing,
     * **Note:** Automatically listen for the `On_Return` event, and it will be removed after running
     *
     * 打开打印设计关闭后自动返回代码，**注：** 自动监听 `On_Return` 事件，运行后会移除
     */
    design(): Promise<string>;
    private printDo;
    /**
     * Print immediately, generally used for batch printing
     *
     * 立即打印，一般用于批量套打
     */
    print(code: string, contextObj: {} | Array<{}>, parser?: RegExp): void;
    ngOnDestroy(): void;
}
