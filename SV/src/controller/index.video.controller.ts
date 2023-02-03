import { Request, request, Response } from "express";
const fs = require("fs");


class indexVideo {
public async video(req: Request, res:Response){
  const range:any = req.headers.range
  console.log(range)
 if (!range) {
   res.status(400).send("Requires Range header");
 }
 const videoPath ="public/video/pexels-koolshooters-7692019.mp4";

 const videoSize = fs.statSync("public/video/pexels-koolshooters-7692019.mp4").size;

 const CHUNK_SIZE = 10 ** 6; // 1MB
 const start = Number(range.replace(/\D/g, ""));
 const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

 const contentLength = end - start + 1;
 const headers = {
   "Content-Range": `bytes ${start}-${end}/${videoSize}`,
   "Accept-Ranges": "bytes",
   "Content-Length": contentLength,
   "Content-Type": "video/mp4",
 };

 res.writeHead(206, headers);

 const videoStream = fs.createReadStream(videoPath, { start, end });

 videoStream.pipe(res);
}


}
const indexVideoStreaming = new indexVideo();
export default indexVideoStreaming;
