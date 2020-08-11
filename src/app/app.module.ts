import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { BlogComponent } from './blog/blog.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    BlogComponent,
    PortfolioComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LandingpageComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'portfolio', component: PortfolioComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }