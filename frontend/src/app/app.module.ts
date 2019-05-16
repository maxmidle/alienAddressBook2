import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ModifyComponent } from './components/modify/modify.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';

import { AlienService } from './alien.service';

const routes: Routes = [
  { path: 'subscribe', component: SubscribeComponent},
  { path: 'connection', component: ConnectionComponent},
  { path: 'modify/:id', component: ModifyComponent},
  { path: 'list/:id', component: ListComponent},
  { path: 'add/:id', component: AddComponent},
  { path : '**', redirectTo: 'connection', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    SubscribeComponent,
    ConnectionComponent,
    ModifyComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  exports: [RouterModule],
  providers: [AlienService],
  bootstrap: [AppComponent]
})
export class AppModule { }
