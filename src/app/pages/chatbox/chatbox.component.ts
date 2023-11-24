import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/role.enum';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit , AfterViewChecked {
  messages: any = []
  me: string = localStorage.getItem('userId')!
  messageInput: any
  users: User[] = [] = []
  userClick : any
  iHaveMessage : any = 0
  currentUser$: Observable<User | null> = this.userService.getUser(this.me);

  @ViewChild('myScrollContainer') myScrollContainer: any;
  constructor(private userService: UserService, private http: HttpClient, private sanitizer: DomSanitizer) {
    //this.getAllUser(Role.USER);
    this.loadUsersByRole(Role.USER);


  }
  getProfileImageSafeUrl(base64Image: string | null): SafeUrl | null {
    if (base64Image) {
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
    return null;
  }

  ngOnInit(): void {

    this.connect()
    this.scrollToBottom();

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
}


getUserProfileImageById(userId: string): string {
  const user = this.users.find((u: User) => u.id === userId);
  return user && user.profileImage ? user.profileImage : '';
}



getSafeUrl(base64Image: string): SafeUrl {
  return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64Image);
}
scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
}
/*
  getAllUser(role: Role): void {
    const organizationId = localStorage.getItem('organizationId');

    if (organizationId) {
      this.userService.getUsersByRoleAndOrganization(role, organizationId).subscribe(res => {
      console.log(res)
      this.users = res
      this.users.reverse()
      this.users = this.users.filter((i:any)=>{
        return i.id !== this.me
      })
    console.log(this.users)

    })
  }} */

  loadUsersByRole(role: string): void {
    this.userService.getUsersByRole(role).subscribe(
      data => {
        this.users = data;
        console.log(data)

        this.users.reverse()
        this.users = this.users.filter((i:any)=>{
          return i.id !== this.me
        })
      console.log(this.users)
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  stompClient: any
  connect() {

    var url = `http://localhost:5555/ws`;
    var socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    let thats = this;
    this.stompClient.withCredentials = true;
    thats.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      thats.stompClient.subscribe("/topic/"+thats.me, function (message: any) {
        thats.showMessage(message)
      });






    });
  }


  showMessagePause(msg: any) {
    const messageSender = JSON.parse(msg.body).sender;
    const messageRec = JSON.parse(msg.body).rec;

    // this.http.get<any[]>(`http://localhost:8080/conversation/${messageSender}/${messageRec}`)
    //   .subscribe(
    //     data => {
    //       this.messages = data.map((message: ChatMessage) => ({
    //         sender: message.sender,
    //         content: message.content,
    //         rec: message.rec,
    //         lu: false
    //       }));

    //       this.messages.forEach(message => {
    //         if (message.sender === this.userClick.id) {
    //           message.lu = true;
    //         }
    //       });
    //     },
    //     error => {
    //       console.error("Erreur lors de la récupération des messages:", error);
    //     }
    //   );
  }

  showMessage(msg: any) {
    console.log('---------', messageSender)
    var messageType = JSON.parse(msg.body).type
    var messageContent = JSON.parse(msg.body).content
    var messageSender = JSON.parse(msg.body).sender
    var messageRec = JSON.parse(msg.body).rec

    console.log('before' , this.messages)
    // var Type = JSON.parse(msg.type)
    this.messages.push({ sender: messageSender, content: messageContent , rec : messageRec , lu : false  })
    console.log('after' , this.messages)
    console.log(this.messages)



  }






  countMessage(id :any){
    var nb = 0
    for(var i = 0 ; i<this.messages.length ; i++){
      if(this.messages[i].sender == id && this.messages[i].lu == false){
        nb = nb +1
      }
    }

      return nb

  }
  sendMessage() {
    var dateMessage = new Date()
    var chatMessage = {
      sender: this.me,
      rec : this.userClick.id,
      content: this.messageInput,
      type: 'CHAT',

      dateMessage : dateMessage.getTime()
    };
    this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
    this.messageInput = null
  }


  clickUser(user : any){
    this.userClick = user;
    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].sender === user.id) {
        this.messages[i].lu = true;
      }
    }
    const messageSender = this.me;
    const messageRec = user.id;
        this.http.get<any[]>(`http://localhost:5555/conversation/${messageSender}/${messageRec}`).subscribe(res=>{
          console.log(res)
          this.messages=res
        })

  }
  // loadConversation(user: any) {
  //   this.http
  //   .get<any[]>(`http://localhost:8080/conversation/${this.me}/${user.id}`)
  //     .subscribe(
  //       (conversation: any[]) => {
  //         this.messages = conversation;
  //       },
  //       error => {
  //         console.error('Error loading conversation:', error);
  //       }
  //     );
  // }

  capitalizeFirstLetter(str:any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
