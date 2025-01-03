import { Component,EventEmitter, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
 import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
  import { ReactiveFormsModule } from '@angular/forms';
 import { HttpClientModule } from '@angular/common/http';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.scss'],
   standalone: true,
    imports: [
      HttpClientModule,  
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      ContainerComponent,
      RowComponent,
      ColComponent,
      CardGroupComponent,
      CardComponent,
      CardBodyComponent,
      FormDirective,
      InputGroupComponent,
      InputGroupTextDirective,
      IconDirective,
      FormControlDirective,
      ButtonDirective,
      NgStyle,
    ],
  })
 export class PostCreatorComponent {
  content = '';  
  errorMessage = '';
  successMessage = '';
  @Output() postCreated = new EventEmitter<any>();  

  constructor(private postService: PostService, private router: Router) {}

  onCreatePost(): void {
    if (!this.content.trim()) {
      this.errorMessage = 'Veuillez entrer du contenu.';
      return;
    }

    this.postService.createPost(this.content).subscribe(
      (response) => {
        this.successMessage = 'Post créé avec succès !';
        this.errorMessage = '';
        this.content = '';  
        this.postCreated.emit(response.post);  

       },
      (error) => {
        this.errorMessage = 'Erreur lors de la création du post.';
        console.error('Erreur:', error);
      }
    );
  }
}
