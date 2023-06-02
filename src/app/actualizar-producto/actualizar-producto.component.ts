import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Platillo, PlatillosService } from '../servicios/platillos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  platillo: Platillo | undefined;
  @Output() platilloActualizado = new EventEmitter<Platillo>();

  platillos: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    cantidad: new FormControl(''),
    precio: new FormControl(''),
  });


  constructor(private platillosService: PlatillosService, private formBuilder: FormBuilder, 
    private router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.platillos = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion : ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]]
    });
    
        
    // Obtiene el proyecto
    this.platillosService.platillo$
    .subscribe((platillo: Platillo) => {
     console.log('Hello');
      

        // Almacena los proyectos de manera local
        this.platillo = platillo;
        //Aplica los valores al formulario desde el objeto project (proyecto)
         this.platillos.patchValue(platillo, {emitEvent: false});

      }
  );
}

  actualizarPlatillo(){
    const data = this.platillos.value;
    var id = this.router.url.split('/').slice(3, 4);
    this.platillosService.update(id[0], data).subscribe((tareaActualizada) => {
      if(tareaActualizada){
        this.router.navigate(['/verProducto'], {relativeTo: this._activatedRoute});
      }
    });
  }

}
