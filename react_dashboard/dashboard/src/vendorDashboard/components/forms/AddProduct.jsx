import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';


const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [image, setImage] = useState(null);
    
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
    setImage(selectedImage)
}

  const handleAddProduct = async(e)=>{
      e.preventDefault()
    setLoading(true); 

      try {
        const loginToken = localStorage.getItem('loginToken');
          const firmId = localStorage.getItem('firmId')

          if(!loginToken || !firmId){
              console.error("user not authenticated")
          }
          
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('image', image)

        category.forEach((value)=>{
          formData.append('category', value)
        });
   
          const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
            method:'POST',
            body: formData
          })
            const data = await response.json()

            if(response.ok){
              alert('Product added succesfully')
            }
            setProductName("")
            setPrice("");
            setCategory([])
            setImage(null);

      } catch (error) {
          alert('Failed to add Product')
      }finally {
        setLoading(false); 
      }
  }

    return (
    <div className="firmSection">
{loading &&         <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p>Please wait, your product is being added...</p>
      </div>}
  {!loading && 
    <form className="tableForm" onSubmit={handleAddProduct}>
    <h3>Add Product</h3>
        <label >Product Name</label>
        <input type="text" value={productName} onChange={(e)=>setProductName(e.target.value)} />
        <label >Price</label>
        <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        <div className="checkInp">
     <label >Category</label>
         <div className="inputsContainer">
         <div className="checboxContainer">
                 <label>Vegetables</label>
                 <input type="checkbox" value="vegetables" checked ={category.includes('vegetables')}  onChange={handleCategoryChange}/>
               </div>
               <div className="checboxContainer">
                 <label>Fruits</label>
                 <input type="checkbox" value="fruits" checked ={category.includes('fruits')} onChange={handleCategoryChange} />
               </div>
         </div>

   </div>
       
        
        <label >Product Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
    <div className="btnSubmit">
<button type='submit'>Submit</button>
</div>
   </form>
  }
 </div>
  )
}

export default AddProduct