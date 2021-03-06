import { EventEmitter, OnDestroy } from '@angular/core';
import { ReuseTabContextService } from './reuse-tab-context.service';
import { ReuseContextCloseEvent, ReuseContextI18n } from './reuse-tab.interfaces';
export declare class ReuseTabContextComponent implements OnDestroy {
    private srv;
    private sub$;
    set i18n(value: ReuseContextI18n);
    readonly change: EventEmitter<ReuseContextCloseEvent>;
    constructor(srv: ReuseTabContextService);
    ngOnDestroy(): void;
}
