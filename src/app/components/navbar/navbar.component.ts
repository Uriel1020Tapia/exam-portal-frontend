import { Component, OnInit } from '@angular/core';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public tokenstorageSvc:TokenstorageService) { }

  ngOnInit(): void {
  }

}
