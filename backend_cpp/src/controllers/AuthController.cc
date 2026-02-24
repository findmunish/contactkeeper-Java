#include "AuthController.h"
#include <drogon/drogon.h>

namespace {
Json::Value parseJson(const drogon::HttpRequestPtr& req) {
  try {
    return *req->getJsonObject();
  } catch (...) {
    return Json::Value(Json::objectValue);
  }
}
}

void AuthController::registerUser(const drogon::HttpRequestPtr& req,
                                  std::function<void (const drogon::HttpResponsePtr &)> cb) {
  auto body = parseJson(req);
  // Stub: pretend we created a user
  Json::Value resp(Json::objectValue);
  resp["message"] = "User registered (stub)";
  resp["email"] = body.get("email","").asString();
  auto r = drogon::HttpResponse::newHttpJsonResponse(resp);
  r->setStatusCode(drogon::k201Created);
  cb(r);
}

void AuthController::login(const drogon::HttpRequestPtr& req,
                           std::function<void (const drogon::HttpResponsePtr &)> cb) {
  auto body = parseJson(req);
  // Stub: accept any email/password and return a fake token (do NOT use in prod)
  Json::Value resp(Json::objectValue);
  resp["accessToken"] = "stub.jwt.token"; // replace with real HS256 JWT
  resp["tokenType"] = "Bearer";
  resp["expiresIn"] = 3600;
  auto r = drogon::HttpResponse::newHttpJsonResponse(resp);
  r->setStatusCode(drogon::k200OK);
  cb(r);
}
