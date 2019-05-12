import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { MatSnackBar } from '@angular/material'

import { AlienInf, AlienContact } from '../../alieninf.model';
import { AlienService } from '../../alien.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  modifyForm: FormGroup;
  id: String;
  alieninf: any = {};

  constructor(private alienService : AlienService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.modifyForm = this.fb.group({
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
      this.alienService.getAlienById(this.id).subscribe(res => {
        this.alieninf = res;
        this.modifyForm.get('name').setValue(this.alieninf.name);
        this.modifyForm.get('age').setValue(this.alieninf.age);
        this.modifyForm.get('family').setValue(this.alieninf.family);
        this.modifyForm.get('kind').setValue(this.alieninf.kind);
        this.modifyForm.get('planet').setValue(this.alieninf.planet);
      });
    });
    this.fetchAlien(this.id);
  }

  fetchAlien(id) {
    this.alienService.getAlienById(id).subscribe((data: AlienInf) => {
      let alienInfo = new Array(data);
      this.alieninf = alienInfo;
    });
  }

  goToList() {
    this.router.navigate(['/list/' + this.id]);
  }

  modifyAlien(name, age, family, kind, planet) {
    this.alienService.modifyAlien(this.id, name, age, family, kind, planet).subscribe(() => {
      this.snackBar.open('Modifications appliquées', 'OK', {
        duration: 3000
      });
      this.fetchAlien(this.id);
      this.goToList();
    });
  }
}
