import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: string[];
  // employees: Quizz[];

  constructor(
    private httpClientService: HttpClientService
  ) { }
  ngOnInit() {
    this.httpClientService.getEmployees().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }
  handleSuccessfulResponse(response) {
    console.log('response : ');
    console.log(response);
    this.employees = response;
  }
}
