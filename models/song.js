const mongoose = require("mongoose")

const SongSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    artist:{
        type: String,
        required: true,
    },
    album:{
        type: String,
        required: false
    },
    gener:{
        type: String,
        required: true
    }
  }, 
);

module.exports = mongoose.model("SongTB", SongSchema);