const delay = async (req, res, next) => {

  await new Promise(resolve => setTimeout(resolve, 1000))

  next()

}

module.exports = delay