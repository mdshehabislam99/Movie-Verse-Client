import React, { use, useState } from "react";

const User = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  const HandleAdduser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);

    const newUser = { name, email };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After post data", data);
        const prevUsers = [...prevUsers, data];
        setUsers(prevUsers);
        e.target.reset(prevUsers);
      });
  };
  return (
    <div>
      <div>
        <h3>Add a user</h3>
        <form onSubmit={HandleAdduser}>
          <input type="text" name="name" />
          <br />
          <input type="email" name="email" id="" />
          <button>Add User</button>
        </form>
      </div>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.name} Email:{user.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default User;

/*
have to send request object to the server
1. mention method: post
2. mention header: about  json data in the property of
 content-type:application/json

 3.body: JSON.strigify(newUser)

*/
