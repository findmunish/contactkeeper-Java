Great question! Let me show you how to search for collections and documents in your MongoDB container.

## **Method 1: Using MongoDB Shell (mongosh)**

### **Connect to MongoDB Container**


[1 tool called]

Let me provide you with the commands you can use:

## **MongoDB Commands to Search Collections and Documents**

### **1. Connect to MongoDB**
```bash
docker exec -it mongodb mongosh
```

### **2. List All Databases**
```javascript
show dbs
```

### **3. Switch to Your Database**
```javascript
use contactkeeper
```

### **4. List All Collections**
```javascript
show collections
```

### **5. Find All Documents in a Collection**
```javascript
// Find all users
db.users.find()

// Find all contacts
db.contacts.find()
```

### **6. Find Specific Documents**
```javascript
// Find user by email
db.users.find({email: "john@example.com"})

// Find contacts by type
db.contacts.find({type: "personal"})

// Find contacts by user ID
db.contacts.find({user: ObjectId("68cd2de1a5e4ce741370be8c")})
```

### **7. Count Documents**
```javascript
// Count total users
db.users.countDocuments()

// Count total contacts
db.contacts.countDocuments()
```

### **8. Pretty Print Results**
```javascript
// Make output more readable
db.users.find().pretty()
db.contacts.find().pretty()
```

## **Method 2: Using MongoDB Compass (GUI)**

1. **Download MongoDB Compass** from https://www.mongodb.com/products/compass
2. **Connect to**: `mongodb://localhost:27017`
3. **Browse collections** visually

## **Method 3: Using VS Code Extension**

1. **Install MongoDB for VS Code** extension
2. **Connect to**: `mongodb://localhost:27017`
3. **Browse collections** in VS Code

## **Expected Collections in Your App**

Based on your Spring Boot application, you should see:
- **`users`** - User accounts
- **`contacts`** - Contact information

## **Sample Queries for Your App**

```javascript
// See all registered users
db.users.find({}, {name: 1, email: 1, date: 1})

// See all contacts
db.contacts.find({}, {name: 1, email: 1, type: 1, user: 1})

// Find contacts for a specific user
db.contacts.find({user: ObjectId("USER_ID_HERE")})
```

**Would you like me to help you run any specific queries to check your data?**
