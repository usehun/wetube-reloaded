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
export const watch = (req, res) => {
  const { id } = req.params;
  // const id = req.params.id;

  // return res.send(`Watch video ${req.params.id}`);
  return res.render("watch", { pageTitle: `watching` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
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
  const video = new Video({
    title: title,
    description: description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  await video.save();

  return res.redirect("/");
};
