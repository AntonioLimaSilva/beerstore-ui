import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {

  users: User[] = []

  constructor(
    private userService: UserService,
    private confirmation: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.userService.getAll('').subscribe(users => this.users = users)
  }

  notification(user: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(user);
      }
    });
  }

  delete(user: any) {
    this.userService.delete(user.id).subscribe(() => {
      
      this.messageService.add({severity: 'success', detail: 'Usuário excluído com sucesso!'})
      this.getUsers()
    })
  }

}
