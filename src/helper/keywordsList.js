import http from "./http.js";

const keywordsList = async () => {
  const res = await http.get("/oauth/getKeywords");
  return res;
};

export default keywordsList();
