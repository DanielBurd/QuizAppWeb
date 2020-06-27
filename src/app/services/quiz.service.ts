import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContainerModel } from '../models/container.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private myHttpClient:HttpClient) { }

  public getQuizAsync(url:string):Promise<ContainerModel>{
    const observable=this.myHttpClient.get<ContainerModel>(url);
    return observable.toPromise();
  }
}
