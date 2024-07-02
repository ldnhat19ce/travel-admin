import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../../../../services/post.service';
import { Post } from '../../../../../model/post.model';
import { PageEvent } from '../../../../../model/page-event.model';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { CommonModule } from '@angular/common';
import { FilePondModule } from 'ngx-filepond';
import { FilePond, FilePondOptions } from 'filepond';
import { PostImage } from '../../../../../model/post-image.model';
import { PostImageService } from '../../../../../services/post-image.service';
import { environment } from '../../../../../../../environments/environment';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-save-post-image',
    standalone: true,
    imports: [
        CommonModule,
        FilePondModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './save-post-image.component.html',
    styleUrl: './save-post-image.component.scss',
})
export class SavePostImageComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _postService = inject(PostService);
    private _postImageService = inject(PostImageService);
    private _messageService = inject(MessageService);

    post: Post[] = [] as Post[];
    postImage: PostImage[] = [] as PostImage[];

    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;
    postId: number = 0;

    isLoading: boolean = false;
    submitted: boolean = false;

    @ViewChild('larger')
    larger: FilePond = {} as FilePond;

    @ViewChild('thumb1')
    thumb1: FilePond = {} as FilePond;

    @ViewChild('thumb2')
    thumb2: FilePond = {} as FilePond;

    @ViewChild('thumb3')
    thumb3: FilePond = {} as FilePond;

    @ViewChild('thumb4')
    thumb4: FilePond = {} as FilePond;

    @ViewChild('thumb5')
    thumb5: FilePond = {} as FilePond;

    @ViewChild('thumb6')
    thumb6: FilePond = {} as FilePond;

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

    formArray = new FormArray([]);

    postImageForm: FormGroup = this._formBuilder.group({
        fileList: this._formBuilder.array([]),
    });

    get fileList(): FormArray {
        return this.postImageForm.get('fileList') as FormArray;
    }

    ngOnInit(): void {
        this.getPost();
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

    onAddFile(event: any, type: string, kindNo: string) {
        let index = this.fileList.controls.findIndex(
            (v) => v.value.kindNo === kindNo
        );

        if (index === -1) {
            this.fileList.push(
                new FormGroup({
                    file: new FormControl(event.file.getFileEncodeDataURL() || ""),
                    fileName: new FormControl(event.file.filename),
                    imageKind: new FormControl(type),
                    kindNo: new FormControl(kindNo),
                    action: new FormControl("")
                })
            );
        } else {
            this.fileList.at(index).patchValue({
                file: event.file.getFileEncodeDataURL() || "",
                fileName: event.file.filename,
                imageKind: type,
                kindNo: kindNo,
                action: ""
            });
        }
    }

    onRemoveFile(event: any, type: string, kindNo: string) {
        let index = this.fileList.controls.findIndex(
            (v) => v.value.kindNo === kindNo
        );

        if(index !== -1) {
            this.fileList.at(index).patchValue({
                file: event.file.getFileEncodeDataURL() || "",
                fileName: event.file.filename,
                imageKind: type,
                kindNo: kindNo,
                action: "DELETE"
            });
            // this.fileList.removeAt(index);
        }
    }

    onScroll(event: any) {
        const bottom =
            Math.round(event.target.scrollHeight - event.target.scrollTop) ===
            event.target.clientHeight;
        if (bottom && !this.isLoading) {
            this.first += 1;
            this.getPost();
        }
    }

    onClickRow(item: Post) {
        this.postId = item.id;
        this.getPostImage();
    }

    onSubmit() {
        this.submitted = true;

        if(this.postId === 0) {
            this._messageService.add({
                severity: 'danger',
                summary: 'Error',
                detail: "Vui lòng chọn bài viết",
                key: 'br',
                life: 3000,
            });
        }

        this._postImageService.savePostImage(this.postImageForm.value, this.postId).subscribe(res => {
            if (res !== null && res !== undefined) {
                let resultPost = res.body || ({} as Post);
                this._messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Lưu thành công',
                    key: 'br',
                    life: 3000,
                });

                this.first = 0;
                this.onReset();
            }
        });
    }

    onReset() {
        this.submitted = false;

        this.postId = 0;

        this.resetImage();
    }

    private resetImage() {
        this.larger.removeFile();
        this.thumb1.removeFile();
        this.thumb2.removeFile();
        this.thumb3.removeFile();
        this.thumb4.removeFile();
        this.thumb5.removeFile();
        this.thumb6.removeFile();
    }

    private getPost() {
        this.isLoading = true;
        this._postService
            .getAllPost(this.getParamSearchPost())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    let postResult = res.body?.result || [];
                    if (postResult.length <= 0) {
                        this.isLoading = true;
                    } else {
                        this.post.push(...postResult);
                        this.totalRecords = res.body?.total || 0;
                        this.isLoading = false;
                    }
                }
            });
    }

    private getParamSearchPost() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }

    private getPostImage() {
        this.resetImage();

        this._postImageService.getAllByPostId(this.postId).subscribe((res) => {
            if (res !== null && res !== undefined) {
                let postImageResult = res.body || [];
                this.postImage = postImageResult;
                if (this.postImage.length > 0) {
                    this.postImage.forEach((v) => {
                        if (v.kindNo === 'L-1') {
                            this.larger.addFile(
                                environment.imgUrl + v.filePath,
                                { index: 0 }
                            );
                        }

                        if (v.kindNo === 'T-1') {
                            this.thumb1.addFile(
                                environment.imgUrl + v.filePath,
                                { index: 0 }
                            );
                        }

                        if (v.kindNo === 'T-2') {
                            this.thumb2.addFile(
                                environment.imgUrl + v.filePath,
                                { index: 0 }
                            );
                        }

                        if (v.kindNo === 'T-3') {
                            this.thumb3.addFile(
                                environment.imgUrl + v.filePath,
                                { index: 0 }
                            );
                        }

                        if (v.kindNo === 'T-4') {
                            this.thumb4.addFile(
                                environment.imgUrl + v.filePath,
                                { index: 0 }
                            );
                        }

                        if (v.kindNo === 'T-5') {
                            this.thumb5.addFile(
                                environment.imgUrl + v.filePath,
                                { index: 0 }
                            );
                        }

                        if (v.kindNo === 'T-6') {
                            this.thumb6.addFile(
                                environment.imgUrl + v.filePath,
                                { index: 0 }
                            );
                        }
                    });
                }
            }
        });
    }
}
