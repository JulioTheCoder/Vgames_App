

const getParams=(req, res, next) =>{
  let param = req.params.name;
  console.log(param);
  res.send(param)
  

}
module.exports = {
  getParams
}