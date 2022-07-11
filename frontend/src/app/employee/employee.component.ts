import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  employees: Employee[];

  constructor(private fb: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Ex Nabendu Biswas', Validators.required],
      position: ['Ex. ReactJS Trainer', Validators.required],
      dept: ['Development']
    })
  }

  getEmployees(){
    this.empService.getEmployeeList().subscribe((res: Employee[]) => {
      console.log(res);
      this.employees = res;
    })
  }

  onDeleteEmployee(id){
    if(confirm('Do you want to delete this employee?')){
      this.empService.deleteEmployee(id).subscribe(
        res => {
          console.log(res);
          this.getEmployees();
        }, err => {
          console.log(err);
        }
      )
    }
  }

  onEditEmployee(emp: Employee){
    this.editMode = true;
    this.showModal = true;
    this.empForm.patchValue(emp);
  }

  onEmpSubmit(){
    if(this.empForm.valid){
      if(this.editMode){
        this.empService.updateEmployee(this.empForm.value).subscribe(
          res => {
            console.log(res);
            this.getEmployees();
            this.onCloseModal();
          },
          err => console.log(err))
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe(
          res => {
            console.log(res);
            this.getEmployees();
            this.onCloseModal();
          },
          err => console.log(err))
      }
    } else {
      let key = Object.keys(this.empForm.controls);
      key.filter(data => {
        let control = this.empForm.controls[data];
        if(control.errors != null){
          control.markAsTouched()
        }
      })
    }
  }

  onAddEmployee(){
    this.showModal = true;
  }

  onCloseModal(){
    this.showModal = false;
  }

}
