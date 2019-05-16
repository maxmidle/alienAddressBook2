import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { MatSnackBar } from '@angular/material'

import { AlienInf, AlienContact } from '../../alieninf.model';
import { AlienService } from '../../alien.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  contactCreateForm: FormGroup;
  id: String;
  aliens: AlienInf[];
  alieninf: AlienInf[];
  displayedColumns = ['name', 'family', 'planet', 'age', 'kind', 'actions'];

  constructor(private alienService : AlienService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.contactCreateForm = this.fb.group({
      userId: ['', Validators.required],
      userPw: ['', Validators.required],
      name: ['', Validators.required],
      age: '',
      family: '',
      kind: '',
      planet: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id
    });
    this.fetchAliens();
    this.fetchAlien(this.id);
  }

  fetchAlien(id) {
    this.alienService.getAlienById(id).subscribe((data: AlienInf) => {
      if (!data)
        this.router.navigate(['/connection']);
      let alienInfo = new Array(data);
      this.alieninf = alienInfo;
    });
  }

  fetchAliens() {
    this.alienService.getAliens().subscribe((data: AlienInf[]) => {
      this.aliens = data;
    });
  }

  goToList() {
    this.router.navigate(['/list/' + this.id]);
  }

  addContact(alien1) {
    this.alienService.addContact(alien1, this.id).subscribe(() => {
      this.snackBar.open('Contact ajouté', 'OK', {
        duration: 3000
      });
      this.goToList()
    });
  }

  createContact(userId, userPw, name, age, family, kind, planet) {
    this.alienService.subscribeAlien(userId, userPw, name, age, family, kind, planet).subscribe(() => {
      this.addContact(name);
    });
  }

}
