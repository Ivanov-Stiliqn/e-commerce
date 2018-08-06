import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class MessageActions {
  constructor(private toastr: ToastrService) {}

  success(message){
    this.toastr.success(message);
  }

  warning(message){
    this.toastr.warning(message);
  }

  error(message) {
    this.toastr.error(message);
  }
}
