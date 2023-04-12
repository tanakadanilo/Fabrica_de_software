import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent {
  constructor(
    private _router: Router,
  ) {}

  userMenu: any;
  userPictureOnly: boolean = true;
  user = {
    name: 'John Doe',
    picture: 'https://randomuser.me/api/portraits/men/1.jpg'
  };


  abrirSobre(){
    debugger;
    this._router.navigateByUrl("/login");


  }

}
