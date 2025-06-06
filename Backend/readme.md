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
