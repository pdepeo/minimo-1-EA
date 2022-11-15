import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-minimo',
  templateUrl: './minimo.component.html',
  styleUrls: ['./minimo.component.css']
})
export class MinimoComponent implements OnInit {
  minimoForm: FormGroup;
  submitted = false;
  clickCreateMinimo: boolean;

  constructor(private formBuilder: FormBuilder, private _router: Router) {
    this.minimoForm = this.formBuilder.group({})
    this.clickCreateMinimo = false;
   }

  ngOnInit(): void {
    this.minimoForm = this.formBuilder.group({
      title: ['', Validators.required],
      overview: ['', Validators.required],
      poster_path: ['', Validators.required],
      // trailer_path: ['', Validators.required],
      // vote_average: ['', Validators.required],
      // vote_count: ['', Validators.required],
      // number_of_seasons: ['', Validators.required],
      // number_of_episodes: ['', Validators.required],
      // status: ['', Validators.required]
    })
  }
  onSubmit(){
    this.submitted = true;
  }
  sendCreateMinimo() {
    if(!this.minimoForm.invalid){
      axios.post('http://localhost:5432/api/series/', {
        title: this.minimoForm.value.title,
        overview: this.minimoForm.value.overview,
        poster_path: this.minimoForm.value.poster_path,
        // trailer_path: this.minimoForm.value.trailer_path,
        // vote_count: this.minimoForm.value.vote_count,
        // number_of_seasons: this.minimoForm.value.number_of_seasons,
        // number_of_episodes: this.minimoForm.value.number_of_episodes,
        // status: this.minimoForm.value.status,
      }).then((response) => {
        environment.auth = response.data.token;
        // this._router.navigate(['/series-screen'])
      }).catch((error) => {
        console.log(error);
      });
  }
}

}
