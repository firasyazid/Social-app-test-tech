import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PostService {
  private apiUrl = 'http://localhost:3003/api/v1/posts';  
  constructor(private http: HttpClient) {}

  
  createPost(content: string): Observable<any> {
    const token = localStorage.getItem('authToken');  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create`, { content }, { headers });
  }

  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  likePost(postId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${postId}/like`, {}, { headers });
  }

  
  addComment(postId: string, content: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${postId}/comment`, { content }, { headers });
  }
  
}
