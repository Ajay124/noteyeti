import http from "../http-common";
import * as Cookies from "js-cookie";

class DietExerciseDataService {
  getAll(data) {
    return http.post("/dietexercise-list", data, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }


  get(id) {
    return http.get(`/dietexercise/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  create(data) {
    return http.post("/dietexercise", data, {
      data : data,
      headers: { 
        'Authorization' : Cookies.get('session'),
        //'content-type': 'multipart/form-data' 
      }
    });
  }

  update(id, data) {
    return http.put(`/dietexercise/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  delete(id) {
    return http.delete(`/dietexercise/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

}

export default new DietExerciseDataService();