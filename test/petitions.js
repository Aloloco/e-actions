var should = require("should");

describe('Petition', function(){

  var petitions = require('../src/petitions')();

  describe('#getAllPetitions', function() {
    it('should have a getAllPetitions Method', function() {
      petitions.getAllPetitions.should.be.a.function;
    });
    it('should not throw', function() {
      petitions.getAllPetitions.should.not.throw();
    });
  });

  describe('#getLatestPetitions', function() {
    it('should have a getLatestPetitions method', function() {
      petitions.getLatestPetitions.should.be.a.function;
    });
    it('should not throw', function() {
      petitions.getLatestPetitions.should.not.throw();
    });
  });

  describe('#searchForPetitions', function() {
    it('should have a searchForPetitions method', function () {
      petitions.searchForPetitions.should.be.a.function;
    });
    it('should not throw', function() {
      petitions.searchForPetitions.should.not.throw();
    });
  });

  describe('#getPetitionById', function () {
    it('should have a getPetitionById method', function() {
      petitions.getPetitionById.should.be.a.function;
    });
    it('should not throw', function() {
      petitions.getPetitionById.should.not.throw();
    });
  });

  describe('#createPetition', function () {
    it('should have a createPetition mehod', function () {
      petitions.createPetition.should.be.a.function;
    });
    it('should not throw', function() {
      petitions.createPetition.should.not.throw();
    });
  });

  describe('#deletePetitionById', function () {
    it('should have a deletePetitionById method', function () {
      petitions.deletePetitionById.should.be.a.function;
    });
    it('should not throw', function() {
      petitions.deletePetitionById.should.not.throw();
    });
  });

  describe('#updatePetition', function() {
    it('should have a updatePetition method', function () {
      petitions.updatePetition.should.be.a.function;
    });
    it('should not throw', function() {
      petitions.updatePetition.should.not.throw();
    });
  });

  describe('#signPetition', function () {
    it('should have a signPetition method', function () {
      petitions.signPetition.should.be.a.function;
    });
    it('should not throw', function() {
      petitions.signPetition.should.not.throw();
    });
  });

});
