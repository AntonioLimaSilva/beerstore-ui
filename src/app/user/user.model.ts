import { Group } from '../group/group.model';

export class User {

    id: number;
    username: string;
    password: string;
    email: string;
    active: boolean = true;
    group: string;
    groups: Group[];
}