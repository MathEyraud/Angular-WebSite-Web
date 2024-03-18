import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Theme } from 'src/app/models/Theme';
import { ThemeService } from 'src/app/services/theme.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UtilsService } from "../../services/utils.service";
import { ConfirmBoxEvokeService } from "@costlydeveloper/ngx-awesome-popup";
import { ToastrService } from "ngx-toastr";
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector    : 'app-themes',
  templateUrl : './themes.component.html',
  styleUrls   : ['./themes.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
})
export class ThemesComponent implements OnInit {

  convert(arg0: number) {
    return Math.ceil(arg0);
  }

  themeForm         !: FormGroup;
  themeValue        !: Theme;
  modalRef          !: NgbModalRef;
  searchVisibility  !: boolean;

  //for search
  themesAll         : Theme[] = [];
  themesAllReserved : Theme[] = [];
  themesSearch      : Theme[] = [];

  //for filter
  filterForm!: FormGroup;
  searchForm!: FormGroup;
  
  //for pagination
  page      : number = 1;
  position  : number = 1;

  themeUpdateForm     !: FormGroup;
  isLoading           !: boolean;
  isFormThemeLoading  !: boolean;


  constructor(
    private themeService  : ThemeService,
    private toastService  : ToastrService,
    private utilsService  : UtilsService,
    private alert         : AlertService,
    private formBuilder   : FormBuilder,
    private router        : Router,
    private alertService  : ConfirmBoxEvokeService
  ) { }

  ngOnInit(): void {
    this.innitForm();
    this.getAllThemes();
    this.searchVisibility = false;
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  innitForm() {
    this.themeForm = new FormGroup({
      themeTitle: new FormControl(''),
      description: new FormControl(''),
    });

    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    });

    this.themeUpdateForm = this.formBuilder.group({
      id          : ['', Validators.required],
      themeTitle  : ['', Validators.required],
      description : ['', Validators.required],
      creationDate: ['', Validators.required],
      subThemes   : [[]]
    });
  }

  searchBy() {
    this.themesAll = this.themesAllReserved;
    const keyword = this.searchForm.value.keyWord.toLowerCase().trim();
    if (keyword === "") {
      return;
    }
    this.themesAll = this.themesAll.filter((theme: Theme) =>
      Object.values(theme).some((value: any) =>
        typeof value === "string" && value.toLowerCase().includes(keyword)
      )
    );
  }
  
  
  changeSearchVisibility() {
    this.searchVisibility = !this.searchVisibility;
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  saveTheme() {
    this.isFormThemeLoading = true;
    let themeSave = this.createTheme();
    this.themeService.save(themeSave).subscribe(
      (value) => {
        let themeResponse = value;
        this.toastService.success("Enregistrement effectué avec succès !");
        this.isFormThemeLoading = false;
        this.themeForm.reset();
        setTimeout(() => {
          this.themeForm.reset();
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
        if (error.error == null) {
          this.toastService.error("Une erreur est survenue lors de l'enregistrement d'un thème");
          this.isFormThemeLoading = false;
        } else {
          this.toastService.error(error.error.message);
          this.isFormThemeLoading = false;
        }
      }
    )
  }

  getAllThemes() {
    this.isLoading = true;
    this.themeService.getAll().subscribe(
      (data) => {
        this.themesAll = data;
        this.themesAllReserved = data;
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les thèmes');
      }
    );
  }

  createTheme(): Theme {
    this.themeValue               = this.themeForm.value;
    this.themeValue.themeTitle    = this.themeForm.value.themeTitle;
    this.themeValue.description   = this.themeForm.value.description;
    this.themeValue.creationDate  = new Date();
    return this.themeValue;
  }

  themeDelete(id: number) {
    this.alertService.customFour('Etes-vous sûr de vouloir effectuer cette suppression?', 'Cette action est irréversible!', 'Confirmer', 'Annuler').subscribe(
      resp => {
        if (resp.success) {
          this.themeService.delete(id).subscribe(() => {
            this.getAllThemes();
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

  themeEdit(id: number) {
    this.themeService.getById(id).subscribe((data) => {
      this.themeUpdateForm.patchValue({
        id: data.id,
        themeTitle: data.themeTitle,
        description: data.description,
        creationDate: data.creationDate,
        subThemes: data.subThemes
      });
    },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de modifier');
      });
  }

  updateTheme() {
    this.isFormThemeLoading = true;
    let themeUpdate = this.themeUpdateForm.value;
    const themeId = themeUpdate.id;
    let creationDate = themeUpdate.creationDate;
    themeUpdate.updateDate = new Date();
    this.themeService.edit(themeId, themeUpdate).pipe(
      tap(
        (value) => {
          let themeResponse = value;
          this.toastService.success("Modification effectuée avec succès !");
          this.isFormThemeLoading = false;
          this.themeUpdateForm.reset();
          setTimeout(() => {
            this.themeUpdateForm.reset();
            window.location.reload();
          }, 10);
        },
        (error) => {
          if (error.error == null) {
            this.toastService.error("Une erreur est survenue lors de l'enregistrement d'un thème");
            this.isFormThemeLoading = false;
          } else {
            this.toastService.error(error.error.message);
            this.isFormThemeLoading = false;
          }
        }
      )
    ).subscribe();
  }

  themeDetail(id: number) {
    this.router.navigate([`dashboard/catalogues/themes/infos/${id}`]);
  }

  getSubString(text: string) {
    return this.utilsService.getSubString(text, 30);
  }

}