import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';


const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); 


  const handleCategoryChange = (event)=>{
      const value = event.target.value;
        if(category.includes(value)){
          setCategory(category.filter((item)=> item !== value));
        }else{
          setCategory([...category, value])
        }
  }

 
  const handleImageUpload =(event)=>{
      const selectedImage = event.target.files[0];
      setFile(selectedImage)
  }

  const handleFirmSubmit= async(e)=>{
        e.preventDefault();
    setLoading(true); 

   try {
        const loginToken = localStorage.getItem('loginToken');
        if(!loginToken){
            console.error("User not authenticated");
        }

        const formData = new FormData();
          formData.append('firmName', firmName);
          formData.append('area', area);
          
          formData.append('image', file)

          category.forEach((value)=>{
            formData.append('category', value)
          });

          const response = await fetch(`${API_URL}/firm/add-firm`,{
            method:'POST',
            headers:{
              'token': `${loginToken}`
            },
            body: formData
          });
          const data = await response.json()
          if(response.ok){
            console.log(data);
            setFirmName("");
            setArea("")
            setCategory([]);
            setFile(null)
            alert("Firm added Successfully")
          }else if(data.message === "vendor can have only one firm"){
              alert("Firm Exists 🥗. Only 1 firm can be added  ")
          } else{
              alert('Failed to add Firm')
          }

          const mango = data.firmId;
          const vendorRestuarant = data.vendorFirmName

          localStorage.setItem('firmId', mango);
          localStorage.setItem('firmName', vendorRestuarant)
          window.location.reload()

   } catch (error) {
      console.error("failed to add Firm")
      alert("failed to add Firm")
   } finally {
    setLoading(false); 
  }  
  }


  return (
        <div className="firmSection">
   {loading &&        <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>}
         {!loading &&   <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
                <label >Firm Name</label>
                <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
                <label >Area</label>
                <input type="text"  name='area' value={area} onChange={(e)=>setArea(e.target.value)} />
               
    <div className="checkInp">
      <label >Category</label>
          <div className="inputsContainer">
          <div className="checboxContainer">
                  <label>Vegetables</label>
                  <input type="checkbox" checked ={category.includes('vegetables')}  value="vegetables" onChange={handleCategoryChange}/>
                </div>
                <div className="checboxContainer">
                  <label>Fruits</label>
                  <input type="checkbox" checked ={category.includes('fruits')} value="fruits" onChange={handleCategoryChange}/>
                </div>
          </div>

    </div>
    
                <label >Firm Image</label>
                <input type="file" onChange={handleImageUpload} />
                <br />
            <div className="btnSubmit">
        <button type='submit'>Submit</button>
    </div>
           </form>}
        </div>
  )
}

export default AddFirm