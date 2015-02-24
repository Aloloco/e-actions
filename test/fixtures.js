module.exports = {
  participants: [
    {
      "first" : "John",
      "last" : "Smith",
      "email" : "john.smith@gmail.com",
      "address" : "21 street street, London",
      "postcode" : "WC1 0RL",
      "wantsUpdates" : true,
      "twitter" : "johnsmith",
      "facebook" : "johnsmith"
    }
  ],
  petitions : [
    {
      "name" : "a descriptive name",
      "title" : "Biofuel sucks and it's not sustainable",
      "active" : true,
      "goal" : 1000,
      "participants" : [],
      "recipients" : [
        {
          "first" : "David",
          "last" : "Cameron",
          "email" : "david.cameron@gov.uk",
          "address" : "10 Downing Street, London, UK",
          "institution" : "Government"
        }
      ],
      "body" : "# Edidit biofuel est \n## Alite femina hoc acutior quid\nLorem markdownum parte poterat e omnia Praescia nebulas, pellis. Ferre sub dumque cum dextris inquit requiemque novemque exoratis faverat auro: in ante inplevitque venit. Si sacra vestes omnis; [anus omen tabe](http://eelslap.com/) continuo, amorem petis.\n\n > Isto hoc ignara cui tota ultor suis perque ficta studiosius, herbas ab ubi\n> abit per! Sedibus Athin, tum Ulixes tetigit caelum *adnuit*. Sed fertur\n> [postquam promittes](http://www.youtube.com/watch?v=MghiBW3r65M) halitus, erat\n> habeat?",
      "context" : "# Edidit semper est \n## Alite femina hoc acutior quid\nLorem markdownum parte poterat e omnia Praescia nebulas, pellis. Ferre sub dumque cum dextris inquit requiemque novemque exoratis faverat auro: in ante inplevitque venit. Si sacra vestes omnis; [anus omen tabe](http://eelslap.com/) continuo, amorem petis.\n\n > Isto hoc ignara cui tota ultor suis perque ficta studiosius, herbas ab ubi\n> abit per! Sedibus Athin, tum Ulixes tetigit caelum *adnuit*. Sed fertur\n> [postquam promittes](http://www.youtube.com/watch?v=MghiBW3r65M) halitus, erat\n> habeat?"
    }
  ],
  // returns a list of bulk actions to initialise the test data
  getBulkPetitionCreates: function getBulkPetitionCreates(opts) {
    var bulks = [
      // {
      //   'delete' : {
      //     '_index': opts.indexName
      //   }
      // }
    ];

    // return a copy
    var createAction = function() {
      return {
        'create' : {
          '_index' : opts.indexName,
          '_type' : opts.typeName
        }
      }
    };

    this.petitions.map(function(p) {
      bulks.push(createAction());
      var newP = JSON.parse(JSON.stringify(p));
      newP.createdDate = new Date();
      bulks.push(newP);
    });

    return bulks;
  },
  makeRandomPetition: function makeRandomPetition() {
    return JSON.parse(JSON.stringify(this.petitions[Math.random() * this.petitions.length | 0]))
  },
  makeRandomParticipant: function makeRandomParticipant() {
    return JSON.parse(JSON.stringify(this.participants[Math.random() * this.participants.length | 0]));
  }
};