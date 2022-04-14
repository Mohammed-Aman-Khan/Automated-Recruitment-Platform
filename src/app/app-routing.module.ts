import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LandingPageComponent } from './landing-page/landing-page.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { PageNotFoundComponent } from './shared/components'

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'login-register',
    //     pathMatch: 'full'
    // },
    // {
    //     path: 'login-register',
    //     component: LoginRegisterComponent
    // },
    {
        path: '',
        component: LandingPageComponent,
    },
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'register',
        component: RegisterPageComponent,
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }