import { Injectable } from '@angular/core';
import {  Http, RequestOptions,Headers } from '@angular/http'
import { map } from 'rxjs/operators';
import "rxjs/add/operator/map";
import "rxjs/Rx";
/*
  Generated class for the ApiRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class ApiRestProvider {

  constructor(private http: Http) {}

  getQuery( 
		query: string, 
		type: string, // get, post, put ...
		authorization: boolean, 
		body?: any, // optional parameter  
	) {
    const url = `http://192.168.1.16:8000/${ query }`; 
    
    
		let headers = new Headers({ 'Content-Type': 'application/json' });
			headers.append('Accept', 'application/json');
			if( authorization )
				headers.append('Authorization', localStorage.getItem( 'token' ));

		let options = new RequestOptions({ headers: headers });

		if ( type == 'get' ) 
			return this.http.get( url, options );	

		else if ( type == 'post' )
			return this.http.post( url, body, options );	

		else
			return this.http.put( url, body, options );	
	}
  
  

  obtenerPlatosPizzas(id){
   return this.getQuery('api/obetenerPlatos/'+id, 'get' , false)
   .pipe(map(apiData => JSON.parse(apiData['_body'])))
  }

}
