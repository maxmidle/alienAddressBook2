import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlienService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAliens() {
    return this.http.get(`${this.uri}/aliens`);
  }

  getAlienById(id) {
    return this.http.get(`${this.uri}/alien/${id}`);
  }

  getContactById(id) {
    return this.http.get(`${this.uri}/contact/${id}`);
  }

  getAlienByLog(userId, userPw) {
    const alien = {
      userId: userId,
      userPw: userPw
    }
    return this.http.post(`${this.uri}/connect`, alien);
  }

  subscribeAlien(userId, userPw, name, age, family, kind, planet) {
    const alien = {
      userId: userId,
      userPw: userPw,
      name: name,
      age: age,
      family: family,
      kind: kind,
      planet: planet
    }
    return this.http.post(`${this.uri}/subscribe/add`, alien);
  }

  modifyAlien(id, name, age, family, kind, planet) {
    const alien = {
      name: name,
      age: age,
      family: family,
      kind: kind,
      planet: planet
    }
    return this.http.post(`${this.uri}/modify/apply/${id}`, alien);
  }

  deleteContact(alien1, alien2) {
    return this.http.get(`${this.uri}/contact/delete/${alien1}/${alien2}`);
  }

  addContact(alien1, alien2) {
    return this.http.get(`${this.uri}/contact/add/${alien1}/${alien2}`);
  }
}