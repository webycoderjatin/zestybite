import React, { useState } from "react";
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL;

const DeliveryPartnersForm = () => {
    const [name , setName] = useState("")
    const [phnNum , setPhnNum] = useState("")
    const [email , setEmail] = useState("")
    const [dateOfBirth , setDateOfBirth] = useState("")
    const [haveTwoWheeler , setHaveTwoWheeler] = useState(false)
    const [areaOfOp , setAreaOfOp] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()
        axios.post(`${baseURL}/delivery-partners-registration`,{
            fullName:name,
            phoneNumber:phnNum,
            email:email,
            dateOfBirth:dateOfBirth,
            haveTwoWheeler:haveTwoWheeler,
            areaOfOperation:areaOfOp
            
        })
        .then((response)=>{
            alert("You are registered Successfully")
        })
        .catch((err)=>{
            console.log(err)
        })

    }


  return (
    <div className="del-part-form">
        <h1>Join Now as a Partner</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" name="fullName" value={name} onChange={(e)=>setName(e.target.value)}/>

        <label htmlFor="phnNum">Phone Number</label>
        <input type="number" name="phnNum" value={phnNum} onChange={(e)=>setPhnNum(e.target.value)}/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)}/>
 
        <label htmlFor="ownership">Two-Wheeler Ownership</label>
        <span className="radios">
          <input type="radio" name="ownership" id="yes" value={haveTwoWheeler} onChange={()=>setHaveTwoWheeler(true)}/>
          <label htmlFor="yes">Yes</label>
        </span>
        <span className="radios mb">
          <input type="radio" name="ownership" id="no" value={haveTwoWheeler} onChange={()=>setHaveTwoWheeler(false)}/>
          <label htmlFor="no">No</label>
        </span>

        <label htmlFor="areaOp" >Area of Operation</label>
        <select name="areaOfOperation" value={areaOfOp} onChange={(e)=>setAreaOfOp(e.target.value)}>
          <option value="">-- Select Area of Operation --</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Pune">Pune</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Jalandhar">Jalandhar</option>
          <option value="Lucknow">Lucknow</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Bhopal">Bhopal</option>
          <option value="Indore">Indore</option>
          <option value="Patna">Patna</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Kanpur">Kanpur</option>
          <option value="Surat">Surat</option>
          <option value="Visakhapatnam">Visakhapatnam</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DeliveryPartnersForm;
