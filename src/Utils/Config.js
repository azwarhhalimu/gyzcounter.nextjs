const app_name = "CV Gyz Counter";

const path_admin = "admin";
const key = "re9w0re908";
const token = (generating_token) => {
  return "token";
};
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  var url = "http://localhost/api_dusman/";
} else {
  var url = "https://dusman.dp3akotabaubau.com/";
}

const baseUrl = (uri) => {
  return url + "index.php/" + uri;
};

const urlEncode = (url) => {
  url = url.replaceAll(" ", "-").toLowerCase();
  url = url.replaceAll("(", "").toLowerCase();
  url = url.replaceAll(")", "").toLowerCase();
  return url.replaceAll("/", "-");
};

const random = () => {
  const min = 1;
  const max = 100;
  const rand = min + Math.random() * (max - min);
  return rand;
}
export { path_admin, baseUrl, token, app_name, urlEncode, key, random };
