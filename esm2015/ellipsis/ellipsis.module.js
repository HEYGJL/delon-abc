import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EllipsisComponent } from './ellipsis.component';
const COMPONENTS = [EllipsisComponent];
export class EllipsisModule {
}
EllipsisModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ObserversModule, NzToolTipModule],
                declarations: COMPONENTS,
                exports: COMPONENTS,
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxsaXBzaXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2VsbGlwc2lzL2VsbGlwc2lzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE1BQU0sVUFBVSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQU92QyxNQUFNLE9BQU8sY0FBYzs7O1lBTDFCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGVBQWUsQ0FBQztnQkFDekQsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2FBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2ZXJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL29ic2VydmVycyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56VG9vbFRpcE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdG9vbHRpcCc7XG5pbXBvcnQgeyBFbGxpcHNpc0NvbXBvbmVudCB9IGZyb20gJy4vZWxsaXBzaXMuY29tcG9uZW50JztcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtFbGxpcHNpc0NvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE9ic2VydmVyc01vZHVsZSwgTnpUb29sVGlwTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBDT01QT05FTlRTLFxuICBleHBvcnRzOiBDT01QT05FTlRTLFxufSlcbmV4cG9ydCBjbGFzcyBFbGxpcHNpc01vZHVsZSB7fVxuIl19