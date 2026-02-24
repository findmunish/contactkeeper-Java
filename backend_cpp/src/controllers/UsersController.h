#pragma once
#include <drogon/HttpController.h>

class UsersController : public drogon::HttpController<UsersController> {
public:
  METHOD_LIST_BEGIN
    ADD_METHOD_TO(UsersController::me, "/api/users/me", drogon::Get, "JwtAuthFilter");
  METHOD_LIST_END

  void me(const drogon::HttpRequestPtr& req,
          std::function<void (const drogon::HttpResponsePtr &)> cb);
};
