import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  // title : {type : String} 위와는 같은 코드
  description: String,
  createAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
