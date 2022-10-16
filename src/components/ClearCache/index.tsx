export function ClearCache(setJsonXmlList: any, setSystemList: any, setMissingNote: any) {
  const fileInputXML = document.getElementById("sendXML");
  const fileInputExcel = document.getElementById("sendExcel")
  setJsonXmlList([])
  setSystemList([])
  setMissingNote([])


  console.log(fileInputXML)

  // @ts-ignore: Object is possibly 'null'.
  fileInputXML.value = "";
  // @ts-ignore: Object is possibly 'null'.
  fileInputExcel.value = "";




}