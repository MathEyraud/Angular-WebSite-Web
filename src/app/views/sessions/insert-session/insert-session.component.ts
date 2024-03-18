import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { Employee } from 'src/app/models/Employee';
import { Trainer } from 'src/app/models/Trainer';
import { Training } from 'src/app/models/Training';
import { AlertService } from 'src/app/services/alert.service';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { InterSessionService } from 'src/app/services/inter-session.service';
import { IntraSessionService } from 'src/app/services/intra-session.service';
import { ParticularService } from 'src/app/services/particular.service';
import { TrainerService } from 'src/app/services/trainer.service';
import { TrainingService } from 'src/app/services/training.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-insert-session',
  templateUrl: './insert-session.component.html',
  styleUrls: ['./insert-session.component.scss']
})
export class InsertSessionComponent {

  constructor(
    private router              : Router,
    private route               : ActivatedRoute,
    private companyService      : CompanyService,
    private trainerService      : TrainerService,
    private trainingService     : TrainingService,
    private alert               : AlertService,
    private interSessionService : InterSessionService,
    private intraSessionService : IntraSessionService,
    private formBuilder         : FormBuilder,
  ) {}

  entreprise      : Partial<Company> = {};
  particulier     !: string;
  employe         !: string;

  sessionForm     !: FormGroup;
  formVisibility  !: string;
  
  isLoading       !: boolean;
  idSession       !: any;
  isFormEdit      !: boolean;

  curentUri       !: string;
  title           : string = 'Enregistrer une session';

  employeeValue   !: Employee;
  trainers        : Trainer[]   = [];
  trainings       : Training[]  = [];
  companies       : Company[]   = [];

  fieldFocused: { [key: string]: boolean } = {}; // Un objet pour suivre l'état focus de chaque champ

  ngOnInit(): void {
    this.idSession = this.route.snapshot.paramMap.get('id');
    if (this.idSession) {
      this.title = "Modifier les informations";
      this.formVisibility = this.route.snapshot.url[1]?.path ||'';
      this.getById(this.idSession);

      this.isFormEdit = true;
    }
    this.initForm();
    this.getAllCompany();
    this.getAllTraining();
    this.getAllTrainer();
  }

  cancel() {
    this.router.navigate(['dashboard/sessions']);
  }

  getById(id: any) {

    switch (this.formVisibility) {
      case 'interSession':
        this.interSessionService.getById(id).subscribe({
          next: data => {
            this.sessionForm.patchValue(data);
            this.entreprise = data.company;
          },
          error: (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant de l\'employé');
          }
        });
        break;

      case 'intraSession':
        this.companyService.getById(id).subscribe({
          next: data => {
            this.sessionForm.patchValue(data);
          },
          error: (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant de l\'entreprise');
          }
        });
        break;

      default:
        break;
    }
  }

  getAllCompany() {
    this.companyService.getAll().subscribe(
      data => {
        this.companies = data;

      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les entreprises');
      }
    )
  }

  getAllTrainer() {
    this.trainerService.getAll().subscribe(
      data => {
        this.trainers = data;

      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formateurs !');
      }
    )
  }

  getAllTraining() {
    this.trainingService.getAll().subscribe(
      data => {
        this.trainings = data;

      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les formations !');
      }
    )
  }

  initForm() {
      this.sessionForm = new FormGroup({
        id                      : new FormControl(''),
        code                    : new FormControl('', Validators.required),
        duration                : new FormControl('', Validators.required),
        price                   : new FormControl('', Validators.required),
        description             : new FormControl('', Validators.required),
        status                  : new FormControl(''),
        date                    : new FormControl('', Validators.required),
        location                : new FormControl('', Validators.required),
        sessionScore            : new FormControl(''),
        creationDate            : new FormControl(),
        updateDate              : new FormControl(),
        trainer                 : new FormControl('', Validators.required),
        training                : new FormControl('', Validators.required),

        //Inter/Intra
        minParticipants         : new FormControl(''),
        company                 : new FormControl(''),
        particularSubscription  : new FormControl(''),
      });
  }

  updateForm(event: any) {
    this.formVisibility = event.target.value;
  }

  createSession() {
    this.isLoading = true;
    let form = this.sessionForm.value;

    if(this.idSession) {

      if (this.formVisibility == 'interSession') {

        this.interSessionService.edit(this.idSession, form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Modifié!',
              "La session a été modifié avec succès.",
              'success'
            );
            this.router.navigate(['dashboard/sessions']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification de la session.');
          }
        )

      } else if (this.formVisibility == "intraSession") {
        this.companyService.edit(this.idSession, form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Modifié!',
              "La session a été modifié avec succès.",
              'success'
            );
            this.router.navigate(['dashboard/sessions']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification de la session !');
          }
        )
      }

    } else {

      if (this.formVisibility == 'interSession') {

        this.interSessionService.save(form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Ajouté!',
              "La session a été ajouté avec succès.",
              'success'
            );

            this.router.navigate(['dashboard/sessions']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout de la session');
          }
        )

      } else if(this.formVisibility == 'intraSession') {
        this.intraSessionService.save(form).subscribe(
            data => {
              this.isLoading = false;
              Swal.fire(
                'Ajouté!',
                "La session a été ajouté avec succès.",
                'success'
              );
              this.router.navigate(['dashboard/sessions']);
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout de la session');
            }
          )
      } 
    }
  }

  // Fonction pour mettre à jour l'état du focus d'un champ spécifique
  setFieldFocus(fieldName: string, isFocused: boolean) {
    this.fieldFocused[fieldName] = isFocused;
  }

  // Fonction pour vérifier si un champ est vide lorsqu'il perd le focus
  checkFieldEmpty(fieldName: string) {
    return !this.fieldFocused[fieldName] && this.sessionForm.get(fieldName)?.invalid && this.sessionForm.get(fieldName)?.touched;
  }
}
