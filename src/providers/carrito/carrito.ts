import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the CarritoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarritoProvider {
    
  item:any[] = []

  constructor(public toastCtrl: ToastController, private platform: Platform,private storage: Storage) {
    this.cargar_storage()
    console.log('Hello CarritoProvider Provider');
  }

  agregar_carrito(itemparam:any){

    this.item.push(itemparam)

    this.guardar_storage()
    const toast = this.toastCtrl.create({
      message: 'Agregado Exitosamente',
      duration: 3000
    });
    toast.present();  
  }

  private guardar_storage(){
    if(this.platform.is("cordova")){
      //dispositivo
      this.storage.set('item', this.item);
    }
    else{
      //pc
      localStorage.setItem("item", JSON.stringify(this.item))
    }
  }

  cargar_storage(){

    let promesa = new Promise(( resolve, reject )=>{

      if(this.platform.is("cordova")){
        //dispotivo
        this.storage.ready().then(()=>{
          this.storage.get("item").then(item=>{
            if(item){
              this.item=item
            }
            resolve()
          })
        })
      }
      else{
        //pc
        if(localStorage.getItem("items")){
          this.item=JSON.parse(localStorage.getItem("items"))
        }
        resolve()
      }

    })
    return promesa
  }

}
