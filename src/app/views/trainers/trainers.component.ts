import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/alert.service';
import { UtilsService } from 'src/app/services/utils.service';
import { tap } from 'rxjs';
import { TrainerService } from 'src/app/services/trainer.service';
import { Trainer } from 'src/app/models/Trainer';

@Component({
  selector    : 'app-trainers',
  templateUrl : './trainers.component.html',
  styleUrls   : ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit{
  
  // -------------------------------------- //
  // Déclaration des propriétés nécessaires //
  // -------------------------------------- //
  trainerForm                 !: FormGroup;
  trainerValue                !: Trainer;
  modalRef                    !: NgbModalRef;
  searchVisibility            !: boolean;

  //for search    
  trainerAll                  : Trainer[] = [];
  trainerAllReserved          : Trainer[] = [];
  trainerSearch               : Trainer[] = [];

  //for filter    
  filterForm                  !: FormGroup;
  searchForm                  !: FormGroup;

  //for pagination    
  page                        : number = 1;
  position                    : number = 1;

  trainerUpdateForm           !: FormGroup;
  isLoading                   !: boolean;
  isFormTrainerLoading        !: boolean;

  constructor(
    private trainerService    : TrainerService,         // Injection des services nécessaires
    private toastService      : ToastrService,
    private utilsService      : UtilsService,
    private alert             : AlertService,
    private formBuilder       : FormBuilder,
    private router            : Router,
    private alertService      : ConfirmBoxEvokeService
  ) { }

  ngOnInit(): void {
    this.innitForm();               // Initialisation du formulaire
    this.getAllTrainer();           // Récupération de tous les formateurs
    this.searchVisibility = false;  // Initialisation de la visibilité de la recherche
  }
  
  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;  // Sélection de la page actuelle
  }

  // Initialisation du formulaire
  innitForm() {

    // Création du formulaire pour les détails du formateur
    this.trainerForm = new FormGroup({
      
      //USER
      phone         : new FormControl(''),
      email         : new FormControl(''),
      address       : new FormControl(''),
      login         : new FormControl(''),
      password      : new FormControl(''),
      photo         : new FormControl(''),

      //TRAINER
      activity      : new FormControl(''),
      cvLink        : new FormControl(''),
      firstName     : new FormControl(''),
      lastName      : new FormControl(''),
      gender        : new FormControl(''),
    });

    // Création du formulaire pour la recherche
    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    // Création du formulaire pour le filtre
    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    });

    this.trainerForm = this.formBuilder.group({
      //id          : ['', Validators.required],
      phone       : [''],
      email       : ['', [Validators.required, Validators.email]],
      //address     : ['', Validators.required],
      activity    : ['', Validators.required],
      //cvLink      : [''],
      firstName   : ['', Validators.required],
      lastName    : ['', Validators.required],
      gender      : ['', Validators.required],
    });
  }

  // Recherche par prénom du formateur
  searchBy() {
    this.trainerAll = this.trainerAllReserved;
    const keyword = this.searchForm.value.keyWord.toLowerCase().trim();
    if (keyword === "") {
      return;
    }
    this.trainerAll = this.trainerAll.filter((trainer: Trainer) =>
      Object.values(trainer).some((value: any) =>
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

  // Récupération de tous les formateurs
  getAllTrainer() {
    this.isLoading = true;
    this.trainerService.getAll().subscribe(
      (data) => {
        this.trainerAll         = data;
        this.trainerAllReserved = data;
        this.isLoading          = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formateurs');
      }
    );
  }

  // Enregistrement d'un nouveau formateur
  saveTrainer() {
    this.isFormTrainerLoading = true;
    let trainerSave = this.createTrainer();
    this.trainerService.save(trainerSave).subscribe(
      (value) => {
        let trainerResponse = value;
        this.toastService.success("Enregistrement effectué avec succès !");
        this.isFormTrainerLoading = false;
        this.trainerForm.reset();
        setTimeout(() => {
          this.trainerForm.reset();
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
        if (error.error == null) {
          this.toastService.error("Une erreur est survenue lors de l'enregistrement d'un formateur");
          this.isFormTrainerLoading = false;
        } else {
          this.toastService.error(error.error.message);
          this.isFormTrainerLoading = false;
        }
      }
    )
  }

  // Création d'un objet formateur à partir du formulaire
  createTrainer(): Trainer {

    // Assignation des valeurs du formulaire à l'objet formateur

    //USER
    this.trainerValue               = this.trainerForm.value;
    this.trainerValue.phone         = this.trainerForm.value.phone;
    this.trainerValue.email         = this.trainerForm.value.email;
    this.trainerValue.address       = this.trainerForm.value.address;
    this.trainerValue.login         = this.trainerForm.value.login;
    this.trainerValue.password      = this.trainerForm.value.password;
    this.trainerValue.photo         = this.trainerForm.value.photo;
    this.trainerValue.creationDate  = new Date();

    //TRAINER
    this.trainerValue.activity    = this.trainerForm.value.activity;
    this.trainerValue.cvLink      = this.trainerForm.value.cvLink;
    this.trainerValue.firstName   = this.trainerForm.value.firstName;
    this.trainerValue.lastName    = this.trainerForm.value.lastName;
    this.trainerValue.gender      = this.trainerForm.value.gender;

    return this.trainerValue;
  }

  // Suppression d'un formateur
  trainerDelete(id: number) {
    this.alertService.customFour('Etes-vous sûr de vouloir effectuer cette suppression?', 'Cette action est irréversible!', 'Confirmer', 'Annuler').subscribe(
      resp => {
        if (resp.success) {
          this.trainerService.delete(id).subscribe(() => {
            this.getAllTrainer();
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

  // Edition d'un formateur
  /*trainerEdit(id: number) {
    this.trainerService.getById(id).subscribe((data) => {
      this.trainerUpdateForm.patchValue({

        id: data.id,

        //USER
        phone         : data.phone,
        email         : data.email,
        address       : data.address,
        login         : data.login,
        password      : data.password,
        photo         : data.photo,

        //TRAINER
        activity      : data.activity,
        cvLink        : data.cvLink,
        firstName     : data.firstName,
        lastName      : data.lastName,
        gender        : data.gender,
      });
    },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de modifier');
      });
  }*/

  goToEdit(id: number) {
    this.router.navigateByUrl(`dashboard/InsertTrainerComponent/${id}`);
  }

  // Mise à jour des informations d'un formateur
  updateTrainer() {

    this.isFormTrainerLoading   = true;
    let trainerUpdate           = this.trainerUpdateForm.value;
    const trainerId             = trainerUpdate.id;
    let creationDate            = trainerUpdate.creationDate;
    trainerUpdate.updateDate    = new Date();
    
    this.trainerService.edit(trainerId, trainerUpdate).pipe(
      tap(
        (value) => {
          let trainerResponse = value;
          this.toastService.success("Modification effectuée avec succès !");
          this.isFormTrainerLoading = false;
          this.trainerUpdateForm.reset();

          setTimeout(() => {
            this.trainerUpdateForm.reset();
            window.location.reload();
          }, 10);
        },
        (error) => {
          if (error.error == null) {
            this.toastService.error("Une erreur est survenue lors de l'enregistrement du formateur");
            this.isFormTrainerLoading = false;

          } else {
            this.toastService.error(error.error.message);
            this.isFormTrainerLoading = false;
          }
        }
      )
    ).subscribe();
  }

  // Obtention d'une sous-chaîne de texte
  getSubString(text: string) {
    return this.utilsService.getSubString(text, 30);
  }
}