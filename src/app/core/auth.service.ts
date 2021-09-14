import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const tokenKey = 'authorization_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  getToken() {
    return this.document.defaultView?.localStorage.getItem(tokenKey);
  }
}
