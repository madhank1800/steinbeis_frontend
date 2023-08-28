import React from "react";
import { useState } from "react";
import axios from "axios";
import './homePage.css';

const HomePage = () => {
    
    const [userDetails, setUserDetails] = useState({
     username:"", age:'',gender:'',dob:'',Assets:[]
    });

    const [pagechange, setPageChange] = useState(false);


    const [assetDetails, setAssetDetails] = useState({
        assetname: '', quantity: '', cost: ''
    });

    const [items, setItems] = useState([]);


   // const [assetsPage, setAssetsPage] = useState(false);

    function changeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;


        setUserDetails((previous) => {
            return { ...previous, [name]: value }
        });
        console.log("userDEtaikls", userDetails);

    }
    console.log("userDEtaikls", userDetails);
    
    function nextPage() {
        setPageChange(true);   
}

    function assetChangeHandler(event) {
        let name = event.target.name;
        let value = event.target.value;
        setAssetDetails((previous) => {
            return { ...previous, [name]: value }
        });

    }
    
    console.log("assetDetails", assetDetails);

    function AddAssetHandler(){
        setItems(() => {
            return [...items, assetDetails];
        });

        setAssetDetails(() => {
            return {
                assetname:'',quantity:"",cost:""
            }
        })


  setUserDetails((previous) => {
    return {
      ...previous,
      Assets: items,
    };
  });



    

   }
    console.log("items", items);




    async function submitHandler(event) {
        event.preventDefault();


        setUserDetails((previous) => {
            return {
                ...previous, Assets: items
            }
          
        })

        console.log("userDEtaikls", userDetails);
        try {
            let details = await axios.post(
                "http://localhost:3003/routes/userAssetDetails",
                userDetails
            );
            console.log("details", details);
        } catch (error) {
            console.log("error", error);
        }
    }


    return (
      <>
        <form
          onSubmit={submitHandler}
          className=" d-flex justify-content-center align-items-center"
        >
          {!pagechange && (
            <>
              <div className="d-flex flex-column m-4">
                <input
                  type="text"
                  name="username"
                  value={userDetails.username}
                  onChange={changeHandler}
                  placeholder="username"
                  required
                  className="m-2"
                />

                <input
                  type="number"
                  name="age"
                  value={userDetails.age}
                  onChange={changeHandler}
                  placeholder="age"
                  required
                  className="m-2"
                />

                <input
                  type="date"
                  name="dob"
                  value={userDetails.dob}
                  onChange={changeHandler}
                  placeholder="datae of birth"
                  required
                  className="m-2"
                />
                <label htmlFor="gender" className="m-2">
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  onChange={changeHandler}
                  className="m-2"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <input
                  type="button"
                  name="next Page"
                  value="next page"
                  onClick={nextPage}
                  placeholder="next page"
                  required
                  className="m-2"
                />
              </div>
            </>
          )}
          {pagechange && (
            <>
              <div className="d-flex flex-column m-4">
                <input
                  type="text"
                  name="assetname"
                  value={assetDetails.assetname}
                  onChange={assetChangeHandler}
                  placeholder="assetname"
                  required
                  className="m-2"
                />

                <input
                  type="number"
                  name="quantity"
                  value={assetDetails.quantity}
                  onChange={assetChangeHandler}
                  placeholder="quantity"
                  required
                  className="m-2"
                />

                <input
                  type="number"
                  name="cost"
                  value={assetDetails.cost}
                  onChange={assetChangeHandler}
                  placeholder="cost"
                  required
                  className="m-2"
                />
                <input
                  type="button"
                  name="Add Assets"
                  value="Add Assets"
                  onClick={AddAssetHandler}
                  placeholder=""
                  required
                  className="m-2"
                />

                <input
                  type="button"
                  name="submit details"
                  value="submit Details"
                  onClick={submitHandler}
                  placeholder=""
                  required
                  className="m-2"
                />
              </div>
            </>
          )}
        </form>
      </>
    );
}

export default HomePage;