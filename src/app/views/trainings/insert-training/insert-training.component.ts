import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/Trainer'; // Importation du modèle Trainer
import { AlertService } from 'src/app/services/alert.service';
import { TrainerService } from 'src/app/services/trainer.service'; // Importation du service TrainerService
import Swal from 'sweetalert2';
import { Training } from 'src/app/models/Training';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector    : 'app-insert-training',
  templateUrl : './insert-training.component.html',
  styleUrls   : ['./insert-training.component.scss']
})
export class InsertTrainingComponent implements OnInit{

  constructor(
    private trainingService : TrainingService, // Injection du service TrainerService
    private router          : Router,
    private route           : ActivatedRoute,
    private alert           : AlertService,
    private datePipe        : DatePipe,
    private sanitizer       : DomSanitizer,  // Injection du service DomSanitizer
  ) {}

  trainingForm    !: FormGroup;       // Formulaire réactif pour les données de la formation
  isLoading       : boolean = false;  // Indicateur de chargement
  idTraining      : any;              // Identifiant de la formation à éditer
  emailControl    !: FormControl;
  logoPreview     : SafeUrl = '';     // Variable pour stocker l'URL de l'aperçu du logo
  logoPreviewError: string = "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png";

  
  //A CONSERVER DANS L'EVENUTALITE DU REFUS DU FORMULAIRE FLOTTANT
  //isFormEdit : boolean = false;  // Indicateur pour déterminer si le formulaire est en mode édition

  ngOnInit(): void {
    this.initForm();                                          // Initialisation du formulaire

    this.idTraining = this.route.snapshot.paramMap.get('id');  // Récupération de l'identifiant de la formation depuis l'URL
    //A CONSERVER DANS L'EVENUTALITE DU REFUS DU FORMULAIRE FLOTTANT
    /*if (this.idTrainer) {
      this.isFormEdit = true;                                 // Le formulaire est en mode édition si un identifiant est présent dans l'URL
      this.getById(this.idTrainer);                           // Récupération des données de la formation à éditer
    }*/
    this.getById(this.idTraining);                           // Récupération des données de la formation à éditer
    this.emailControl = this.trainingForm.get('email') as FormControl;
  }

  // Méthode d'initialisation du formulaire
  initForm() {
    this.trainingForm = new FormGroup({

      id             : new FormControl(),

      title          : new FormControl('',Validators.required), // Téléphone de la formation
      description    : new FormControl('',Validators.required), // Email de la formation (champ obligatoire et format email)
      trainingPrice  : new FormControl('',Validators.required), // Adresse de la formation
      logo           : new FormControl(''),                     // Login de la formation
      
      creationDate   : new FormControl(''),                     // Date de création de la formation
      updateDate     : new FormControl(''),                     // Date de modification de la formation
      
      requirement    : new FormControl(''),
    });
  }

  // Méthode pour récupérer les données de la formation à partir de son identifiant
  getById(id: any) {
    this.trainingService.getById(id).subscribe({
      next: (data: Training) => {
         // Remplissage du formulaire avec les données de la formation
        this.trainingForm.patchValue(data);

        // Mettre à jour l'aperçu du logo lorsque les données sont récupérées
        this.initLogoPreview(data.logo);
      },
      error: (err) => {
        this.alert.alertError('Impossible de récupérer l\'identifiant de la formation'); // Affichage d'une alerte en cas d'erreur
      }
    });
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

  // Méthode pour annuler et retourner à la liste des formations
  cancel() {
    this.router.navigate(['dashboard/trainings']);
  }

  // Méthode pour enregistrer ou mettre à jour les données de la formation
  saveOrUpdate() {

    this.isLoading = true;                // Activation de l'indicateur de chargement
    const form = this.trainingForm.value;  // Récupération des données du formulaire

    // Mise à jour de la date de modification
    this.trainingForm.patchValue({
      updateDate: this.getCurrentDate()
    });

    this.trainingService.edit(this.idTraining, form).subscribe(
      () => {
        this.isLoading = false;                                                       // Désactivation de l'indicateur de chargement après la modification réussie
        Swal.fire('Modifié!', 'La formation a été modifié avec succès.', 'success');  // Affichage d'une notification de succès
        this.router.navigate(['dashboard/trainings']);                                // Redirection vers la liste des formations après la modification
      },
      (err) => {
        this.isLoading = false;                                                                   // Désactivation de l'indicateur de chargement en cas d'erreur
        this.alert.alertError('Une erreur s\'est produite lors de la modification du formation'); // Affichage d'une alerte en cas d'erreur
      }
    );

    //A CONSERVER DANS L'EVENUTALITE DU REFUS DU FORMULAIRE FLOTTANT
    /*if (this.isFormEdit) { // Si le formulaire est en mode édition

      this.trainerService.edit(this.idTrainer, form).subscribe(
        () => {
          this.isLoading = false;                                                       // Désactivation de l'indicateur de chargement après la modification réussie
          Swal.fire('Modifié!', 'La formation a été modifié avec succès.', 'success');  // Affichage d'une notification de succès
          this.router.navigate(['dashboard/trainers']);                                  // Redirection vers la liste des formations après la modification
        },
        (err) => {
          this.isLoading = false;                                                                   // Désactivation de l'indicateur de chargement en cas d'erreur
          this.alert.alertError('Une erreur s\'est produite lors de la modification de la formation'); // Affichage d'une alerte en cas d'erreur
        }
      );
      
    } else { // Si le formulaire est en mode ajout

      this.trainerService.save(form).subscribe(
        () => {
          this.isLoading = false; // Désactivation de l'indicateur de chargement après l'ajout réussi
          Swal.fire('Ajouté!', 'La formation a été ajouté avec succès.', 'success'); // Affichage d'une notification de succès
          this.router.navigate(['dashboard/trainers']); // Redirection vers la liste des formations après l'ajout
        },
        (err) => {
          this.isLoading = false; // Désactivation de l'indicateur de chargement en cas d'erreur
          this.alert.alertError('Une erreur s\'est produite lors de l\'ajout de la formation'); // Affichage d'une alerte en cas d'erreur
        }
      );
    }*/
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'dd-MM-yyyy') || ''; // Changez le format de date selon vos besoins
  }
}
