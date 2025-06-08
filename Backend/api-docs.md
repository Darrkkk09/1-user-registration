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
