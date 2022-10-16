export function GetModel(key: any) {
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