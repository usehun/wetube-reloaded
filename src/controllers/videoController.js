// const fakeUser = {
//   username: "usehun",
//   loggedIn: false,
// };

import Video from "../models/Video";

// Video.find({}, (error, videos) => {
//   if(error) {
//     return res.render("server-error");
//   } else
//   return res.render("home", { pageTitle: "Home", videos });
// });  콜백 함수

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("error");
  }
};
export const watch = async (req, res) => {
  const { id } = req.params;
  // const id = req.params.id;
  // return res.send(`Watch video ${req.params.id}`);

  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    const video = new Video({
      title: title,
      description: description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    await video.save();

    return res.redirect("/");
  } catch {
    console.log(error);

    return res.render("upload", {
      pageTitle: `Upload Video`,
      errorMessage: error._message,
    });
  }
};
