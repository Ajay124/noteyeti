import http from "../http-common";
import * as Cookies from "js-cookie";

class CategoryDataService {
  getAll(data) {
    return http.post("/category-list", data, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }


  get(id) {
    return http.get(`/category/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  create(data) {
    return http.post("/category", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  update(id, data) {
    return http.put(`/category/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  delete(id) {
    return http.delete(`/category/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

}

export default new CategoryDataService();