import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { QuizComponent } from './components/quiz/quiz.component';


const routes: Routes = [
    {path:'home', component:MainComponent},
    {path:'quiz/:url', component:QuizComponent},
    {path :'' ,redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
