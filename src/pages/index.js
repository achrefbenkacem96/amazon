import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
 import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import axios from "axios";
import { parseString } from "xml2js";

export default function Home({ products, role }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header role={role}/>
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* product */}
        <ProductFeed products={products}/>
      </main>
    </div>
  );
}

export async function getServerSideProps (context){
  const session = await getSession(context);
  console.log("🚀 ~ file: index.js:27 ~ getServerSideProps ~ session:", session)
  let user
  if (session) {
    user = await axios.get('http://localhost:8090/api/v1/auth/user/'+session.user.email)
    console.log("🚀 ~ file: index.js:32 ~ getServerSideProps ~ user:", user.data)
    
  }
  let role = user?.data?.role || ''
  let data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prod="http://product.eCommerceSoap.example.com/">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <prod:getAllProducts/>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>';

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://127.0.0.1:8081/myWebService',
    headers: { 
      'Content-Type': 'text/xml'
    },
    data : data
  };
  
  const products = await axios.request(config)
    .then(async (response) => {
      let xmlData = response.data;
      console.log("🚀 ~ file: dashboardadmin.js:106 ~ .then ~ response.data:", response.data)
      return new Promise((resolve, reject) => {
        parseString(xmlData, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const products = result["S:Envelope"]["S:Body"][0]["ns2:getAllProductsResponse"][0]?.return;
            console.log("🚀 ~ file: dashboardadmin.js:113 ~ parseString ~ products:", products)
             
            const transformedData = products?.map(product => {
              const id = parseInt(product.id[0]);
              const title = product.title[0];
              const price = parseFloat(product.price[0]);
              const description = product.description[0];
              const category = product.category[0];
              const image = product.image[0];
              const rating = {
                rate: parseFloat(product.rating[0].rate[0]),
                count: parseInt(product.rating[0].count[0])
              };
  
              return {
                id,
                title,
                price,
                description,
                category,
                image,
                rating
              };
            });
  
            console.log(transformedData);
            resolve(transformedData);
          }
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
    console.log("🚀 ~ file: dashboardadmin.js:145 ~ getServerSideProps ~ products:", products)
  return {
    props :{
      products :products || "" ,
      role
    }
  }
}