// const fakeUser = {
//   username: "usehun",
//   loggedIn: false,
// };

let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Scond Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) => {
  // const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => {
  const { id } = req.params;
  // const id = req.params.id;

  const video = videos[id - 1];

  // return res.send(`Watch video ${req.params.id}`);
  return res.render("watch", { pageTitle: `watching ${video.title}` });
};
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
