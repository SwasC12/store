import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DxButtonModule,DxSelectBoxModule,DxCheckBoxModule } from 'devextreme-angular';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.css'],
  imports: [FormsModule, CommonModule, DxButtonModule, DxSelectBoxModule,DxCheckBoxModule]
})
export class PracticePage {
  joke: any;
  selectedCategory: string = 'any';
  selectedLanguage: string = 'en'; // Default language
  flag: string = 'none';
  languageOptions: any[] = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'cs', name: 'Czech'},
    { code: 'pt', name: 'Portuguese'}
  ];
  jokeCatergory: any[] = [
    { code: 'any', name: 'any'},
    { code: 'spooky', name: 'spooky'},
    { code: 'programming', name: 'programming'},
    { code: 'pun', name: 'pun'},
    { code: 'dark', name: 'dark'},
    { code: 'christmas', name: 'christmas'},
    { code: 'misc', name: 'misc'}
  ];
  flagOptions: any[]=[
    { code: 'none', name:'none'},
    { code: 'racist', name: 'racist'},
    { code: 'religious', name: 'religious'},
    { code: 'sexist', name: 'sexist'}
  ]

  constructor(private http: HttpClient) {}

  getJoke() {
    let apiUrl = `https://v2.jokeapi.dev/joke/${this.selectedCategory}?lang=${this.selectedLanguage}`;
    if (this.flag !== 'none') {
      apiUrl += `&blacklistFlags=${this.flag}`;
    }
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
        if (data.type === 'twopart') {
          this.joke = { setup: data.setup, delivery: data.delivery };
        } else {
          this.joke = { setup: 'Joke:', delivery: data.joke };
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
