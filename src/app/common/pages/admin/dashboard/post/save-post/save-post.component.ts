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
import { EditorModule } from 'primeng/editor';
import { Category } from '../../../../../model/category.model';
import { CategoryService } from '../../../../../services/category.service';
import { PostService } from '../../../../../services/post.service';
import { Post } from '../../../../../model/post.model';
import { PaginatorModule } from 'primeng/paginator';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { RouterLink } from '@angular/router';
import { PageEvent } from '../../../../../model/page-event.model';
import { FilePondModule } from 'ngx-filepond';
import { FilePond, FilePondOptions } from 'filepond';
import { environment } from '../../../../../../../environments/environment';
import { AuthenticationService } from '../../../../../services/auth/authentication.service';

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
        PaginatorModule,
        RouterLink,
        FilePondModule,
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
    private _authenticationService = inject(AuthenticationService);

    @ViewChild('topPond')
    topPond: FilePond = {} as FilePond;

    @ViewChild('bottomPond')
    bottomPond: FilePond = {} as FilePond;

    isChangeTopImage: boolean = false;
    isChangeBottomImage: boolean = false;
    submitted: boolean = false;
    isMainEditItem: boolean = false;

    categoryEditItem: number = 0;
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
        postId: [0],
        main: [false],
    });

    options = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 120, value: 120 },
    ];

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

    ngOnInit(): void {
        this.getCategory();
        this.getPost();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.postForm.controls;
    }

    editorOnInit(event: any, qlHTMLId: string) {
        const quillInstance = event.editor;
        quillInstance.root.addEventListener('paste', (e: any) => {
            const clipboardData =
                e.clipboardData || (<any>window).clipboardData;
            const isImage =
                clipboardData.types.length &&
                clipboardData.types.join('').includes('Files');
            if (!isImage) {
                return;
            }

            const file = clipboardData.files[0];
            this.saveToServer(file, quillInstance);
        });

        let newToolbar = quillInstance.getModule('toolbar');
        newToolbar.addHandler('image', () => {
            this.selectLocalImage(quillInstance);
            // let contentElement = document.getElementById("content");
            // if(contentElement !== null && contentElement !== undefined) {
            //     contentElement.innerHTML = "<div>test</div>";
            // }
            // let range = quillInstance.getSelection();
            // let value = prompt('provide image path:');
            // if(value) {
            //     quillInstance.insertEmbed(range.index, 'image', value, "user");
            // }
        });

        let quillEd_txtArea_1 = document.createElement('textarea');
        let attrQuillTxtArea = document.createAttribute('quill__html');
        quillEd_txtArea_1.setAttributeNode(attrQuillTxtArea);

        let quillCustomDiv = quillInstance.addContainer('ql-custom');
        quillCustomDiv.appendChild(quillEd_txtArea_1);

        let quillHtmlBtn = document.getElementById(qlHTMLId);
        if (quillHtmlBtn !== null && quillHtmlBtn !== undefined) {
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
                            quillEd_txtArea_1.value =
                                quillInstance.root.innerHTML;
                            evt.target.classList.add('ql-active');
                        }

                        quillEd_txtArea_1.setAttribute(
                            'quill__html',
                            wasActiveTxtArea_1 ? '' : '-active-'
                        );
                    }
                }
                if (qlHTMLId === 'qlHTMLId2') {
                    this.postForm.patchValue({
                        contentEng: quillInstance.root.innerHTML,
                    });
                } else if (qlHTMLId === 'qlHTMLId1') {
                    this.postForm.patchValue({
                        content: quillInstance.root.innerHTML,
                    });
                }
            });
        }
    }

    pondHandleAddFile(event: any, type: string) {
        if (type === 'top') {
            if (this.f['id'].value > 0) {
                this.isChangeTopImage = true;
            }
            this.postForm.patchValue({
                topImage: event.file.getFileEncodeDataURL(),
                topImageName: event.file.filename,
            });
        } else if (type === 'bottom') {
            if (this.f['id'].value > 0) {
                this.isChangeBottomImage = true;
            }
            this.postForm.patchValue({
                bottomImage: event.file.getFileEncodeDataURL(),
                bottomImageName: event.file.filename,
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
            main: false,
        });

        this.isChangeTopImage = false;
        this.isChangeBottomImage = false;
        this.isMainEditItem = false;

        this.categoryEditItem = 0;
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

        this.topPond.removeFile();
        this.bottomPond.removeFile();
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
            main: Number(item.mainPostId) === Number(item.id),
        });

        this.isMainEditItem = Number(item.mainPostId) === Number(item.id);
        this.categoryEditItem = item.categoryId;
        this.categoryIdSelected = item.categoryId;

        this.isChangeBottomImage = false;
        this.isChangeTopImage = false;

        if (ValidationUtil.isNotNullAndNotUndefined(item.topImage)) {
            this.topPond.addFile(environment.imgUrl + item.topImage, {
                index: 0,
            });
        } else {
            this.topPond.removeFile();
        }

        if (ValidationUtil.isNotNullAndNotUndefined(item.bottomImage)) {
            this.bottomPond.addFile(environment.imgUrl + item.bottomImage, {
                index: 0,
            });
        } else {
            this.bottomPond.removeFile();
        }
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
                main:
                    Number(this.categoryEditItem) === Number(categoryId) &&
                    this.isMainEditItem,
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

    selectLocalImage(quillInstance: any) {
        const input = <HTMLInputElement>document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();

        if (input !== null && input !== undefined) {
            input.onchange = () => {
                if (input.files !== null) {
                    const file = input.files[0];
                    this.saveToServer(file, quillInstance);
                    if (/^image\//.test(file.type)) {
                    } else {
                        console.warn('You could only upload images.');
                    }
                }
            };
        }
    }

    saveToServer(file: File, quillInstance: any) {
        const fd = new FormData();
        fd.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', environment.apiUrl + '/admin/upload', true);
        xhr.setRequestHeader(
            'Authorization',
            `Bearer ${this._authenticationService.getUserToken()}`
        );

        xhr.onload = () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                this.insertToEditor(data.url, quillInstance);
            }
        };
        xhr.send(fd);
    }

    insertToEditor(url: string, quillInstance: any) {
        const range = quillInstance.getSelection();
        quillInstance.insertEmbed(range.index, 'image', url, 'user');
    }
}
