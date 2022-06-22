import { ComponentFactoryResolver, Directive, EventEmitter, Host, Injector, Input, Optional, Output, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlainConfigService } from '@delon/util/config';
import { fixEndTimeOfRange, getTimeDistance } from '@delon/util/date-time';
import { assert, deepMergeKey } from '@delon/util/other';
import { NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { Subject } from 'rxjs';
import { RangePickerShortcutTplComponent } from './range-shortcut.component';
export class RangePickerDirective {
    constructor(dom, configSrv, nativeComp, resolver, injector) {
        this.dom = dom;
        this.nativeComp = nativeComp;
        this.resolver = resolver;
        this.injector = injector;
        this.destroy$ = new Subject();
        this.shortcutFactory = null;
        this.start = null;
        this.end = null;
        this.ngModelEndChange = new EventEmitter();
        assert(!!nativeComp, `It should be attached to nz-range-picker component, for example: '<nz-range-picker [(ngModel)]="i.start" extend [(ngModelEnd)]="i.end" shortcut></nz-range-picker>'`);
        const cog = configSrv.merge('dataRange', {
            nzFormat: 'yyyy-MM-dd',
            nzAllowClear: true,
            nzAutoFocus: false,
            nzPopupStyle: { position: 'relative' },
            nzShowToday: true,
            shortcuts: {
                enabled: false,
                closed: true,
                list: [
                    {
                        text: '今天',
                        fn: () => getTimeDistance('today'),
                    },
                    {
                        text: '昨天',
                        fn: () => getTimeDistance('yesterday'),
                    },
                    {
                        text: '近3天',
                        fn: () => getTimeDistance(-2),
                    },
                    {
                        text: '近7天',
                        fn: () => getTimeDistance(-6),
                    },
                    {
                        text: '本周',
                        fn: () => getTimeDistance('week'),
                    },
                    {
                        text: '本月',
                        fn: () => getTimeDistance('month'),
                    },
                    {
                        text: '全年',
                        fn: () => getTimeDistance('year'),
                    },
                ],
            },
        });
        this.defaultShortcuts = Object.assign({}, cog.shortcuts);
        Object.assign(this, cog);
    }
    set shortcut(val) {
        const item = deepMergeKey({ list: [] }, true, this.defaultShortcuts, val == null ? {} : val);
        if (typeof val !== 'object') {
            item.enabled = val !== false;
        }
        (item.list || []).forEach(i => {
            i._text = this.dom.bypassSecurityTrustHtml(i.text);
        });
        this._shortcut = item;
        this.refreshShortcut();
    }
    get shortcut() {
        return this._shortcut;
    }
    get dp() {
        return this.nativeComp.datePicker;
    }
    get srv() {
        return this.dp.datePickerService;
    }
    cd() {
        this.dp.cdr.markForCheck();
    }
    overrideNative() {
        const dp = this.dp;
        dp.writeValue = (value) => {
            const dates = (value && this.ngModelEnd ? [value, this.ngModelEnd] : []).filter(w => !!w);
            this.srv.setValue(this.srv.makeValue(dates));
            this.start = dates.length > 0 ? dates[0] : null;
            this.end = dates.length > 0 ? dates[1] : null;
            this.cd();
        };
        const oldOnChangeFn = dp.onChangeFn;
        dp.onChangeFn = (list) => {
            let start = null;
            let end = null;
            if (list.length > 0 && list.filter(w => w != null).length === 2) {
                [start, end] = fixEndTimeOfRange([list[0], list[1]]);
            }
            this.start = start;
            this.end = end;
            oldOnChangeFn(start);
            this.ngModelEnd = end;
            this.ngModelEndChange.emit(end);
        };
    }
    refreshShortcut() {
        if (!this._shortcut) {
            return;
        }
        const { enabled, list } = this._shortcut;
        let extraFooter;
        if (!this.nativeComp || !enabled) {
            extraFooter = undefined;
        }
        else {
            if (!this.shortcutFactory) {
                const factory = this.resolver.resolveComponentFactory(RangePickerShortcutTplComponent);
                this.shortcutFactory = factory.create(this.injector);
            }
            const { instance } = this.shortcutFactory;
            instance.list = list;
            instance.click = (item) => {
                const res = item.fn([this.start, this.end]);
                this.srv.setValue(this.srv.makeValue(res));
                this.dp.onChangeFn(res);
                this.dp.close();
            };
            extraFooter = instance.tpl;
        }
        this.nativeComp.datePicker.extraFooter = extraFooter;
        Promise.resolve().then(() => this.cd());
    }
    ngAfterViewInit() {
        this.overrideNative();
        this.refreshShortcut();
    }
    destoryShortcut() {
        if (this.shortcutFactory != null) {
            this.shortcutFactory.destroy();
        }
    }
    ngOnDestroy() {
        this.destoryShortcut();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
RangePickerDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-range-picker[extend]',
                exportAs: 'extendRangePicker',
            },] }
];
/** @nocollapse */
RangePickerDirective.ctorParameters = () => [
    { type: DomSanitizer },
    { type: AlainConfigService },
    { type: NzRangePickerComponent, decorators: [{ type: Host }, { type: Optional }] },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
RangePickerDirective.propDecorators = {
    ngModelEnd: [{ type: Input }],
    shortcut: [{ type: Input }],
    ngModelEndChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2RhdGUtcGlja2VyL3JhbmdlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsd0JBQXdCLEVBRXhCLFNBQVMsRUFDVCxZQUFZLEVBQ1osSUFBSSxFQUNKLFFBQVEsRUFDUixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFrRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBeUIsc0JBQXNCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUxRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTTdFLE1BQU0sT0FBTyxvQkFBb0I7SUFrQy9CLFlBQ1UsR0FBaUIsRUFDekIsU0FBNkIsRUFDRCxVQUFrQyxFQUN0RCxRQUFrQyxFQUNsQyxRQUFrQjtRQUpsQixRQUFHLEdBQUgsR0FBRyxDQUFjO1FBRUcsZUFBVSxHQUFWLFVBQVUsQ0FBd0I7UUFDdEQsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQXBDcEIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0Isb0JBQWUsR0FBeUQsSUFBSSxDQUFDO1FBQ3JGLFVBQUssR0FBZ0IsSUFBSSxDQUFDO1FBQzFCLFFBQUcsR0FBZ0IsSUFB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QXJLRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFLG1CQUFtQjthQUM5Qjs7OztZQVpRLFlBQVk7WUFDWixrQkFBa0I7WUFHSyxzQkFBc0IsdUJBOENqRCxJQUFJLFlBQUksUUFBUTtZQTlEbkIsd0JBQXdCO1lBS3hCLFFBQVE7Ozt5QkE0QlAsS0FBSzt1QkFDTCxLQUFLOytCQWVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEFsYWluQ29uZmlnU2VydmljZSwgQWxhaW5EYXRlUmFuZ2VQaWNrZXJTaG9ydGN1dCwgQWxhaW5EYXRlUmFuZ2VQaWNrZXJTaG9ydGN1dEl0ZW0gfSBmcm9tICdAZGVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHsgZml4RW5kVGltZU9mUmFuZ2UsIGdldFRpbWVEaXN0YW5jZSB9IGZyb20gJ0BkZWxvbi91dGlsL2RhdGUtdGltZSc7XG5pbXBvcnQgeyBhc3NlcnQsIGRlZXBNZXJnZUtleSB9IGZyb20gJ0BkZWxvbi91dGlsL290aGVyJztcbmltcG9ydCB7IE56RGF0ZVBpY2tlckNvbXBvbmVudCwgTnpSYW5nZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJ25nLXpvcnJvLWFudGQvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgRGF0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUmFuZ2VQaWNrZXJTaG9ydGN1dFRwbENvbXBvbmVudCB9IGZyb20gJy4vcmFuZ2Utc2hvcnRjdXQuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotcmFuZ2UtcGlja2VyW2V4dGVuZF0nLFxuICBleHBvcnRBczogJ2V4dGVuZFJhbmdlUGlja2VyJyxcbn0pXG5leHBvcnQgY2xhc3MgUmFuZ2VQaWNrZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIGRlZmF1bHRTaG9ydGN1dHM6IEFsYWluRGF0ZVJhbmdlUGlja2VyU2hvcnRjdXQ7XG4gIHByaXZhdGUgX3Nob3J0Y3V0OiBBbGFpbkRhdGVSYW5nZVBpY2tlclNob3J0Y3V0O1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBzaG9ydGN1dEZhY3Rvcnk6IENvbXBvbmVudFJlZjxSYW5nZVBpY2tlclNob3J0Y3V0VHBsQ29tcG9uZW50PiB8IG51bGwgPSBudWxsO1xuICBzdGFydDogRGF0ZSB8IG51bGwgPSBudWxsO1xuICBlbmQ6IERhdGUgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKSBuZ01vZGVsRW5kOiBEYXRlIHwgbnVsbDtcbiAgQElucHV0KClcbiAgc2V0IHNob3J0Y3V0KHZhbDogQWxhaW5EYXRlUmFuZ2VQaWNrZXJTaG9ydGN1dCB8IG51bGwpIHtcbiAgICBjb25zdCBpdGVtID0gZGVlcE1lcmdlS2V5KHsgbGlzdDogW10gfSwgdHJ1ZSwgdGhpcy5kZWZhdWx0U2hvcnRjdXRzLCB2YWwgPT0gbnVsbCA/IHt9IDogdmFsKSBhcyBBbGFpbkRhdGVSYW5nZVBpY2tlclNob3J0Y3V0O1xuICAgIGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0Jykge1xuICAgICAgaXRlbS5lbmFibGVkID0gdmFsICE9PSBmYWxzZTtcbiAgICB9XG4gICAgKGl0ZW0ubGlzdCB8fCBbXSkuZm9yRWFjaChpID0+IHtcbiAgICAgIGkuX3RleHQgPSB0aGlzLmRvbS5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChpLnRleHQpO1xuICAgIH0pO1xuICAgIHRoaXMuX3Nob3J0Y3V0ID0gaXRlbTtcbiAgICB0aGlzLnJlZnJlc2hTaG9ydGN1dCgpO1xuICB9XG4gIGdldCBzaG9ydGN1dCgpOiBBbGFpbkRhdGVSYW5nZVBpY2tlclNob3J0Y3V0IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3J0Y3V0O1xuICB9XG4gIEBPdXRwdXQoKSByZWFkb25seSBuZ01vZGVsRW5kQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlIHwgbnVsbD4oKTtcblxuICBwcml2YXRlIGdldCBkcCgpOiBOekRhdGVQaWNrZXJDb21wb25lbnQge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZUNvbXAuZGF0ZVBpY2tlcjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHNydigpOiBEYXRlUGlja2VyU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuZHAuZGF0ZVBpY2tlclNlcnZpY2U7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRvbTogRG9tU2FuaXRpemVyLFxuICAgIGNvbmZpZ1NydjogQWxhaW5Db25maWdTZXJ2aWNlLFxuICAgIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuYXRpdmVDb21wOiBOelJhbmdlUGlja2VyQ29tcG9uZW50LFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgKSB7XG4gICAgYXNzZXJ0KFxuICAgICAgISFuYXRpdmVDb21wLFxuICAgICAgYEl0IHNob3VsZCBiZSBhdHRhY2hlZCB0byBuei1yYW5nZS1waWNrZXIgY29tcG9uZW50LCBmb3IgZXhhbXBsZTogJzxuei1yYW5nZS1waWNrZXIgWyhuZ01vZGVsKV09XCJpLnN0YXJ0XCIgZXh0ZW5kIFsobmdNb2RlbEVuZCldPVwiaS5lbmRcIiBzaG9ydGN1dD48L256LXJhbmdlLXBpY2tlcj4nYCxcbiAgICApO1xuICAgIGNvbnN0IGNvZyA9IGNvbmZpZ1Nydi5tZXJnZSgnZGF0YVJhbmdlJywge1xuICAgICAgbnpGb3JtYXQ6ICd5eXl5LU1NLWRkJyxcbiAgICAgIG56QWxsb3dDbGVhcjogdHJ1ZSxcbiAgICAgIG56QXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgIG56UG9wdXBTdHlsZTogeyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9LFxuICAgICAgbnpTaG93VG9kYXk6IHRydWUsXG4gICAgICBzaG9ydGN1dHM6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGNsb3NlZDogdHJ1ZSxcbiAgICAgICAgbGlzdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICfku4rlpKknLFxuICAgICAgICAgICAgZm46ICgpID0+IGdldFRpbWVEaXN0YW5jZSgndG9kYXknKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICfmmKjlpKknLFxuICAgICAgICAgICAgZm46ICgpID0+IGdldFRpbWVEaXN0YW5jZSgneWVzdGVyZGF5JyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAn6L+RM+WkqScsXG4gICAgICAgICAgICBmbjogKCkgPT4gZ2V0VGltZURpc3RhbmNlKC0yKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICfov5E35aSpJyxcbiAgICAgICAgICAgIGZuOiAoKSA9PiBnZXRUaW1lRGlzdGFuY2UoLTYpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ+acrOWRqCcsXG4gICAgICAgICAgICBmbjogKCkgPT4gZ2V0VGltZURpc3RhbmNlKCd3ZWVrJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAn5pys5pyIJyxcbiAgICAgICAgICAgIGZuOiAoKSA9PiBnZXRUaW1lRGlzdGFuY2UoJ21vbnRoJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAn5YWo5bm0JyxcbiAgICAgICAgICAgIGZuOiAoKSA9PiBnZXRUaW1lRGlzdGFuY2UoJ3llYXInKSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSE7XG4gICAgdGhpcy5kZWZhdWx0U2hvcnRjdXRzID0geyAuLi5jb2cuc2hvcnRjdXRzIH0gYXMgQWxhaW5EYXRlUmFuZ2VQaWNrZXJTaG9ydGN1dDtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvZyk7XG4gIH1cblxuICBwcml2YXRlIGNkKCk6IHZvaWQge1xuICAgICh0aGlzLmRwIGFzIGFueSkuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBvdmVycmlkZU5hdGl2ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBkcCA9IHRoaXMuZHA7XG4gICAgZHAud3JpdGVWYWx1ZSA9ICh2YWx1ZTogRGF0ZSkgPT4ge1xuICAgICAgY29uc3QgZGF0ZXMgPSAodmFsdWUgJiYgdGhpcy5uZ01vZGVsRW5kID8gW3ZhbHVlLCB0aGlzLm5nTW9kZWxFbmRdIDogW10pLmZpbHRlcih3ID0+ICEhdyk7XG4gICAgICB0aGlzLnNydi5zZXRWYWx1ZSh0aGlzLnNydi5tYWtlVmFsdWUoZGF0ZXMpKTtcbiAgICAgIHRoaXMuc3RhcnQgPSBkYXRlcy5sZW5ndGggPiAwID8gZGF0ZXNbMF0gOiBudWxsO1xuICAgICAgdGhpcy5lbmQgPSBkYXRlcy5sZW5ndGggPiAwID8gZGF0ZXNbMV0gOiBudWxsO1xuICAgICAgdGhpcy5jZCgpO1xuICAgIH07XG5cbiAgICBjb25zdCBvbGRPbkNoYW5nZUZuID0gZHAub25DaGFuZ2VGbjtcbiAgICBkcC5vbkNoYW5nZUZuID0gKGxpc3Q6IEFycmF5PERhdGUgfCBudWxsPikgPT4ge1xuICAgICAgbGV0IHN0YXJ0OiBEYXRlIHwgbnVsbCA9IG51bGw7XG4gICAgICBsZXQgZW5kOiBEYXRlIHwgbnVsbCA9IG51bGw7XG4gICAgICBpZiAobGlzdC5sZW5ndGggPiAwICYmIGxpc3QuZmlsdGVyKHcgPT4gdyAhPSBudWxsKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgW3N0YXJ0LCBlbmRdID0gZml4RW5kVGltZU9mUmFuZ2UoW2xpc3RbMF0hLCBsaXN0WzFdIV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgICAgdGhpcy5lbmQgPSBlbmQ7XG4gICAgICBvbGRPbkNoYW5nZUZuKHN0YXJ0KTtcbiAgICAgIHRoaXMubmdNb2RlbEVuZCA9IGVuZDtcbiAgICAgIHRoaXMubmdNb2RlbEVuZENoYW5nZS5lbWl0KGVuZCk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaFNob3J0Y3V0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fc2hvcnRjdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBlbmFibGVkLCBsaXN0IH0gPSB0aGlzLl9zaG9ydGN1dDtcbiAgICBsZXQgZXh0cmFGb290ZXI6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF0aGlzLm5hdGl2ZUNvbXAgfHwgIWVuYWJsZWQpIHtcbiAgICAgIGV4dHJhRm9vdGVyID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuc2hvcnRjdXRGYWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFJhbmdlUGlja2VyU2hvcnRjdXRUcGxDb21wb25lbnQpO1xuICAgICAgICB0aGlzLnNob3J0Y3V0RmFjdG9yeSA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBpbnN0YW5jZSB9ID0gdGhpcy5zaG9ydGN1dEZhY3Rvcnk7XG4gICAgICBpbnN0YW5jZS5saXN0ID0gbGlzdCE7XG4gICAgICBpbnN0YW5jZS5jbGljayA9IChpdGVtOiBBbGFpbkRhdGVSYW5nZVBpY2tlclNob3J0Y3V0SXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXMgPSBpdGVtLmZuKFt0aGlzLnN0YXJ0LCB0aGlzLmVuZF0pO1xuICAgICAgICB0aGlzLnNydi5zZXRWYWx1ZSh0aGlzLnNydi5tYWtlVmFsdWUocmVzIGFzIERhdGVbXSkpO1xuICAgICAgICB0aGlzLmRwLm9uQ2hhbmdlRm4ocmVzKTtcbiAgICAgICAgdGhpcy5kcC5jbG9zZSgpO1xuICAgICAgfTtcbiAgICAgIGV4dHJhRm9vdGVyID0gaW5zdGFuY2UudHBsO1xuICAgIH1cbiAgICB0aGlzLm5hdGl2ZUNvbXAuZGF0ZVBpY2tlci5leHRyYUZvb3RlciA9IGV4dHJhRm9vdGVyO1xuICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5jZCgpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJyaWRlTmF0aXZlKCk7XG4gICAgdGhpcy5yZWZyZXNoU2hvcnRjdXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdG9yeVNob3J0Y3V0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNob3J0Y3V0RmFjdG9yeSAhPSBudWxsKSB7XG4gICAgICB0aGlzLnNob3J0Y3V0RmFjdG9yeS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0b3J5U2hvcnRjdXQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==