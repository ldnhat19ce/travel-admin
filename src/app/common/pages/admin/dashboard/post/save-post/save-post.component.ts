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
import {
    MessageService,
    ConfirmationService,
} from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { Category } from '../../../../../model/category.model';
import { CategoryService } from '../../../../../services/category.service';
import { PostService } from '../../../../../services/post.service';
import { Post } from '../../../../../model/post.model';

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

    topFile: any[] = [];
    bottomFile: any[] = [];

    submitted: boolean = false;

    categoryIdSelected: number = 0;

    categories: Category[] = [] as Category[];

    postForm: FormGroup = this._formBuilder.group({
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

    ngOnInit(): void {
        this.getCategory();
    }

    get f(): { [key: string]: AbstractControl } {
        return this.postForm.controls;
    }

    onSubmit() {
        this.submitted = true;


        if (this.postForm.invalid) {
            return;
        }

        this._postService.savePost(this.postForm.value).subscribe(res => {
            if (res !== null && res !== undefined) {
                let resultPost = res.body || ({} as Post);
                this._messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail:
                        'Lưu thành công [ID]: ' +
                        resultPost.id,
                    key: 'br',
                    life: 3000,
                });
                this.onReset();
            }
        });
    }

    onReset() {
        this.submitted = false;

        this.postForm.patchValue({
            name: '',
            nameEng: '',
            content: '',
            contentEng: '',
            sort: 0,
            topImage: '',
            topImageName: '',
            bottomImage: '',
            bottomImageName: '',
            categoryId: ''
        });

        this.categoryIdSelected = 0;
    }

    onChangeCategoryId(categoryId: string) {
        if (categoryId !== 'default') {
            this.postForm.patchValue({
                categoryId: categoryId,
            });
        }
    }

    onUpload(event: any, type: string) {
        const file: File = event.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            if(type === 'top') {
                this.postForm.patchValue({
                    topImage: reader.result,
                    topImageName: file.name
                });
            } else if(type === 'bottom') {
                this.postForm.patchValue({
                    bottomImage: reader.result,
                    bottomImageName: file.name
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

    private getParams() {
        return {
            page: 1,
            len: 100,
        };
    }
}
