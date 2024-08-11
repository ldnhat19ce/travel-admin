import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../../../model/post.model';
import { CommonModule } from '@angular/common';
import { FilePondModule } from 'ngx-filepond';
import { FilePond, FilePondOptions } from 'filepond';
import { ProductImage } from '../../../../../model/product-image.model';
import { ProductImageService } from '../../../../../services/product-image.service';
import { environment } from '../../../../../../../environments/environment';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Product } from '../../../../../model/product.model';
import { ProductModalComponent } from '../../../../general/modal/product-modal/product-modal.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { productSignal } from '../../../../../store/product-sidebar.store';

@Component({
    selector: 'app-save-product-image',
    standalone: true,
    imports: [
        CommonModule,
        FilePondModule,
        ToastModule,
        ProductModalComponent,
        FormsModule,
        InputGroupModule,
        ButtonModule,
        InputTextModule,
        PanelModule
    ],
    providers: [MessageService],
    templateUrl: './save-product-image.component.html',
    styleUrl: './save-product-image.component.scss',
})
export class SaveProductImageComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _productImageService = inject(ProductImageService);
    private _messageService = inject(MessageService);

    post: Post[] = [] as Post[];
    productImage: ProductImage[] = [] as ProductImage[];

    productCode: string = "";
    query: string = "";

    isLoading: boolean = false;
    submitted: boolean = false;
    visible: boolean = false;

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

    constructor() {
        effect(() => {
            let product: Product = productSignal();
            if(product.pdtCode !== null && product.pdtCode !== undefined) {
                this.onClickRow(product);
                productSignal.set({} as Product);
            }
        }, { allowSignalWrites: true });
    }

    get fileList(): FormArray {
        return this.postImageForm.get('fileList') as FormArray;
    }

    ngOnInit(): void {
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

    onClickRow(item: Product) {
        this.productCode = item.pdtCode;
        this.getProductImage();
        this.visible = false;
        this.query = item.pdtName;
    }

    onShowProductModal() {
        this.visible = true;
    }

    onCloseProductModal(event: any) {
        this.visible = false;
    }

    onSubmit() {
        this.submitted = true;

        if(this.productCode.length <= 0) {
            this._messageService.add({
                severity: 'danger',
                summary: 'Error',
                detail: "Vui lòng chọn sản phẩm",
                key: 'br',
                life: 3000,
            });
        }

        this._productImageService.saveProductImage(this.postImageForm.value, this.productCode).subscribe(res => {
            if (res !== null && res !== undefined) {
                let resultPost = res.body || ({} as Post);
                this._messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Lưu thành công',
                    key: 'br',
                    life: 3000,
                });

                this.onReset();
            }
        });
    }

    onReset() {
        this.submitted = false;

        this.productCode = "";

        this.query = "";

        this.visible = false;

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

    private getProductImage() {
        this.resetImage();

        this._productImageService.getAllByProductCode(this.productCode).subscribe((res) => {
            if (res !== null && res !== undefined) {
                let productImageResult = res.body || [];
                this.productImage = productImageResult;
                if (this.productImage.length > 0) {
                    this.productImage.forEach((v) => {
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
