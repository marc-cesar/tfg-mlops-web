import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { Subscription } from 'rxjs';	
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `

<nav class="border-gray-200 bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 sm:px-10 py-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../../assets/bank-logo.svg" class="h-8" alt="MLOps banking system logo" />
        <span class="sm:inline self-center sm:text-2xl font-semibold whitespace-nowrap text-white">Bank Credit Recommender</span>
    </a>
    <button (click)="toggleMenu()" data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg xl:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open menu</span>
        <svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div [hidden]="!isMenuOpen" [class.animate-open]="isMenuOpen" class="w-full xl:block xl:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 xl:p-0 mt-4 border rounded-lg xl:flex-row xl:space-x-8 rtl:space-x-reverse xl:mt-0 xl:border-0  bg-gray-800 xl:bg-gray-900 border-gray-700">
        <!-- @for (item of menuItems; track $index) { -->
        <li *ngFor="let item of filteredMenuItems; let i = index">
          <a [routerLink]="[item.path]" class="block py-2 px-3 bg-transparent xl:text-base bg-blue-700 rounded xl:bg-transparent xl:p-0 text-white xl:text-white" aria-current="page">{{ item.title }}</a>
        </li>
        <li *ngIf="isLoggedIn">
          <a (click)="logout()" class="cursor-pointer block py-2 px-3 bg-transparent xl:text-base bg-blue-700 rounded xl:bg-transparent xl:p-0 text-white xl:text-white">
            {{ (this.storageService.currentUser | async)?.username }} - Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  `,
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;
  isLoggedIn : boolean = false;
  currentUser: User | null = null;

  private subscription: Subscription = new Subscription();

  notAuthenticatedItemName = ['Home', 'Login', 'Signup', 'About']
  authenticatedItemName = ['Home', 'New Credit Assessment', 'All Credit Assessments', 'About']
  adminItemName = ['Home', 'All Credit Assessments', 'Logs', 'Admin', 'About', 'Model Configuration']

  @Input() menuItems: any[] = [];
  filteredMenuItems: any[] = this.menuItems;

  constructor(public storageService : StorageService, private authService : AuthService, private router : Router){}

  ngOnInit() {
    this.subscription.add(this.storageService.currentUser.subscribe((user : User | null) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
      this.filterMenuItems();
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
   this.authService.logout();
   this.currentUser = null;
   this.isLoggedIn = false;
   this.filterMenuItems();
   window.location.reload();
  }

  filterMenuItems() {
    console.log(this.currentUser);
    this.filteredMenuItems = this.menuItems.filter(item =>
      this.currentUser != null ? (this.currentUser.isAdmin ? this.adminItemName.includes(item.title) 
                              : this.authenticatedItemName.includes(item.title)) 
          : (this.notAuthenticatedItemName.includes(item.title))
    );
  }
}
