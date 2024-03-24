import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule],
  template: `

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-10 py-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../../assets/bank-logo.svg" class="h-8" alt="MLOps banking system logo" />
        <span class="sm:inline self-center sm:text-2xl font-semibold whitespace-nowrap dark:text-white">MLOps Credit Prediction System</span>
    </a>
    <button (click)="toggleMenu()" data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open menu</span>
        <svg class="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div [hidden]="!isMenuOpen" [class.animate-open]="isMenuOpen" class="w-full lg:block lg:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
        @for (item of menuItems; track $index) {
          <li>
            <a [routerLink]="[item.path]" class="block py-2 px-3 text-white bg-transparent  bg-blue-700 rounded lg:bg-transparent lg:text-white lg:p-0 dark:text-white lg:dark:text-white" aria-current="page">{{ item.title }}</a>
          </li>
        }
      </ul>
    </div>
  </div>
</nav>

  `,
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;

  @Input() menuItems: any;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
