import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/alert.service';
import { UtilsService } from 'src/app/services/utils.service';
import { tap } from 'rxjs';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/app/models/Training';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector    : 'app-trainings',
  templateUrl : './trainings.component.html',
  styleUrls   : ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit{
  // -------------------------------------- //
  // Déclaration des propriétés nécessaires //
  // -------------------------------------- //
  trainingForm                !: FormGroup;
  trainingValue               !: Training;
  modalRef                    !: NgbModalRef;
  searchVisibility            !: boolean;
  
  //for preview logo
  logoPreview                 : SafeUrl = '';     // Variable pour stocker l'URL de l'aperçu du logo
  logoPreviewError            : string = "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png";

  //for search    
  trainingAll                 : Training[] = [];
  trainingAllReserved         : Training[] = [];
  trainingSearch              : Training[] = [];

  //for filter    
  filterForm                  !: FormGroup;
  searchForm                  !: FormGroup;

  //for pagination    
  page                        : number = 1;
  position                    : number = 1;

  trainingUpdateForm          !: FormGroup;
  isLoading                   !: boolean;
  isFormTrainingLoading       !: boolean;

  constructor(
    private trainingService   : TrainingService,         // Injection des services nécessaires
    private toastService      : ToastrService,
    private utilsService      : UtilsService,
    private alert             : AlertService,
    private formBuilder       : FormBuilder,
    private router            : Router,
    private alertService      : ConfirmBoxEvokeService,
    private sanitizer         : DomSanitizer,  // Injection du service DomSanitizer
  ) { }

  ngOnInit(): void {
    this.innitForm();                         // Initialisation du formulaire
    this.getAllTraining();                    // Récupération de tous les formationss
    this.searchVisibility = false;            // Initialisation de la visibilité de la recherche
    this.logoPreview = this.logoPreviewError; // Initialisation du logo en cas de non logo
  }
  
  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;  // Sélection de la page actuelle
  }

  // Initialisation du formulaire
  innitForm() {

    // Création du formulaire pour les détails du formation
    this.trainingForm = new FormGroup({
      
      title           : new FormControl(''),
      description     : new FormControl(''),
      trainingPrice   : new FormControl(''),
      logo            : new FormControl(''),
    });

    // Création du formulaire pour la recherche
    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    // Création du formulaire pour le filtre
    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    });

    this.trainingForm = this.formBuilder.group({
      title           : ['', Validators.required],
      description     : ['', Validators.required],
      trainingPrice   : ['', Validators.required],
      logo            : [''],
    });
  }

  // Recherche par prénom du formation
  searchBy() {

    this.trainingAll = this.trainingAllReserved;
    const keyword = this.searchForm.value.keyWord.toLowerCase().trim();

    if (keyword === "") {
      return;
    }

    this.trainingAll = this.trainingAll.filter((training: Training) =>
      Object.values(training).some((value: any) =>
        typeof value === "string" && value.toLowerCase().includes(keyword)
      )
    );
  }
  

  // Changement de visibilité de la recherche
  changeSearchVisibility() {
    this.searchVisibility = !this.searchVisibility;
  }

  // Gestion du changement de page
  handlePageChange(event: number) {
    this.page = event;
  }

  // Récupération de tous les formationss
  getAllTraining() {
    this.isLoading = true;
    this.trainingService.getAll().subscribe(
      (data) => {
        this.trainingAll         = data;
        this.trainingAllReserved = data;
        this.isLoading          = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formations');
      }
    );
  }

  // Enregistrement d'un nouveau formation
  saveTraining() {
    this.isFormTrainingLoading = true;
    let trainingSave = this.createTraining();
    
    this.trainingService.save(trainingSave).subscribe(
      (value) => {
        let trainingResponse = value;
        this.toastService.success("Enregistrement effectué avec succès !");
        this.isFormTrainingLoading = false;
        this.trainingForm.reset();
        setTimeout(() => {
          this.trainingForm.reset();
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
        if (error.error == null) {
          this.toastService.error("Une erreur est survenue lors de l'enregistrement d'une formation");
          this.isFormTrainingLoading = false;
        } else {
          this.toastService.error(error.error.message);
          this.isFormTrainingLoading = false;
        }
      }
    )
  }

  // Création d'un objet formation à partir du formulaire
  createTraining(): Training {

    // Assignation des valeurs du formulaire à l'objet formation
    this.trainingValue                = this.trainingForm.value;

    this.trainingValue.title           = this.trainingForm.value.title;
    this.trainingValue.description     = this.trainingForm.value.description;
    this.trainingValue.trainingPrice   = this.trainingForm.value.trainingPrice;
    this.trainingValue.logo            = this.trainingForm.value.logo;

    return this.trainingValue;
  }

  // Suppression d'un formation
  trainingDelete(id: number) {
    this.alertService.customFour('Etes-vous sûr de vouloir effectuer cette suppression?', 'Cette action est irréversible!', 'Confirmer', 'Annuler').subscribe(
      resp => {
        if (resp.success) {
          this.trainingService.delete(id).subscribe(() => {
            this.getAllTraining();
            this.toastService.success('Supprimé avec succès');
            this.toastService.success('Suppression effectuée avec succès');
          });
        }
      },
      (err) => {
        this.toastService.error(err.error !== null ? err.error.message : 'Impossible de supprimer le thème');
      }
    )
  }

  // Edition d'un formation
  goToEdit(id: number) {
    this.router.navigateByUrl(`dashboard/InsertTrainingComponent/${id}`);
  }

  // Mise à jour des informations d'un formation
  updateTraining() {

    this.isFormTrainingLoading    = true;
    let trainingUpdate            = this.trainingUpdateForm.value;
    const trainingId              = trainingUpdate.id;
    let creationDate              = trainingUpdate.creationDate;
    trainingUpdate.updateDate     = new Date();
    
    this.trainingService.edit(trainingId, trainingUpdate).pipe(
      tap(
        (value) => {
          let trainingResponse = value;
          this.toastService.success("Modification effectuée avec succès !");
          this.isFormTrainingLoading = false;
          this.trainingUpdateForm.reset();

          setTimeout(() => {
            this.trainingUpdateForm.reset();
            window.location.reload();
          }, 10);
        },
        (error) => {
          if (error.error == null) {
            this.toastService.error("Une erreur est survenue lors de l'enregistrement du formation");
            this.isFormTrainingLoading = false;

          } else {
            this.toastService.error(error.error.message);
            this.isFormTrainingLoading = false;
          }
        }
      )
    ).subscribe();
  }

  // ------------------- //
  // GESTION DE LA PHOTO //
  // ------------------- //
  // Obtention d'une sous-chaîne de texte
  getSubString(text: string) {
    return this.utilsService.getSubString(text, 30);
  }

  // Méthode pour initialiser la photo de la formation
  initLogoPreview(link: string) {
    
    if (link) {
      // Sécuriser l'URL du logo
      this.logoPreview = this.sanitizer.bypassSecurityTrustUrl(link); 

    } else {
      // Lien vers une image de cercle blanc par défaut si le lien est vide
      this.logoPreview = this.logoPreviewError;
    }
  }

  // Méthode pour mettre à jour la photo de la formation
  updateLogoPreview(event: any) {
    const link = event.target.value;

    if (link) {
      // Vérifier si le lien pointe vers une image
      this.checkImageValidity(link).then(isValid => {

        if (isValid) {
          // Sécuriser l'URL du logo
          this.logoPreview = this.sanitizer.bypassSecurityTrustUrl(link) as SafeUrl;
        } else {
          // Lien vers une image de cercle blanc par défaut si le lien ne pointe pas vers une image valide
          this.logoPreview = this.logoPreviewError;
        }

      }).catch(error => {
        console.error('Error checking image validity:', error);
      });

    } else {
      // Lien vers une image de cercle blanc par défaut si le lien est vide
      this.logoPreview = this.logoPreviewError;
    }
  }

  // Méthode pour vérifier la validité d'une image à partir de son URL
  checkImageValidity(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(true); // L'image est valide
      };
      img.onerror = () => {
        resolve(false); // L'image n'est pas valide
      };
      img.src = url;
    });
  }
}
