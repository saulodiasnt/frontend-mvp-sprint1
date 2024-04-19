module.exports = function (currentePage, page) {
  return currentePage === page
    ? "text-white"
    : "text-gray-300 hover:text-white";
};
