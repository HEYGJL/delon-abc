import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlainThemeModule } from '@delon/theme';
import { DownFileDirective } from './down-file.directive';
const DIRECTIVES = [DownFileDirective];
export class DownFileModule {
}
DownFileModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, AlainThemeModule],
                declarations: [...DIRECTIVES],
                exports: [...DIRECTIVES],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bi1maWxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FiYy9kb3duLWZpbGUvZG93bi1maWxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBT3ZDLE1BQU0sT0FBTyxjQUFjOzs7WUFMMUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQztnQkFDekMsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbGFpblRoZW1lTW9kdWxlIH0gZnJvbSAnQGRlbG9uL3RoZW1lJztcblxuaW1wb3J0IHsgRG93bkZpbGVEaXJlY3RpdmUgfSBmcm9tICcuL2Rvd24tZmlsZS5kaXJlY3RpdmUnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW0Rvd25GaWxlRGlyZWN0aXZlXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQWxhaW5UaGVtZU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkRJUkVDVElWRVNdLFxuICBleHBvcnRzOiBbLi4uRElSRUNUSVZFU10sXG59KVxuZXhwb3J0IGNsYXNzIERvd25GaWxlTW9kdWxlIHt9XG4iXX0=