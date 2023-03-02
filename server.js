const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const SongModel = require("./models/song");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Get all song list
app.get("/get-all-songs", async (req, res) => {
  try {
    const allSongs = await SongModel.find();
    res.send(allSongs);
  } catch (error) {
    console.log(error);
  }
});

// Get a song
app.get("/get-song/:songId", async (req, res) => {
  const song = await SongModel.findById(req.params.songId);
  try {
    if (song == null) {
      res.status(404).send("Song Not Found");
    }
    res.send(song);
  } catch (error) {
    console.log(error);
  }
});

// Add Song
app.post("/add-song", async (req, res) => {
  const newSong = new SongModel(req.body);
  try {
    await newSong.save();
    console.log('Add Song Successful');
  } catch (error) {
    response.status(500).send(error);
  }
});

// Update Song
app.put("/update-song/:songId", async (req, res) => {
  const song = await SongModel.findById(req.params.songId);
  try {
    if (song == null) {
      res.status(404).send("Song Not Found");
    }
    await SongModel.findByIdAndUpdate(req.params.songId, req.body);
    song.title = req.body['title'];
    song.artist = req.body['artist'];
    song.album = req.body['album'];
    song.gener = req.body['gener'];
    song.save();
    res.send(song);
  } catch (error) {
    console.log(error);
  }
});

// Remove/Delete Song
app.delete("/delete-song/:songId", async (req, res) => {
  const song = await SongModel.findById(req.params.songId);
  try {
    if (song == null) {
      res.status(404).send("Song Not Found");
    }
    await SongModel.findByIdAndRemove(req.params.songId);
    res.send("Song Deleted Successfully");
  } catch (error) {
    console.log(error);
  }
});

var port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Backend Running at ${port}`);
});
