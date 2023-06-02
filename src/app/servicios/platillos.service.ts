import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Platillo {
  id: number|string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  costo: number;
}


@Injectable({
  providedIn: 'root'
})
export class PlatillosService {

private platillos: Platillo[] = [
  {
    id:0,
    nombre: 'Hamburguesa',
    descripcion: 'Deliciosa hamburguesa con carne jugosa',
    cantidad: 10,
    costo: 8.99
  },
  {
    id:1,
    nombre: 'Pizza',
    descripcion: 'Pizza con queso derretido y diversos ingredientes',
    cantidad: 5,
    costo: 12.99
  },
  {
    id:2,
    nombre: 'Ensalada',
    descripcion: 'Ensalada fresca con verduras y aderezo',
    cantidad: 15,
    costo: 6.99
  }
];

private p: Platillo[] = [];
private pl!: Platillo;

private _objetoPlatillos:  BehaviorSubject<Platillo[]> = new BehaviorSubject(this.p);
private _platillo:  BehaviorSubject<Platillo> = new BehaviorSubject(this.pl);

  constructor(private _httpClient: HttpClient) { }

  get platillos$(): Observable<Platillo[]> {
    return this._objetoPlatillos.asObservable();
  }

  get platillo$(): Observable<Platillo> {
    return this._platillo.asObservable();
  }

  create(platillo: Platillo): Observable<Platillo> {
    //this.platillos.push(platillo);
    //return of(undefined);
    
    // Lógica para guardar el platillo en una API externa
    return this.platillos$.pipe(
      take(1),
      switchMap(platillos => this._httpClient.post<Platillo>
        ('https://api-rest-restaurantec-production-6b65.up.railway.app/api/dishes', platillo).pipe(
          map((nuevoPlatillo) => {

              //Actualiza las tareas con la nueva tarea agregada
              this._objetoPlatillos.next([nuevoPlatillo, ...platillos]);

              // Retorna la nueva tarea agregada
              return nuevoPlatillo;
          })
      ))
  );
  }

  get(): Observable<Platillo[]> {
    
    // Lógica para obtener los platillos de una API externa

    return this._httpClient.get<Platillo[]>('https://api-rest-restaurantec-production-6b65.up.railway.app/api/dishes').pipe(
      tap((response: Platillo[]) => {
          this._objetoPlatillos.next(response);
      })
  );
  }

  getId(id: string): Observable<Platillo> {

    return this._httpClient.get<Platillo>('https://api-rest-restaurantec-production-6b65.up.railway.app/api/dishes/'+id).pipe(
      tap((response: Platillo) => {
          this._platillo.next(response);
          return response;
      })
  );
  }


  update(id: string, platillo: Platillo): Observable<Platillo> {
    const index = this.platillos.findIndex(p => p.id === platillo.id);
    if (index !== -1) {
      this.platillos[index] = platillo;
    }
    //return of(undefined);
   
        return this.platillos$
                   .pipe(
                       take(1),
                       switchMap(platillos => this._httpClient.patch<Platillo>('https://api-rest-restaurantec-production-6b65.up.railway.app/api/dishes/'+id, platillo).pipe(
                           map((tareaActualizada) => {

                               // Busca el indice de la tarea actualizada
                               const index = platillos.findIndex(item => item.id === id);

                               // Actualiza la tarea
                               platillos[index] = tareaActualizada;

                               // Actualiza la tarea del observable
                               this._objetoPlatillos.next(platillos);

                               // Retorna la tarea actualizada
                               return tareaActualizada;
                           })
                       ))
                   );

  }

  // delete(platillo: Platillo): Observable<void> {
  //   const index = this.platillos.findIndex(p => p.id === platillo.id);
  //   if (index !== -1) {
  //     this.platillos.splice(index, 1);
  //   }
  //   return of(undefined);
  //   // Lógica para eliminar el platillo en una API externa
  //   // Ejemplo con HttpClient:
  //   // return this.http.delete(`ruta-de-tu-api/platillos/${platillo.id}`);
  // }

  deletePlatillo(id: string): Observable<any> {
    return this.platillos$.pipe(
      take(1),
      switchMap(platillos => this._httpClient.delete
        ('https://api-rest-restaurantec-production-6b65.up.railway.app/api/dishes/'+id).pipe(
          map((fueEliminado) => {

              //busca el indice de la tarea eliminada dentro del objeto observable
              const index = platillos.findIndex(item => item.id === id);

              // elimina la tarea
              platillos.splice(index, 1);

              console.log(platillos);

              // Actualiza la tarea dentro del objeto observable
              this._objetoPlatillos.next(platillos);

              // Retorna el status de la eliminación
              return fueEliminado;
          })
      ))
  );
  }

}
