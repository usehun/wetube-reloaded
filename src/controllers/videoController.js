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
  const { title, description, hashtags } = req.body;

  const video = await Video.exists({ _id: id });

  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`)),
  });

  await video.save();

  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
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
      hashtags: hashtags,
    });
    await video.save();

    // await Video.create({
    //   title,
    //   description,
    //   hashtags,
    // });

    return res.redirect("/");
  } catch (error) {
    console.log(error);

    return res.render("upload", {
      pageTitle: `Upload Video`,
      errorMessage: error._message,
    });
  }
};
