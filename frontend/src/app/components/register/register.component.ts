import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      (response) => {
        if (response.success) {
          //   console.log(response.message);
          // navigate to home page
          this.router.navigate(['/']);
        } else {
          // handle error
          console.error(response.message);
        }
      },
      (error) => console.error(error)
    );
  }
}
