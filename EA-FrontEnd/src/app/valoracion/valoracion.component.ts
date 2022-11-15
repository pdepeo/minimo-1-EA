import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Valoracion } from '../models/Valoracion';
import axios from 'axios';
import { User } from 'src/app/models/User';



@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {
  registerForm: FormGroup;
  valoracionForm: FormGroup;
  submitted = false;
  clickValorar: boolean;
  clickRegister: boolean;
  clickForgot: boolean; 

  valoracion:Valoracion = {
    puntos: "",
    comment: ""
  }
  user:User= {
    _id:"",
    name:"",
	  username:"",
	  password:"",
	  birthdate:new Date(),
	  email:"",
    valoraciones: []

  }

  constructor(private formBuilder: FormBuilder, private _router:Router, private activedRoute: ActivatedRoute) { 
    this.valoracionForm = this.formBuilder.group({});
    this.clickValorar = true; 
    this.clickRegister = true;
    this.clickForgot = true;
    this.registerForm = this.formBuilder.group({});
  
  }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    this.getUser(params._id);
    this.registerForm = this.formBuilder.group({
      puntos: ['', Validators.required],
      comment: ['', Validators.required]
    })
  }

  getUser(id:String){
		const response = axios.get(`http://localhost:5432/api/users/profile/${id}`, {
		}).then((response) => {
      console.log(response);
      this.user=response.data;
		}).catch((error) => {
			console.log(error);
		});
    
	}

  valorar(){
    axios.post(`http://localhost:5432/api/users/valorar`,{
      _id: this.user._id,
      puntos: this.registerForm.value.puntos,
      comment: this.registerForm.value.comment
    }).then((respoose) => {
      this._router.navigate(['/userlist'])
    }).catch((error) => {
      console.log(error);
    });
  }

  onSubmit() {
    this.submitted= true;

  }
}
