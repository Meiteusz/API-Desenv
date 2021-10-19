const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'users.json');

const getUsers = () => {
    const data = fs.existsSync(filePath)

    ? fs.readFileSync(filePath)
    : []

    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {

    const usersList = getUsers();

    app.route('/users/:id?')
        .get((req, res) => {   

            res.send({ usersList });
        })
        .post((req, res) => { 

            usersList.push(req.body)
            saveUser(usersList);

            res.status(201).send('User registered!');
        })
        .put((req, res) => {
            
            saveUser(usersList.map(user => {
                if(user.id === req.params.id){
                    return{
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))

            res.status(200).send('User updated!')
        })
        //EP 2 - DIGITAL INOVATION - NODE.JS
}

module.exports = userRoute;