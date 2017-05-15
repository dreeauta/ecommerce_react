const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Promise = require('bluebird');


const pgp = require('pg-promise')(
  {
    promiseLib: Promise
  }
);

const bcrypt = require('bcrypt');
const uuid = (require('uuid'));


const db = pgp({
  database: 'ecommerce_db'
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use(express.static('public'));

app.get('/api/products', (req, resp, next) => {
  db.any('select * from product')
  .then(pages => resp.json(pages))
  .catch(next);
})

app.get('/api/product/:id', (req, resp, next) => {
  let id = req.params.id;
  db.one('select * from product where id = $1', id)
  .then(page => {
    if(page === null) {
      resp.status(404);
      resp.json({
        message: 'Page no found'
      });
    } else {
      resp.json(page);
    }
  })
  .catch(next);
})

/*
Request body shape:
{
  username: "lolcat",
  password: "forthelolz",
  email: "lol@cat.com",
  first_name: "lol",
  last_name: "cat"
}
*/

app.post('/api/user/signup', (req, resp, next) => {
  let data = req.body;
  bcrypt.hash(data.password, 10)
    .then((encryptedPassword) =>
      db.one(`
        insert into customer
        values (default, $1, $2, $3, $4, $5)
        returning username, email, first_name, last_name
        `,
        [data.username,
          data.email,
          encryptedPassword,
          data.first_name,
          data.last_name]
      )
    )
    .then(data => resp.json(data))
    .catch(next);
});

/*
Request body shape:
{
  username: "lolcat",
  password: "forthelolz",
}
*/

app.post('/api/user/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log("hello 1");
  db.one(
    'select * from customer where username = $1',
    [username])
    .then(customer =>
      [customer,
        bcrypt.compare(password, customer.password)])
    .spread((customer, matches) => {
      if (matches) {
        let token = uuid.v4();
        console.log('hello 342');
        return [
          customer,
          db.one(
            `insert into login_session values ($1, default, $2) returning *`, [token, customer.id]
          )
        ];
      } else {
        throw new Error('login failed');
      }
    })
    .spread((customer, loginSession) => {
      console.log(customer);
      console.log(loginSession);
      res.json({
        username: customer.username,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        auth_token: loginSession.token,
        customer_id: customer.id
      });
    });
  });

app.use (function Authenticate(req, res, next) {
  let token = req.query.token || req.body.token;
  db.one('select * from login_session where token = $1', [token])
  .then(data => {
    req.user = data;


    next();

  })
  .catch(err =>
    res.send('Unauthorized user')
  );
});


app.post('/api/shopping_cart', (req, res, next) => {
  let data = req.body;
  // data.auth_token

  // db.any('select * from login_session where customer_id = $1', [req.user.customer_id])

  db.one(`insert into product_in_shopping_cart values (default, $1, $2) returning product_id, customer_id `,
  [data.product_id,
  req.user.customer_id]
 )

.then(data => res.json(data))
.catch(next);
});


app.get('/api/shopping_cart', (req, res, next) => {
  let data = req.body;
  db.any('select * from product_in_shopping_cart as pisc join product as p on (pisc.product_id = p.id) where customer_id = $1 ', [req.user.customer_id])
  .then(data => res.json(data))
  .catch(next);
});

app.use((err, req,resp, next) => {
  resp.status(500);
  resp.json({
    error:err.message,
    stack: err.stack.split('\n')
  });
});


app.listen(4000, () => {
  console.log('listening on port 4000');
});
