import { CommonModule, getLocaleMonthNames } from '@angular/common';
import { Component, ElementRef, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { RequerimientoService } from '../../services/requerimiento.service';



/* '@syncfusion/ej2-ng-charts/src/chart/chart.module'; */

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule,AgChartsAngular  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private _requerimientoService: RequerimientoService) 
  {
    this.getRequerimientos();
    this.getRequerimientosayc();
    this.getRequerimientostao();
    this.getRequerimientosvalormatriz();

  };


  chartOptions: AgChartOptions = {};

  dataChart: any[] = [
  { mes: 'Ene', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Feb', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Mar', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Abr', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'May', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Jun', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Jul', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Ago', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Sep', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Oct', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Nov', AyC: '',TAO: '', ValorMatriz:'' },
  { mes: 'Dic', AyC: '',TAO: '', ValorMatriz:'' },
];

dataSeries: any[] = 
[
  {type: 'bar',xKey: 'mes',yKey: 'TAO'},
  {type: 'bar',xKey: 'mes',yKey: 'AyC'},
  {type: 'bar',xKey: 'mes',yKey: 'ValorMatriz'}
];

  getRequerimientos()
  {

    var monthNames = ["Ene", "Feb", "Mar", "Abr", "May","Jun","Jul", "Ago", "Sep", "Oct", "Nov","Dic"]
    this._requerimientoService.getrequerimientosEmpresa("ayc").subscribe(data => {
      for(let j = 0 ; j < 12; j++)
      {
        let i = 0;
        for(const item of data)
          {             
            const dt = new Date(item.createdAt)
            const mes = dt.getMonth()
            if(j == mes) 
            i++;             
          }
        for(const chartitem of this.dataChart)
          {    
            if(chartitem.mes == monthNames[j])
              {
                chartitem['AyC'] = i
                i = 0;
              }
          }
      }

this._requerimientoService.getrequerimientosEmpresa("tao").subscribe(data => { 
  for(let j = 0 ; j < 12; j++)
  {
    let i = 0;
    for(const item of data)
      {             
        const dt = new Date(item.createdAt)
        const mes = dt.getMonth()
        if(j == mes) 
        i++;             
      }
    for(const chartitem of this.dataChart)
      {    
        if(chartitem.mes == monthNames[j])
          {
            chartitem['TAO'] = i
            i = 0;
          }
      }
  }

      this._requerimientoService.getrequerimientosEmpresa("valormatriz").subscribe(data => {
        for(let j = 0 ; j < 12; j++)
        {
          let i = 0;
          for(const item of data)
            {             
              const dt = new Date(item.createdAt)
              const mes = dt.getMonth()
              if(j == mes) 
              i++;             
            }
          for(const chartitem of this.dataChart)
            {    
              if(chartitem.mes == monthNames[j])
                {
                  chartitem['ValorMatriz'] = i
                  i = 0;
                }
            }
        }
        this.postChart()
      })
    })

  })
  }

  postChart()
  {
   this.chartOptions = {
     data: this.dataChart,
     series: this.dataSeries
   }
  }
 
 /* Seteo del grafico de pie para A&C */

  pieaycOptions: AgChartOptions = {};

  dataaycPie: any[] = [
    { asset: "Sin revisión", amount: 0},
    { asset: "En proceso", amount: 0 },
    { asset: "Finalizado", amount: 0 },
    { asset: "Judicial", amount: 0 },
  ];
  
  seriesaycPie: any[] = 
  [ // warning, , success, , primary,danger
    {type: 'pie',angleKey: 'amount',legendItemKey: 'asset', fills: ['#ffc107','#28a745','#dc3545','#17a2b8',]},
  ];

getRequerimientosayc()
{
  this._requerimientoService.getrequerimientosEmpresa("ayc").subscribe(data => {
      let sinRevision = 0;
      let enProceso = 0;
      let finalizado = 0;
      let judicial = 0;
      for(const item of data)
      {       
        if(item.estado == 'Sin revisión')
        {
          sinRevision++;
        }
        if(item.estado == 'En proceso')
        {
          enProceso++;
        }
        if(item.estado == 'Finalizado')
        {
          finalizado++;
        }
        if(item.estado == 'Judicial')
        {
          judicial++;
        }
      }

    this.dataaycPie[0].amount = sinRevision
    this.dataaycPie[1].amount = enProceso
    this.dataaycPie[2].amount = finalizado
    this.dataaycPie[3].amount = judicial
    this.postPieaycChart()
  })
}

  postPieaycChart()
  {
   this.pieaycOptions = {
     data: this.dataaycPie,
     series: this.seriesaycPie
   }
  }

 /* Seteo del grafico de pie para TAO */

  pietaoOptions: AgChartOptions = {};

  datataoPie: any[] = [
    { asset: "Sin revisión", amount: 0},
    { asset: "En proceso", amount: 0 },
    { asset: "Finalizado", amount: 0 },
    { asset: "Judicial", amount: 0 },
  ];
  
  seriestaoPie: any[] = 
  [ // warning, , success, , primary,danger
    {type: 'pie',angleKey: 'amount',legendItemKey: 'asset', fills: ['#ffc107','#28a745','#dc3545','#17a2b8',]},
  ];

  getRequerimientostao()
{
  this._requerimientoService.getrequerimientosEmpresa("tao").subscribe(data => {
      let sinRevision = 0;
      let enProceso = 0;
      let finalizado = 0;
      let judicial = 0;
      for(const item of data)
      {       
        if(item.estado == 'Sin revisión')
        {
          sinRevision++;
        }
        if(item.estado == 'En proceso')
        {
          enProceso++;
        }
        if(item.estado == 'Finalizado')
        {
          finalizado++;
        }
        if(item.estado == 'Judicial')
        {
          judicial++;
        }
      }

    this.datataoPie[0].amount = sinRevision
    this.datataoPie[1].amount = enProceso
    this.datataoPie[2].amount = finalizado
    this.datataoPie[3].amount = judicial
    this.postPietaoChart()
  })
}

  postPietaoChart()
  {
   this.pietaoOptions = {
     data: this.datataoPie,
     series: this.seriestaoPie
   }
  }


   /* Seteo del grafico de pie para valorMatriz */
 
   pievalormatrizOptions: AgChartOptions = {};

   datavalormatrizPie: any[] = [
     { asset: "Sin revisión", amount: 0},
     { asset: "En proceso", amount: 0 },
     { asset: "Finalizado", amount: 0 },
     { asset: "Judicial", amount: 0 },
   ];
   
   seriesvalormatrizPie: any[] = 
   [ // warning, , success, , primary,danger
     {type: 'pie',angleKey: 'amount',legendItemKey: 'asset', fills: ['#ffc107','#28a745','#dc3545','#17a2b8',]},
   ];
 
   getRequerimientosvalormatriz()
 {
   this._requerimientoService.getrequerimientosEmpresa("valormatriz").subscribe(data => {
       let sinRevision = 0;
       let enProceso = 0;
       let finalizado = 0;
       let judicial = 0;
       for(const item of data)
       {       
         if(item.estado == 'Sin revisión')
         {
           sinRevision++;
         }
         if(item.estado == 'En proceso')
         {
           enProceso++;
         }
         if(item.estado == 'Finalizado')
         {
           finalizado++;
         }
         if(item.estado == 'Judicial')
         {
           judicial++;
         }
       }
 
     this.datavalormatrizPie[0].amount = sinRevision
     this.datavalormatrizPie[1].amount = enProceso
     this.datavalormatrizPie[2].amount = finalizado
     this.datavalormatrizPie[3].amount = judicial
     this.postPievalormatrizChart()
   })
 }
 
   postPievalormatrizChart()
   {
    this.pievalormatrizOptions = {
      data: this.datavalormatrizPie,
      series: this.seriesvalormatrizPie
    }
   }

}
