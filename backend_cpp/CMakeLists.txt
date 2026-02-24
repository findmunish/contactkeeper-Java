cmake_minimum_required(VERSION 3.16)
project(backend_cpp_drogon_starter LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find Drogon (install via package manager or vcpkg; see README)
find_package(Drogon CONFIG REQUIRED)

add_executable(backend
    src/main.cpp
    src/filters/JwtAuthFilter.cc
    src/controllers/AuthController.cc
    src/controllers/UsersController.cc
    src/controllers/ContactsController.cc
)

target_include_directories(backend PRIVATE src)
target_link_libraries(backend PRIVATE Drogon::Drogon)
