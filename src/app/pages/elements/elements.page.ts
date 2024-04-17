import { Component, OnInit, AfterContentInit, Input, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet,Router,RouterModule } from '@angular/router';
import { DxButtonModule,DxDataGridModule, DxProgressBarModule, DxPopupModule, DxPieChartModule } from 'devextreme-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, DxButtonModule, RouterModule,DxDataGridModule,DxProgressBarModule, DxPopupModule, DxPieChartModule],
  templateUrl: './elements.page.html',
  styleUrl: './elements.page.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementsPage  {
    
    }