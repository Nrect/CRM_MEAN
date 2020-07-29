import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    const TOKEN = localStorage.getItem('auth-token');
    if (TOKEN !== null) {
      this.auth.setToken(TOKEN);
    }
  }
}