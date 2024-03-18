import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { Employee } from 'src/app/models/Employee';
import { AlertService } from 'src/app/services/alert.service';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ParticularService } from 'src/app/services/particular.service';
import Swal from 'sweetalert2';

@Component({
  selector    : 'app-insert-client',
  templateUrl : './insert-client.component.html',
  styleUrls   : ['./insert-client.component.scss']
})
export class InsertClientComponent implements OnInit{

  constructor(
    private particularService: ParticularService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private alert: AlertService
  ) {}

  companies: Company[] = [];

  entreprise: Partial<Company> = {};
  particulier!: string;
  employe!: string;
  userForm!: FormGroup;
  formVisibility!: string;
  isLoading!: boolean;
  idParticipant!: any;
  isFormEdit!: boolean;
  curentUri!: string;
  title: string = 'Enregistrer un participant';

  employeeValue!: Employee;

  ngOnInit(): void {
    this.idParticipant = this.route.snapshot.paramMap.get('id');
    if (this.idParticipant) {
      this.title = "Modifier les informations";
      this.formVisibility = this.route.snapshot.url[1]?.path ||'';
      this.getById(this.idParticipant);

      this.isFormEdit = true;
    }
    this.initForm();
    this.getAllCompany();
  }

  cancel() {
    this.router.navigate(['dashboard/clients']);
  }

  getById(id: any) {
    switch (this.formVisibility) {
      case 'employe':
        this.employeeService.getById(id).subscribe({
          next: data => {
            this.userForm.patchValue(data);
            this.entreprise = data.company;
          },
          error: (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant de l\'employé');
          }
        });
        break;
      case 'company':
        this.companyService.getById(id).subscribe({
          next: data => {
            this.userForm.patchValue(data);
          },
          error: (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant de l\'entreprise');
          }
        });
        break;
        case 'particulier':
        this.particularService.getById(id).subscribe({
          next: data => {
            this.userForm.patchValue(data);
          },
          error: (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer l\'identifiant du particulier');
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

  initForm() {
      // Sélectionnez la première entreprise du tableau 'companies' comme entreprise par défaut
      this.userForm = new FormGroup({
        id            : new FormControl(),
        company       : new FormControl(),
        firstname     : new FormControl(''),
        email         : new FormControl('', [Validators.required, Validators.email]),
        lastname      : new FormControl(''),
        name          : new FormControl(''),
        phone         : new FormControl(''),
        activity      : new FormControl(''),
        gender        : new FormControl('M'),
        highestDiploma: new FormControl(''),
        address       : new FormControl(''),
        birthDate     : new FormControl(''),
        creationDate  : new FormControl(),
        updateDate    : new FormControl(),
      });
  }

  updateForm(event: any) {
    this.formVisibility = event.target.value;
  }

  createParticipant() {
    this.isLoading = true;
    let form = this.userForm.value;
    if(this.idParticipant) {
      if (this.formVisibility == 'employe') {
        console.log(form);

        this.employeeService.edit(this.idParticipant, form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Modifié!',
              "L'employé a été modifié avec succès.",
              'success'
            );
            this.router.navigate(['dashboard/clients']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification de l\'employé');
          }
        )
      } else if (this.formVisibility == "company") {
        console.log(form);
        this.companyService.edit(this.idParticipant, form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Modifié!',
              "L'entreprise a été modifié avec succès.",
              'success'
            );
            this.router.navigate(['dashboard/clients']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification de l\'entreprise');
          }
        )
      } else {
        console.log(form);
          this.particularService.edit(this.idParticipant, form).subscribe(
            data => {
              this.isLoading = false;
              Swal.fire(
                'Ajouté!',
                "Le participant a été modifié avec succès.",
                'success'
              );
              this.router.navigate(['dashboard/clients'])
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de la modification du particulier');
            }
          )
      }
    } else {
      if (this.formVisibility == 'employe') {
        console.log(form);

        this.employeeService.save(form).subscribe(
          data => {
            this.isLoading = false;
            Swal.fire(
              'Ajouté!',
              "L'employé a été ajouté avec succès.",
              'success'
            );

            this.router.navigate(['dashboard/clients']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout de l\'employé');
          }
        )
      } else if(this.formVisibility == 'particulier') {
        this.particularService.save(form).subscribe(
            data => {
              this.isLoading = false;
              Swal.fire(
                'Ajouté!',
                "Le participant a été ajouté avec succès.",
                'success'
              );
              this.router.navigate(['dashboard/clients']);
            },
            (err) => {
              this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout du pariculier');
            }
          )
      } else {
        this.companyService.save(form).subscribe(
          data => {
            this.isLoading = false;
              Swal.fire(
                'Ajouté!',
                "L'entreprise a été ajouté avec succès.",
                'success'
              );
              this.router.navigate(['dashboard/clients']);
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout de l\'entreprise');
          }
        )
      }

    }
  }

}
