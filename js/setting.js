/// <reference path="../typings/globals/jquery/index.d.ts" />
import {Quiz} from './quiz.js'
export class Setting{
    constructor(){
       this.category =document.getElementById('category');
       this.difficulty=document.getElementsByName('difficulty');
       this.numberOfQuestions=document.getElementById('numberOfQuestions');
       document.getElementById('startBtn').addEventListener('click',this.startQuiz.bind(this))
       
    }
    /**
     * get value inputs when click on button submit 
     * send data to link api 
     */
    async startQuiz()
    {
        //get value inputs when click on button submit 
        let category=this.category.value;
        console.log(category);
        let difficulty=Array.from(this.difficulty).find(value =>  value.checked).value;
        let numberOfQuestions=this.numberOfQuestions.value;
        //send data to link api 
        let Url=`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;
        //fetch data 
         let response=await this.fetchData(Url);
         if(response.length > 0 )
         {
            $('#setting').fadeOut(500,function(){
                $('#quiz').fadeIn(500);
             })
             let quiz=new Quiz(response);
         }
        
    }
    async fetchData(url)
    {
        let response =await fetch(url);
        response=await response.json();
        return response.results;
    }
}