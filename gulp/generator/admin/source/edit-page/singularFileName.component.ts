import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormComponent } from 'app/shared/components/form.component';
import { BasicInfoComponent } from './shared/baisc-info/basic-info.component';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'app/shared/services/snack-bar.service';
import { <%=nameSingularUC%>ApiService } from 'app/shared/http/<%=singularFileName%>-api.service';
<%=editPageImports%>

@Component({
  selector: 'app-<%=singularFileName%>',
  templateUrl: './<%=singularFileName%>.component.html',
  styleUrls: ['./<%=singularFileName%>.component.scss'],
  animations: fuseAnimations
})
export class <%=nameSingularUC%>Component implements OnInit, AfterViewInit {

  pageType: any;
  formComponents: FormComponent[] = [];
  loadpage: boolean;
  mainData: any;
  editMode: boolean;
  <%=editPageClassProperties%>


  @ViewChild('basicInfoForm', { static: false }) basicInfoForm: BasicInfoComponent;
  <%=editPageViewChild%>


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: <%=nameSingularUC%>ApiService,
    private snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    <%=editPageOnInitBody%>
    setTimeout(() => {
      this.loadpage = true;
    });

    this.loadData();
  }

  loadData(): void  {

    if (this.route.snapshot.params.id && this.route.snapshot.params.id !== 'new') {
      this.editMode = true;
      this.api.getByQuery({ _id: this.route.snapshot.params.id }).subscribe((data) => {
        this.mainData = data.items[0] || {}; 
        <%=editPageLoadDataMeta%>
      });

    } else {
      this.editMode = false;
      this.mainData = {};
    }
  }

  ngAfterViewInit(): void  {
    this.formComponents = [
      this.basicInfoForm,
      <%=editPageNgAfterViewInit%>
    ];
  }

  formsAreValid(): any  {
    return this.formComponents.filter(component => component).every((formComponent: FormComponent) => formComponent.formIsValid());
  }

  saveProduct(): void  {
    if (this.formsAreValid()) {
      if (this.editMode) {
        this.api.update({ _id: this.route.snapshot.params.id, ...this.getFormData() })
          .subscribe(() => {
            this.snackBarService.open('Updated Successfully');
          }, () => {
            this.snackBarService.open('Update Failed');
          }, () => {
           this.router.navigate(['/admin/<%=pluralFileName%>']);
          });
      } else {
        this.api.create(this.getFormData())
          .subscribe(() => {
            this.snackBarService.open('Created Successfully');
          }, () => {
            this.snackBarService.open('Creation Failed');
          }, () => {
            this.router.navigate(['/admin/<%=pluralFileName%>']);
          });
      }
    } else {
      this.snackBarService.open('Validation Failed');
      console.log('create error');
    }
  }

  getFormData(): any {
    return _.cloneDeep(_.merge(
      this.basicInfoForm.getFormValue(),
      <%=editPageMerge%>
    ));
  }
}
