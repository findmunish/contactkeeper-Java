#include <drogon/drogon.h>

int main() {
  drogon::app()
    .loadConfigFile("config.json")
    .registerPostHandlingAdvice([](const drogon::HttpRequestPtr&,
                                   const drogon::HttpResponsePtr& resp){
        // Common headers (CORS etc.) can be added here or via a dedicated filter
        resp->addHeader("Access-Control-Allow-Origin", "*");
        resp->addHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
        resp->addHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    })
    .run();
}
