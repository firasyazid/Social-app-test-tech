import { Component,OnInit,Input  } from '@angular/core';
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
 import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    HttpClientModule,  
    CommonModule,NgxPaginationModule,
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
templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'

})
export class PostListComponent implements OnInit {
   errorMessage = '';
  successMessage = '';
  @Input() posts: any[] = []; 
  p: number = 1;  

 
  constructor(private postService: PostService, private router: Router) {}
  ngOnInit(): void {
    }
   loadPosts(): void {
    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response.posts;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des posts.';
        console.error('Erreur:', error);
      }
    );
  }
  onLike(postId: string): void {
    this.postService.likePost(postId).subscribe(
      (response) => {
        this.loadPosts();  
      },
      (error) => {
        console.error('Erreur lors du like:', error);
      }
    );
  }
  onAddComment(postId: string, comment: string): void {
    if (!comment.trim()) return;

    this.postService.addComment(postId, comment).subscribe(
      () => {
        this.successMessage = 'Le commentaire est ajouté.';
        this.loadPosts();  
        setTimeout(() => {
          this.successMessage = '';  
        }, 3000);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      }
    );
  }

}
