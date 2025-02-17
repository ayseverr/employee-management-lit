// localization/index.js
const translations = {
    en: {
      employeesLabel: "Employees",
      addNewButton: "Add New",
      employeeListHeader: "Employee List",
      firstName: "First Name",
      lastName: "Last Name",
      dateOfEmployment: "Date of Employment",
      dateOfBirth: "Date of Birth",
      phone: "Phone",
      email: "Email",
      department: "Department",
      position: "Position",
      actions: "Actions",
      emailLabel: "Email:",
      departmentLabel: "Department:",
      positionLabel: "Position:",
      editButton: "Edit",
      deleteButton: "Delete",
      addNewEmployee: "Add New Employee",
      updateEmployee: "Update Employee",
      saveButton: "Save",
      cancelButton: "Cancel",
      departmentOptions: {
        analytics: "Analytics",
        tech: "Tech"
      },
      positionOptions: {
        junior: "Junior",
        medior: "Mid Level",
        senior: "Senior"
      },
      yesButton: "Yes",
      noButton: "No",
      deleteConfirmation: "Are you sure you want to delete this employee?"
    },
    tr: {
      employeesLabel: "Personeller",
      addNewButton: "Yeni Ekle",
      employeeListHeader: "Personel Listesi",
      firstName: "Ad",
      lastName: "Soyad",
      dateOfEmployment: "İşe Alım Tarihi",
      dateOfBirth: "Doğum Tarihi",
      phone: "Telefon",
      email: "E-posta",
      department: "Departman",
      position: "Pozisyon",
      actions: "İşlemler",
      emailLabel: "E-posta:",
      departmentLabel: "Departman:",
      positionLabel: "Pozisyon:",
      editButton: "Düzenle",
      deleteButton: "Sil",
      addNewEmployee: "Yeni Personel Ekle",
      updateEmployee: "Personel Güncelle",
      saveButton: "Kaydet",
      cancelButton: "İptal",
      departmentOptions: {
        analytics: "Analitik",
        tech: "Teknoloji"
      },
      positionOptions: {
        junior: "Junior",
        medior: "Mid Level",
        senior: "Senior"
      },
      yesButton: "Evet",
      noButton: "Hayır",
      deleteConfirmation: "Bu personeli silmek istediğinize emin misiniz?"
    }
  };
  
  export const getTranslation = (key) => {
    const lang = document.documentElement.lang || 'en';
    return key.split('.').reduce((obj, k) => (obj || {})[k], translations[lang]) || key;
  };