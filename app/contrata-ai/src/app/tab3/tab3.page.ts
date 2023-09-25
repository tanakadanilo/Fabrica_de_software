import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  cardList:any;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get('http://localhost:8080/servico').subscribe((a: any) => {
      this.cardList = a.data.content;
      console.log(this.cardList);
    });
  }
}
