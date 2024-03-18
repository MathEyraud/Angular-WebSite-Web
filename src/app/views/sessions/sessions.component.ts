import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Trainer } from 'src/app/models/Trainer';
import { Session } from 'src/app/models/Session';
import { AlertService } from 'src/app/services/alert.service';
import { SessionService } from 'src/app/services/session.service';
import { UtilsService } from 'src/app/services/utils.service';
import { tap } from 'rxjs';
import { provideClientHydration } from '@angular/platform-browser';
import { IntraSession } from 'src/app/models/IntraSession';
import { InterSession } from 'src/app/models/InterSession';
import { InterSessionService } from 'src/app/services/inter-session.service';
import { IntraSessionService } from 'src/app/services/intra-session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit{

  // -------------------------------------- //
  // Déclaration des propriétés nécessaires //
  // -------------------------------------- //
  sessionForm                 !: FormGroup;
  sessionValue                !: Session;
  modalRef                    !: NgbModalRef;
  searchVisibility            !: boolean;
  intraSessionAll             : IntraSession[] = [];
  interSessionAll             : InterSession[] = [];

  //for search    
  //sessionAll                  : Session[] = [];
  //sessionAllReserved          : Session[] = [];
  //sessionSearch               : Session[] = [];

  //for search
  intraSessionSearch          : IntraSession[] = [];
  intraSessionAllReserved     : IntraSession[] = [];
  interSessionAllReserved     : InterSession[] = [];
  interSessionSearch          : InterSession[] = [];

  //for filter    
  filterForm                  !: FormGroup;
  searchForm                  !: FormGroup;

  //for pagination    
  page                        : number = 1;
  position                    : number = 1;

  sessionUpdateForm           !: FormGroup;
  isLoading                   !: boolean;
  isFormSessionLoading        !: boolean;

  //For tabBar
  showInterSession            : boolean = true;
  showIntraSession            : boolean = false;

  constructor(
    private sessionService      : SessionService,         // Injection des services nécessaires
    private interSessionService : InterSessionService,    // Injection des services nécessaires
    private intraSessionService : IntraSessionService,    // Injection des services nécessaires
    private toastService        : ToastrService,
    private utilsService        : UtilsService,
    private alert               : AlertService,
    private formBuilder         : FormBuilder,
    private router              : Router,
    private alertService        : ConfirmBoxEvokeService
  ) { } 

  ngOnInit(): void {
    this.innitForm();               // Initialisation du formulaire
    this.getAllInterSession();      // Récupération de toutes les Session
    this.getAllIntraSession();      // Récupération de toutes les Session
    this.handleShowInterSession();  // Commencer sur la page des sessions inter
    this.searchVisibility = false;  // Initialisation de la visibilité de la recherche
  }
  
  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;  // Sélection de la page actuelle
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

    if (this.showInterSession) {
      this.interSessionAll = this.interSessionAllReserved.filter(interSession =>
        Object.values(interSession).some(value =>
          typeof value === "string" && value.toLowerCase().includes(keyword)
        )
      );
      
    } else if (this.showIntraSession) {
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
  

  // Changement de visibilité de la recherche
  changeSearchVisibility() {
    this.searchVisibility = !this.searchVisibility;
  }

  // Gestion du changement de page
  handlePageChange(event: number) {
    this.page = event;
  }

  // Récupération de toutes les session intra
  getAllIntraSession() {
    this.isLoading = true;
    this.intraSessionService.getAll().subscribe(
      (data) => {
        this.intraSessionAll          = data;
        this.intraSessionAllReserved  = data;
        this.isLoading                = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les intra sessions');
      }
    );
  }

  // Récupération de toutes les session inter
  getAllInterSession() {
    this.isLoading = true;
    this.interSessionService.getAll().subscribe(
      (data) => {
        this.interSessionAll          = data;
        this.interSessionAllReserved  = data;
        this.isLoading                = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les inter sessions');
      }
    );
  }

  // Suppression d'unE session inter
  deleteInterSession(id: number) {
    this.alertService.customFour('Etes-vous sûr de vouloir effectuer cette suppression?', 'Cette action est irréversible!', 'Confirmer', 'Annuler').subscribe(
      resp => {
        if (resp.success) {
          this.sessionService.delete(id).subscribe(() => {
            this.getAllIntraSession();
            this.toastService.success('Supprimé avec succès');
            this.toastService.success('Suppression effectuée avec succès');
          });
        }
      },
      (err) => {
        this.toastService.error(err.error !== null ? err.error.message : 'Impossible de supprimer la session');
      }
    )
  }

  // Suppression d'unE session intra
  deleteIntraSession(id: number) {
    this.alertService.customFour('Etes-vous sûr de vouloir effectuer cette suppression?', 'Cette action est irréversible!', 'Confirmer', 'Annuler').subscribe(
      resp => {
        if (resp.success) {
          this.sessionService.delete(id).subscribe(() => {
            this.getAllIntraSession();
            this.toastService.success('Supprimé avec succès');
            this.toastService.success('Suppression effectuée avec succès');
          });
        }
      },
      (err) => {
        this.toastService.error(err.error !== null ? err.error.message : 'Impossible de supprimer la session');
      }
    )
  }

  //TODO : Changer le lien
  goToEditInterSession(id: number) {
    this.router.navigateByUrl(`dashboard/InsertSessionComponent/interSession/${id}`);
  }

  //TODO : Changer le lien
  goToEditIntraSession(id: number) {
    this.router.navigateByUrl(`dashboard/InsertSessionComponent/intraSession/${id}`);
  }

  handleShowInterSession() {
    this.showInterSession = true;
    this.showIntraSession = false;
  }

  handleShowIntraSession() {
    this.showInterSession = false;
    this.showIntraSession = true;
  }

  // PAGE DES DETAILS
  handleInterSessionDetail(id: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: { key: 'interSession' } // Ajoutez vos paramètres ici
    };
    this.router.navigate([`dashboard/sessions/infos/${id}`], navigationExtras);
  }

  // PAGE DES DETAILS
  handleIntraSessionDetail(id: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: { key: 'intraSession' } // Ajoutez vos paramètres ici
    };
    this.router.navigate([`dashboard/sessions/infos/${id}`], navigationExtras);
  }

}
