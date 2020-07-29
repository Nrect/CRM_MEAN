import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();
  form: FormGroup;
  SUB: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private auth: AuthService, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      password: new FormControl('', [
        Validators.required, Validators.minLength(8)
      ]),
    });
  }

  ngOnDestroy(): void {
    if (this.SUB) {
      this.SUB.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.SUB = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      },
      error => {
        this.openSnackBar(error.error.message);
        this.form.enable();
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ок', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
