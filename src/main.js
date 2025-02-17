import { Router } from '@vaadin/router';
import './components/navigation-menu.js';
import './components/employee-list.js';
import './components/employee-form.js';

window.addEventListener('DOMContentLoaded', () => {
  const outlet = document.querySelector("#app");

  if (!outlet) {
    console.error("no error");
    return;
  }

  const router = new Router(outlet);
  router.setRoutes([
    { path: '/', component: 'employee-list' },
    { path: '/add', component: 'employee-form' },
    { path: '/edit/:id', component: 'employee-form' } ,
        { path: '(.*)', redirect: '/' }  // redirect  404 
  ]);
});
