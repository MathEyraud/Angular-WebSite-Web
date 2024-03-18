import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { SubTheme } from 'src/app/models/SubTheme';
import { Theme } from 'src/app/models/Theme';
import { AlertService } from 'src/app/services/alert.service';
import { SubThemeService } from 'src/app/services/sub-theme.service';
import { ThemeService } from 'src/app/services/theme.service';
import Swal from 'sweetalert2';
import {UtilsService} from "../../../services/utils.service";

@Component({
  selector: 'app-themes-infos',
  templateUrl: './themes-infos.component.html',
  styleUrls: ['./themes-infos.component.scss']
})
export class ThemesInfosComponent implements OnInit {

  id!: number;
    //for search
    subThemesAllReserved: SubTheme[] = [];
    subThemesSearch: SubTheme[] = [];
    //for filter
    filterForm!: FormGroup;
    searchForm!: FormGroup;
    //for pagination
    page: number = 1;
    position: number = 1;

  themeDetail: Theme = {
    id: 0,
    themeTitle: '',
    description: '',
    creationDate: new Date(),
    updateDate: new Date(),
    subThemes: [],
  };

  subThemeForm!: FormGroup;
  subThemeValue!: SubTheme;
  sousThemesAll: SubTheme[] = [];
  subThemeUpdateForm!: FormGroup;
  isLoading!: boolean;
  isFormSubThemeLoading!: boolean;
  searchVisibility!: boolean;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private subThemeService: SubThemeService,
    private alert: AlertService,
    private toastService: AlertService,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
  ){
    this.subThemeUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      subthemeTitle: ['', Validators.required],
      description: ['', Validators.required],
      creationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.handlerGetThemeById();
      this.getAllSubThemes();
      this.innitForm();
      this.searchVisibility = false;
  }

  innitForm() {
    this.subThemeForm = new FormGroup({
      subthemeTitle: new FormControl(''),
      description: new FormControl(''),
      themes: new FormControl([]),
    });

    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    })
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;

  }
  searchByName() {
    this.sousThemesAll = this.subThemesAllReserved;
    let table: SubTheme[] = [];
    for (let i = 0; i < this.sousThemesAll.length; i++) {
      if (this.sousThemesAll[i].subthemeTitle.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
        table.push(this.sousThemesAll[i]);
      }
    }
    if (this.searchForm.value.keyWord.trim() == "") {
      this.sousThemesAll = this.subThemesAllReserved;
    } else {
      this.sousThemesAll = table;
    }
  }

  changeSearchVisibility() {
    this.searchVisibility = !this.searchVisibility;
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  handlerGetThemeById(){
    this.themeService.getById(this.id).subscribe(
      (data)=>{
        this.themeDetail = data;
        this.subThemesAllReserved = data.subThemes;
        //console.log("Object Theme........" +this.themeDetail.subThemes);
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : "Une erreur s'est produite");
      }
    );
  }

  saveSubTheme(){
    this.isFormSubThemeLoading = true;
    let subThemeSave = this.createSubTheme();
    console.log(subThemeSave);
    this.subThemeService.save(subThemeSave).pipe(
      tap(
        (value) => {
          this.isFormSubThemeLoading = false;
          let themeResponse = value;
          this.toastService.alertSuccess("Enregistrement effectué avec success !");
          this.subThemeForm.reset();

          setTimeout(() => {
            this.subThemeForm.reset();
            window.location.reload();
          }, 1000);
        },
        (error) =>{
          console.log(error);
          if(error.error == null){
            this.isFormSubThemeLoading = false;
            this.toastService.alertError("Une erreur est survenue lors de l'enregistrement d'un thème");
          }else{
            this.isFormSubThemeLoading = false;
            this.toastService.alertError(error.error.message);
          }
        }
      )
    ).subscribe();

  }

  getAllSubThemes(){
    this.isLoading = true;
    this.subThemeService.getAll().subscribe(
      (data)=>{
        this.isLoading = false;
        this.sousThemesAll = data;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les sous-thèmes');
      }
    );
  }

  createSubTheme(): SubTheme{
    this.subThemeValue = this.subThemeForm.value;
    this.subThemeValue.subthemeTitle = this.subThemeForm.value.subthemeTitle;
    this.subThemeValue.description = this.subThemeForm.value.description;
    this.subThemeValue.creationDate = new Date();
    this.subThemeValue.themes = [this.themeDetail]
    return this.subThemeValue;
  }

  subThemeDelete(id: number) {
    Swal.fire({
      title: 'Etes-vous sûr de vouloir effectuer cette suppression?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subThemeService.delete(id).subscribe(() => {
          //this.getAllSubThemes();
          setTimeout(() => {
            this.subThemeForm.reset();
            window.location.reload();
          }, 1000);
          Swal.fire(
            'Supprimé!',
            'Le sous-thème a été supprimé avec succès.',
            'success'
          );
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : "Une erreur s'est produite lors de la suppréssion");
        });
      }
    });
  }

  subThemeEdit(id: number) {
    this.subThemeService.getById(id).subscribe((data) => {
      this.subThemeUpdateForm.patchValue({
        id: data.id,
        subthemeTitle: data.subthemeTitle,
        description: data.description,
        creationDate: data.creationDate
      });
    },
    (err) => {
      this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de modifier le sous-thème');
    });
  }

  updateSubTheme(){
    this.isFormSubThemeLoading = true;
    let subThemeUpdate = this.subThemeUpdateForm.value;
    const subTemeId = subThemeUpdate.id;
    let creationDate = subThemeUpdate.creationDate;
    subThemeUpdate.updateDate = new Date();
    subThemeUpdate.creationDate = creationDate;
    this.subThemeService.edit(subTemeId, subThemeUpdate).pipe(
      tap(
        (value) => {
          this.isFormSubThemeLoading = false;
          let themeResponse = value;
          this.toastService.alertSuccess("Modification effectué avec success !");
          this.subThemeUpdateForm.reset();
          setTimeout(() => {
            this.subThemeUpdateForm.reset();
            window.location.reload();
          }, 1000);
        },
        (error) =>{
          console.log(error);
          if(error.error == null){
            this.isFormSubThemeLoading = false;
            this.toastService.alertError("Une erreur est survenue lors de l'enregistrement d'un thème");
          }else{
            this.isFormSubThemeLoading = false;
            this.toastService.alertError(error.error.message);
          }
        }
      )
    ).subscribe();
  }

  getSubString(text: string){
    return this.utilsService.getSubString(text, 30);
  }
}