# API Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user in the system. It validates the input data, checks for existing users, hashes the password, and creates a new user in the database.

### Request Body:
The following fields are required in the request body:

| Field       | Type   | Requi red | Description                              |
|-------------|--------|----------|------------------------------------------|
| `firstName` | String | Yes      | The first name of the user (min 1 char).|
| `lastName`  | String | No       | The last name of the user (optional).   |
| `email`     | String | Yes      | The email address of the user.          |
| `password`  | String | Yes      | The password for the user (min 6 chars).|

### Example Request:
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Responses:

| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| 201         | User successfully registered. Returns a token and user details. |
| 400         | Validation error or user already exists. Returns error details.|
| 500         | Internal server error.                       |

### Example Success Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "_id": "64f1b2c3d4e5f6a7b8c9d0e1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com"
    }
}
```

### Example Error Response:
```json
{
    "errors": [
        {
            "msg": "Invalid email format",
            "param": "email",
            "location": "body"
        }
    ]
}
```
---



# API Documentation

## `/users/profile`
**Method:** `GET`  
**Description:** Fetch the profile of the currently authenticated user.  
**Authentication:** Required (Token-based).  

### Request Headers:
- `Authorization`: Bearer token or `token` cookie.

### Response:
- **200 OK**  
  ```json
  {
    "user": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      
    }
  }
  ```
- **401 Unauthorized**  
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## `/users/logout`
**Method:** `GET`  
**Description:** Logs out the user by blacklisting the token.  
**Authentication:** Required (Token-based).  

### Request Headers:
- `Authorization`: Bearer token or `token` cookie.

### Response:
- **200 OK**  
  ```json
  {
    "message": "Logout success"
  }
  ```
- **401 Unauthorized**  
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## `/users/login`
**Method:** `POST`  
**Description:** Authenticates the user and returns a token.  

### Request Body:
- `email` (string, required): The user's email.  
- `password` (string, required): The user's password.  

### Response:
- **200 OK**  
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      // other user details
    }
  }
  ```
- **400 Bad Request**  
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 4 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
- **401 Unauthorized**  
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## Endpoint: `/captain/register`

### Method: POST

### Description:
This endpoint is used to register a new captain in the system. It validates the input data, checks for existing captains, and creates a new captain in the database. A token is generated upon successful registration.

### Request Body:
The following fields are required in the request body:

| Field       | Type   | Required | Description                              |
|-------------|--------|----------|------------------------------------------|
| `firstName` | String | Yes      | The first name of the captain (min 1 char). |
| `lastName`  | String | No       | The last name of the captain (optional). |
| `email`     | String | Yes      | The email address of the captain.        |
| `password`  | String | Yes      | The password for the captain (min 6 chars). |
| `Vplate`    | String | Yes      | The vehicle plate number of the captain. |
| `Vtype`     | String | Yes      | The type of vehicle (must be one of: `car`, `bike`, `auto`). |

### Example Request:
```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "password": "securepassword",
    "Vplate": "ABC1234",
    "Vtype": "car"
}
```

### Responses:

#### Success Response:
| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| 201         | Captain successfully registered. Returns a token and captain details. |

Example:
```json
{
    "message": "Captain registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "_id": "64f1b2c3d4e5f6a7b8c9d0e1",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane.doe@example.com",
        "Vplate": "ABC1234",
        "Vtype": "car",
        "status": "inactive",
        "location": {
            "lat": 0,
            "lng": 0
        }
    }
}
```

#### Error Responses:
| Status Code | Description                                   |
|-------------|-----------------------------------------------|
| 400         | Validation error or captain already exists. Returns error details. |
| 500         | Internal server error.                       |

Example Validation Error:
```json
{
    "errors": [
        {
            "msg": "Invalid email format",
            "param": "email",
            "location": "body"
        }
    ]
}
```

Example Captain Already Exists:
```json
{
    "error": "Captain with this email already exists"
}
```

Example Internal Server Error:
```json
{
    "error": "Internal server error"
}
```
