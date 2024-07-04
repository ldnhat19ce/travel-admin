import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../../../../model/post.model';
import { PageEvent } from '../../../../../model/page-event.model';
import { ValidationUtil } from '../../../../../utils/validation.util';
import { CommonModule } from '@angular/common';
import { FilePondModule } from 'ngx-filepond';
import { FilePond, FilePondOptions } from 'filepond';
import { ProductImage } from '../../../../../model/product-image.model';
import { ProductImageService } from '../../../../../services/product-image.service';
import { environment } from '../../../../../../../environments/environment';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '../../../../../services/product.service';
import { Product } from '../../../../../model/product.model';

@Component({
    selector: 'app-save-product-image',
    standalone: true,
    imports: [
        CommonModule,
        FilePondModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './save-product-image.component.html',
    styleUrl: './save-product-image.component.scss',
})
export class SaveProductImageComponent implements OnInit {
    private _formBuilder = inject(FormBuilder);
    private _productService = inject(ProductService);
    private _productImageService = inject(ProductImageService);
    private _messageService = inject(MessageService);

    post: Post[] = [] as Post[];
    products: Product[] = [] as Product[];
    productImage: ProductImage[] = [] as ProductImage[];

    first: number = 0;
    rows: number = 10;
    totalRecords: number = 0;
    productId: number = 0;

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
        this.getProduct();
    }

    onPageChange(event: PageEvent) {
        if (
            ValidationUtil.isNotNullAndNotUndefined(event.first) &&
            ValidationUtil.isNotNullAndNotUndefined(event.rows)
        ) {
            this.first = event.first || 0;
            this.rows = event.rows || 1;
            this.getProduct();
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
            this.getProduct();
        }
    }

    onClickRow(item: Product) {
        this.productId = item.id;
        this.getProductImage();
    }

    onSubmit() {
        this.submitted = true;

        if(this.productId === 0) {
            this._messageService.add({
                severity: 'danger',
                summary: 'Error',
                detail: "Vui lòng chọn sản phẩm",
                key: 'br',
                life: 3000,
            });
        }

        this._productImageService.saveProductImage(this.postImageForm.value, this.productId).subscribe(res => {
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

        this.productId = 0;

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

    private getProduct() {
        this.isLoading = true;
        this._productService
            .getPageProduct(this.getParamSearchProduct())
            .subscribe((res) => {
                if (res !== null && res !== undefined) {
                    let productResult = res.body?.result || [];
                    if (productResult.length <= 0) {
                        this.isLoading = true;
                    } else {
                        this.products.push(...productResult);
                        this.totalRecords = res.body?.total || 0;
                        this.isLoading = false;
                    }
                }
            });
    }

    private getParamSearchProduct() {
        return {
            page: this.first + 1,
            limit: this.rows,
        };
    }

    private getProductImage() {
        this.resetImage();

        this._productImageService.getAllByProductId(this.productId).subscribe((res) => {
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
