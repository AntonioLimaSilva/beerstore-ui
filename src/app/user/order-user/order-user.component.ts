import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';

import { UserService } from '../user.service';
import { GroupService } from 'src/app/group/group.service';
import { Group } from 'src/app/group/group.model';
import { User } from '../user.model';

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css']
})
export class OrderUserComponent implements OnInit {

  form: FormGroup;
  groups: Group[] = [];
  user = new User();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private grupoService: GroupService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.validation()

    this.getGroups()

    const id = this.activatedRoute.snapshot.params['id'];

    if(id) {
      this.userService.findById(id).subscribe(user => {
        this.user = user
      
        this.user.group = this.user.groups.map(g => g.name).pop()

        this.form.patchValue(this.user)
      })
    }
  }

  getGroups() {
    this.grupoService.getAll().subscribe(groups => {
      this.groups = groups
    });
  }

  save() {
    if(this.isUpdate) {
      this.update()
    } else {
      this.add()
    }
  }

  add() {
    this.setProperties()

    this.userService.add(this.user).subscribe(user => {
      this.messageService.add({severity: 'success', detail: `Usuário ${user.username} salvo com sucesso!`})

      this.reset()
    })
  }

  update() {
    this.setProperties()

    this.userService.put(this.user).subscribe(usuario => {
      this.messageService.add({severity: 'success', detail:`Usuário ${usuario.username} atualizado com sucesso!`})
    });
  }

  reset(){
    this.form.reset();
  }

  setProperties() {
    const group = this.groups.find(g => g.name === this.form.value.group);
    
    this.user.id = this.form.value.id;
    this.user.username = this.form.value.username;
    this.user.password = this.form.value.password;
    this.user.email = this.form.value.email;
    this.user.active = this.form.value.active;
    this.user.groups = [];
    this.user.groups.push(group);
  }

  validation() {
    this.form = this.fb.group({
      id: [],
      username: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      password: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      active: this.fb.control('', [Validators.required]),
      group: this.fb.control('', [Validators.required])
    })
  }

  get isUpdate() {
    return Boolean(this.form.get('id').value)
  }

}
