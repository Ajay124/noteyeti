import http from "../http-common";
import * as Cookies from "js-cookie";

class DosdontsDataService {
  getAll(data) {
    return http.post("/dosdonts-list", data, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }


  get(id) {
    return http.get(`/dosdonts/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  create(data) {
    return http.post("/dosdonts", data, {
      data : data,
      headers: { 
        'Authorization' : Cookies.get('session'),
        //'content-type': 'multipart/form-data' 
      }
    });
  }

  typeCreate(data) {
    return http.post("/dosdonts-type", data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  typeUpdate(id, data) {
    return http.put(`/dosdonts-type/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  update(id, data) {
    return http.put(`/dosdonts/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  delete(id) {
    return http.delete(`/dosdonts/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

  quickUpload(data) {
    return http.post(`/quick-upload`, data, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

}

export default new DosdontsDataService();