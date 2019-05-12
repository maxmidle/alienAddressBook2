import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { MatSnackBar } from '@angular/material'

import { AlienInf, AlienContact } from '../../alieninf.model';
import { AlienService } from '../../alien.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  id: String;
  contact: AlienContact[];
  alieninf: AlienInf[];
  aliens: AlienInf[];
  displayedColumns = ['name', 'family', 'planet', 'age', 'kind', 'actions'];
  displayedColumnsInfo = ['name', 'family', 'planet', 'age', 'kind'];

  constructor(private alienService : AlienService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  fetchAlien(id) {
    this.alienService.getAlienById(id).subscribe((data: AlienInf) => {
      let alienInfo = new Array(data);
      this.alieninf = alienInfo;
    });
  }

  fetchAliens() {
    this.alienService.getAliens().subscribe((data: AlienInf[]) => {
      this.aliens = data;
    });
  }

  fetchContact() {
    this.alienService.getContactById(this.id).subscribe((data: AlienContact[]) => {
        this.contact = data;
      });
  }

  deleteContact(alien1, alien2) {
    this.alienService.deleteContact(alien1, alien2).subscribe(() => {
      this.snackBar.open('Contact supprimé', 'OK', {
        duration: 3000
      });
      this.fetchContact();
    });
  }

  goToAdd() {
    this.router.navigate(['/add/' + this.id]);
  }

  goToList() {
    this.router.navigate(['/list/' + this.id]);
  }

  goToModify() {
    this.router.navigate(['/modify/' + this.id]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
    });
    this.fetchAliens();
    this.fetchContact();
    this.fetchAlien(this.id);
  }
}
