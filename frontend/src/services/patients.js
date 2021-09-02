import http from "../http-common";
import * as Cookies from "js-cookie";

class PatientDataService {
  getAll(data) {
    return http.post("/patient-list", data, {
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
    return http.get(`/patient/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  create(data) {
    return http.post("/users", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  update(id, data) {
    return http.put(`/patient/${id}`, data, {
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

}

export default new PatientDataService();