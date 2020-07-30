import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { EnvService } from '../env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class DashboardService {

  headers: any;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService,
  ) {
    this.headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('accessToken')}`});
  }

  getFacilities() {
    return this.httpClient.get(`${this.envService.apiUrl}/facility`, {
      headers: this.headers
    });
  }

  getFloors() {
    return this.httpClient.get(`${this.envService.apiUrl}/floor`, {
      headers: this.headers
    });
  }

  getFlats() {
    return this.httpClient.get(`${this.envService.apiUrl}/flat`, {
      headers: this.headers
    });
  }

  getRooms() {
    return this.httpClient.get(`${this.envService.apiUrl}/room`, {
      headers: this.headers
    });
  }

  createFacility(value) {
    return this.httpClient.post(`${this.envService.apiUrl}/facility`, value, {
      headers: this.headers
    });
  }

  createFloor(value) {
    return this.httpClient.post(`${this.envService.apiUrl}/floor`, value, {
      headers: this.headers
    });
  }

  createFlat(value) {
    return this.httpClient.post(`${this.envService.apiUrl}/flat`, value, {
      headers: this.headers
    });
  }

  createRoom(value) {
    return this.httpClient.post(`${this.envService.apiUrl}/room`, value, {
      headers: this.headers
    });
  }
}