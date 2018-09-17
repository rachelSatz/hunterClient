import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployersSelect2Component } from "./employers-select2.component";
import { Select2Module } from "ng2-select2/ng2-select2";



@NgModule({
    imports: [
        CommonModule,
        Select2Module
    ],

    exports:[EmployersSelect2Component],
    declarations: [EmployersSelect2Component]
})
export class EmployersSelectdModule { }
