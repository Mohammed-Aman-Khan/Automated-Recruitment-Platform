import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginRegisterComponent } from './login-register/login-register.component'
import { PageNotFoundComponent } from './shared/components'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login-register',
        pathMatch: 'full'
    },
    {
        path: 'login-register',
        component: LoginRegisterComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
