export function GetModel(key?: any) {
  if (key) {
    let getMod = key.substr(
      20,
      23
    );

    let mod = parseInt(getMod.substr(
      0,
      2
    ))


    return mod
  }
}