import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CodeService } from '../../../../../services/code.service';
import { CodeKind } from '../../../../../model/code-kind.model';
import { Code } from '../../../../../model/code.model';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Error } from '../../../../../model/error.model';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-list-code',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        ConfirmDialogModule,
        PanelModule,
        TableModule,
        InputTextModule,
        InputGroupModule,
        CheckboxModule,
        InputNumberModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './list-code.component.html',
    styleUrl: './list-code.component.scss',
})
export class ListCodeComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _codeService = inject(CodeService);
    private _messageService = inject(MessageService);
    private _confirmationService = inject(ConfirmationService);

    codeKind: CodeKind[] = [] as CodeKind[];

    code: Code[] = [] as Code[];

    kindCodeSelected: CodeKind = {} as CodeKind;

    submitted: boolean = false;

    codeForm: FormGroup = this._formBuilder.group({
        id: [0],
        codeCd: ['', Validators.required],
        codeD1: [''],
        codeD2: [''],
        codeD3: [''],
        codeN1: [''],
        codeN2: [''],
        codeN3: [''],
        codeS1: [''],
        codeS2: [''],
        codeS3: [''],
        kindCode: ['', Validators.required],
        remark: [''],
        sort: [0],
        used: [true],
        codeName: ['', Validators.required],
        codeNameEng: [''],
    });

    get f(): { [key: string]: AbstractControl } {
        return this.codeForm.controls;
    }

    ngOnInit(): void {
        this.getListCodeKind();
    }

    onClickRow(item: CodeKind) {
        this.kindCodeSelected = item;
        this.codeForm.patchValue({
            kindCode: this.kindCodeSelected.kindCode
        });

        this.getListCode();
    }

    onDeleteCode(event: Event, item: Code) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Bạn có muốn xoá item này?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this._codeService.deleteCode(item.id).subscribe((res) => {
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
                            this.getListCode();
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

    onSubmit() {
        this.submitted = true;
        if (this.codeForm.invalid) {
            return;
        }

        if (this.f['id'].value > 0) {
            this._codeService.updateCode(this.codeForm.value).subscribe({
                next: (res: HttpResponse<Code>) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as Code);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Chỉnh sửa thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();
                        this.getListCode();
                    }
                },
                error: (err: HttpErrorResponse) => {
                    let error: Error = err.error;
                    this._messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: error.message,
                        key: 'br',
                        life: 3000,
                    });
                }
            });
        } else {
            this._codeService.saveCode(this.codeForm.value).subscribe({
                next: (res: HttpResponse<Code>) => {
                    if (res !== null && res !== undefined) {
                        let result = res.body || ({} as Code);
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Lưu thành công [ID]: ' + result.id,
                            key: 'br',
                            life: 3000,
                        });
                        this.onReset();
                        this.getListCode();
                    }
                },
                error: (err: HttpErrorResponse) => {
                    let error: Error = err.error;
                    this._messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: error.message,
                        key: 'br',
                        life: 3000,
                    });
                }
            });
        }
    }

    onReset() {
        this.onResetCode();
        this.kindCodeSelected = this.codeKind[0];
        this.codeForm.patchValue({
            kindCode: this.kindCodeSelected.kindCode
        });
    }

    onEditCode(item: Code) {
        this.codeForm.patchValue({
            id: item.id,
            codeCd: item.codeCd.substring(3, 5),
            codeD1: item.codeD1,
            codeD2: item.codeD2,
            codeD3: item.codeD3,
            codeN1: item.codeN1,
            codeN2: item.codeN2,
            codeN3: item.codeN3,
            codeS1: item.codeS1,
            codeS2: item.codeS2,
            codeS3: item.codeS3,
            kindCode: item.kindCode,
            remark: item.remark,
            sort: item.sort,
            used: item.used,
            codeName: item.codeName,
            codeNameEng: item.codeNameEng
        });
    }

    onResetCode() {
        this.codeForm.patchValue({
            id: 0,
            codeCd: "",
            codeD1: "",
            codeD2: "",
            codeD3: "",
            codeN1: "",
            codeN2: "",
            codeN3: "",
            codeS1: "",
            codeS2: "",
            codeS3: "",
            kindCode: "",
            remark: "",
            sort: 0,
            used: true,
            codeName: "",
            codeNameEng: ""
        });
    }

    private getListCodeKind() {
        this._codeService.getListCodeKind().subscribe((res) => {
            if (res !== null && res !== undefined) {
                this.codeKind = res.body || [];
                if(this.codeKind.length > 0) {
                    this.onClickRow(this.codeKind[0]);
                }
            }
        });
    }

    private getListCode() {
        this._codeService.getListCode(this.kindCodeSelected.kindCode).subscribe(res => {
            if(res !== null && res !== undefined) {
                this.code = res.body || [];
            }
        });
    }
}
