import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { Editor, EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { Category } from '../../../../../model/category.model';
import { CategoryService } from '../../../../../services/category.service';
import { PostService } from '../../../../../services/post.service';
import { Post } from '../../../../../model/post.model';
import { PaginatorModule } from 'primeng/paginator';
import { ValidationUtil } from '../../../../../utils/validation.util';

interface PageEvent {
    first?: number;
    rows?: number;
    page?: number;
    pageCount?: number;
}

interface EditorTextChangeEvent {
    htmlValue: string;
    textValue: string;
    delta: string;
    source: string;
}

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
    });

    options = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 },
    ];

    @ViewChild('editor') public editor!: Editor;

    ngOnInit(): void {
        this.getCategory();
        this.getPost();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.postForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.postForm.invalid) {
            return;
        }

        if (this.f['id'].value > 0) {
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
        });

        this.categoryIdSelected = 0;
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
                this._postService
                    .deletePost(item.id)
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
                this.postForm.patchValue({
                    topImage: reader.result,
                    topImageName: file.name,
                });
            } else if (type === 'bottom') {
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
