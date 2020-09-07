import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { <%=nameSingularUC%>Component } from './<%=singularFileName%>.component';

const routes: Routes = [
  {
    path: '',
    component: <%=nameSingularUC%>Component,
    children: [],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%=nameSingularUC%>RoutingModule { }
