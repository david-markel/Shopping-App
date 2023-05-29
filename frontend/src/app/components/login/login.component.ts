import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        if (response.auth === false) {
          //   console.log(response.message);
          // navigate to home page
          this.router.navigate(['/']);
        } else {
          // handle error
          console.error(response);
        }
      },
      (error) => console.error(error)
    );
  }
}
