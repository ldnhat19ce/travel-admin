import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Post } from '../../../../../model/post.model';
import { PostService } from '../../../../../services/post.service';
import { PostFormDefinitionService } from '../../../../../services/post-form-definition.service';
import { PostFormDefinition } from '../../../../../model/post-form-definition.model';
import { PageEvent } from '../../../../../model/page-event.model';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

@Component({
    selector: 'app-save-post-form-def',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        ConfirmDialogModule,
        PaginatorModule,
        RouterLink,
        ProgressSpinnerModule,
        BlockUIModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './save-post-form-def.component.html',
    styleUrl: './save-post-form-def.component.scss',
})
export class SavePostFormDefComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _messageService = inject(MessageService);
    private _confirmationService = inject(ConfirmationService);
    private _postService = inject(PostService);
    private _postFormDefinitionService = inject(PostFormDefinitionService);

    submitted: boolean = false;
    blocked: boolean = false;
    loaded: boolean = false;

    post: Post[] = [] as Post[];

    postFormDefinitions: PostFormDefinition[] = [] as PostFormDefinition[];

    postSelected: number = 0;
    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;

    postFormDefinition: FormGroup = this._formBuilder.group({
        id: [0],
        defTitle: ['', Validators.required],
        defName1: ['', Validators.required],
        defName2: ['', Validators.required],
        defContent1: ['', Validators.required],
        defContent2: ['', Validators.required],
        postId: ['', Validators.required],
    });

    get f(): { [key: string]: AbstractControl } {
        return this.postFormDefinition.controls;
    }

    ngOnInit(): void {
        this.getPost();
        this.getPostFormDefinition();
    }

    onSubmit() {
        this.submitted = true;
        if (this.postFormDefinition.invalid) {
            return;
        }

        this.blocked = true;

        if (this.f['id'].value > 0) {
            this._postFormDefinitionService
                .updatePostFormDef(this.postFormDefinition.value)
                .subscribe((res) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as PostFormDefinition);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Cập nhật thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });

                        this.onReset();
                        this.getPostFormDefinition();
                        this.blocked = false;
                    }
                });
        } else {
            this._postFormDefinitionService
                .savePostFormDefinition(this.postFormDefinition.value)
                .subscribe((res) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as PostFormDefinition);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Lưu thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });

                        this.onReset();
                        this.getPostFormDefinition();
                        this.blocked = false;
                    }
                });
        }
    }

    onReset() {
        this.submitted = false;

        this.postFormDefinition.patchValue({
            id: 0,
            defTitle: '',
            defName1: '',
            defName2: '',
            defContent1: '',
            defContent2: '',
            postId: '',
        });

        this.postSelected = 0;
    }

    onEdit(postFormDef: PostFormDefinition) {
        this.postFormDefinition.patchValue({
            id: postFormDef.id,
            defTitle: postFormDef.defTitle,
            defName1: postFormDef.defName1,
            defName2: postFormDef.defName2,
            defContent1: postFormDef.defContent1,
            defContent2: postFormDef.defContent2,
            postId: postFormDef.postId,
        });

        this.postSelected = postFormDef.postId;
    }

    onDelete(event: Event, item: PostFormDefinition) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Bạn có muốn xoá item này?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._postFormDefinitionService
                    .deletePostFormDef(item.id)
                    .subscribe({
                        next: (res) => {
                            if (res !== null && res !== undefined) {
                                this.blocked = false;
                                this._messageService.add({
                                    severity: 'success',
                                    summary: 'Success',
                                    detail:
                                        'xoá thành công [ID]: ' + item.id,
                                    key: 'br',
                                    life: 3000,
                                });
                                this.onReset();
                                this.getPostFormDefinition();
                            }
                        },
                        error: (err: HttpErrorResponse) => {
                            let resultError: Error = err.error;
                            this.blocked = false;
                            this._messageService.add({
                                severity: 'danger',
                                summary: 'Error',
                                detail: resultError.message,
                                key: 'br',
                                life: 3000,
                            });
                        }
                    });
            },
            reject: () => {},
        });
    }

    onChangePost(postId: string) {
        if (postId !== 'default') {
            this.postFormDefinition.patchValue({
                postId: postId,
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
            this.getPostFormDefinition();
        }
    }

    private getPost() {
        this._postService.getAllPost(this.getParams()).subscribe((res) => {
            if (res !== null && res !== undefined) {
                this.post = res.body?.result || [];
            }
        });
    }

    private getPostFormDefinition() {
        this._postFormDefinitionService
            .getPagePostFormDef(this.getParamSearchPostFormDef())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    this.postFormDefinitions = res.body?.result || [];
                    this.totalRecords = res.body?.total || 0;
                    this.loaded = true;
                }
            });
    }

    private getParamSearchPostFormDef() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }

    private getParams() {
        return {
            page: 1,
            limit: 100,
        };
    }
}
