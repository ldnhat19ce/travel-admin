import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { ValidationUtil } from '../../../../../utils/validation.util';

import { FilePondModule } from 'ngx-filepond';

import { FilePond, FilePondFile, FilePondOptions } from 'filepond';
import { environment } from '../../../../../../../environments/environment';
import { CodeService } from '../../../../../services/code.service';
import { Code } from '../../../../../model/code.model';

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
        FilePondModule,
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
    private _codeService = inject(CodeService);

    categories: Category[] = [] as Category[];

    categoryHierarchy: Category[] = [] as Category[];

    code: Code[] = [] as Code[];

    resultCategory: Category = {} as Category;

    submitted: boolean = false;
    isChangeImage: boolean = false;

    typeSelected: string = '';
    parentIdSelected: number = 0;

    @ViewChild('myPond')
    myPond: FilePond = {} as FilePond;

    pondFiles: FilePondOptions['files'] = [];

    pondOptions: FilePondOptions = {
        allowMultiple: false,
        allowFileEncode: true,
        labelIdle:
            '<div class="d-flex flex-column justify-content-center align-items-center">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cloud-upload">' +
            '<path stroke="none" d="M0 0h24v24H0z" fill="none" />' +
            '<path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />' +
            '<path d="M9 15l3 -3l3 3" />' +
            '<path d="M12 12l0 9" />' +
            '</svg>' +
            '<span>Drag and drop a file here or click</span></div>',
    };

    categoryForm: FormGroup = this._formBuilder.group({
        id: [0],
        name: ['', Validators.required],
        nameEng: ['', Validators.required],
        level: [0, Validators.required],
        sort: [0, Validators.required],
        type: ['BOOKING'],
        url: ['', Validators.required],
        parentId: [0],
        image: [''],
        imageName: [''],
        description: ['', Validators.required],
        descriptionEng: ['', Validators.required],
        homePageYN: ['N']
    });

    ngOnInit(): void {
        this.getListCode();
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
            let value = this.categoryForm.value;
            this._categoryService
                .updateCategory(this.f['id'].value, {
                    ...value,
                    changeImage: this.isChangeImage,
                })
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
            image: '',
            imageName: '',
            description: item.description,
            descriptionEng: item.descriptionEng,
            homePageYN: item.homePageYN
        });
        this.typeSelected = item.type;
        if (item.parentId !== 0) {
            this.parentIdSelected = item.parentId;
        }

        this.isChangeImage = false;
        if (ValidationUtil.isNotNullAndNotUndefined(item.imageUrl)) {
            this.myPond.addFile(environment.imgUrl + item.imageUrl, {
                index: 0,
            });
        } else {
            this.myPond.removeFile();
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

    pondHandleAddFile(event: any) {
        if (this.f['id'].value > 0) {
            this.isChangeImage = true;
        }
        this.categoryForm.patchValue({
            image: event.file.getFileEncodeDataURL(),
            imageName: event.file.filename,
        });
    }

    onClickHomePageYN(event: any) {
        if(event.target.checked) {
            this.categoryForm.patchValue({
                homePageYN: 'Y'
            });
        } else {
            this.categoryForm.patchValue({
                homePageYN: 'N'
            });
        }
    }

    onUpload(event: any) {
        const file: File = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            if (this.f['id'].value > 0) {
                this.isChangeImage = true;
            }
            this.categoryForm.patchValue({
                image: reader.result,
                imageName: file.name,
            });
        };
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
            type: this.code[0].codeCd,
            parentId: 0,
            image: '',
            imageName: '',
            description: '',
            descriptionEng: '',
            homePageYN: ''
        });

        this.typeSelected = this.code[0].codeCd;
        this.parentIdSelected = 0;

        this.isChangeImage = false;

        let image = <HTMLInputElement>document.getElementById('image');
        if (ValidationUtil.isNotNullAndNotUndefined(image)) {
            image.value = '';
        }

        this.myPond.removeFile();
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

    private getListCode() {
        this._codeService.getListCode("C").subscribe(res => {
            if(res !== null && res !== undefined) {
                this.code = res.body || [];
                this.typeSelected = this.code[0].codeCd;
            }
        });
    }
}
