import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Select2OptionData } from 'ng2-select2/ng2-select2';
import { ActivatedRoute } from '@angular/router';
import { Employer } from '../../shared/_models/employer.model';
import { EmployerService } from '../../shared/_services/http/employer.service';
import { Select2Options } from '../../shared/_const/select2-options';
import { Input } from '@angular/core';

@Component({
  selector: 'app-employers-select2',
  templateUrl: './employers-select2.component.html',
  styleUrls: ['./employers-select2.component.css']
})
export class EmployersSelect2Component implements OnInit {

  constructor(private route: ActivatedRoute, private employerService: EmployerService) { }

  @Output() changeEmployerEvent = new EventEmitter<any>();
  @Input() All = false;
  employers: Employer[];
  employersselect2: Select2OptionData[] = [];
  employerID: string;
  select2Options = Select2Options;

  ngOnInit() {
     debugger;
    this.employers = JSON.parse(sessionStorage.getItem('employers'));
    if (this.employers && this.employers.length > 0) {
      this.employersselect2 = this.setSelect2Data(this.employers, 'בחר מעסיק');

       this.GetemployerID();
    }
    else {


      this.employerService.getEmployers().then(response => {
        this.employers = response;
        sessionStorage.setItem('employers', JSON.stringify(this.employers));
        this.employersselect2 = this.setSelect2Data(this.employers, 'בחר מעסיק');
        this.GetemployerID();
      })
    }



  }
private GetemployerID(){
       const id = sessionStorage.getItem('EmployerID');
        if (id === '0' && this.employersselect2.length > 0) {
          this.employerID = this.employersselect2[0].id;
        }
        else if (id) {

          this.employerID = id;
        }
        else if (this.employersselect2.length > 0) {

          this.employerID = this.employersselect2[0].id;
        }
}
  private setSelect2Data(values: Object[], textLabel: string): Select2OptionData[] {
    debugger;
    let data = [];
    let index = 0;
    if (this.All) {
      data = [
        { id: '0', text: 'הכל' }
      ];
      index = 1;
      }
   
        for (let i = index; i < values.length; i++) {
          const indexData = this.All ? i +  1 : i; 
          data[indexData] = { id: values[i]['id'].toString(), text: values[i]['name'] };
        
      }
    return data;
  }


  changeEmployer(id: number) {
    debugger;
    if (id.toString() !== '0') {


      this.setEmployersession(id);
      const employer = this.employers.find(x => x.id == id);

      this.changeEmployerEvent.emit(employer);
    }
    else if(this.All){
      this.setEmployersession(id);
      this.changeEmployerEvent.emit(null);
    }
  }
  GetEmployersession() {
    sessionStorage.getItem('EmployerID');
  }
  setEmployersession(id: number) {
    sessionStorage.setItem('EmployerID', id.toString());
  }
}

