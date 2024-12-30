import { Component, OnInit, Input, SimpleChanges } from '@angular/core'
import Chart, { ChartConfiguration, ChartConfigurationCustomTypesPerDataset, ChartTypeRegistry } from 'chart.js/auto'

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() netWorthsArray!: [string, number][][]
  chart: Chart | undefined;
  config: ChartConfiguration<keyof ChartTypeRegistry, [number, number][], unknown> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, [number, number][], unknown> = {
    type: 'scatter',
    data: {datasets:[]},
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  }

  data: {
    datasets: {
      label: string,
      data: [number, number][],
      backgroundColor: string
    }[]
  } = {
    datasets: []
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.netWorthsArray != null && this.netWorthsArray[0] != null) {
      for (var i = 0; i < this.netWorthsArray.length; i++) {
        if (this.data.datasets.length <= i) this.data.datasets.push({
          label: 'Scatter Dataset',
          data: [],
          backgroundColor: 'rgb(255,99,132)'
        })
        this.data.datasets[i].data = this.netWorthsArray[i].map(([date, money]) => [new Date(date).getTime(),money])
      }
      this.config.data = this.data;

      const element = document.getElementById('test')
      if (element && element instanceof HTMLCanvasElement) {
        if (this.chart) this.chart.destroy();
        this.chart = new Chart(
          element,
          this.config
        );
      }
    }
  }

}
