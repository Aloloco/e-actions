var should = require("should");


describe('Petition', function(){

  var esOptions = {
    host : 'localhost:9200',
    indexName : 'e-actions-test',
    typeName : 'petitions'
  }

  var fixtures = require('./fixtures');
  var esbootstrap = require('esbootstrap');
  var petitions = require('../src/petitions')(esOptions);
  var samplePetitionId = "AUu9CrmtiWs-IsxPMlVb"

  before(function(done) {

    var bootstrapOptions = {
      elasticsearch : {
        host : esOptions.host,
        log : 'error'
      },
      indexName: esOptions.indexName,
      createRequestBody: {
        index : esOptions.indexName
      },
      mappingRequestBody: {
        index: esOptions.indexName,
        type : esOptions.typeName,
        body : require('../data_models/petition')
      },
      fixtures : fixtures.getBulkPetitionCreates(esOptions)
    };

    esbootstrap.bootstrap(bootstrapOptions, function() {
      done();
    })
  });


  describe('#getAllPetitions', function() {
    it('should have a getAllPetitions Method', function() {
      petitions.getAllPetitions.should.be.a.function;
    });
    it('should return all petitions', function(done) {

      petitions.getAllPetitions(function(err, response) {
        should.not.exist(err);
        response.should.be.an.array;
        done();
      });

    });
  });

  describe('#getLatestPetitions', function() {
    it('should have a getLatestPetitions method', function() {
      petitions.getLatestPetitions.should.be.a.function;
    });
    it('should return the latest petitions', function(done) {
      petitions.getLatestPetitions(10, function(err, response) {
        should.not.exist(err);
        response.should.be.an.array;
        done();
      });
    });
  });

  describe('#searchForPetitions', function() {
    it('should have a searchForPetitions method', function () {
      petitions.searchForPetitions.should.be.a.function;
    });
    it('should return some kind of result', function(done) {
      petitions.searchForPetitions('biofuel', function(err, response) {
        should.not.exist(err);
        response.should.be.an.array;
        done();
      });
    });
  });

  describe('#getPetitionById', function () {
    it('should have a getPetitionById method', function() {
      petitions.getPetitionById.should.be.a.function;
    });
    it('should return a petition', function(done) {
      petitions.__client.create({
        index: esOptions.indexName,
        type: esOptions.typeName,
        body: fixtures.makeRandomPetition()
      }).then(function(resp) {
        petitions.getPetitionById(resp._id, function(err, petition) {
          should.not.exist(err);
          petition.should.be.an.object;
          petition._id.should.equal(resp._id);
          done();
        });
      });
    });
  });

  describe('#createPetition', function () {
    it('should have a createPetition mehod', function () {
      petitions.createPetition.should.be.a.function;
    });
    it('should create a petition correctly', function(done) {
      petitions.createPetition(fixtures.makeRandomPetition(), function(err, response) {
        should.not.exist(err);
        response._id.should.be.a.string;
        response.created.should.be.true;
        done();
      });
    });
  });

  describe('#updatePetition', function() {

    it('should have a updatePetition method', function () {
      petitions.updatePetition.should.be.a.function;
    });
    it('should update a petition properly', function(done) {
      petitions.__client.create({
        index: esOptions.indexName,
        type: esOptions.typeName,
        body: fixtures.makeRandomPetition()
      }).then(function(resp) {
        console.log(resp)
        petitions.updatePetition({
          id: resp._id,
          updates : {
            name : 'new petition name'
          }
        }, function(err, response) {
          should.not.exist(err);
          done()
        })
      });
    });
  });


  describe('#deletePetitionById', function () {
    it('should have a deletePetitionById method', function () {
      petitions.deletePetitionById.should.be.a.function;
    });
    it('should delete a petition properly', function(done) {
      petitions.__client.create({
        index: esOptions.indexName,
        type: esOptions.typeName,
        body: fixtures.makeRandomPetition()
      }).then(function(resp) {
        petitions.deletePetitionById(resp._id, function(err, response) {
          should.not.exist(err);
          response._id.should.equal(resp._id);
          response.found.should.be.true;
          done();
        });
      });
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
