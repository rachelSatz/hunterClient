import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-transition-dialog',
  templateUrl: './transition-dialog.component.html',
  styleUrls: ['./transition-dialog.component.css']
})
export class TransitionDialogComponent implements OnInit {

  constructor(private router: Router, private dialogRef: MatDialogRef<TransitionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public text) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close();
      this.router.navigate(['/dashboard']);
    }, 2500);
  }
}
