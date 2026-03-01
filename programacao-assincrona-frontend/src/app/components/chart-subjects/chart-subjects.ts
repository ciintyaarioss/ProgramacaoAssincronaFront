import { 
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-chart-subjects',
   standalone: false,
  templateUrl: './chart-subjects.html',
  styleUrl: './chart-subjects.css',
})
export class ChartSubjects implements AfterViewInit, OnChanges {

  @ViewChild('chartCanvas') canvas!: ElementRef;

  @Input() subjectsNames: string[] = [];
  @Input() subjectsAverages: number[] = [];
  @Input() subjectsApproved: number[] = [];
  @Input() subjectsFailed: number[] = [];
  chart!: Chart;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      this.chart.destroy();
      this.createChart();
    }
  }

  createChart() {
    if (!this.canvas) return;

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.subjectsNames,
        datasets: [
          {
            label: 'Aprovados',
            data: this.subjectsApproved,
            backgroundColor: '#66d883'
          },
          {
            label: 'Reprovados',
            data: this.subjectsFailed,
            backgroundColor: '#E2857E'
          },
          {
            label: 'Média',
            data: this.subjectsAverages,
            backgroundColor: '#798DC2'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: false
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }
}