import { Component, inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CategoryService } from '../../../../../services/category.service';
import { Category } from '../../../../../model/category.model';
import { TransformCategoryPipe } from '../../../../../pipe/transform-category.pipe';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-save-category',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        TransformCategoryPipe,
        ToastModule,
        CommonModule,
        ConfirmDialogModule,
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './save-category.component.html',
    styleUrl: './save-category.component.scss',
})
export class SaveCategoryComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _categoryService = inject(CategoryService);
    private _messageService = inject(MessageService);
    private _confirmationService = inject(ConfirmationService);

    categories: Category[] = [] as Category[];

    categoryHierarchy: Category[] = [] as Category[];

    resultCategory: Category = {} as Category;

    submitted: boolean = false;

    typeSelected: string = 'BOOKING';
    parentIdSelected: number = 0;

    categoryForm: FormGroup = this._formBuilder.group({
        id: [0],
        name: ['', Validators.required],
        nameEng: ['', Validators.required],
        level: [0, Validators.required],
        sort: [0, Validators.required],
        type: ['BOOKING'],
        url: ['', Validators.required],
        parentId: [0],
    });

    ngOnInit(): void {
        this.getCategory();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.categoryForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.categoryForm.invalid) {
            return;
        }

        if (this.f['id'].value > 0) {
            this._categoryService
                .updateCategory(this.f['id'].value, this.categoryForm.value)
                .subscribe((res) => {
                    if (res !== null && res !== undefined) {
                        this.resultCategory = res.body || ({} as Category);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail:
                                'Chỉnh sửa thành công [ID]: ' +
                                this.resultCategory.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();
                        this.getCategory();
                    }
                });
        } else {
            this._categoryService
                .saveCategory(this.categoryForm.value)
                .subscribe((res) => {
                    if (res !== null && res !== undefined) {
                        this.resultCategory = res.body || ({} as Category);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail:
                                'Lưu thành công [ID]: ' +
                                this.resultCategory.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();
                        this.getCategory();
                    }
                });
        }
    }

    onEdit(item: Category) {
        this.categoryForm.patchValue({
            id: item.id,
            name: item.name,
            nameEng: item.nameEng,
            level: item.level,
            sort: item.sort,
            url: item.url,
            type: item.type,
            parentId: item.parentId !== 0 ? item.parentId : 0,
        });
        this.typeSelected = item.type;
        if (item.parentId !== 0) {
            this.parentIdSelected = item.id;
        }
    }

    onDelete(event: Event, item: Category) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Bạn có muốn xoá item này?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._categoryService
                    .deleteCategory(item.id)
                    .subscribe((res) => {
                        if (res !== null && res !== undefined) {
                            if (res.status === 200) {
                                this._messageService.add({
                                    severity: 'success',
                                    summary: 'Success',
                                    detail: 'xoá thành công [ID]: ' + item.id,
                                    key: 'br',
                                    life: 3000,
                                });
                                this.onReset();
                                this.getCategory();
                            } else {
                                this._messageService.add({
                                    severity: 'danger',
                                    summary: 'Error',
                                    detail: 'xoá không thành công',
                                    key: 'br',
                                    life: 3000,
                                });
                            }
                        }
                    });
            },
            reject: () => {},
        });
    }

    onChangeType(type: string) {
        this.categoryForm.patchValue({
            type: type,
        });
    }

    onChangeParentId(parentId: string) {
        if (parentId !== 'default') {
            this.categoryForm.patchValue({
                parentId: parentId,
            });
        }
    }

    onReset(): void {
        this.submitted = false;

        this.categoryForm.patchValue({
            id: 0,
            name: '',
            nameEng: '',
            level: 0,
            sort: 0,
            url: '',
            type: 'BOOKING',
            parentId: 0,
        });

        this.typeSelected = 'BOOKING';
        this.parentIdSelected = 0;
    }

    private getCategory() {
        this._categoryService
            .getAllCategory(this.getParams())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    this.categories = res.body?.result || [];
                }
            });

        this._categoryService
            .getAllCategoryHierarchy(this.getParams())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    this.categoryHierarchy = res.body?.result || [];
                }
            });
    }

    private getParams() {
        return {
            page: 1,
            limit: 100,
            level: 0,
        };
    }
}
