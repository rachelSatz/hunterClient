import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.firstChild.data['step']);
  }
}
