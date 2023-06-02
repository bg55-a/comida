import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EliminarProductoComponent } from './eliminar-producto/eliminar-producto.component';
import { ContactoComponent } from './contacto/contacto.component';
import { MenuComponent } from './menu/menu.component';
import { BuscadorComponent } from './buscador/buscador.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VerProductoComponent,
    AgregarProductoComponent,
    EliminarProductoComponent,
    ContactoComponent,
    MenuComponent,
    BuscadorComponent,
    ActualizarProductoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
