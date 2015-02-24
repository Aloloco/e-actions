module.exports = {
  "petitions" : {
    "properties" : {
      "name" : {"type" : "string", "store" : true },
      "title" : {"type" : "string", "store" : true },
      "createdDate" : { "type" : "date" },
      "active" : {"type" : "boolean"},
      "goal" : {"type" : "integer", "null_value" : 1000},
      "participants" : {
        "type" : "nested",
        "properties" : {
          "first" : {"type": "string"},
          "last" : {"type": "string"},
          "email" : {"type" : "string"},
          "address" : {"type" : "string"},
          "postcode" : {"type" : "string"},
          "wantsUpdates" : {"type" : "boolean"},
          "twitter" : {"type" : "string"},
          "facebook" : {"type" : "string"}
        }
      },
      "recipients" : {
        "type" : "nested",
        "properties" : {
          "first" : {"type": "string"},
          "last" : {"type": "string"},
          "email" : {"type" : "string"},
          "address" : {"type" : "string"},
          "institution" : {"type" : "string"}
        }
      },
      "body" : { "type" : "string", "store" : true },
      "context" : { "type" : "string", "store" : true}
    }
  }
}