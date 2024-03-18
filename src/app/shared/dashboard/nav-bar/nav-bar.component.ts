import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector    : 'app-nav-bar',                // Sélecteur du composant
  templateUrl : './nav-bar.component.html',   // Chemin vers le fichier HTML du template
  styleUrls   : ['./nav-bar.component.scss']  // Chemin vers le fichier de styles CSS
})
export class NavBarComponent implements OnInit {

  // Liens vers différentes sections du tableau de bord
  dashboardLink   : string = "/dashboard";                        // Lien vers le tableau de bord
  themesLink      : string = "/dashboard/catalogues/themes";      // Lien vers la section des thèmes
  formationsLink  : string = "/dashboard/trainings";              // Lien vers la section des formations
  formateursLink  : string = "/dashboard/trainers";               // Lien vers la section des formateurs
  clientsLink     : string = "/dashboard/clients";                // Lien vers la section des clients
  sessionsLink    : string = "/dashboard/sessions";               // Lien vers la section des sessions
  catalogueLink   : string = "/dashboard/catalogues";             // Lien vers la section du catalogue

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Méthode appelée lors de l'initialisation du composant
  }

  // Méthode de déconnexion de l'utilisateur
  logout() {
    // Affichage d'une boîte de dialogue de confirmation avec SweetAlert2
    Swal.fire({
      title: 'Voulez-vous vraiment vous déconnecter?',  // Titre de la boîte de dialogue
      text: 'Vous allez perdre votre session!',         // Message de la boîte de dialogue
      icon: 'warning',                                  // Icône de la boîte de dialogue
      showCancelButton: true,                           // Afficher le bouton d'annulation
      confirmButtonColor: '#0d6efd',                    // Couleur du bouton de confirmation
      cancelButtonColor: '#d33',                        // Couleur du bouton d'annulation
      confirmButtonText: 'Oui, Poursuivre',             // Texte du bouton de confirmation
      allowOutsideClick: false,                         // Empêcher la fermeture de la boîte de dialogue en cliquant à l'extérieur
    }).then((result) => {                               // Gestion de la réponse de l'utilisateur
      if (result.isConfirmed) {                         // Si l'utilisateur a confirmé
        this.authService.logout();                      // Appel de la méthode de déconnexion du service AuthService
        this.router.navigateByUrl('/public/login');     // Redirection vers la page de connexion
      }
    });
  }
}
