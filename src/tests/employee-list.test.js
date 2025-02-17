
import { expect } from 'chai';
import sinon from 'sinon';
import { fixture, html } from '@open-wc/testing';
import '../components/employee-list.js';

describe('EmployeeList Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-list></employee-list>`);
  });

  
  it('should render the employee list correctly', () => {
    expect(element).to.exist;
    expect(element.shadowRoot.querySelector('.navbar')).to.exist;
  });

  it('should open the form when clicking Add New', async () => {
    const addButton = element.shadowRoot.querySelector('.navbar .right span:nth-child(2)');
    addButton.click();
    await element.updateComplete;
    expect(element.isFormOpen).to.be.true;
  });




  it('should change language when selecting another flag', async () => {
    element._changeLanguage('tr');
    await element.updateComplete;
    expect(document.documentElement.lang).to.equal('tr');
  });

  it('should correctly paginate the employees', () => {
    const paginated = element._paginate([...Array(20).keys()]);
    expect(paginated.length).to.equal(7);
  });

  it('should call delete when clicking delete button', async () => {
    const spy = sinon.spy(element, '_confirmDelete');
    element._confirmDelete(1);
    expect(spy.calledOnce).to.be.true;
  });
});
