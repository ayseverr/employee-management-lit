
import { configureStore, createSlice } from '@reduxjs/toolkit';
// Define the employee slice (state , reducers)
const employeeSlice = createSlice({
  name: 'employees',
  initialState: JSON.parse(localStorage.getItem('employees')) || [
    { id: '1', firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '22/02/2022', dateOfBirth: '22/03/1990', phoneNumber: '+90 532 123 45 45', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
    { id: '2', firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '22/02/2022', dateOfBirth: '22/03/1990', phoneNumber: '+90 532 123 45 45', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
    { id: '3', firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '22/02/2022', dateOfBirth: '22/03/1990', phoneNumber: '+90 532 123 45 45', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
    { id: '4', firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '22/02/2022', dateOfBirth: '22/03/1990', phoneNumber: '+90 532 123 45 45', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
    { id: '5', firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '22/02/2022', dateOfBirth: '22/03/1990', phoneNumber: '+90 532 123 45 45', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
    { id: '6', firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '22/02/2022', dateOfBirth: '22/03/1990', phoneNumber: '+90 532 123 45 45', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
    { id: '7', firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '22/02/2022', dateOfBirth: '22/03/1990', phoneNumber: '+90 532 123 45 45', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },
    { id: '8', firstName: 'Ahmet', lastName: 'Sourtimes', dateOfEmployment: '22/02/2022', dateOfBirth: '22/03/1990', phoneNumber: '+90 532 123 45 45', email: 'ahmet@sourtimes.org', department: 'Analytics', position: 'Junior' },

  ],
  reducers: {
    //Adds a new employee to the store and updates localStorage.
    addEmployee: (state, action) => {
      const newEmployee = { ...action.payload, id: Date.now().toString() };
      state.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(state));
    },


    //Updates an existing employee's details in the store and localStorage.
    updateEmployee: (state, action) => {
      const index = state.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('employees', JSON.stringify(state));
      }
    },
    //Deletes an employee from the store and updates localStorage.
    deleteEmployee: (state, action) => {
      const newState = state.filter(e => e.id !== action.payload);
      localStorage.setItem('employees', JSON.stringify(newState));
      return newState;
    }
  }
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;


export const store = configureStore({ reducer: employeeSlice.reducer });
