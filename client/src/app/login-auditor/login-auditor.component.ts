import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {ErrorStateMatcher} from "@angular/material/core";
import {AuthAuditorServiceService} from "../shared/services/auth-auditor.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-auditor',
  templateUrl: './login-auditor.component.html',
  styleUrls: ['./login-auditor.component.css']
})
export class LoginAuditorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  SUB: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private auth: AuthAuditorServiceService, private router: Router,
              private route: ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(8)
      ]),
    });
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.openSnackBar('Теперь вы можете войти в систему!');
      } else if (params['accessDenied']) {
        this.openSnackBar('Чтобы войти,необходимо авторизоваться!');
      } else if (params['sessionFailed']) {
        this.openSnackBar('Ваш сеанс завершен. Пожалуйста войдите снова.');
        this.router.navigate(['/login']);
      }
    });
  }

  onSubmit() {
    this.form.disable();

    this.SUB = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/organizations']);
        this.openSnackBar('Вы успешно зашли!');
      },
      error => {
        this.openSnackBar(error.error.message)
        this.form.enable();
        console.log(this.form.value.emailFormControl + ' ' + this.form.value.passwordFormControl)
      }
    );
  }

  ngOnDestroy(): void {
    if (this.SUB) {
      this.SUB.unsubscribe();
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ок', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
