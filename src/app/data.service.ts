import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly cacheName = 'json-api';
  private url = 'https://fae9-195-211-86-50.ngrok-free.app'

  constructor(
    private http: HttpClient
  ) { }


  getUser(id: any): Observable<User> {
    const headers = new HttpHeaders()
    .set('ngrok-skip-browser-warning', 'any')
    return this.http.get<User>(`${this.url}/users/${id}`, {headers})
  }

  async getLastCachedUserId(): Promise<number | null> {
    const cache = await caches.open(this.cacheName);
    const cacheKeys = await cache.keys();
    console.log(cacheKeys);

    let lastCachedId: number | null = null;

    for (const cacheKey of cacheKeys) {
      const url = new URL(cacheKey.url);

      if (url.pathname.startsWith('/users/')) {
        const userId = Number(url.pathname.split('/users/')[1]);

        if (!isNaN(userId) && (lastCachedId === null || userId > lastCachedId)) {
          lastCachedId = userId;
        }
      }
    }

    return lastCachedId;
  }
}
