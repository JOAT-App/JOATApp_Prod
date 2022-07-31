
function getJobCat(category){
  switch (category) {
    case "Lawn care":
      return 1
      break;
    case "Tutor":
      return 2
      break;
    case "Babysitting":
      return 3
      break;
    case "Moving":
      return 4
      break;
    default:
      return 5

  }
}

module.exports = getJobCat;
