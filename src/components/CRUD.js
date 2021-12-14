let deployedUrl = "https://ism-journal-server.herokuapp.com";
let localUrl = "http://localhost:4000"

const login = async() => {
    try {
        let res = await fetch(`${deployedUrl}/user/login`, {
          method: "POST",
          body: JSON.stringify({ email: "test@email.com", password: "test" }),
          //body: JSON.stringify({ email: email, password: password }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
  
        let data = await res.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
}

login();