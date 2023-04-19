import { Injectable } from '@angular/core';
import { Member } from '../components/members/model/member';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  apiUrl = 'http://localhost:5000/api/members';
  constructor(private http: HttpClient) {}
  getMemebers() {
    console.log('received members');
    return this.http.get<Member[]>(this.apiUrl, { withCredentials: true });
  }
  getMemberById(id: any) {
    console.log(`received member of id: ${id}`);
    return this.http.get<Member>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }
  createMember(member: Member) {
    console.log(`member to create :  ${JSON.stringify(member)}`);
    return this.http.post<Member>(`${this.apiUrl}`, member, {
      withCredentials: true,
    });
  }
  deleteMember(id: any) {
    console.log('id of member to delete : ' + id);
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
  editMember(memberId: any, member: Member) {
    console.log(memberId, member);
    return this.http.patch(`${this.apiUrl}/${memberId}`, member, {
      withCredentials: true,
    });
  }
}
