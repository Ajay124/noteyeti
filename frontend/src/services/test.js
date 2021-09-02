import http from "../http-common";
import * as Cookies from "js-cookie";

class TestDataService {
  getAll(data) {
    return http.post("/test-list", data, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }


  getAllViral(data) {
    return http.post("/viral-list", data, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }


  get(id) {
    return http.get(`/test/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  create(data) {
    return http.post("/test", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  typeCreate(data) {
    return http.post("/test-type", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  typeUpdate(id, data) {
    return http.put(`/test-type/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  update(id, data) {
    return http.put(`/test/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  viralUpdate(id, data) {
    return http.put(`/viral/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  delete(id) {
    return http.delete(`/test/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

}

export default new TestDataService();