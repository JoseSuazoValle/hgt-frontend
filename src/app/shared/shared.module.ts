import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CategoryService, LineSeriesService} from '@syncfusion/ej2-angular-charts';
import { ChartModule } from '@syncfusion/ej2-ng-charts';

@NgModule({
  exports: [],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
