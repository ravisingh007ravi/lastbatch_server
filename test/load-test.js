import autocannon from "autocannon";

const url = "https://api.hartronindia.com/count_visitor";

const instance = autocannon(
  {
    url,
    connections: 100,
    pipelining: 1,
    duration: 10,
    method: "GET"
  },
  (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(autocannon.printResult(result));
  }
);

instance.on("response", (client, statusCode) => {
  // console.log("Response:", statusCode);
});