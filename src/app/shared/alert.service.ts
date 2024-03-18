import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  handleCreateSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Enregistré avec success',
      showConfirmButton: false,
      timer: 2000,
    });
  }

  handleResetPwdSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Votre nouveau mot de passe vous sera communiqué dans un instant',
    });
  }

  handleUpdateSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Modifié avec success',
    });
  }

  handleUpdateSuccessByClient() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: "Vous venez d'aprouver ce service",
    });
  }

  handleError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    });
  }

  handleDelete() {
    Swal.fire('Supprimer!', 'La donnée a été suprimeé.', 'success');
  }
}
