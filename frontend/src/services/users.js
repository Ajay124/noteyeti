import http from "../http-common";
import * as Cookies from "js-cookie";

class UserDataService {
  getAll(data) {
    return http.post("/admin/users-list", data, {
      headers: { 'Authorization' : 'Bearer '+Cookies.get('session') }
    });
  }

  getManagers(data) {
    return http.post("/users-managers", data, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  getUserDetail(data) {
    return http.get("/user-detail", {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  get(id) {
    return http.get(`/users/${id}`, {
      //headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  create(data) {
    return http.post("/users", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  update(id, data) {
    return http.put(`/users/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  delete(id) {
    return http.delete(`/users/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByTitle(title) {
    return http.get(`/users?title=${title}`);
  }

  login(data) {
    return http.post("/login", data);
  }

  loginStatus(data) {
    return http.post("/login-status", data);
  }

  getUserTypes() {
    return http.get("/user-type-list", {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  region() {
    return http.get("/region", {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  states() {
    return http.get("/states", {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  area(data) {
    return http.post("/area", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  cities(data) {
    return http.post("/cities", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  rsmList(data) {
    return http.post("/rsm-list", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  asmList(data) {
    return http.post("/asm-list", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }
  verifyEmail(data) {
    return http.post("/verify-email", data);
  }
}

export default new UserDataService();