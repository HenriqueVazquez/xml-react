export function GetTypeEmission(key?: any) {
  if (key) {
    let getMod = key.substr(
      9,
      11
    );

    let mod = parseInt(getMod.substr(
      0,
      1
    ))

    console.log(mod)
    return mod
  }
}