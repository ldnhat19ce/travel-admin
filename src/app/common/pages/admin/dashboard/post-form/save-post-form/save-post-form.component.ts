import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { PostFormService } from '../../../../../services/post-form.service';
import { Dropdown } from '../../../../../model/dropdown.model';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PostForm } from '../../../../../model/post-form.model';
import { ConvertDropdownPipe } from '../../../../../pipe/convert-dropdown.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../../../model/page-event.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';

@Component({
    selector: 'app-save-post-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ToastModule,
        ConvertDropdownPipe,
        PaginatorModule,
        ConfirmDialogModule,
        ProgressSpinnerModule,
        BlockUIModule
    ],
    providers: [
        MessageService,
        ConfirmationService
    ],
    templateUrl: './save-post-form.component.html',
    styleUrl: './save-post-form.component.scss',
})
export class SavePostFormComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _activatedRoute = inject(ActivatedRoute);
    private _postFormService = inject(PostFormService);
    private _messageService = inject(MessageService);
    private _confirmationService = inject(ConfirmationService);

    submitted: boolean = false;
    blocked: boolean = false;

    postFormDefId: number = 0;
    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;

    fieldTypeSelected: string = "INPUT";

    listFieldType: Dropdown[] = [] as Dropdown[];

    postFormList: PostForm[] = [] as PostForm[];
    pagePostForm: PostForm[] = [] as PostForm[];

    postForm: FormGroup = this._formBuilder.group({
        id: [0],
        fieldId: ['', Validators.required],
        fieldName: ['', Validators.required],
        fieldPlaceholder: ['', Validators.required],
        fieldType: ['INPUT', Validators.required],
        sort: [0, Validators.required],
        used: [false],
        oneRow: [false],
        fieldHelper1: [''],
        fieldHelper2: [''],
        fieldHelper3: [''],
        fieldHelper4: [''],
        fieldHelper5: ['']
    });

    fieldTypeOptions = [
        { label: "Input", value: "INPUT" },
        { label: "Dropdown", value: "DROPDOWN" },
        { label: "Text Area", value: "TEXT_AREA" }
    ];


    ngOnInit(): void {
        this._activatedRoute.params.subscribe(route => {
            if(ValidationUtil.isNotNullAndNotUndefined(route["id"])) {
                this.postFormDefId = route["id"];
                this.getPostFormList();
                this.getPagePostForm();
            }
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.postForm.controls;
    }

    onChangeFieldType(fieldType: string) {
        this.fieldTypeSelected = fieldType;
    }

    onSubmit() {
        this.submitted = true;
        this.blocked = true;

        if (this.postForm.invalid) {
            return;
        }

        if (this.f['id'].value > 0) {
            this.postForm.patchValue({
                fieldHelper1: JSON.stringify(this.listFieldType),
                fieldType: this.fieldTypeSelected
            });

            this._postFormService.updatePostForm(this.f['id'].value, this.postForm.value).subscribe(res => {
                if (res !== null && res !== undefined) {
                    let result = res.body || ({} as PostForm);
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Chỉnh sửa thành công [ID]: ' + result.id,
                        key: 'br',
                        life: 3000,
                    });

                    this.blocked = false;
                    this.onReset();
                    this.getPagePostForm();
                    this.getPostFormList();
                }
            });
        } else {
            this.postForm.patchValue({
                fieldHelper1: JSON.stringify(this.listFieldType),
                used: true,
                fieldType: this.fieldTypeSelected
            });

            this._postFormService.savePostForm(this.postForm.value, this.postFormDefId).subscribe(res => {
                if (ValidationUtil.isNotNullAndNotUndefined(res)) {
                    this.blocked = false;
                    if (res.status === 200) {
                        let result = res.body || ({} as PostForm);

                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Lưu thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();
                        this.getPostFormList();
                        this.getPagePostForm();
                    } else {
                        this._messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'lưu không thành công',
                            key: 'br',
                            life: 3000,
                        });
                    }
                }
            });
        }
    }

    onReset() {
        this.submitted = false;

        this.postForm.patchValue({
            id: 0,
            fieldId: '',
            fieldName: '',
            fieldPlaceholder: '',
            fieldType: 'INPUT',
            sort: 0,
            used: false,
            oneRow: false,
            fieldHelper1: '',
            fieldHelper2: '',
            fieldHelper3: '',
            fieldHelper4: '',
            fieldHelper5: ''
        });

        this.fieldTypeSelected = 'INPUT';
        this.listFieldType = [];
    }

    onDeleteDropdownField(value: string) {
        this.listFieldType = this.listFieldType.filter(v =>  v.value !== value);
    }

    onSaveDropdownField() {
        let dropdownLabel = <HTMLInputElement> document.getElementById("dropdown-label");
        let dropdownValue = <HTMLInputElement> document.getElementById("dropdown-value");

        if(ValidationUtil.isNotNullAndNotUndefined(dropdownLabel) && ValidationUtil.isNotNullAndNotUndefined(dropdownValue)) {
            if(this.listFieldType.filter(v => v.value === dropdownValue.value).length > 0) {
                this._messageService.add({
                    severity: 'danger',
                    summary: 'Warning',
                    detail: 'Giá trị đã tồn tại',
                    key: 'br',
                    life: 3000,
                });
                return;
            }

            if(dropdownLabel.value.trim().length <= 0) {
                this._messageService.add({
                    severity: 'danger',
                    summary: 'Warning',
                    detail: 'Vui lòng nhập nhãn',
                    key: 'br',
                    life: 3000,
                });
                return;
            }

            if(dropdownValue.value.trim().length <= 0) {
                this._messageService.add({
                    severity: 'danger',
                    summary: 'Warning',
                    detail: 'Vui lòng nhập Giá trị',
                    key: 'br',
                    life: 3000,
                });
                return;
            }

            this.listFieldType.push({ label: dropdownLabel.value, value: dropdownValue.value });
            dropdownLabel.value = '';
            dropdownValue.value = '';
        }
    }

    onEdit(item: PostForm) {
        this.postForm.patchValue({
            id: item.id,
            fieldId: item.fieldId,
            fieldName: item.fieldName,
            fieldPlaceholder: item.fieldPlaceholder,
            fieldType: item.fieldType,
            sort: item.sort,
            used: item.used,
            oneRow: item.oneRow,
            fieldHelper1: item.fieldHelper1,
            fieldHelper2: item.fieldHelper2,
            fieldHelper3: item.fieldHelper3,
            fieldHelper4: item.fieldHelper4,
            fieldHelper5: item.fieldHelper5
        });

        if(item.fieldType === 'DROPDOWN') {
            this.listFieldType = JSON.parse(item.fieldHelper1) || [];
        }

        this.fieldTypeSelected = item.fieldType;
    }

    onDelete(event: Event, item: PostForm) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Bạn có muốn xoá item này?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._postFormService.deletePostForm(item.id).subscribe((res) => {
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
                            this.getPagePostForm();
                            this.getPostFormList();
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
            this.getPagePostForm();
        }
    }

    private getPostFormList() {
        this._postFormService.getAllByPostId(this.postFormDefId).subscribe(res => {
            if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.postFormList = res.body || [];
            }
        });
    }

    private getPagePostForm() {
        this._postFormService.getPagePostForm(this.getParamSearchPostForm(), this.postFormDefId).subscribe(res => {
            if(ValidationUtil.isNotNullAndNotUndefined(res)) {
                this.pagePostForm = res.body?.result || [];
                this.totalRecords = res.body?.total || 0;
            }
        });
    }

    private getParamSearchPostForm() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }
}
