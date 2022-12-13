import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AzureAdDemoService } from './azure-ad-demo.service';
import { ReportComponent } from './report/report.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const isIE=window.navigator.userAgent.indexOf('MSIE')>-1
||window.navigator.userAgent.indexOf('Trident/')>-1
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'b3ad48f1-5f48-4f6b-a838-d43a96a4d7d3',
            redirectUri:'http://localhost:4401',
            authority:'https://login.microsoftonline.com/289d7af5-bf04-4574-a9f0-146b2d5b4182'
          },
          cache:
          {
            cacheLocation:'localStorage',
            storeAuthStateInCookie:isIE
          }
        }
      ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
        interactionType:InteractionType.Redirect,
        protectedResourceMap:new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.Read']],
            ['localhost',['api://8c016b91-aa53-4c86-9a46-99439bfe1af1/UAT001ADMIN']]
          ]
        )
      }
      )
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },MsalGuard,AzureAdDemoService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
