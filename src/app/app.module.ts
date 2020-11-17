import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';

import { CarouselComponent } from './shared/carousel/carousel.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TagsComponent } from './shared/tags/tags.component';
import { TagsManagementComponent } from './shared/tags/tags-management/tags-management.component';

import { AboutComponent } from './features/about/about.component';
import { AboutManagementComponent } from './features/about/about-management/about-management.component';
import { BlogComponent } from './features/blog/blog.component';
import { BlogManagementComponent } from './features/blog/blog-management/blog-management.component';
import { LandingpageComponent } from './features/landingpage/landingpage.component';
import { LoginComponent } from './features/login/login.component';
import { ManagementComponent } from './features/management/management.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { PortfolioManagementComponent } from './features/portfolio/portfolio-management/portfolio-management.component';
import { ShopComponent } from './features/shop/shop.component';
import { ShopManagementComponent } from './features/shop/shop-management/shop-management.component';

const appRoutes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'blog', component: BlogComponent },
  {
    path: 'portfolio',
    component: PortfolioComponent
    /*
    children: [
      {
        path: 'shop',
        component: ShopComponent
      }
    ]
    */
  },
  { path: 'portfolio/shop', component: ShopComponent },
  {
    path: 'management',
    component: ManagementComponent,
    children: [
      {
        path: 'general',
        component: AboutManagementComponent
      },
      {
        path: 'blog',
        component: BlogManagementComponent
      },
      {
        path: 'portfolio',
        component: PortfolioManagementComponent
      },
      {
        path: 'shop',
        component: ShopManagementComponent
      },
      {
        path: 'tags',
        component: TagsManagementComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent }
  // { path: '**', component: PageNotFoundComponent } // TODO
];

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HeaderComponent,
    NavbarComponent,
    TagsComponent,
    TagsManagementComponent,
    AboutComponent,
    AboutManagementComponent,
    BlogComponent,
    BlogManagementComponent,
    LandingpageComponent,
    LoginComponent,
    ManagementComponent,
    PortfolioComponent,
    PortfolioManagementComponent,
    ShopComponent,
    ShopManagementComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }