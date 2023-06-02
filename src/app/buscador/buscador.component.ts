import { Component, OnInit } from '@angular/core';
import { Platillo, PlatillosService } from '../servicios/platillos.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Platillo[] = [
    { id: 1, nombre: 'Platillo 1', descripcion: 'Descripción del platillo 1',cantidad:10,costo:50},
    { id: 2, nombre: 'Empanadas', descripcion: 'Descripción del platillo 2',cantidad:10,costo:50 },
    { id: 3, nombre: 'Entomatadas', descripcion: 'Descripción del platillo 3' ,cantidad:10,costo:50}
  ];

  protected platillos: Platillo[] = [];

  constructor(private platillosService: PlatillosService) { }

  ngOnInit(): void {
      this.platillosService.get().subscribe((data: Platillo[]) => {
     this.platillos = data;
      }
      )
  }

  search() {
    // Aquí puedes implementar la lógica de búsqueda según tus necesidades
    // Por ejemplo, puedes filtrar los resultados basándote en la propiedad 'nombre'
    this.platillos = this.platillos.filter(platillo => platillo.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()));

  }
}
