import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AlertService } from '@app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor( 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],});
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.form.value)
            .pipe()
            .subscribe((data) => {
              console.log(data);
              if(data){
              let accessToken = Object.values(data)[0];
                this.alertService.success('Login Successful', { keepAfterRouteChange: true });
                this.router.navigate(['/movie'], { relativeTo: this.route });
                localStorage.setItem("user_email", this.form.value.email);
                localStorage.setItem("token",accessToken);
              }else{
                this.alertService.success('Invalid Credentials', { keepAfterRouteChange: true });
              }
            })
            .add(() => this.loading = false);
  }
}
