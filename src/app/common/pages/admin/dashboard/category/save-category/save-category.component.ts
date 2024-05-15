import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CategoryService } from '../../../../../services/category.service';
import { Category } from '../../../../../model/category.model';
import { TransformCategoryPipe } from '../../../../../pipe/transform-category.pipe';

@Component({
    selector: 'app-save-category',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        TransformCategoryPipe
    ],
    templateUrl: './save-category.component.html',
    styleUrl: './save-category.component.scss',
})
export class SaveCategoryComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _categoryService = inject(CategoryService);

    categories: Category[] = [] as Category[];

    categoryForm: FormGroup = this._formBuilder.group({
        name: ['', Validators.required],
        nameEng: [''],
        level: ['0'],
        sort: ['0'],
        type: ['BOOKING'],
        url: [''],
        parentId: ['']
    });

    ngOnInit(): void {
        this._categoryService.getAllCategory(this.getParams()).subscribe(res => {
            if(res !== null && res !== undefined) {
                this.categories = res.body?.data.result || [];

            }
        });
    }

    onSubmit() {
        this._categoryService.saveCategory(this.categoryForm.value).subscribe(res => {
            console.log(res)
        });
    }

    onChangeType(type: string) {
        this.categoryForm.patchValue({
            type: type
        });
    }

    onChangeParentId(parentId: string) {
        if(parentId !== "default") {
            this.categoryForm.patchValue({
                parentId: parentId
            });
        }
    }

    private getParams() {
        return {
            page: 1,
            len: 100,
            level: 0
        }
    }
}
