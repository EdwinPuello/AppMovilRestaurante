import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { ModalController } from 'ionic-angular';
import {  Http } from '@angular/http'
import { ApiRestProvider } from '../../providers/api-rest/api-rest';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {
  mostrar=true
  titulo=""
  numero:number=0
  pizzas=[]
  /*{
    id:1,
    img: "../../assets/imgs/pizzaperro.jpg",
    title: "Pizza Perro",
    des: "example Description",
    price: 2000
  }*/
  objetoRecibido: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
    public alertCtrl: AlertController, private carrito:CarritoProvider, private http:Http,private api:ApiRestProvider) {
    this.objetoRecibido = navParams.data;
    console.log(this.objetoRecibido)
    this.validaciones()
    this.obtenerPizzas()
  }
  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Estas Seguro?',
      message: 'Al aceptar tu pedido ira al carrito de compras?',
      buttons: [
        {
          text: 'Ahora no',
          handler: () => {
            console.log('Disagree clicked');
            
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            
          }
        }
      ]
    });
    confirm.present();
  }
  carritos(){
    const modal = this.modalCtrl.create("CarritoPage");
    modal.present();
  }

  saveItem(e){
    if(e){
      this.mostrar=false
    }
  }

  deleted(){
    console.log("borrar :v")
  }

  obtenerPizzas(){
    this.api.obtenerPlatosPizzas(this.objetoRecibido).subscribe(apiData=>{
      this.pizzas= apiData.platos
    })
  }

  pedir(id){
    console.log(id)
    this.numero++
  }

  validaciones(){
    if(this.objetoRecibido == 1){
      this.titulo="pizzas"
    }
    else if(this.objetoRecibido == 2){
          this.titulo="Cotelerias"
    }
    else if(this.objetoRecibido == 3){
      this.titulo="Sopas"
    }
    else if(this.objetoRecibido == 4){
         this.titulo="Cervezas"
    }
    else if(this.objetoRecibido == 5){
     
      this.titulo="Comidas rapidas"
    }
    else if(this.objetoRecibido == 6){
          this.titulo="Almuerzos"
    }
  }

}
