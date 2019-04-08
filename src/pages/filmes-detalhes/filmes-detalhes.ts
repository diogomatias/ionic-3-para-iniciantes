import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmesDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filmes-detalhes',
  templateUrl: 'filmes-detalhes.html',
  providers: [
    MoovieProvider
  ]
})
export class FilmesDetalhesPage {
  public filme;
  public filmeId;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MoovieProvider
  ) {
  }

  ionViewDidEnter() {
    this.filmeId = this.navParams.get("id");
    this.movieProvider.getMovieDetail(this.filmeId).subscribe(
      data => {
        this.filme = (data as any);
      }, error => {
        console.log(error);
      })
  }

}
