import { Component } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'LIM015-burger-queen-api-client';

}
