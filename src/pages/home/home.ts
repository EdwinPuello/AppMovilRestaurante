import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ModalController } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { CarritoProvider } from '../../providers/carrito/carrito';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  slides = [
    {
      title: "Oferta 1",
      description: "aqui va la descripcion del producto en oferta",
      image: "../../assets/imgs/plato1.jpg",
    },
    {
      title: "Oferta 2",
      description: "aqui va la desscripcion del producto en oferta",
      image: "../../assets/imgs/plato2.jpg",
    },
    {
      title: "Oferta 3",
      description: "aqui va la desscripcion del producto en oferta",
      image: "../../assets/imgs/plato3.jpg",
    }
  ];

  pirincipal = [
    {
      id: 1,
      title: "Pizzeria",
      image: "../../assets/imgs/pizza1.jpg"
    },
    {
      id: 2,
      title: "Corteliria",
      image: "../../assets/imgs/cocteleria.jpg"
    },
    {
      id: 3,
      title: "Sopas",
      image: "../../assets/imgs/sopas1.jpg"
    },
    {
      id: 4,
      title: "Cervezas",
      image: "../../assets/imgs/cervezas.jpg"
    },
    {
      id: 5,
      title: "Rapidas",
      image: "../../assets/imgs/rapidas.jpg"
    },
    {
      id: 6,
      title: "Almuerzos",
      image: "../../assets/imgs/almueros.jpg"
    }
  ]
  @ViewChild(Slides) slide: Slides;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,private carrito:CarritoProvider) {

  }
  slideChanged() {
    let currentIndex = this.slide.getActiveIndex();

    if(currentIndex==3){
      currentIndex=1
    }
  }

  carritos(){
    const modal = this.modalCtrl.create("CarritoPage");
    modal.present();
  }

  pizzas(e){
   
    this.navCtrl.push(ListaPage , e)
  }

}
