import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterSession } from 'src/app/models/InterSession';
import { IntraSession } from 'src/app/models/IntraSession';

@Component({
  selector: 'app-session-infos',
  templateUrl: './session-infos.component.html',
  styleUrls: ['./session-infos.component.scss']
})
export class SessionInfosComponent {

  constructor(
    private router              : Router,
    private route               : ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.typeSession = params['key']; // Remplacez 'key' par le nom du paramètre que vous avez passé
    });
  }

  searchVisibility            !: boolean;
  idSession                   !: any;
  typeSession                 !: string;
  intraSessionAll             : IntraSession[] = [];
  interSessionAll             : InterSession[] = [];
  isLoading                   !: boolean;
  
  //for search
  intraSessionSearch          : IntraSession[] = [];
  intraSessionAllReserved     : IntraSession[] = [];
  interSessionAllReserved     : InterSession[] = [];
  interSessionSearch          : InterSession[] = [];

  //for filter    
  filterForm                  !: FormGroup;
  searchForm                  !: FormGroup;

  //for pagination
  page: number = 1;

  ngOnInit(): void {
    this.searchVisibility = false;  // Initialisation de la visibilité de la recherche
    this.idSession = this.route.snapshot.paramMap.get('id');
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  // Changement de visibilité de la recherche
  changeSearchVisibility() {
    this.searchVisibility = !this.searchVisibility;
  }

  // Initialisation du formulaire
  innitForm() {

    // Création du formulaire pour la recherche
    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    // Création du formulaire pour le filtre
    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    });
  }

   // Recherche par termes essentiel 
   searchBy() {

    const keyword = this.searchForm.value.keyWord.toLowerCase().trim();

    if (keyword === "") {
      return;
    }

    if (this.typeSession === "interSession") {
      this.interSessionAll = this.interSessionAllReserved.filter(interSession =>
        Object.values(interSession).some(value =>
          typeof value === "string" && value.toLowerCase().includes(keyword)
        )
      );
      
    } else if (this.typeSession === "intraSession") {
      this.intraSessionAll = this.intraSessionAllReserved.filter(intraSession =>
        Object.values(intraSession).some(value =>
          typeof value === "string" && value.toLowerCase().includes(keyword)
        )
      );
    }

    /*this.sessionAll = this.sessionAll.filter((session: Session) =>
      Object.values(session).some((value: any) =>
        typeof value === "string" && value.toLowerCase().includes(keyword)
      )
    );*/
  }

  
}