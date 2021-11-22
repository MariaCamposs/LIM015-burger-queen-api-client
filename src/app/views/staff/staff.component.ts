import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  btnCreateOrders() {
    this.router.navigate(['addorders']);
  }
  btnOrders() {
    this.router.navigate(['listorders'])
  }

}
