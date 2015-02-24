// the handler for the petitions.
var elasticsearch = require('elasticsearch');
var validator = require('./validator')();
var _ = require('lodash');

module.exports = function Petitions(options) {

  var client = new elasticsearch.Client({
    host: options.host,
    log: 'error'
  });

  var indexName = options.indexName;
  var typeName = options.typeName;

  // PRIVATE METHODS
  // processes a petition
  function processPetition(petition) {
    petition.createdDate = new Date();
    // XXX fix the petition
    return petition;
  }

  // PUBLIC METHODS
  return {
    // expose the client for testing (you shouldn't do that)
    __client : client,
    // gets all available petitions
    getAllPetitions: function getAllPetitions(callback) {
      client.search({
        index : indexName,
        type : typeName,
        body : {
          query: {
            match_all: {}
          }
        }
      }).then(function(resp) {
        callback(null, resp.hits.hits);
      }, function(err) {
        callback(err);
      });
    },

    // gets the latest petitions
    getLatestPetitions: function getLatestPetitions(howMany, callback) {
      howMany = howMany || 10;
      // todo
      client.search({
        index: indexName,
        type: typeName,
        body: {
          query: {
            match_all : {}
          },
          size: howMany,
          sort: [
            {
              createdDate : {
                order: 'desc'
              }
            }
          ]
        }
      }).then(function(resp) {
        callback(null, resp.hits.hits);
      }, function(err) {
        callback(err);
      });
    },

    // gets petitions based on a search term
    searchForPetitions: function searchForPetitions(query, callback) {
      client.search({
        index: indexName,
        type: typeName,
        q: query
      }).then(function(resp) {
        callback(null, resp.hits.hits);
      }, function(err) {
        callback(err);
      })
    },

    // gets a petition by id
    getPetitionById: function getPetitionById(petitionId, callback) {
      client.get({
        index: indexName,
        type: typeName,
        id: petitionId
      }).then(function(resp) {

        if (!resp.found) {
          callback(new Error('Could not find petition with id', petitionId, resp))
        }

        callback(null, resp);
      }, function(err) {
        callback(err);
      });
    },

    // creates a petition from a data object
    createPetition: function createPetition(petition, callback) {

      var valid = validator.validatePetition(petition);

      if (!valid) {
        return callback(new Error("Petition invalid", petition));
      }


      client.create({
        index: indexName,
        type: typeName,
        body: processPetition(petition)
      }).then(function(resp) {
        callback(null, resp);
      }, function(err) {
        callback(err);
      });
    },

    // deletes a petition from an id
    deletePetitionById: function deletePetitionById(petitionId, callback) {
      if (typeof petitionId === 'undefined') {
        return callback(new Error('must pass a petitionId'))
      }
      client.delete({
        index: indexName,
        type: typeName,
        id: petitionId
      }).then(function(resp) {
        callback(null, resp);
      }, function(err) {
        callback(err);
      });
    },

    // updates a petition from a data object
    updatePetition: function updatePetition(petition, callback) {
      if (typeof petition.id === 'undefined') {
        return callback(new Error('must pass a petitionId'));
      }
      if (typeof petition.updates === 'undefined') {
        return callback(new Error('must pass some updates'));
      }

      client.update({
        index: indexName,
        type: typeName,
        id: petition.id,
        body: {
          doc: petition.updates
        }
      }).then(function(resp) {
        callback(null, resp);
      }, function(err) {
        callback(err);
      });
    },

    // signs a petition given a user, i.e. adds
    // a user to a petition.
    addUserToPetition : function addUserToPetition(petitionId, participant, callback) {
      // add user
      this.getPetitionById(petitionId, function(err, resp) {
        if (err) {
          return callback(err);
        }

        if (!resp._source.active) {
          return callback(new Error("Cannot add participant to inactive petition"));
        }

        // test if participant has signed already;
        var participants = resp._source.participants;
        if (_.findWhere(participants, { email : participant.email })) {
          return callback(new Error("Participant has already signed the petition", participant))
        }
        // XXX send email if validate

        // update petition
        client.update({
          index : indexName,
          type : typeName,
          id: petitionId,
          body: {
            script: "ctx._source.participants += new_participant",
            params: {
              new_participant: participant
            }
          }
        }).then(function(resp) {
          callback(null, resp);
        }, function(err) {
          callback(err);
        });

      });

    }

  }

}