#pragma once
#include <drogon/HttpController.h>

class ContactsController : public drogon::HttpController<ContactsController> {
public:
  METHOD_LIST_BEGIN
    ADD_METHOD_TO(ContactsController::list,   "/api/contacts",       drogon::Get,    "JwtAuthFilter");
    ADD_METHOD_TO(ContactsController::create, "/api/contacts",       drogon::Post,   "JwtAuthFilter");
    ADD_METHOD_TO(ContactsController::get,    "/api/contacts/{1}",   drogon::Get,    "JwtAuthFilter");
    ADD_METHOD_TO(ContactsController::update, "/api/contacts/{1}",   drogon::Put,    "JwtAuthFilter");
    ADD_METHOD_TO(ContactsController::remove, "/api/contacts/{1}",   drogon::Delete, "JwtAuthFilter");
  METHOD_LIST_END

  void list   (const drogon::HttpRequestPtr& req,
               std::function<void (const drogon::HttpResponsePtr &)> cb);
  void create (const drogon::HttpRequestPtr& req,
               std::function<void (const drogon::HttpResponsePtr &)> cb);
  void get    (const drogon::HttpRequestPtr& req,
               std::function<void (const drogon::HttpResponsePtr &)> cb,
               std::string id);
  void update (const drogon::HttpRequestPtr& req,
               std::function<void (const drogon::HttpResponsePtr &)> cb,
               std::string id);
  void remove (const drogon::HttpRequestPtr& req,
               std::function<void (const drogon::HttpResponsePtr &)> cb,
               std::string id);
};
