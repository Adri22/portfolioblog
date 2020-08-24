import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { BlogComponent } from './blog/blog.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { ManagementComponent } from './management/management.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    BlogComponent,
    PortfolioComponent,
    HeaderComponent,
    ShopComponent,
    ManagementComponent,
    LoginComponent,
    NavbarComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LandingpageComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'portfolio/shop', component: ShopComponent },
      { path: 'management', component: ManagementComponent },
      { path: 'login', component: LoginComponent }
    ]),
    HttpClientModule,
    FormsModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }