import { Component, OnInit } from '@angular/core';
import { Member } from './model/member';
import { MembersService } from 'src/app/services/members.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  form!: FormGroup;
  members: Member[] = [];
  constructor(private membersService: MembersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.membersService.getMemebers().subscribe((res: any) => {
      console.log(res.data);
      this.members = res.data;
    })
    
  }

  getMembers() {
    this.membersService.getMemebers().subscribe(res => {
      console.log(res);
      this.members = res;
    })
  }
  createMember() {
    this.membersService.createMember(this.form.value).subscribe(res => {
      console.log(res);
      this.getMembers();
    })
  }
  deleteMember(id: number) {
    this.membersService.deleteMember(id).subscribe(res => {
      console.log(res);
      this.getMembers();
    })
  }
  editMember(memberId: number, member: any) {
    this.membersService.editMember(memberId, member).subscribe(res => {
      console.log(res);
      this.getMembers();
    })
  }
  submit(){
    this.createMember();
  }

}
