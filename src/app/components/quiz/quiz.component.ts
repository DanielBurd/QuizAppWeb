import { Component, OnInit, Input, resolveForwardRef } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizModel } from 'src/app/models/quiz.model';
import {  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  constructor(private myQuizService:QuizService, private myActivatedRouter:ActivatedRoute) { }
    public quiz:QuizModel[];
    public answears:string[][]=new Array<string[]>(10);
    public index:number;
    public score:number;
    public urlArray=[
        {category:'book',url:'https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple'},
        {category:'film',url:'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple'},
        {category:'music',url:'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'},
        {category:'general',url:'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'}];

  ngOnInit() {
    this.index=0;
    this.score=0;
    const category=this.myActivatedRouter.snapshot.params.url;
    const index=this.urlArray.findIndex(url=>url.category===category); // gets the right url to get the questions from
    setTimeout(async () => { // crates a wait to simulate a real call for the server to retrive the answears and questions
        try{
        
            const quizContainer=await this.myQuizService.getQuizAsync(this.urlArray[index].url);// get the question from the api
            this.quiz=quizContainer.results; // assigns the quistion array from the container object
            for(let i=0;i<this.quiz.length;i++){
                this.answears[i]=[this.quiz[i].correct_answer,...this.quiz[i].incorrect_answers]; // creates the answear array to shuffle
                }
                this.shuffleAnswears();
            
        }
        catch(err){
            console.log(err.message);
        }
    }, 2000);
  }

  public scoreCounter(p:HTMLInputElement){ // counts the correct answear score
      if(p.innerText===this.quiz[this.index].correct_answer){
          this.score++;
      }
      this.index++; //increases the index to promtoe the questions array
      if(this.index<=9){
      this.shuffleAnswears(); // shuffles the answears differntly for each question
      }
      
  }

  public shuffleAnswears():void{ // shuffles the answears array in relation to the quistion 
        for(let i=0;i<this.answears[this.index].length;i++){
            const ranNum=Math.floor(Math.random()*3);
            const temp=this.answears[this.index][ranNum];
            this.answears[this.index][ranNum]=this.answears[this.index][i];
            this.answears[this.index][i]=temp;
        }
  }

  
}
