import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'

import { AppRoutingModule } from './app-routing.module'

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { JobseekerModuleComponent } from './jobseeker-module/jobseeker-module.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component'

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json')

@NgModule({
    declarations: [ AppComponent, LandingPageComponent, JobseekerModuleComponent, LoginPageComponent, RegisterPageComponent ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [ HttpClient ]
            }
        }),
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
