#Use node 18
FROM node:18

# Work space
WORKDIR /usr/src/app

# copy json archv
COPY package*.json ./

# Install depe
RUN npm install

# Copy all the code
COPY . .

# Port 
EXPOSE 3000

# Run
CMD ["npm", "start"]
