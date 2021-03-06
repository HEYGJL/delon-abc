import { __decorate, __metadata } from "tslib";
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { AlainConfigService } from '@delon/util/config';
import { InputBoolean, InputNumber } from '@delon/util/decorator';
export class ImageDirective {
    constructor(el, configSrv, http, platform) {
        this.http = http;
        this.platform = platform;
        this.useHttp = false;
        this.inited = false;
        configSrv.attach(this, 'image', { size: 64, error: `./assets/img/logo.svg` });
        this.imgEl = el.nativeElement;
    }
    ngOnInit() {
        this.update();
        this.updateError();
        this.inited = true;
    }
    ngOnChanges(changes) {
        const { size, imgEl } = this;
        imgEl.height = size;
        imgEl.width = size;
        if (this.inited) {
            if (changes.error) {
                this.updateError();
            }
            this.update();
        }
    }
    update() {
        const { size, imgEl, useHttp } = this;
        if (useHttp) {
            this.getByHttp();
            return;
        }
        let newSrc = this.src;
        if (newSrc.includes('qlogo.cn')) {
            const arr = newSrc.split('/');
            const imgSize = arr[arr.length - 1];
            arr[arr.length - 1] = imgSize === '0' || +imgSize !== size ? size.toString() : imgSize;
            newSrc = arr.join('/');
        }
        newSrc = newSrc.replace(/^(?:https?:)/i, '');
        imgEl.src = newSrc;
    }
    getByHttp() {
        if (!this.platform.isBrowser) {
            return;
        }
        const { imgEl } = this;
        this.http.get(this.src, null, { responseType: 'blob' }).subscribe((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => (imgEl.src = reader.result);
            reader.onerror = () => this.setError();
            reader.readAsDataURL(blob);
        }, () => this.setError());
    }
    updateError() {
        const { imgEl, error } = this;
        // tslint:disable-next-line: only-arrow-functions, typedef
        imgEl.onerror = function () {
            this.onerror = null;
            this.src = error;
        };
    }
    setError() {
        const { imgEl, error } = this;
        imgEl.src = error;
    }
}
ImageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[_src]',
                exportAs: '_src',
            },] }
];
/** @nocollapse */
ImageDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: AlainConfigService },
    { type: _HttpClient },
    { type: Platform }
];
ImageDirective.propDecorators = {
    src: [{ type: Input, args: ['_src',] }],
    size: [{ type: Input }],
    error: [{ type: Input }],
    useHttp: [{ type: Input }]
};
__decorate([
    InputNumber(),
    __metadata("design:type", Number)
], ImageDirective.prototype, "size", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], ImageDirective.prototype, "useHttp", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2ltYWdlL2ltYWdlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBa0QsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQWdCLFlBQVksRUFBRSxXQUFXLEVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQU03RixNQUFNLE9BQU8sY0FBYztJQVl6QixZQUFZLEVBQWdDLEVBQUUsU0FBNkIsRUFBVSxJQUFpQixFQUFVLFFBQWtCO1FBQTdDLFNBQUksR0FBSixJQUFJLENBQWE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBTHpHLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFakMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUlyQixTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBNkQ7UUFDdkUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUs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RUFBRSxNQUFNO2FBQ2pCOzs7O1lBUm1CLFVBQVU7WUFFckIsa0JBQWtCO1lBRGxCLFdBQVc7WUFGWCxRQUFROzs7a0JBY2QsS0FBSyxTQUFDLE1BQU07bUJBQ1osS0FBSztvQkFDTCxLQUFLO3NCQUNMLEtBQUs7O0FBRmtCO0lBQWQsV0FBVyxFQUFFOzs0Q0FBYztBQUVaO0lBQWYsWUFBWSxFQUFFOzsrQ0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBfSHR0cENsaWVudCB9IGZyb20gJ0BkZWxvbi90aGVtZSc7XG5pbXBvcnQgeyBBbGFpbkNvbmZpZ1NlcnZpY2UgfSBmcm9tICdAZGVsb24vdXRpbC9jb25maWcnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyLCBOdW1iZXJJbnB1dCB9IGZyb20gJ0BkZWxvbi91dGlsL2RlY29yYXRvcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tfc3JjXScsXG4gIGV4cG9ydEFzOiAnX3NyYycsXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2l6ZTogTnVtYmVySW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV91c2VIdHRwOiBCb29sZWFuSW5wdXQ7XG5cbiAgQElucHV0KCdfc3JjJykgc3JjOiBzdHJpbmc7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIHNpemU6IG51bWJlcjtcbiAgQElucHV0KCkgZXJyb3I6IHN0cmluZztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIHVzZUh0dHAgPSBmYWxzZTtcblxuICBwcml2YXRlIGluaXRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGltZ0VsOiBIVE1MSW1hZ2VFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmPEhUTUxJbWFnZUVsZW1lbnQ+LCBjb25maWdTcnY6IEFsYWluQ29uZmlnU2VydmljZSwgcHJpdmF0ZSBodHRwOiBfSHR0cENsaWVudCwgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0pIHtcbiAgICBjb25maWdTcnYuYXR0YWNoKHRoaXMsICdpbWFnZScsIHsgc2l6ZTogNjQsIGVycm9yOiBgLi9hc3NldHMvaW1nL2xvZ28uc3ZnYCB9KTtcbiAgICB0aGlzLmltZ0VsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gICAgdGhpcy51cGRhdGVFcnJvcigpO1xuICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW1AgaW4ga2V5b2YgdGhpc10/OiBTaW1wbGVDaGFuZ2UgfSAmIFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IHNpemUsIGltZ0VsIH0gPSB0aGlzO1xuICAgIGltZ0VsLmhlaWdodCA9IHNpemU7XG4gICAgaW1nRWwud2lkdGggPSBzaXplO1xuXG4gICAgaWYgKHRoaXMuaW5pdGVkKSB7XG4gICAgICBpZiAoY2hhbmdlcy5lcnJvcikge1xuICAgICAgICB0aGlzLnVwZGF0ZUVycm9yKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgc2l6ZSwgaW1nRWwsIHVzZUh0dHAgfSA9IHRoaXM7XG4gICAgaWYgKHVzZUh0dHApIHtcbiAgICAgIHRoaXMuZ2V0QnlIdHRwKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG5ld1NyYyA9IHRoaXMuc3JjO1xuICAgIGlmIChuZXdTcmMuaW5jbHVkZXMoJ3Fsb2dvLmNuJykpIHtcbiAgICAgIGNvbnN0IGFyciA9IG5ld1NyYy5zcGxpdCgnLycpO1xuICAgICAgY29uc3QgaW1nU2l6ZSA9IGFyclthcnIubGVuZ3RoIC0gMV07XG4gICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdID0gaW1nU2l6ZSA9PT0gJzAnIHx8ICtpbWdTaXplICE9PSBzaXplID8gc2l6ZS50b1N0cmluZygpIDogaW1nU2l6ZTtcbiAgICAgIG5ld1NyYyA9IGFyci5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgbmV3U3JjID0gbmV3U3JjLnJlcGxhY2UoL14oPzpodHRwcz86KS9pLCAnJyk7XG5cbiAgICBpbWdFbC5zcmMgPSBuZXdTcmM7XG4gIH1cblxuICBwcml2YXRlIGdldEJ5SHR0cCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBpbWdFbCB9ID0gdGhpcztcbiAgICB0aGlzLmh0dHAuZ2V0KHRoaXMuc3JjLCBudWxsLCB7IHJlc3BvbnNlVHlwZTogJ2Jsb2InIH0pLnN1YnNjcmliZShcbiAgICAgIChibG9iOiBCbG9iKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiAoaW1nRWwuc3JjID0gcmVhZGVyLnJlc3VsdCBhcyBzdHJpbmcpO1xuICAgICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHRoaXMuc2V0RXJyb3IoKTtcbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gICAgICB9LFxuICAgICAgKCkgPT4gdGhpcy5zZXRFcnJvcigpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUVycm9yKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgaW1nRWwsIGVycm9yIH0gPSB0aGlzO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25seS1hcnJvdy1mdW5jdGlvbnMsIHR5cGVkZWZcbiAgICBpbWdFbC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5vbmVycm9yID0gbnVsbDtcbiAgICAgIHRoaXMuc3JjID0gZXJyb3I7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXJyb3IoKTogdm9pZCB7XG4gICAgY29uc3QgeyBpbWdFbCwgZXJyb3IgfSA9IHRoaXM7XG4gICAgaW1nRWwuc3JjID0gZXJyb3I7XG4gIH1cbn1cbiJdfQ==