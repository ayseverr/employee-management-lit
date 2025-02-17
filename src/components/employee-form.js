import { LitElement, html, css } from 'lit';
import { store, addEmployee, updateEmployee } from '../store';
import { getTranslation } from '../localization'; // Add this import

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
    isEditing: { type: Boolean }
  };

  static styles = css`
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      border-radius: 10px;
      text-align: center;

      width: 400px;
    }

    .modal h2 {
      color: #ff7f00;
      margin-bottom: 20px;
    }

    .form-group {
      text-align: left;
      margin-bottom: 15px;
    }



    .form-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .buttons button {
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .buttons .save {
      background: #ff7f00;
      color: white;
    }

    .buttons .cancel {
      background: #ddd;

    }
    @media (max-width: 480px) {
    .modal {
      width: 90%;
      padding: 15px;
    }
    
    .form-group input,
    .form-group select {
      font-size: 14px;
    }
    
    
    .buttons {
      flex-direction: column;
      gap: 10px;
    }
    
    .buttons button {
      width: 100%;
    }
  }
  `;

  constructor() {
    super();
    this._resetEmployee(); // defined empty employee
    this.isEditing = false;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.employee?.id) {

      this.isEditing = true;
    } else {
      this._resetEmployee();
    }
  }

  render() {
    return html`
      <div class="modal">
        <h2>${this.isEditing ? getTranslation('updateEmployee') : getTranslation('addNewEmployee')}</h2>
        <form @submit=${this._handleSubmit}>
          <div class="form-group">

            <label>${getTranslation('firstName')}</label>
            <input type="text" .value=${this.employee.firstName} @input=${e => this._updateField(e, 'firstName')} required />
          </div>
          <div class="form-group">
            <label>${getTranslation('lastName')}</label>
            <input type="text" .value=${this.employee.lastName} @input=${e => this._updateField(e, 'lastName')} required />
          </div>
          <div class="form-group">
            <label>${getTranslation('dateOfEmployment')}</label>
            <input type="date" .value=${this.employee.dateOfEmployment} @input=${e => this._updateField(e, 'dateOfEmployment')} required />
          </div>
          <div class="form-group">
            <label>${getTranslation('dateOfBirth')}</label>
            <input type="date" .value=${this.employee.dateOfBirth} @input=${e => this._updateField(e, 'dateOfBirth')} required />
          </div>
          <div class="form-group">
            <label>${getTranslation('phone')}</label>
            <input type="tel" .value=${this.employee.phone} @input=${e => this._updateField(e, 'phone')} required />
          </div>
          <div class="form-group">
            <label>${getTranslation('email')}</label>
            <input type="email" .value=${this.employee.email} @input=${e => this._updateField(e, 'email')} required />
          </div>
          <div class="form-group">
            <label>${getTranslation('department')}</label>
            <select @change=${e => this._updateField(e, 'department')}>
              <option value="Analytics" ?selected=${this.employee.department === 'Analytics'}>
                ${getTranslation('departmentOptions.analytics')}
              </option>
              <option value="Tech" ?selected=${this.employee.department === 'Tech'}>
                ${getTranslation('departmentOptions.tech')}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>${getTranslation('position')}</label>
            <select @change=${e => this._updateField(e, 'position')}>
              <option value="Junior" ?selected=${this.employee.position === 'Junior'}>
                ${getTranslation('positionOptions.junior')}
              </option>
              <option value="Medior" ?selected=${this.employee.position === 'Mid Level'}>
                ${getTranslation('positionOptions.medior')}
              </option>
              <option value="Senior" ?selected=${this.employee.position === 'Senior'}>
                ${getTranslation('positionOptions.senior')}
              </option>
            </select>
          </div>

          <div class="buttons">
            <button type="submit" class="save">${getTranslation(this.isEditing ? 'saveButton' : 'saveButton')}</button>
            <button type="button" class="cancel" @click=${this._closeForm}>${getTranslation('cancelButton')}</button>
          </div>
        </form>
      </div>
    `;
  }
  _updateField(e, field) {
    this.employee = { ...this.employee, [field]: e.target.value };
  }

  
  _handleSubmit(e) {
    e.preventDefault();
    if (this.isEditing) {
      store.dispatch(updateEmployee(this.employee));
    } else {
      store.dispatch(addEmployee({ ...this.employee, id: Date.now().toString() }));
    }
    this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));
  }

  _closeForm() {
    this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));
  }

  _resetEmployee() {
    this.employee = {
      id: null,
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: 'Development',
      position: 'Junior'
    };
  }
}

customElements.define('employee-form', EmployeeForm);
