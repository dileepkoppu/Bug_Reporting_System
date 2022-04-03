import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {

  constructor() { }
  @Input() alert !: boolean;
  @Input() success !:boolean
  @Input() message !:string
  ngOnInit(): void {

  }
  removeMessage(){
    if (this.success) {
      this.alert=false
    }
  }

}
