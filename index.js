const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const port = 3002;
const { Video } = require("./models");
const Sequelize = require("sequelize");
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
const { encrypt, decrypt } = require("./utils/cipher.helper");



app.use(cors());
app.use('/storage', (req, res, next) => {
  const secretKey = req.header('secret-key');

  if (secretKey === 'your_secret_key') {
    // The 'secret-key' header is present and matches the expected key, allow access
    next();
  } else {
    // The 'secret-key' header is not present or is incorrect, send a 403 Forbidden response
    res.status(403).send('Access Forbidden');
  }
});
app.use("/storage", express.static("storage"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
// static storage folder

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/videos", async (req, res) => {
  const videos = await Video.findAll();
  res.send(videos);
});


app.post("/upload-video", async (req, res) => {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

  const video = req.files.video;
  const videoName = video.name;
  const videoPath = __dirname + "/storage/videos/" + videoName;
  const videoRelativePath = "/storage/videos/" + videoName;

  video.mv(videoPath, async (err) => {

    if(err){
      return res.status(500).send(err);
    }

    const video = await Video.create({
      name: videoName,
      url: videoRelativePath,
    });

    res.json({
      message: "Video uploaded successfully",
      video: video,
    })
  });

});

app.get("/get-video", async (req, res) => {
  const { video_id } = req.query;
  const video = await Video.findOne({
    where: {
      id: video_id,
    },
    attributes: ["name", "url", "created_at"],
  });

  const range = req.headers.range;
  const videoPath = __dirname + video.url;
  const videoSize = fs.statSync(videoPath).size;
  const chunkSize = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });

  stream.pipe(res);

  stream.on("error", (streamErr) => {
    res.end(streamErr);
  });
});

app.post("/get-encrypted-video", async (req, res) => {

  const { video_id } = req.body;

  const video = await Video.findOne({
    where: {
      id: video_id,
    },
    attributes: ["name", [Sequelize.fn("CONCAT", "http://localhost:3002", Sequelize.col('url')), "url"], "created_at"],
  });


  res.json({
    message: "Video url encrypted successfully",
    encryptedUrl: encryptedUrl,
  });
  

});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
