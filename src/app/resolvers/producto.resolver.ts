import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { PlatillosService } from '../servicios/platillos.service';

@Injectable({
  providedIn: 'root'
})

export class ProductoResolver implements Resolve<boolean> {
  constructor(
    private _router: Router,
    private _platillosService: PlatillosService
)
{}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this._platillosService.get().subscribe();

    return this._platillosService.getId(route.paramMap.get('id')!)
    .pipe(
        // captura el error si la tarea solicitada no está disponible
        catchError((error) => {

            // Registrar el error en consola
            console.error(error);

            // Obtiene la URL principal
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Se direcciona hacia la URL principal
            this._router.navigateByUrl(parentUrl);

            // Lanza un error
            return throwError(error);
        })
    );
  }
}
