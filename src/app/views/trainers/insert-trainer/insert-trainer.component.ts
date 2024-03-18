import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/Trainer'; // Importation du modèle Trainer
import { AlertService } from 'src/app/services/alert.service';
import { TrainerService } from 'src/app/services/trainer.service'; // Importation du service TrainerService
import Swal from 'sweetalert2';

@Component({
  selector    : 'app-insert-trainer',
  templateUrl : './insert-trainer.component.html',
  styleUrls   : ['./insert-trainer.component.scss']
})
export class InsertTrainerComponent implements OnInit {

  constructor(
    private trainerService  : TrainerService, // Injection du service TrainerService
    private router          : Router,
    private route           : ActivatedRoute,
    private alert           : AlertService,
    private datePipe        : DatePipe
  ) {}

  trainerForm   !: FormGroup;       // Formulaire réactif pour les données du formateur
  isLoading     : boolean = false;  // Indicateur de chargement
  idTrainer     : any;              // Identifiant du formateur à éditer
  emailControl  !: FormControl;
  
  //A CONSERVER DANS L'EVENUTALITE DU REFUS DU FORMULAIRE FLOTTANT
  //isFormEdit : boolean = false;  // Indicateur pour déterminer si le formulaire est en mode édition

  ngOnInit(): void {
    this.initForm();                                          // Initialisation du formulaire

    this.idTrainer = this.route.snapshot.paramMap.get('id');  // Récupération de l'identifiant du formateur depuis l'URL
    //A CONSERVER DANS L'EVENUTALITE DU REFUS DU FORMULAIRE FLOTTANT
    /*if (this.idTrainer) {
      this.isFormEdit = true;                                 // Le formulaire est en mode édition si un identifiant est présent dans l'URL
      this.getById(this.idTrainer);                           // Récupération des données du formateur à éditer
    }*/
    this.getById(this.idTrainer);                           // Récupération des données du formateur à éditer
    this.emailControl = this.trainerForm.get('email') as FormControl;
  }

  // Méthode d'initialisation du formulaire
  initForm() {
    this.trainerForm = new FormGroup({

      id              : new FormControl(),

      //USER
      phone           : new FormControl(''),                                          // Téléphone du formateur
      email           : new FormControl('', [Validators.required, Validators.email]), // Email du formateur (champ obligatoire et format email)
      address         : new FormControl(''),                                          // Adresse du formateur
      login           : new FormControl(''),                                          // Login du formateur
      password        : new FormControl(''),                                          // Password du formateur
      
      creationDate    : new FormControl(''),                                          // Date de création du formateur
      updateDate      : new FormControl(''),                                          // Date de modification du formateur
      
      //TRAINER
      activity        : new FormControl(''),                                          // Activité du formateur
      cvLink          : new FormControl(''),                                          // Lien vers le CV du formateur
      firstName       : new FormControl('', Validators.required),                     // Prénom du formateur (champ obligatoire)
      lastName        : new FormControl('', Validators.required),                     // Nom du formateur (champ obligatoire)
      gender          : new FormControl('M'),                                         // Sexe du formateur (par défaut masculin)
    });
  }

  // Méthode pour récupérer les données du formateur à partir de son identifiant
  getById(id: any) {
    this.trainerService.getById(id).subscribe({
      next: (data: Trainer) => {
        this.trainerForm.patchValue(data); // Remplissage du formulaire avec les données du formateur
      },
      error: (err) => {
        this.alert.alertError('Impossible de récupérer l\'identifiant du formateur'); // Affichage d'une alerte en cas d'erreur
      }
    });
  }

  // Méthode pour annuler et retourner à la liste des formateurs
  cancel() {
    this.router.navigate(['dashboard/trainers']);
  }

  // Méthode pour enregistrer ou mettre à jour les données du formateur
  saveOrUpdate() {

    this.isLoading = true;                // Activation de l'indicateur de chargement
    const form = this.trainerForm.value;  // Récupération des données du formulaire

    // Mise à jour de la date de modification
    this.trainerForm.patchValue({
      updateDate: this.getCurrentDate()
    });

    this.trainerService.edit(this.idTrainer, form).subscribe(
      () => {
        this.isLoading = false;                                                       // Désactivation de l'indicateur de chargement après la modification réussie
        Swal.fire('Modifié!', 'Le formateur a été modifié avec succès.', 'success');  // Affichage d'une notification de succès
        this.router.navigate(['dashboard/trainers']);                                  // Redirection vers la liste des formateurs après la modification
      },
      (err) => {
        this.isLoading = false;                                                                   // Désactivation de l'indicateur de chargement en cas d'erreur
        this.alert.alertError('Une erreur s\'est produite lors de la modification du formateur'); // Affichage d'une alerte en cas d'erreur
      }
    );

    //A CONSERVER DANS L'EVENUTALITE DU REFUS DU FORMULAIRE FLOTTANT
    /*if (this.isFormEdit) { // Si le formulaire est en mode édition

      this.trainerService.edit(this.idTrainer, form).subscribe(
        () => {
          this.isLoading = false;                                                       // Désactivation de l'indicateur de chargement après la modification réussie
          Swal.fire('Modifié!', 'Le formateur a été modifié avec succès.', 'success');  // Affichage d'une notification de succès
          this.router.navigate(['dashboard/trainers']);                                  // Redirection vers la liste des formateurs après la modification
        },
        (err) => {
          this.isLoading = false;                                                                   // Désactivation de l'indicateur de chargement en cas d'erreur
          this.alert.alertError('Une erreur s\'est produite lors de la modification du formateur'); // Affichage d'une alerte en cas d'erreur
        }
      );
      
    } else { // Si le formulaire est en mode ajout

      this.trainerService.save(form).subscribe(
        () => {
          this.isLoading = false; // Désactivation de l'indicateur de chargement après l'ajout réussi
          Swal.fire('Ajouté!', 'Le formateur a été ajouté avec succès.', 'success'); // Affichage d'une notification de succès
          this.router.navigate(['dashboard/trainers']); // Redirection vers la liste des formateurs après l'ajout
        },
        (err) => {
          this.isLoading = false; // Désactivation de l'indicateur de chargement en cas d'erreur
          this.alert.alertError('Une erreur s\'est produite lors de l\'ajout du formateur'); // Affichage d'une alerte en cas d'erreur
        }
      );
    }*/
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'dd-MM-yyyy') || ''; // Changez le format de date selon vos besoins
  }
  
}