import { Component } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  isOpen: boolean = true;
  iconAction: string = 'icon_voltar.svg'; 
  userType: string = 'admin';

  menuItems: MenuItem[] = [
    { icon: 'home.svg', name: 'Página inicial', link: '/home', roles: ['admin', 'professor', 'aluno'] },
    { icon: 'students.svg', name: 'Estudantes', link: '/students', roles: ['admin', 'professor'] },
    { icon: 'obs.svg', name: 'Observações', link: '/observations', roles: ['admin', 'aluno'] },
    { icon: 'disciplinas.svg', name: 'Disciplinas', link: '/subjects', roles: ['admin', 'professor','aluno'] },    
    { icon: 'dashboards.svg', name: 'Dashboards', link: '/dashboards', roles: ['admin', 'professor'] },
    { icon: 'teachers.svg', name: 'Professores', link: '/teachers', roles: ['admin', 'professor','aluno'] },    
    { icon: 'profile.svg', name: 'Perfil', link: '/my-profile', roles: ['professor', 'aluno '] }
  ];

  get filteredMenu() {
    return this.menuItems.filter(item => item.roles.includes(this.userType));
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    this.iconAction = this.isOpen ? 'icon_voltar.svg' : 'icon_abrir.svg';
    const width = this.isOpen ? '260px' : '65px'; 
    document.documentElement.style.setProperty('--sidebar-width', width);
  }

}

export interface MenuItem {
  icon: string;
  name: string;
  link: string;
  roles: string[];
}
