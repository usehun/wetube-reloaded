import mongoose from "mongoose";

// export const formatHashtags = (hashtags) =>
//   hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true, trim: true, maxLenght: 30 },
  // title : {type : String} 위와는 같은 코드
  description: { type: String, require: true, trim: true, minLength: 10 },
  createAt: { type: Date, require: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, require: true },
    rating: { type: Number, default: 0, require: true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
