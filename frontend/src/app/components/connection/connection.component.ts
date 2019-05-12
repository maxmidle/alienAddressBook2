import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlienService } from '../../alien.service';
import { AlienInf } from 'src/app/alieninf.model';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  connectForm: FormGroup;

  constructor(private alienService : AlienService, private fb: FormBuilder, private router: Router) { 
    this.createForm();
  }

  createForm() {
    this.connectForm = this.fb.group({
      userId: ['', Validators.required],
      userPw: ['', Validators.required]
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
