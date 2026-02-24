#include "ContactsController.h"
#include <drogon/drogon.h>
#include <unordered_map>
#include <mutex>

namespace {
std::mutex mtx;
std::unordered_map<std::string, Json::Value> store; // id -> contact
int nextId = 1;

Json::Value parseJson(const drogon::HttpRequestPtr& req) {
  try {
    return *req->getJsonObject();
  } catch (...) {
    return Json::Value(Json::objectValue);
  }
}
}

void ContactsController::list(const drogon::HttpRequestPtr&,
                              std::function<void (const drogon::HttpResponsePtr &)> cb) {
  Json::Value arr(Json::arrayValue);
  {
    std::lock_guard<std::mutex> lock(mtx);
    for (auto& kv : store) {
      arr.append(kv.second);
    }
  }
  auto r = drogon::HttpResponse::newHttpJsonResponse(arr);
  r->setStatusCode(drogon::k200OK);
  cb(r);
}

void ContactsController::create(const drogon::HttpRequestPtr& req,
                                std::function<void (const drogon::HttpResponsePtr &)> cb) {
  auto body = parseJson(req);
  if (!body.isObject()) {
    auto res = drogon::HttpResponse::newHttpJsonResponse(Json::Value({{"message","Invalid JSON"}}));
    res->setStatusCode(drogon::k400BadRequest);
    return cb(res);
  }
  std::string id;
  {
    std::lock_guard<std::mutex> lock(mtx);
    id = std::to_string(nextId++);
    body["_id"] = id;
    store[id] = body;
  }
  auto r = drogon::HttpResponse::newHttpJsonResponse(body);
  r->setStatusCode(drogon::k201Created);
  cb(r);
}

void ContactsController::get(const drogon::HttpRequestPtr&,
                             std::function<void (const drogon::HttpResponsePtr &)> cb,
                             std::string id) {
  Json::Value item;
  {
    std::lock_guard<std::mutex> lock(mtx);
    auto it = store.find(id);
    if (it == store.end()) {
      auto res = drogon::HttpResponse::newHttpJsonResponse(Json::Value({{"message","Not found"}}));
      res->setStatusCode(drogon::k404NotFound);
      return cb(res);
    }
    item = it->second;
  }
  auto r = drogon::HttpResponse::newHttpJsonResponse(item);
  r->setStatusCode(drogon::k200OK);
  cb(r);
}

void ContactsController::update(const drogon::HttpRequestPtr& req,
                                std::function<void (const drogon::HttpResponsePtr &)> cb,
                                std::string id) {
  auto body = parseJson(req);
  if (!body.isObject()) {
    auto res = drogon::HttpResponse::newHttpJsonResponse(Json::Value({{"message","Invalid JSON"}}));
    res->setStatusCode(drogon::k400BadRequest);
    return cb(res);
  }
  Json::Value updated;
  {
    std::lock_guard<std::mutex> lock(mtx);
    auto it = store.find(id);
    if (it == store.end()) {
      auto res = drogon::HttpResponse::newHttpJsonResponse(Json::Value({{"message","Not found"}}));
      res->setStatusCode(drogon::k404NotFound);
      return cb(res);
    }
    // Keep the same id
    body["_id"] = id;
    it->second = body;
    updated = it->second;
  }
  auto r = drogon::HttpResponse::newHttpJsonResponse(updated);
  r->setStatusCode(drogon::k200OK);
  cb(r);
}

void ContactsController::remove(const drogon::HttpRequestPtr&,
                                std::function<void (const drogon::HttpResponsePtr &)> cb,
                                std::string id) {
  bool erased = false;
  {
    std::lock_guard<std::mutex> lock(mtx);
    erased = store.erase(id) > 0;
  }
  if (!erased) {
    auto res = drogon::HttpResponse::newHttpJsonResponse(Json::Value({{"message","Not found"}}));
    res->setStatusCode(drogon::k404NotFound);
    return cb(res);
  }
  auto r = drogon::HttpResponse::newHttpJsonResponse(Json::Value({{"message","Deleted"}}));
  r->setStatusCode(drogon::k200OK);
  cb(r);
}
