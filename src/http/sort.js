const sortObj = (obj) => {
  const objKey = Object.keys(obj);
  const _objKeyArray = objKey.sort((a, b) => b.localeCompare(a));
  let sToken = '';
  for (let i = 0; i < _objKeyArray.length; i++) {
    sToken += `${_objKeyArray[i]}=${obj[_objKeyArray[i]]}&`;
  }
  return `${sToken}drop_store`;
};
export default sortObj
