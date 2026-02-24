#include "JwtAuthFilter.h"
#include <drogon/drogon.h>
#include <algorithm>

static bool startsWithBearer(const std::string& s) {
  if (s.size() < 7) return false;
  std::string prefix = s.substr(0,7);
  std::transform(prefix.begin(), prefix.end(), prefix.begin(), ::tolower);
  return prefix == "bearer ";
}

void JwtAuthFilter::doFilter(const drogon::HttpRequestPtr& req,
                             drogon::FilterCallback&& fcb,
                             drogon::FilterChainCallback&& fccb) {
  // Simple stub: require Authorization: Bearer <anything>
  auto auth = req->getHeader("authorization");
  if (!startsWithBearer(auth)) {
    auto res = drogon::HttpResponse::newHttpJsonResponse(
      Json::Value(Json::objectValue));
    Json::Value body;
    body["message"] = "Missing or invalid Authorization header";
    res->setBody(body.toStyledString());
    res->setStatusCode(drogon::k401Unauthorized);
    return fcb(res);
  }
  // In real impl, verify JWT and extract subject/userId
  req->getAttributes()->insert("userId", std::string("demo-user-id"));
  fccb();
}
