# Installation
- npm install -g sequelize-cli
- npm i -g sequelize
- npm i body-parser cors mysql2
- npm i -g nodemon
- npm i bcrypt jsonwebtoken

# Initialize
- sequelize init

# Setup Database Table
- sequelize model:generate --name User --attributes user_id:INTEGER,username:STRING,email:STRING,password:STRING,profile_picture:STRING
- sequelize model:generate --name Post --attributes user_id:INTEGER,description:STRING,image:STRING
- sequelize model:generate --name Comment --attributes user_id:INTEGER,post_id:INTEGER,description:STRING
- sequelize model:generate --name Relationship --attributes followers:INTEGER,following:INTEGER
- sequelize model:generate --name Like --attributes user_id:INTEGER,post_id:INTEGER

# Setup File
- folder config - config.json
- folder models - index.js

# Generate Model
sequelize db:migrate

# User
- http://localhost:8080/users/registration
- http://localhost:8080/users/show