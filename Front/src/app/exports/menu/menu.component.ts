import { Component } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {
  items = [
    { title: 'Perfil', link: '/userprofile' },

    { title: 'Desconectar', link: '/main' },
  ];

  userPictureOnly: boolean = true;
  user = {
    name: 'John Doe',
    picture: 'https://randomuser.me/api/portraits/women/2.jpg'
  };


}

