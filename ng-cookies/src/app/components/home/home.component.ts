import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cookie: any
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  logCookie() {
    this.cookie = this.authService.getCookie()
    console.log(this.cookie)
  }
  logOut() {
    this.authService.logout()
  }
}
