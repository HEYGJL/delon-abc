import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { STWidgetRegistry } from './st-widget';
export class STWidgetHostDirective {
    constructor(stWidgetRegistry, viewContainerRef, componentFactoryResolver) {
        this.stWidgetRegistry = stWidgetRegistry;
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ngOnInit() {
        const widget = this.column.widget;
        const componentType = this.stWidgetRegistry.get(widget.type);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        this.viewContainerRef.clear();
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const { record, column } = this;
        const data = widget.params ? widget.params({ record, column }) : { record };
        Object.keys(data).forEach(key => {
            componentRef.instance[key] = data[key];
        });
    }
}
STWidgetHostDirective.decorators = [
    { type: Directive, args: [{ selector: '[st-widget-host]' },] }
];
/** @nocollapse */
STWidgetHostDirective.ctorParameters = () => [
    { type: STWidgetRegistry },
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];
STWidgetHostDirective.propDecorators = {
    record: [{ type: Input }],
    column: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Qtd2lkZ2V0LWhvc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL3N0L3N0LXdpZGdldC1ob3N0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJL0MsTUFBTSxPQUFPLHFCQUFxQjtJQUloQyxZQUNVLGdCQUFrQyxFQUNsQyxnQkFBa0MsRUFDbEMsd0JBQWtEO1FBRmxELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQ3pELENBQUM7SUFFSixRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFPLENBQUM7UUFDbkMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsYUFBb0IsQ0FBQyxDQUFDO1FBRXJHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0UsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDaEMsTUFBTSxJQUFJLEdBQTJCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUNwRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QixZQUFZLENBQUMsUUFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF2QkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFOzs7O1lBSGxDLGdCQUFnQjtZQURvQyxnQkFBZ0I7WUFBcEUsd0JBQXdCOzs7cUJBTTlCLEtBQUs7cUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTVFdpZGdldFJlZ2lzdHJ5IH0gZnJvbSAnLi9zdC13aWRnZXQnO1xuaW1wb3J0IHsgU1RDb2x1bW4sIFNURGF0YSB9IGZyb20gJy4vc3QuaW50ZXJmYWNlcyc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tzdC13aWRnZXQtaG9zdF0nIH0pXG5leHBvcnQgY2xhc3MgU1RXaWRnZXRIb3N0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcmVjb3JkOiBTVERhdGE7XG4gIEBJbnB1dCgpIGNvbHVtbjogU1RDb2x1bW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdFdpZGdldFJlZ2lzdHJ5OiBTVFdpZGdldFJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy5jb2x1bW4ud2lkZ2V0ITtcbiAgICBjb25zdCBjb21wb25lbnRUeXBlID0gdGhpcy5zdFdpZGdldFJlZ2lzdHJ5LmdldCh3aWRnZXQudHlwZSk7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudFR5cGUgYXMgYW55KTtcblxuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgY29uc3QgeyByZWNvcmQsIGNvbHVtbiB9ID0gdGhpcztcbiAgICBjb25zdCBkYXRhOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0gd2lkZ2V0LnBhcmFtcyA/IHdpZGdldC5wYXJhbXMoeyByZWNvcmQsIGNvbHVtbiB9KSA6IHsgcmVjb3JkIH07XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgKGNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBhbnkpW2tleV0gPSBkYXRhW2tleV07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==