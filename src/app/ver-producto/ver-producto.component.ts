import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platillo, PlatillosService } from '../servicios/platillos.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit, OnDestroy {
  platillos!: any[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private platillosService: PlatillosService) { 
    this.obtenerPlatillos();
  }

  ngOnInit() {
    this.platillosService.platillos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data: Platillo[]) => {
                this.platillos = data; });
  }


  ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

  obtenerPlatillos() {
    this.platillosService.get().subscribe(
      (data) => {
        this.platillos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarPlatillo(platilloId: string) {
    // Lógica para eliminar el platillo con el ID proporcionado
    this.platillosService.deletePlatillo(platilloId).subscribe((fueEliminado) => {
      if(fueEliminado){

      }
    }

    );
  }

  editarPlatillo(platilloId: number) {
    // Lógica para editar el platillo con el ID proporcionado
  }

}
