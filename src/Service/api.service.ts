import { map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { environment } from "environments";
import { HttpClient } from "@angular/common/http";
import { MODEL } from "src/models/model";
import { BehaviorSubject, Observable, Subject, Subscriber } from "rxjs";
import { io } from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  
  baseUrl = environment.apiURL;
  BaseUrlImg = environment;
  soket:any
  private refreshneed$ = new Subject<void>();

  private ref = new Subject<void>();
  
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  
  constructor(private http: HttpClient) {
  }

  getrefreshneed$(): Observable<any> {
    return this.refreshneed$;
  }


  getref(): Observable<any> {
    return this.ref;
  }

  getAllData(): Observable<MODEL[]> {
    return this.http.get<MODEL[]>(`${this.baseUrl}`);
  }

  getByid(id: string): Observable<MODEL[]> {
    return this.http.get<MODEL[]>(`${this.baseUrl}`);
  }
  getByid_(id: any): Observable<MODEL[]> {
    return this.http.get<MODEL[]>(`${this.baseUrl}/${id}`);
  }
  getByEmail(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkemail`, data);
  }
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createUser`, data);
  }

  verifyEmailToken(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify-token/${data}`);
  }

  _forgetPassowrd(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgetpassword`, data);
  }
  _updatePassword(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-password`, data);
  }

  _getCalendarData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/calendar-appoints/getalldata`);
  }

  _postCalendarData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/calendar-appoints`, data);
  }

  _deleteCalendar(data: any): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/calendar-appoints/deleteCalendarInfo/${data}`
    );
  }
  
  _oneImage(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/image/post-img`, data);
  }

  _multiImage(data: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/image/multiple-img`, data, {
        // reportProgress: true,
        // observe: "events",
      })
      .pipe(
        tap(() => {
          this.refreshneed$.next();
        })
      );
  }
  _getImage(): Observable<any> {
    return this.http.get(`${this.baseUrl}/image/get-img`)
  }
  _deleteImgById(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/image/delete-img-id/${id}`).pipe(
      tap(() => {
        this.refreshneed$.next();
      })
    );
  }
  _getProfileImage(){
    return this.http.get(`${this.baseUrl}/image/profile/img/getdata`)
  }

_postProfileImage(data:any){
  return this.http.put( `${this.baseUrl}/image/profile/img/setup`, data).pipe(
    tap(()=>{
      this.refreshneed$.next()
    })
  )
}
_sendCalendarDataClient(data:any){
    return this.http.post(`${this.baseUrl}/calendar/app/PostDataInCalendar_Client`, data).pipe(
      tap(()=>{
        this.refreshneed$.next()
      })
    )
  }
_getCalendarClient(){
  return this.http.get(`${this.baseUrl}/calendar/app`)
}
_getTotalPrice(){
  return this.http.get(`${this.baseUrl}/calendar/app/Sum`)
}
_getByName(data:any){
  return this.http.get(`${this.baseUrl}/calendar/app/getName?id=${data}`)
}



_uploadClientProfileImg(data:any){
      return this.http.post(`${this.baseUrl}/image/profile/client/image`, data).pipe(
        tap(()=>{
          this.ref.next()
        })
      )
}


_getProfileImageClient(data:any){
  return this.http.post(`${this.baseUrl}/image/get/imge/profile/client`, data)
}

_admin_login(data:any){
  return this.http.post(`${this.baseUrl}/admin-login/login`, data)
}

_getDataCalendarHistory(data:any){
  return this.http.get(`${this.baseUrl}/calendar/app/data-client-history/${data}`)
}


/////for edit webiste 


$getTitle(){
  return this.http.get(`${this.baseUrl}/admin-login//get-title`)
}

$updateTitle(data:any){
  return this.http.put(`${this.baseUrl}/admin-login/edit-title`, data)
}

$getletter(){
  return this.http.get(`${this.baseUrl}/admin-login/get-letter`)
}

$addLetter(data:any){
  return this.http.post(`${this.baseUrl}/admin-login/add-letter`, data)
}

$deleteLetter(id:any){
    return this.http.delete(`${this.baseUrl}/admin-login/delete-letter/${id}`)
}


}
