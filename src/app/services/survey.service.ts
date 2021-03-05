import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  getEncuesta(){
    return this.http.get('https://raw.githubusercontent.com/');
  }

  postEncuesta(respuestas){
    return this.http.post('https://raw.githubusercontent.com/',respuestas)
  }
}
