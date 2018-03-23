import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TesteComponent } from './teste.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';
import { MatInputModule, MatButtonModule, MatSortModule, MatTooltipModule, MatChipsModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { DataTableModule } from '../data-table/data-table.module';

export const appRoutes: Routes = [
    { path: '', component: TesteComponent },
]

export function highlightJsFactory(): any {
    hljs.registerLanguage('typescript', hljsTypescript);
    return hljs;
}

@NgModule({
    imports: [
        FormsModule,
        DataTableModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatChipsModule,
        MatSortModule,
        MatTableModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        RouterModule.forChild(appRoutes),
        HighlightJsModule.forRoot({
            provide: HIGHLIGHT_JS,
            useFactory: highlightJsFactory
        })
    ],
    declarations: [TesteComponent],
    exports: [],
    providers: [FormBuilder]
})
export class TesteModule { }
