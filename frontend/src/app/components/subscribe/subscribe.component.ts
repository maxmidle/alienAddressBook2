import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlienService } from '../../alien.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  createForm: FormGroup;

  constructor(private alienService: AlienService, private fb: FormBuilder, private router: Router, private snackBar:MatSnackBar) {
    this.createForm = this.fb.group({
      userId: ['', Validators.required],
      userPw: ['', Validators.required],
      name: ['', Validators.required],
      age: '',
      family: '',
      kind: '',
      planet: ''
    });
  }

  subscribeAlien(userId, userPw, name, age, family, kind, planet) {
    this.alienService.subscribeAlien(userId, userPw, name, age, family, kind, planet).subscribe(() => {
      this.snackBar.open('Merci de votre inscription', 'OK', {
        duration: 3000
      });
      this.connectAlien(userId, userPw);
    });
  }

  connectAlien(userId, userPw) {
    this.alienService.getAlienByLog(userId, userPw).subscribe((alien) => {
      this.router.navigate(['/list/' + alien]);
    })
  }

  ngOnInit() {
  }

}
