#include "UsersController.h"
#include <drogon/drogon.h>

void UsersController::me(const drogon::HttpRequestPtr& req,
                         std::function<void (const drogon::HttpResponsePtr &)> cb) {
  auto attrs = req->getAttributes();
  std::string userId = "unknown";
  if (attrs->find("userId") != attrs->end()) {
    userId = attrs->get<std::string>("userId");
  }
  Json::Value resp(Json::objectValue);
  resp["id"] = userId;
  resp["email"] = "demo@example.com";
  resp["name"] = "Demo User";
  auto r = drogon::HttpResponse::newHttpJsonResponse(resp);
  r->setStatusCode(drogon::k200OK);
  cb(r);
}
