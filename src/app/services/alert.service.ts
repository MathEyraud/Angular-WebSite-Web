import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toast: ToastrService) { }

  alertInfo(message: string){
    this.toast.info(message, "Infos");
  }

  alertError(message: string){
    this.toast.error(message, "Erreur");
  }

  alertWarning(message:string){
    this.toast.warning(message, "Attention")
  }
  alertSuccess(message:string){
    this.toast.success(message, "Success!")
  }
}
