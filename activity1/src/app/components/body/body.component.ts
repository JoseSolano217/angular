import { ToastrService } from 'ngx-toastr';
import { Mod } from './../../models/mod.model';
import { MOD_ARRAY } from './../../mocks/mod.mock';
import { Component, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { showMessage } from 'src/app/utilities/messages/Toast';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  public modArray: Mod[];
  public selectedMod: Mod;
  public tmpBase64: any;

  public modalRef: BsModalRef;
  public modalTitle: string;
  public modalBody: string;
  public modalContent: string;

  constructor(public myMessage: ToastrService, public myModal: BsModalService) {
    this.modArray = MOD_ARRAY;
    this.selectedMod = new Mod(0, "", 0, "", false, "", "");
    this.tmpBase64 = null;
    this.modalRef = this.tmpBase64;
    this.modalTitle = "";
    this.modalBody = "";
    this.modalContent = "";
  };

  public selectMod(objMod: Mod): void {
    this.selectedMod = new Mod(objMod.modCode, objMod.modName, objMod.modDownloads,
      objMod.modOwner, objMod.modState, objMod.modIcon, objMod.modBase64);
  };

  public resetMod(): void {
    this.selectedMod = new Mod(0, "", 0, "", false, "", "");
  }

  public operations(form: NgForm, event: any, obj: Mod): void {
    const action = event.submitter.id;
    switch(action) {
      case "btnCreate":
        this.createMod(form);
        break;
      case "btnUpdate":
        this.updateMod(form, obj);
        break;
      default:
        break;
    }
  }

  public createMod(form: NgForm): void {
    if (form.valid) {
      showMessage("success", "All done king", "Created", this.myMessage)
      this.selectedMod.modCode = this.modArray.length + 1;
      this.selectedMod.modState = true;
      this.modArray.push(this.selectedMod);
      this.resetMod();
      form.reset();
    }
  }

  public updateMod(form: NgForm, newObj: Mod): void {
    let index = this.findModByCode(newObj.modCode)
    if (index != -1) {
      this.modArray[index] = newObj;
      showMessage("info", "All updated, king", "Updated", this.myMessage);
    } else {
      showMessage("error", "Something went wrong, stupid", "Error", this.myMessage);
    }
    this.resetMod();
    form.resetForm();
  }

  public deleteMod(code: number): void {
    let index = this.findModByCode(code)
    if (index != -1) {
      let obj = this.modArray[index];
      this.modArray = this.modArray.filter((myMod) => myMod != obj);
      showMessage("error", "All deleted, dipshit", "Deleted", this.myMessage);
    } else {
      showMessage("error", "Something went wrong, stupid", "Error", this.myMessage);
    }
  }

  public selectImage(box: any): void {
    if (!box.target.files[0] || box.target.files[0].length == 0) {
      return;
    };
    const type = box.target.files[0].type;
    if (type.match(/image\/*/) == null) {
      return;
    };
    const reader = new FileReader();
    reader.readAsDataURL(box.target.files[0]);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.selectedMod.modBase64 = this.tmpBase64;
      this.selectedMod.modIcon = box.target.files[0];
    };
  };

  public cancelMod(form: NgForm): void {
    this.resetMod();
    form.resetForm();
  };

  public cancelButton(): void {
    this.modalRef.hide();
  }

  public deleteButton(): void {
    this.deleteMod(this.selectedMod.modCode);
    this.cancelButton();
  }

  public openButton(template: TemplateRef<any>, obj: Mod): void {
    this.selectedMod = obj;
    this.modalRef = this.myModal.show(template, {class: "modal.md"});
    this.modalTitle = "WarningWarningWarningWarning";
    this.modalBody = "A foreign substance has been detected in the reactor! " + 
    "Opperations are to be halted, and the foreign substance erradicated immediatly!"
    if (obj.modState) {
      this.modalContent = obj.modName + " - Active";
    } else {
      this.modalContent = obj.modName + " - Inactive";
    }
  }

  public utilityArray(n: number): Array<number> {
    return Array(n);
  }

  public findModByCode(cod: number) {
    let index = 0
    let returnIndex = -1
    this.modArray.forEach(mod => {
      if (mod.modCode == cod) {
        returnIndex = index
      }
      index++
    });
    return returnIndex
  }
}
