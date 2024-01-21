import { Component } from "@angular/core";
import { SigninComponent } from "./pages/signin/signin.component";
import { Routes } from "@angular/router";
import { SignupComponent } from "./pages/signup/signup.component";

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  }, {
    path: 'signup',
    component: SignupComponent
  }
]
