import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorCollectModule } from '@delon/abc/error-collect';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { FooterToolbarComponent } from './footer-toolbar.component';
const COMPONENTS = [FooterToolbarComponent];
export class FooterToolbarModule {
}
FooterToolbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ErrorCollectModule, NzOutletModule],
                declarations: COMPONENTS,
                exports: COMPONENTS,
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLXRvb2xiYXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYWJjL2Zvb3Rlci10b29sYmFyL2Zvb3Rlci10b29sYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFcEUsTUFBTSxVQUFVLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBTzVDLE1BQU0sT0FBTyxtQkFBbUI7OztZQUwvQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGNBQWMsQ0FBQztnQkFDM0QsWUFBWSxFQUFFLFVBQVU7Z0JBQ3hCLE9BQU8sRUFBRSxVQUFVO2FBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFcnJvckNvbGxlY3RNb2R1bGUgfSBmcm9tICdAZGVsb24vYWJjL2Vycm9yLWNvbGxlY3QnO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IEZvb3RlclRvb2xiYXJDb21wb25lbnQgfSBmcm9tICcuL2Zvb3Rlci10b29sYmFyLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbRm9vdGVyVG9vbGJhckNvbXBvbmVudF07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEVycm9yQ29sbGVjdE1vZHVsZSwgTnpPdXRsZXRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IENPTVBPTkVOVFMsXG4gIGV4cG9ydHM6IENPTVBPTkVOVFMsXG59KVxuZXhwb3J0IGNsYXNzIEZvb3RlclRvb2xiYXJNb2R1bGUge31cbiJdfQ==