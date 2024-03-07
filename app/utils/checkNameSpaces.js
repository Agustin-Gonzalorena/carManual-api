export function checkNameSpaces(name) {
  let result = name.replace(/ /g, "20");
  result = result.replace(/[^\w\s.]/g, "14");

  return result;
}
