import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AuthService } from '../../../services/auth.service';
 import { ReactiveFormsModule } from '@angular/forms';
 import { HttpClientModule } from '@angular/common/http';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { Router, RouterModule } from '@angular/router'; 
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,

    imports: [ContainerComponent, RowComponent, 
       ColComponent, TextColorDirective, CardComponent,
        CardBodyComponent, FormDirective, InputGroupComponent,
         InputGroupTextDirective, IconDirective, FormControlDirective,
          ButtonDirective, ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe(
      (response) => {
        this.successMessage = 'Inscription réussie ! Redirection...';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);  
      },
      (error) => {
        this.errorMessage = 'Erreur lors de l\'inscription : ' + (error.error?.message || 'Serveur non disponible');
        this.successMessage = '';
        console.error('Erreur d\'inscription :', error);
      }
    );
  }
}
