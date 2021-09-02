import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:3001",
  baseURL: "http://dev7.invitocreatives.com/",
  headers: {
    "Content-type": "application/json"
  }
});