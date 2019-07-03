# Movie's Rental Store API

This is a REST API designed to serve rental stores.

> ___
> This is not a real project, it's a job interview simple test
> ___

### Statistics

* Total time spent: about 7 hours


## Database Schema

List of mariadb tables schema

| | | | | |
| --- | --- | --- | --- | --- |
| **users** | id | name | email | password
| **stores** | id | name
| **movies** | id | title | director
| **stocks** | store_id | movie_id | stock
| **rented_movies** | user_id | store_id | movie_id

Note: All tables have additional timestamp fields

## Response resources

Resources schema explained

| User | Store | Movie |
| --- | --- | --- |
| id | id | id |
| name | name | title |
| email | [.movies] * | director |
| password ** |   | [.stores] * |

_* computed property_

_** encrypted and hidden_

### Computed properties

| Name | Fields | Notes |
| --- | --- | --- |
| store.movies | [{ ...Movie, stock: Int }] | List of movies from this store + stock count
| movie.stores | [{ id, name }] | List of stores that hold copies of this movie

## Endpoints

List of API endpoints

---

### GET /users

List all users

---

### POST /users

Create a new user

Request Parameters:

| Parameter | Type |
| --- | --- |
| name | String
| email | String
| password | String

Response:

| HTTP Code | Data | Notes |
| --- | --- | --- |
| 201 | User Object | The created user as JSON
| 400 | { message } | Useful error message

---

### POST /login

Get a valid JWT access_token to access API protected endpoints

Request Parameters:

| Parameter | Type |
| --- | --- |
| email | String
| password | String

Response:

| HTTP Code | Data | Notes |
| --- | --- | --- |
| 200 | { access_token, user } | Access token is required to POST requests
| 403 | { message } | Unauthorized

---

### GET /movies

List of available movies

Accept query strings:

| Query String | Notes |
| --- | --- |
| q | Filter movies by title

Response:

| HTTP Code | Data | Notes |
| --- | --- | --- |
| 200 | Array[Movie]
| 403 | | Unauthorized

---

### GET /stores

List of available stores

Response:

| HTTP Code | Data | Notes |
| --- | --- | --- |
| 200 | Array[Store]
| 403 | | Unauthorized

---

### GET /stores/:store_id/movies

List of available movies from a specific store

Response:

| HTTP Code | Data | Notes |
| --- | --- | --- |
| 200 | Array[Movie]
| 403 | | Unauthorized

---

### POST /rent_movie

Request Parameters:

| Parameter | Type | Notes |
| --- | --- | --- |
| store_id | Int
| movie_id | Int
| quantity | Int | Default: 1

Response:

| HTTP Code | Data | Notes |
| --- | --- | --- |
| 200 | { success: true }
| 403 | { message } | Unauthorized or Out of stock

---

### POST /return_movie

Request Parameters:

| Parameter | Type | Notes |
| --- | --- | --- |
| store_id | Int
| movie_id | Int
| quantity | Int | Default: 1

Response:

| HTTP Code | Data | Notes |
| --- | --- | --- |
| 200 | { success: true }
| 403 | { message } | Unauthorized or Invalid devolution

---
