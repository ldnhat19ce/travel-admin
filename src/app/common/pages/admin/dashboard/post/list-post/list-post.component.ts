import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../../../../services/post.service';
import { Post } from '../../../../../model/post.model';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { PageEvent } from '../../../../../model/page-event.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-list-post',
    standalone: true,
    imports: [
        CommonModule,
        PaginatorModule,
        RouterLink,
        ToastModule,
        ConfirmDialogModule
    ],
    providers:[
        MessageService,
        ConfirmationService
    ],
    templateUrl: './list-post.component.html',
    styleUrl: './list-post.component.scss',
})
export class ListPostComponent implements OnInit {
    private _postService = inject(PostService);
    private _messageService = inject(MessageService);
    private _confirmationService = inject(ConfirmationService);

    post: Post[] = [] as Post[];

    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;

    ngOnInit(): void {
        this.getPost();
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

    private getParamSearchPost() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }
}
