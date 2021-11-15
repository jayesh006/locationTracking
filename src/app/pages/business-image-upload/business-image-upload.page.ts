import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpService, url } from 'src/app/services/http.service';

@Component({
  selector: 'app-business-image-upload',
  templateUrl: './business-image-upload.page.html',
  styleUrls: ['./business-image-upload.page.scss'],
})
export class BusinessImageUploadPage implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  imageSrc = [];
  uploadImageSrc = [];
  files: any = {};
  fileInfos: Observable<any>;
  albumTitle = null;
  myForm

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc.push(reader.result as string);
        console.log("Image ",reader.result as string);
        // this.myForm.patchValue({
        //   fileSource: reader.result
        // });
        console.log(this.myForm)

      };

    }
  }

  getFiles() {
    document.getElementById("upfile").click();
  }

  selectFiles(event) {
    console.log("Events ", event);
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.uploadImageSrc.push(event.target.files)
    // this.onFileChange(event);


    var totalSize = 0;
    if (event.target.files && event.target.files.length) {
      this.files = event.target.files;
      console.log("File", this.files);

      for (let i = 0; i < this.files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(this.files[i]);

        reader.onload = () => {

          this.imageSrc.push(reader.result as string);
          // totalSize = totalSize + parseInt(this.files[i].size);
          // console.log("Total size",this.totalSize)
          // console.log("Image ",reader.result as string);
          // this.myForm.patchValue({
          //   fileSource: reader.result
          // });

        };
      }
    }
    // console.log("Total size",totalSize)
    // this.totalSize = this.formatSizeUnits(totalSize);
    // console.log("Total size",this.totalSize)
  }

  removeImage(i) {
    console.log(this.files, i);
    // this.files = this.files.slice(i,i);
    // delete this.files[i];

    // console.log("File",Array.from(this.files));
    if (!Array.isArray(this.files)) {
      this.files = Array.from(this.files);
    }
    this.files.splice(i, 1)
    console.log(this.imageSrc)
    this.imageSrc.splice(i,1);
    console.log(this.imageSrc)
    this.uploadImageSrc.splice(i,1);
    
    // console.log("File", this.files);

    // this.imageSrc = [];
    // for (let i = 0; i < this.files.length; i++) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(this.files[i]);

    //   reader.onload = () => {

    //     this.imageSrc.push(reader.result as string);
    //     // console.log("Image ",reader.result as string);
    //     // this.myForm.patchValue({
    //     //   fileSource: reader.result
    //     // });

    //   };
    // }
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    console.log("Files", file);
    this.uploadFilesToFormData(file).then(res => {
      console.log("Res", res);
      // if (event.type === HttpEventType.UploadProgress) {
      //   this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   this.fileInfos = this.uploadService.getFiles();
      // }
    },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  uploadFilesToFormData(file: File) {
    return new Promise((resolve, reject) => {
      console.log("upload file", file);
      const formData: FormData = new FormData();
      let param = new FormData();
      param.append('name', this.albumTitle);
      param.append('business_id', '1');
      for(var i = 0; i < this.uploadImageSrc.length; i++){
        param.append('image', this.uploadImageSrc[0]);
      }
      this.http.postData(url.albumUpload,param).then(
        (res: any) => {
          console.log('res Album : ', res)
        }
      )
      resolve(formData.append('file', file));
    })

    // const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
    //   reportProgress: true,
    //   responseType: 'json'
    // });

    // return this.http.request(req);
  }

  //   getFiles(): Observable<any> {
  //     return this.http.get(`${this.baseUrl}/files`);
  //   }

  formatSizeUnits(bytes) {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes == 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
  }
}
