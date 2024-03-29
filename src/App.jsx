import React from "react";
import { useState } from "react";
import axios from "axios";
import web3 from "./web3";
import { useEffect } from "react";
import instance from "./factory";

const App = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [hash, setHash] = useState("");
  const [url, setURL] = useState("");

  const [accounts, setAccounts] = useState([]);

  const captureFile = async (event) => {
    event.preventDefault();
    const data = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const fileBuffer = new File([arrayBuffer], data.name, {
        type: data.type,
      });
      setFile(fileBuffer);
      setFileName(data.name);
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        //storing a file on ipfs
        const formData = new FormData();
        formData.append("file", file);
        const pinata_api_key = process.env.REACT_APP_PINATA_API_KEY;
        const pinata_secret_api_key = process.env.REACT_APP_PINATA_API_SECRET;
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: pinata_api_key,
            pinata_secret_api_key: pinata_secret_api_key,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgURL = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        setHash(resFile.data.IpfsHash);
        setURL(ImgURL);
        console.log(ImgURL);
        //storing a file on blockchain

        const accounts = await web3.eth.getAccounts();
        await instance.methods.set(hash).send({ from: accounts[0] });
        console.log("File hash stored on the blockchain");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>View PDF</h2>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} />
        <input type="submit" />
      </form>
      {url && (
        <iframe
          src={url}
          title="PDF Viewer"
          width="100%"
          height="600px"
          frameBorder="0"
        ></iframe>
      )}
    </div>
  );
};

// require("dotenv").config();
export default App;
