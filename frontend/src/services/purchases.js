import http from "../http-common";
import * as Cookies from "js-cookie";

class PurchaseDataService {
  getAll(data) {
    return http.post("/test-list", data, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }


  getAllRequests(data) {
    return http.post("/purchase-request-list", data, {
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
  

  update(id, data) {
    return http.put(`/purchase-request/${id}`, data, {
      body : data,
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }


  delete(id) {
    return http.delete(`/purchase-request/${id}`, {
      headers: { 'Authorization' : Cookies.get('session') }
    });
  }

}

export default new PurchaseDataService();