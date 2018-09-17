import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MonthpickerComponent } from "./monthpicker.component";



@NgModule({
    imports: [
        CommonModule,
     
    ],

    exports:[MonthpickerComponent],
    declarations: [MonthpickerComponent]
})
export class MonthpickerComponentModule { }
