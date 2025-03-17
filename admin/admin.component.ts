import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  passwordType = 'password';
  name: string = '';
  password: string = '';
  errorMessage: string = '';
  isPasswordVisible = false;
  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.passwordType = this.isPasswordVisible ? 'text' : 'password';
}
constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const url = 'http://localhost:5000/api/signin';
    const data = {
      name: this.name,
      password: this.password
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, data, { headers }).subscribe((response:any) => {
      console.log(response);
      if(response.success){
        this.router.navigate(['/doctor-signup']);
      } else{
        this.errorMessage = response.error;
      }
    });
  }
}
