const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({});

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });
  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for(let name of cases){
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw an error if "name" is lower or grater than 5-20 characters', () => {
    
    const cases = ['Mari', 'LoremIpsumLoremIpsumLoremIpsum'];
    
    for(let name of cases){
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should not throw an error if "name" is correct', () => {
    const cases = ['Johny', 'Elizabeth'];
    for(let name of cases){
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});