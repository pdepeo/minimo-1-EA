import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {

  UserListForm: FormGroup;
  submitted = false;
  clickCreateEvent: boolean;
  listUsers : User[] = [];
  

  constructor(private formBuilder: FormBuilder, private _router: Router) { 
    this.UserListForm = this.formBuilder.group({});
    this.clickCreateEvent = false;
  }
  rowData$!:any;

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
		const response = axios.get(`http://localhost:5432/api/users/`, {
		}).then((response) => {
      this.listUsers = response.data;
		}).catch((error) => {
			console.log(error);
		});
	}
  deleteUser(id: String){
    console.log(id);
    if(!this.UserListForm.invalid){
      const response = axios.delete(`http://localhost:5432/api/users/${id}`)
      .then((response) => {
      this.getUsers();
 
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  go2UpdateUser(id: String){
    this._router.navigate([`/users-update/${id}`])
  }


}
