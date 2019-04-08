import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmesDetalhesPage } from '../filmes-detalhes/filmes-detalhes';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo: "Diogo Matias",
    data: "November 5, 1955",
    descricao: "I'm learning to build a app by zero!",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  };

  public lista_filmes = new Array<any>();
  public page = 1;
  public nome_usuario: string = "Diogo Matias";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmesDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  carregarFilmes(newPage: boolean = false) {
    this.abreCarregando();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        
        if (newPage) {
          this.lista_filmes = this.lista_filmes.concat(response.results);
          this.infiniteScroll.complete();
        } else {
          this.lista_filmes = response.results;
        }

        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}
