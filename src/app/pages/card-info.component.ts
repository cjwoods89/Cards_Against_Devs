import { Component, OnInit } from '@angular/core';

import {CardService} from "app/shared/card-info.service";

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})
export class CardInfoComponent implements OnInit {

  constructor(private cardInfo: CardService) { }

  cards: any;
  successMessage: string;
  errorMessage: string;

  getCards(){
    this.cardInfo.getCards()
      .subscribe(  //this is listening to the observable
        cards => {
          this.cards = cards;
          console.log(this.cards)
        },
        error =>
        {this.errorMessage = <any>error;
          console.log(this.errorMessage)});
    this.cards = '';
  }

  ngOnInit(){
    this.getCards();
  }

}
