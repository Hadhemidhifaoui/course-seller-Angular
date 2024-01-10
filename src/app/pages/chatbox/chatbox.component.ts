

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
  messages: any[] = [];
  me: any = localStorage.getItem('userId')

  users: User[] = [] = []
  userClick : any
  iHaveMessage : any = 0
  stompClient: any
  messageInput: string = '';
  currentUser$: Observable<User | null> = this.userService.getUser(this.me);
  private webSocket!: WebSocket ;
  public receivedMessage: string | undefined;
  @ViewChild('myScrollContainer') myScrollContainer: any;
  constructor(private userService: UserService, private http: HttpClient) {

    this.loadUsersByRole(Role.USER);


  }


  ngOnInit(): void {

    this.scrollToBottom();

    this.webSocket = new WebSocket(`ws://localhost:5555/user/${this.me}`);
    this.webSocket.onopen = (event) => this.handleWebSocketOpen(event);
    this.webSocket.onmessage = (event) => this.handleWebSocketMessage(event);
    this.webSocket.onclose = (event) => this.handleWebSocketClose(event);
    this.webSocket.onerror = (event) => this.handleWebSocketError(event);



  }

  ngAfterViewChecked() {
    this.scrollToBottom();
}


scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
}
handleWebSocketOpen(event: Event): void {
  console.log('WebSocket Connection opened:', event);
}

handleWebSocketMessage(event: MessageEvent): void {
  console.log('Received raw message:', event.data);

  const [recipientId, content] = event.data.split(':');

  if (recipientId && content) {
    const parsedMessage = {
      sender: this.userClick ? this.userClick.id : undefined,
      rec: this.me,
      content: content,
    };

    console.log('Parsed message:', parsedMessage);
    this.showMessage({ data: JSON.stringify(parsedMessage) } as MessageEvent);
  } else {
    console.error('Invalid message format:', event.data);
  }

}





handleWebSocketClose(event: CloseEvent): void {
  console.log('WebSocket Connection closed:', event);
}

handleWebSocketError(event: Event): void {
  console.error('WebSocket Error:', event);
}


  loadUsersByRole(role: string): void {
    this.userService.getUsersByRole(role).subscribe(
      data => {
        this.users = data;

        console.log("*********",data , this.me)

        this.users.reverse()
        this.users = this.users.filter((i:any)=>{
          return i.id != this.me
        })
      console.log(this.users)
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }





  showMessage(msg: MessageEvent): void {
    const messageSender = JSON.parse(msg.data).sender;
    const messageRec = JSON.parse(msg.data).rec;

    const messageContent = JSON.parse(msg.data).content;

    this.messages.push({ sender: messageSender, content: messageContent, rec: messageRec, lu: false });
  }

  countMessage(id: any): number {
    return this.messages.filter(m => m.sender === id && !m.lu).length;
  }
  sendMessage(message: string): void {
    const senderId = this.me;
    const receiverId = this.userClick.id;

    const sentMessage = {
      sender: senderId,
      rec: receiverId,
      content: message,
    };

    this.messages.push(sentMessage);
    this.webSocket.send(`${receiverId}->${message}`);
    console.log('Debug - Message:', { sender: sentMessage.sender, rec: sentMessage.rec, content: sentMessage.content });
    this.messageInput = '';
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
        this.http.get<any[]>(`http://localhost:5555/api/messages/conversation/${messageSender}/${messageRec}`).subscribe(res=>{
          console.log(res)
          this.messages=res
        })

  }


  capitalizeFirstLetter(str:any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
