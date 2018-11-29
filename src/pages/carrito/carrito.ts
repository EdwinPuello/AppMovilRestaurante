import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Item, ToastController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  total=0
  pedido:boolean=false
  espera:boolean=true
  array_producto=[]
  constructor(public alertCtrl: AlertController,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, private carritos: CarritoProvider) {
  }

  ionViewDidLoad() {
    for (let item of this.carritos.item){
     
       this.total= this.total + item.precio
      }
      console.log(this.total)
   
  }


  borrar(item){
     let pos = 0
    for (let items of this.carritos.item){
      console.log(items.id_plato)
      if(item.id_plato == items.id_plato){
        this.carritos.item.splice(pos,1)
        const toast = this.toastCtrl.create({
          message: 'Elimando Exitosamente',
          duration: 3000
        });
        toast.present(); 
      }
      pos++
    }
    console.log(this.carritos.item)
  }

  enviar(){
    
    for(let item of this.carritos.item){
      this.array_producto.push({id:item.id_plato,cantidad:1})
    }
    let vamospapu = []
    vamospapu = [{"array_producto":this.array_producto}]
    console.log(vamospapu)
    this.array_producto=[]
    

    const confirm = this.alertCtrl.create({
      title: '¿Estas seguro?',
      message: 'Al aceptar enviaras tu pedido a la caja',
      buttons: [
        {
          text: 'Ahora no',
          handler: () => {
          
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.espera=false
            this.pedido=true
          }
        }
      ]
    });
    confirm.present()
  }

  cancelar(){
    const confirm = this.alertCtrl.create({
     title: '¿Estas seguro?',
      message: 'Al aceptar Cancelaras tu pedido a la caja',
      buttons: [
        {
          text: 'Ahora no',
          handler: () => {
          
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.espera=true
            this.pedido=false
          }
        }
      ]
    });
    confirm.present()
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
