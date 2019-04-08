import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartolaProvider } from '../../providers/cartola/cartola';

@IonicPage()
@Component({
  selector: 'page-atletas',
  templateUrl: 'atletas.html',
})
export class AtletasPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartolaProvider: CartolaProvider
  ) {
  }

  ionViewDidLoad() {
    this.cartolaProvider.atletas().subscribe(
      data => {
        console.log((data as any));
      }, error => {

      })
  }

}
