import { Component, Inject, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {
  items = [
    { title: 'Profile' },
    { title: 'Desconectar' },
  ];

  userPictureOnly: boolean = true;
  user = {
    name: 'John Doe',
    picture: 'https://randomuser.me/api/portraits/men/3.jpg'
  };


}

