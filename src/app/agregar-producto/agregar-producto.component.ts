import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platillo } from '../servicios/platillos.service';
import { PlatillosService } from '../servicios/platillos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  platillo: Platillo | undefined;
  @Output() platilloActualizado = new EventEmitter<Platillo>();

  platillos: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    cantidad: new FormControl(''),
    precio: new FormControl(''),
  });


  constructor(private platillosService: PlatillosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.platillos = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion : ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]]
    });

    // const platilloId = 2; // ID del platillo que deseas obtener

    // this.platillosService.getPlatilloById(platilloId).subscribe((platillo) => {
    //   this.platillo = platillo;
    // });
  
  }

  guardarPlatillo(){
    const data = this.platillos.value;
    this.platillosService.create(data).subscribe();
  }



  guardarCambios() {
    // Lógica para guardar los cambios del platillo
    // Puedes enviar el platillo actualizado al componente padre mediante el evento platilloActualizado.emit()
    this.platilloActualizado.emit(this.platillo);
  }

}
