import { Component } from '@angular/core';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import {RouterLink, RouterOutlet} from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, RouterLink ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
