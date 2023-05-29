import axios from "axios";

 
export default async (req, res) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8081/myWebService',
        headers: { 
          'Content-Type': 'text/xml'
        },
        data : req.body.data
      };

    const response =await axios.request(config).then(async (response) => {return response.data})
    console.log("🚀 ~ file: soap.js:16 ~ response:", response)
    res.status(200).send(response)
}