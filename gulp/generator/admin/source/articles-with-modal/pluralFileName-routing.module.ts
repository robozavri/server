import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { <%=namePluralFUC%>Component } from './<%=pluralFileName%>.component';

const routes: Routes = [{
  path: '',
  component: <%=namePluralFUC%>Component,
  children: []
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%=namePluralFUC%>RoutingModule { }
