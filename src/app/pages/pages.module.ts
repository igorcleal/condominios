import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRouterModule } from './pages.routes';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CoreModule } from '../core/core.module';
import { CondominiosComponent } from './condominios/condominios.component';
import { CrudModule } from '../crud/crud.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CondominiosService } from '../services/condominios.service';
import { ProfissoesComponent } from './profissoes/profissoes.component';
import { ProfissoesListaComponent } from './profissoes/profissoes-lista/profissoes-lista.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        CoreModule,
        PagesRouterModule,
        CrudModule, MatFormFieldModule,
        MatInputModule,
        CommonModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatChipsModule,
        MatSortModule,
        MatTableModule],
    declarations: [
        ContactComponent,
        AboutComponent,
        ServicesComponent,
        CondominiosComponent,
        ProfissoesComponent,
        ProfissoesListaComponent
    ],
    exports: [
    ],
    providers: [
        CondominiosService
    ]
})
export class PagesModule {
}
