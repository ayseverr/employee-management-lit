  import { LitElement, html, css } from 'lit';
  import { store, deleteEmployee } from '../store';
  import './employee-form';
  import './confirm-dialog';
  import { getTranslation } from '../localization'; // Import the translation function

  export class EmployeeList extends LitElement {
    static properties = {
      employees: { state: true },
      searchTerm: { state: true },
      viewMode: { state: true },
      currentPage: { state: true },
      selectedEmployee: { state: true },
      isFormOpen: { state: true },
      lang: { state: true }

    };
    static styles = css`


    :host {
        display: block;
        font-family: 'Arial', sans-serif;
        color: #333;
        background-color: #f8f8f8;
        padding-bottom: 50px;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: white;
        border-bottom: 2px solid #f5f5f5;
      }


      .navbar .left {
        font-weight: bold;
        font-size: 18px;
      
      }

      .navbar .right {
        display: flex;
        align-items: right;
        gap: 15px;
      }

      .navbar .right span {
        color: #ff7f00;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .navbar .right .person {
        font-weight: bold;
      
      }

      .employee-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        color: #ff7f00;
        padding: 20px;
    
        margin: 20px;
    
      }


      .language-switcher {
        display: flex;
        gap: 8px;
        cursor: pointer;
      }

      .flag {
        width: 24px;
        height: 16px;
        border: 1px solid #ddd;
        opacity: 0.7;
        transition: all 0.3s;
      }

      .flag.active {
        opacity: 1;
        border-color: #ff7f00;
      }
      .table-container {
        overflow-x: auto;
        padding: 0 20px;
      }

      .language-switcher {
        position: relative;
        display: inline-block;
      }

      .selected-language {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
      }

      .selected-language:hover {
        background: #f5f5f5;
      }

      .language-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        display: none;
        z-index: 1000;
        min-width: 120px;
      }

      .language-dropdown.open {
        display: block;
      }

      .language-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        cursor: pointer;
      }

      .language-option:hover {
        background: #f8f8f8;
      }

      .flag-icon {
        width: 24px;
        height: 16px;
        object-fit: cover;
        border-radius: 2px;
      }

      @media (max-width: 780px) {
        table {
          min-width: 700px;
        }

        th:nth-child(4),
        td:nth-child(4),
        th:nth-child(5),
        td:nth-child(5) {
          display: none;
        }

        .navbar .right {
          gap: 10px;
        }

        .employee-header {
          margin: 10px;
          padding: 10px;
        }
      }
      @media (max-width: 780px) {
        table {
          min-width: 700px;
        }

        th:nth-child(4),
        td:nth-child(4),
        th:nth-child(5),
        td:nth-child(5) {
          display: none;
        }

        .navbar .right {
          gap: 10px;
        }

        .employee-header {
          margin: 10px;
          padding: 10px;
        }
      }

      @media (max-width: 768px) {
        table {
          width: 100%;
          overflow-x: auto;
          display: block;
        }
        
        .navbar .right {
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .list-item {
          width: 100%;
          margin: 10px 0;
        }

        .employee-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }
      }


    
    table {
      width: 95%;
      margin: auto;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    th, td {
      padding: 14px;
      border-bottom: 1px solid #ddd;
      text-align: left;
      font-size: 16px;
    }

    th {
      color: #ff7f00;
      font-weight: bold;
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-size: 20px;
      cursor: pointer;
    }

    .actions button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: #ff7f00;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      gap: 5px;
    }

    .pagination button {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
      color: #ff7f00;
      padding: 10px 14px;
      border-radius: 50%;
      font-weight: bold;
    }

    .pagination button.active {
      background: #ff7f00;
      color: white;
    }

    .pagination .dots {
      font-size: 16px;
      color: #ff7f00;
      padding: 10px;
    }
  `;
    constructor() {
      super();
      this.showLanguageDropdown = false;
      this.lang = document.documentElement.lang || 'en';

          this.employees = store.getState();  // Get the initial employee list from the store
      this.searchTerm = '';
      this.viewMode = 'table'; 
      this.currentPage = 1;
      this.selectedEmployee = null;  // No employee selected initially
      this.isFormOpen = false;
      this.unsubscribe = store.subscribe(() => {
        this.employees = store.getState();
      });
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.unsubscribe();
    }

    render() {
      const filteredEmployees = this._filterEmployees();
      const paginatedEmployees = this._paginate(filteredEmployees);

      return html`
        <div class="navbar">
          <div class="left">ING</div>
          <div class="right">
            <span><span class="material-icons">person</span> ${getTranslation('employeesLabel')}</span>
            <span @click=${this._openAddForm}><span class="material-icons">add</span> ${getTranslation('addNewButton')}</span>
            
            <div class="language-switcher">
              
              <div class="selected-language" @click=${this._toggleLanguageDropdown}>
                <img src="/flags/${this.lang}.svg" class="flag-icon">
                <span class="material-icons">arrow_drop_down</span>
              </div>
              <div class="language-dropdown ${this.showLanguageDropdown ? 'open' : ''}">
                <div class="language-option" @click=${() => this._changeLanguage('tr')}>
                  <img src="/flags/tr.svg" class="flag-icon">
                  <span>Türkçe</span>
                </div>
                <div class="language-option" @click=${() => this._changeLanguage('en')}>
                  <img src="/flags/en.svg" class="flag-icon">
                  <span>English</span>
                </div>
            </div>
            </div>
          </div>
        </div>


        <div class="employee-header">
          <div>${getTranslation('employeeListHeader')}</div>
          <div class="icons">
            <span class="material-icons" @click=${this._setTableView}>view_list</span>
            <span class="material-icons" @click=${this._setListView}>grid_view</span>
          </div>
        </div>

  

        ${this.viewMode === 'table' 
          ? this._renderTableView(paginatedEmployees) 
          : this._renderListView(paginatedEmployees)}

        ${this._renderPagination(filteredEmployees.length)}

        ${this.isFormOpen
          ? html`<employee-form .employee=${this.selectedEmployee} @close=${this._closeForm}></employee-form>`
          : ''
        }
        <confirm-dialog></confirm-dialog>
        
      `;
    }
 // Render employees in a table view
    _renderTableView(employees) {
      return html`
        <table>
          <tr>
            <th><input type="checkbox" /></th>
            <th>${getTranslation('firstName')}</th>
            <th>${getTranslation('lastName')}</th>
            <th>${getTranslation('dateOfEmployment')}</th>
            <th>${getTranslation('dateOfBirth')}</th>
            <th>${getTranslation('phone')}</th>
            <th>${getTranslation('email')}</th>
            <th>${getTranslation('department')}</th>
            <th>${getTranslation('position')}</th>
            <th>${getTranslation('actions')}</th>
          </tr>
          ${employees.map(employee => html`
            <tr>
              <td><input type="checkbox" /></td>
              <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
              <td>${employee.dateOfEmployment}</td>
              <td>${employee.dateOfBirth}</td>
              <td>${employee.phone}</td>
              <td>${employee.email}</td>
              <td>${employee.department}</td>
              <td>${employee.position}</td>
              <td class="actions">
                <button @click=${() => this._openEditForm(employee)}>
                  <span class="material-icons">edit</span>
                </button>
                <button @click=${() => this._confirmDelete(employee.id)}>
                  <span class="material-icons">delete</span>
                </button>
              </td>
            </tr>
          `)}
        </table>
      `;
    }
  // Render employees in a list view
    _renderListView(employees) {
      return html`
        <div class="list-view">
          ${employees.map(employee => html`
            <div class="list-item">
              <h3>${employee.firstName} ${employee.lastName}</h3>
              <p><strong>${getTranslation('emailLabel')}</strong> ${employee.email}</p>
              <p><strong>${getTranslation('departmentLabel')}</strong> ${employee.department}</p>
              <p><strong>${getTranslation('positionLabel')}</strong> ${employee.position}</p>
              <div class="actions">
                <button @click=${() => this._openEditForm(employee)}>
                  <span class="material-icons">edit</span>
                </button>
                <button @click=${() => this._confirmDelete(employee.id)}>
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </div>
          `)}
        </div>
      `;
    }




    // Pagination
    _renderPagination(totalItems) {
      const totalPages = Math.ceil(totalItems / 5);
      return html`
        <div class="pagination">
          ${Array.from({ length: totalPages }, (_, i) => html`
            <button class="${this.currentPage === i + 1 ? 'active' : ''}" 
              @click=${() => this._changePage(i + 1)}>
              ${i + 1}
            </button>
          `)}
        </div>
      `;
    }

    _paginate(employees) {
      const startIndex = (this.currentPage - 1) * 7;
      return employees.slice(startIndex, startIndex + 7);
    }

    _changePage(page) {
      if (page > 0) {
        this.currentPage = page;
        this.requestUpdate();
      }
    }

    _filterEmployees() {
      return this.employees;
    }


    _toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    }

    _changeLanguage(lang) {
      document.documentElement.lang = lang;
      this.lang = lang;
      this.showLanguageDropdown = false;
      this.requestUpdate();
    }

    _openAddForm() {
      this.selectedEmployee = null;
      this.isFormOpen = true;
    }

    _openEditForm(employee) {
      this.selectedEmployee = { ...employee };
      this.isFormOpen = true;
    }

    _closeForm() {
      this.isFormOpen = false;
    }

    _setTableView() {
      this.viewMode = 'table';
      this.requestUpdate(); 
    }

    _setListView() {
      this.viewMode = 'list';
      this.requestUpdate();
    }

    async _confirmDelete(id) {
      const dialog = this.renderRoot.querySelector('confirm-dialog');
      if (!dialog) {
        console.error("Confirm Dialog component not found!");
        return;
      }
      
      const confirmed = await dialog.open('Are you sure you want to delete this employee?');
      if (confirmed) {
        store.dispatch(deleteEmployee(id));
      }
    }
  }

  customElements.define('employee-list', EmployeeList); 