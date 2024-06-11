import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../../../../model/post.model';
import { PostService } from '../../../../../services/post.service';
import { PostFormResultService } from '../../../../../services/post-form-result.service';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { PostFormResult } from '../../../../../model/post-form-result.model';
import { CommonModule } from '@angular/common';
import { FormResult } from '../../../../../model/form-result.model';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../../../model/page-event.model';

@Component({
    selector: 'app-list-post-form-result',
    standalone: true,
    imports: [
        CommonModule,
        PaginatorModule
    ],
    templateUrl: './list-post-form-result.component.html',
    styleUrl: './list-post-form-result.component.scss',
})
export class ListPostFormResultComponent implements OnInit {
    private _postFormResultService = inject(PostFormResultService);
    private _postService = inject(PostService);

    post: Post[] = [] as Post[];
    postFormResult: PostFormResult[] = [] as PostFormResult[];
    formResults: FormResult[] = [] as FormResult[];

    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;
    firstPostForm: number = 0;
    rowPostForm: number = 10;
    totalRecordPostForm: number = 0;
    postId: number = 0;
    postFormId: number = 0;

    ngOnInit(): void {
        this.getPost();
    }

    onShowPostFormResult(postId: number) {
        this.postId = postId;
        this.getPostFormResult();
    }

    onTransformResult(postFormResult: PostFormResult) {
        this.postFormId = postFormResult.id;
        this.formResults = JSON.parse(postFormResult.result);
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

    onPageChangePostForm(event: PageEvent) {
        if (
            ValidationUtil.isNotNullAndNotUndefined(event.first) &&
            ValidationUtil.isNotNullAndNotUndefined(event.rows)
        ) {
            this.firstPostForm = event.first || 0;
            this.rowPostForm = event.rows || 1;
            this.getPostFormResult();
        }
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

    private getPostFormResult() {
        this._postFormResultService
            .getPagePostFormResult(
                this.getParamSearchPostFormResult(),
                this.postId
            )
            .subscribe((res) => {
                if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                    this.postFormResult = res.body?.result || [];
                    this.totalRecordPostForm = res.body?.total || 0;
                }
            });
    }

    private getParamSearchPost() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }

    private getParamSearchPostFormResult() {
        return {
            page: this.firstPostForm + 1,
            limit: this.rowPostForm,
        };
    }
}
