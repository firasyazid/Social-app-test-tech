import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { PostCreatorComponent } from '../../components/post-creator/post-creator.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PostService } from '../../services/post.service';


import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

 

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    imports: [WidgetsDropdownComponent, TextColorDirective,
       CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective,
        IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective,
         ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent,
          WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent, PostCreatorComponent , PostListComponent]
})

export class DashboardComponent implements OnInit {

  posts: any[] = [];
      constructor(private postService: PostService) {}
    

  ngOnInit(): void {
    this.loadPosts();

   }
  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response.posts;  
      },
      (error) => {
        console.error('Erreur lors du chargement des posts :', error);
      }
    );
  }

  onPostCreated(newPost: any): void {
    this.posts.unshift(newPost);  
  }
  
}
