import { useEffect, useState } from "react";

export const UseFetchData=(getApiService)=>{
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchData=async()=>{
     setLoading(true);
        try {
          const response = await getApiService();
          if (response && response.data) {
            setData(response?.data?.result);
            setFilteredProducts(response?.data?.result);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return {data,filteredProducts,loading,fetchData,setFilteredProducts}
}
