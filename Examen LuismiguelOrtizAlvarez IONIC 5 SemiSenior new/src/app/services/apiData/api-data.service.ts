import { Injectable } from '@angular/core';
import { deployConf } from './../../utils/config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ServerMessage } from '../../classes/serverMessage.class';
import { DomSanitizer } from '@angular/platform-browser';

export interface IRequestOptions {
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
  params?: HttpParams | { [param: string]: string | Array<string> };
  reportProgress?: boolean;
  responseType?: string | "arraybuffer" | "blob" | "json" | "text";
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  // Cambiar cada que se ponga en produccion o en algun otro server
  //baseURL: string = deployConf.apiUrl;
  baseURL: string = deployConf.apiUrl;
  token: string;

  // 67 end points

  constructor(private http: HttpClient) { }

  getRandomUsersData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>('https://randomuser.me/api', {}).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error)
      });
    })
  }

  getAllMovies(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>('http://api.tvmaze.com/schedule/full', {}).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error)
      });
    })
  }

  doSearchMoviesByName( searchText : string ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>('http://api.tvmaze.com/search/shows?q='+searchText, {}).subscribe((response: any) => {
        resolve(response);
      }, (error) => {
        reject(error)
      });
    })
  }
}
