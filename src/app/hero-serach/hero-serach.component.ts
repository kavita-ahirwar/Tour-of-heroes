import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged, Observable,Subject, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-serach',
  templateUrl: './hero-serach.component.html',
  styleUrls: ['./hero-serach.component.css']
})
export class HeroSerachComponent implements OnInit {

 heroes$!: Observable<Hero[]>;
private searchTerms =new Subject<string>();


search(term:string):void{
  this.searchTerms.next(term);
}


  constructor(private heroService:HeroService) { }

  ngOnInit(): void {
    this.heroes$=this.searchTerms.pipe(
     debounceTime(300),
     distinctUntilChanged(),
     switchMap((term:string)=>this.heroService.searchHeroes(term)),
      


    )
  }

}
