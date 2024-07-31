
exports.getCreateHome = (req, res, next) => {
  res.render("./home", {
    pageTitle: "Home",
    bodyText: "Placeholder text",
  });
};
