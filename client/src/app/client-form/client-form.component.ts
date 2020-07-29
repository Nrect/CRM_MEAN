import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ClientsService} from "../shared/services/clients.service";
import {Client} from "../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  @ViewChild('inputFile') inputRef: ElementRef;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  form: FormGroup;
  newClient = true;
  client: Client;
  image: File;
  imagePreview: string | ArrayBuffer = '';


  favoriteSeason: string;
  seasons: string[] = ['Замужем/Женат', 'Не замужем/Не женат'];

  favoriteSeason1: string;
  seasons1: string[] = ['Есть', 'Нет'];

  link = 'http://localhost:5000/';

  constructor(private route: ActivatedRoute,
              private clientService: ClientsService,
              private router: Router,
              private _snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      age: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(99)]),
      language: new FormControl(null, Validators.required),
      married: new FormControl(['Не замужем/Не женат'], Validators.required),
      partner: new FormControl('Нет'),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      haveChildren: new FormControl(null, Validators.required),
      listChild: new FormControl('Нет')
    });

    this.form.disable();

    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {
            this.newClient = false;
            return this.clientService.getById(params['id']);
          }
          return of(null);
        }
      )
    ).subscribe(
      (client: Client) => {
        if (client) {
          this.client = client;
          this.form.patchValue({
            name: client.name,
            age: client.age,
            language: client.language,
            married: client.married,
            partner: client.partner,
            phone: client.phone,
            address: client.address,
            haveChildren: client.haveChildren,
            listChild: client.listChild
          });
          this.imagePreview = client.imageSrc;
        }
        this.form.enable();
      },
      error => this.openSnackBar(error.error.message)
    );

  }

  onFileLoad($event: any) {
    const file = $event.target.files[0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onSubmit() {
    let stream$;
    this.form.disable();
    if (this.newClient) {
      //Создание
      stream$ = this.clientService.createClient(
        this.form.value.name, this.form.value.age, this.form.value.language,
        this.form.value.married, this.form.value.partner, this.form.value.phone,
        this.form.value.address, this.form.value.haveChildren, this.form.value.listChild,
        this.image);
    } else {
      //Обновление
      stream$ = this.clientService.updateClient(this.client._id, this.form.value.name, this.form.value.age, this.form.value.language,
        this.form.value.married, this.form.value.partner, this.form.value.phone,
        this.form.value.address, this.form.value.haveChildren, this.form.value.listChild, this.image);
    }
    stream$.subscribe(
      client => {
        this.client = client;
        this.openSnackBar('Изменения сохранены');
        this.form.enable();
      },
      error => {
        this.openSnackBar(error.error.message);
        this.form.enable();
      }
    );
  }

  deleteClient() {
    const confirm = window.confirm(`Удалить клиента? ${this.client.name}`);
    if (confirm) {
      this.clientService.deleteClient(this.client._id)
        .subscribe(
          res => {
            this.openSnackBar('Клиент удален!')
          },
          error => {
            this.openSnackBar(error.error.message)
          },
          () => {
            this.router.navigate(['/clients']);
          }
        );
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
