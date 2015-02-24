// the handler for the petitions.
var elasticsearch = require('elasticsearch');
var validator = require('./validator')();

module.exports = function Petitions() {

  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  var indexName = "e-action";
  var typeName = "petitions";

  // processes a petition
  function processPetition(petition) {
    petition.createdDate = new Date();
    // XXX fix the petition
    return petition;
  }

  return {

    // gets all available petitions
    getAllPetitions: function getAllPetitions(callback) {
      client.get({
        index : indexName,
        type : typeName
      }).then(function(resp) {
        callback(null, resp.hits.hits);
      }, function(error) {
        callback(err);
      });
    },

    // gets the latest petitions
    getLatestPetitions: function getLatestPetitions(howMany, callback) {
      // todo
      throw new Error('not implemented');
    },

    // gets petitions based on a search term
    searchForPetitions: function searchForPetitions(query, callback) {
      throw new Error('not implemented');
    },

    // gets a petition by id
    getPetitionById: function getPetitionById(petitionId, callback) {
      client.get({
        index: indexName,
        type: typeName,
        id: petitionId
      }).then(function(resp) {
        callback(null, resp);
      }, function(err) {
        callback(err);
      });
    },

    // creates a petition from a data object
    createPetition: function createPetition(petition, callback) {

      var valid = validator.validatePetition(petition);

      if (!valid) {
        callback(new Error("Petition invalid", petition));
      }


      client.post({
        index: indexName,
        type: typeName,
        body: processPetition(petition)
      }).then(function(resp) {
        callback(null, resp);
      }, function(err) {
        callback(err);
      })
    },

    // deletes a petition from an id
    deletePetitionById: function deletePetitionById(petitionId, callback) {
      throw new Error('not implemented');
    },

    // updates a petition from a data object
    updatePetition: function updatePetition(petition, callback) {
      throw new Error('not implemented');
    },

    // signs a petition given a user, i.e. adds
    // a user to a petition.
    signPetition : function signPetition(user, callback) {
      // add user
      // send email
      // update petition
      throw new Error('not implemented');
    }

  }

}