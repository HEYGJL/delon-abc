import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlainI18NService } from '@delon/theme';
import { BooleanInput, NumberInput } from '@delon/util/decorator';
import { ReuseContextCloseEvent, ReuseContextI18n, ReuseCustomContextMenu, ReuseItem, ReuseTabMatchMode, ReuseTabRouteParamMatchMode } from './reuse-tab.interfaces';
import { ReuseTabService } from './reuse-tab.service';
export declare class ReuseTabComponent implements OnInit, OnChanges, OnDestroy {
    private srv;
    private cdr;
    private router;
    private route;
    private i18nSrv;
    private doc;
    static ngAcceptInputType_debug: BooleanInput;
    static ngAcceptInputType_max: NumberInput;
    static ngAcceptInputType_tabMaxWidth: NumberInput;
    static ngAcceptInputType_allowClose: BooleanInput;
    static ngAcceptInputType_keepingScroll: BooleanInput;
    private tabset;
    private unsubscribe$;
    private updatePos$;
    private _keepingScrollContainer;
    list: ReuseItem[];
    item: ReuseItem;
    pos: number;
    mode: ReuseTabMatchMode;
    i18n: ReuseContextI18n;
    debug: boolean;
    max: number;
    tabMaxWidth: number;
    excludes: RegExp[];
    allowClose: boolean;
    keepingScroll: boolean;
    set keepingScrollContainer(value: string | Element);
    customContextMenu: ReuseCustomContextMenu[];
    tabBarExtraContent: TemplateRef<void>;
    tabBarGutter: number;
    tabBarStyle: {
        [key: string]: string;
    };
    tabType: 'line' | 'card';
    routeParamMatchMode: ReuseTabRouteParamMatchMode;
    readonly change: EventEmitter<ReuseItem>;
    readonly close: EventEmitter<ReuseItem | null>;
    constructor(srv: ReuseTabService, cdr: ChangeDetectorRef, router: Router, route: ActivatedRoute, i18nSrv: AlainI18NService, doc: any);
    private genTit;
    private get curUrl();
    private genCurItem;
    private genList;
    private updateTitle;
    private refresh;
    contextMenuChange(res: ReuseContextCloseEvent): void;
    _to(index: number, cb?: () => void): void;
    _close(e: Event | null, idx: number, includeNonCloseable: boolean): boolean;
    activate(instance: any): void;
    ngOnInit(): void;
    ngOnChanges(changes: {
        [P in keyof this]?: SimpleChange;
    } & SimpleChanges): void;
    ngOnDestroy(): void;
}
