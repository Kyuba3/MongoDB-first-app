const Employee = require('../employees.model');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw an error if no attribiutes given', () => {
    const emp = new Employee();
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });
  it('should throw an error if given attribute is not a string', () => {
    const cases = [{}, []];
    for(let employee of cases){
      const emp = new Employee({ firstName: employee, lastName: employee, department: employee});
      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      });
    }
  });
  it('should throw an error if given data miss other needed arguments', () => {
    const cases = [
      {firstName: 'John', lastName: 'Doe'},
      {firstName: 'John'},
      {lastName: 'Doe', department: 'IT'},
    ];
    for(let employee of cases){
      const emp = new Employee(employee);
      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });
  it('should not throw an error if given data is correct', () => {
    const cases = [
      {firstName: 'John', lastName: 'Doe', department: 'IT'},
      {firstName: 'Amanda', lastName: 'Jefferson', department: 'Marketing'},
    ];
    for(let employee of cases){
      const emp = new Employee(employee);
      emp.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});