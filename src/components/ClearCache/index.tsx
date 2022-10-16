export function ClearCache(setJsonXmlList: any, setSystemList: any, setMissingNote: any) {
  const fileInputXML = document.getElementById("sendXML");
  const fileInputExcel = document.getElementById("sendExcel")
  setJsonXmlList([])
  setSystemList([])
  setMissingNote([])

  fileInputXML.value = "";
  fileInputExcel.value = "";


}