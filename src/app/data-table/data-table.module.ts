import { MatChipsModule } from '@angular/material/chips';
import { DataTableComponent } from './data-table/data-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTooltipModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    DataTableComponent
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatChipsModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [DataTableComponent]
})
export class DataTableModule { }
