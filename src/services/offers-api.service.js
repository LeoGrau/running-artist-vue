/* eslint-disable prettier/prettier */
import http from "../../core/services/http-common";

export class OffersApiService {
  getAll() {
    return http.get("/offers");
  }

  getById(id) {
    return http.get(`/offers/${id}`);
  }

  create(data) {
    return http.post("/offers", data);
  }

  update(id, data) {
    return http.put(`/offers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/offers/${id}`);
  }

  findByTitle(title) {
    return http.get(`/offers?title=${title}`);
  }
}
