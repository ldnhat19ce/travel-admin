import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    FormsModule,
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TransformCategoryPipe } from '../../../../../pipe/transform-category.pipe';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { Category } from '../../../../../model/category.model';
import { CategoryService } from '../../../../../services/category.service';
import { PostService } from '../../../../../services/post.service';
import { Post } from '../../../../../model/post.model';
import { PaginatorModule } from 'primeng/paginator';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { RouterLink } from '@angular/router';
import { PageEvent } from '../../../../../model/page-event.model';

@Component({
    selector: 'app-save-post',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        TransformCategoryPipe,
        ToastModule,
        CommonModule,
        ConfirmDialogModule,
        EditorModule,
        FileUploadModule,
        PaginatorModule,
        RouterLink,
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './save-post.component.html',
    styleUrl: './save-post.component.scss',
})
export class SavePostComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _messageService = inject(MessageService);
    private _categoryService = inject(CategoryService);
    private _postService = inject(PostService);
    private _confirmationService = inject(ConfirmationService);

    isChangeTopImage: boolean = false;
    isChangeBottomImage: boolean = false;
    submitted: boolean = false;

    categoryIdSelected: number = 0;
    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;

    categories: Category[] = [] as Category[];
    post: Post[] = [] as Post[];

    postForm: FormGroup = this._formBuilder.group({
        id: [0],
        name: ['', Validators.required],
        nameEng: ['', Validators.required],
        content: ['', Validators.required],
        contentEng: ['', Validators.required],
        sort: [0, Validators.required],
        topImage: [''],
        topImageName: [''],
        bottomImage: [''],
        bottomImageName: [''],
        categoryId: ['', Validators.required],
        used: [false],
        defTitle: [''],
        defName1: [''],
        defName2: [''],
        defContent1: [''],
        defContent2: [''],
        postId: [0]
    });

    options = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 },
    ];

    ngOnInit(): void {
        this.getCategory();
        this.getPost();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.postForm.controls;
    }

    editorOnInit(event: any, qlHTMLId: string) {
        const quillInstance = event.editor;
        let quillEd_txtArea_1 = document.createElement('textarea');
        let attrQuillTxtArea = document.createAttribute('quill__html');
        quillEd_txtArea_1.setAttributeNode(attrQuillTxtArea);

        let quillCustomDiv = quillInstance.addContainer('ql-custom');
        quillCustomDiv.appendChild(quillEd_txtArea_1);

        let quillHtmlBtn = document.getElementById(qlHTMLId);
        if(quillHtmlBtn !== null && quillHtmlBtn !== undefined) {
            quillHtmlBtn.addEventListener('click', (evt: any) => {
                if (
                    ValidationUtil.isNotNullAndNotUndefined(quillEd_txtArea_1)
                ) {
                    let t = quillEd_txtArea_1.getAttribute('quill__html');
                    if (t !== null && t !== undefined) {
                        let wasActiveTxtArea_1 = t.indexOf('-active-') > -1;

                        if (wasActiveTxtArea_1) {
                            quillInstance.pasteHTML(quillEd_txtArea_1.value);
                            evt.target.classList.remove('ql-active');
                        } else {
                            quillEd_txtArea_1.value = quillInstance.root.innerHTML;
                            evt.target.classList.add('ql-active');
                        }

                        quillEd_txtArea_1.setAttribute(
                            'quill__html',
                            wasActiveTxtArea_1 ? '' : '-active-'
                        );
                    }
                }
                if(qlHTMLId === "qlHTMLId2") {
                    this.postForm.patchValue({
                        contentEng: quillInstance.root.innerHTML
                    });
                } else if(qlHTMLId === "qlHTMLId1") {
                    this.postForm.patchValue({
                        content: quillInstance.root.innerHTML
                    });
                }
            });
        }

    }

    onSubmit() {
        this.submitted = true;
        if (this.postForm.invalid) {
            return;
        }

        if (this.f['id'].value > 0) {
            let value = this.postForm.value;

            this._postService
                .updatePost(this.f['id'].value, {
                    ...value,
                    changeTopImage: this.isChangeTopImage,
                    changeBottomImage: this.isChangeBottomImage,
                })
                .subscribe((res) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as Category);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Chỉnh sửa thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();
                        this.getPost();
                    }
                });
        } else {
            this._postService.savePost(this.postForm.value).subscribe((res) => {
                if (res !== null && res !== undefined) {
                    let resultPost = res.body || ({} as Post);
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Lưu thành công [ID]: ' + resultPost.id,
                        key: 'br',
                        life: 3000,
                    });

                    this.first = 0;
                    this.onReset();
                    this.getPost();
                }
            });
        }
    }

    onReset() {
        this.submitted = false;

        this.postForm.patchValue({
            id: 0,
            name: '',
            nameEng: '',
            content: '',
            contentEng: '',
            sort: 0,
            topImage: '',
            topImageName: '',
            bottomImage: '',
            bottomImageName: '',
            categoryId: '',
            used: false,
        });

        this.isChangeTopImage = false;
        this.isChangeBottomImage = false;

        this.categoryIdSelected = 0;

        let topImage = <HTMLInputElement>document.getElementById('topImage');
        if (ValidationUtil.isNotNullAndNotUndefined(topImage)) {
            topImage.value = '';
        }

        let bottomImage = <HTMLInputElement>(
            document.getElementById('bottomImage')
        );
        if (ValidationUtil.isNotNullAndNotUndefined(bottomImage)) {
            bottomImage.value = '';
        }
    }

    onEdit(item: Post) {
        this.postForm.patchValue({
            id: item.id,
            name: item.name,
            nameEng: item.nameEng,
            content: item.content,
            contentEng: item.contentEng,
            sort: item.sort,
            topImage: '',
            topImageName: '',
            bottomImage: '',
            bottomImageName: '',
            categoryId: item.categoryId,
            used: item.used,
        });

        this.categoryIdSelected = item.categoryId;
    }

    onDelete(event: Event, item: Post) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Bạn có muốn xoá item này?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._postService.deletePost(item.id).subscribe((res) => {
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
                            this.getPost();
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

    onChangeCategoryId(categoryId: string) {
        if (categoryId !== 'default') {
            this.postForm.patchValue({
                categoryId: categoryId,
            });
        }
    }

    onPageChange(event: PageEvent) {
        if (
            ValidationUtil.isNotNullAndNotUndefined(event.first) &&
            ValidationUtil.isNotNullAndNotUndefined(event.rows)
        ) {
            this.first = event.first || 0;
            this.rows = event.rows || 1;
            this.getPost();
        }
    }

    onUpload(event: any, type: string) {
        const file: File = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            if (type === 'top') {
                if (this.f['id'].value > 0) {
                    this.isChangeTopImage = true;
                }
                this.postForm.patchValue({
                    topImage: reader.result,
                    topImageName: file.name,
                });
            } else if (type === 'bottom') {
                if (this.f['id'].value > 0) {
                    this.isChangeBottomImage = true;
                }
                this.postForm.patchValue({
                    bottomImage: reader.result,
                    bottomImageName: file.name,
                });
            }
        };
    }

    private getCategory() {
        this._categoryService
            .getAllCategory(this.getParams())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    this.categories = res.body?.result || [];
                }
            });
    }

    private getPost() {
        this._postService
            .getAllPost(this.getParamSearchPost())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    this.post = res.body?.result || [];
                    this.totalRecords = res.body?.total || 0;
                }
            });
    }

    private getParams() {
        return {
            page: 1,
            limit: 100,
        };
    }

    private getParamSearchPost() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }
}
