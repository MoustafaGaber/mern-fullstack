import { useState } from "react";
import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI"
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ArticleCard from "../components/ArticleCard";
import ArticlesNotFound from "../components/ArticlesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [Articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchArticles=async()=>{
      try {
           const res=await axios.get("http://localhost:5001/api/articles");
            console.log(res.data);
            setArticles(res.data);
            setIsRateLimited(false);
      } catch (error) {
        console.log(error);
        if(error.response?.status===429){
          setIsRateLimited(true);
        }else{
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      } 
    }

    fetchArticles();
  },[])

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      {loading && <p className="text-center text-primary py-10">Loading...</p>}

      {!loading && Articles.length === 0 && !isRateLimited && <ArticlesNotFound />}

      {Articles.length > 0 && !isRateLimited && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10"> 

            {Articles.map((article) => (
              <ArticleCard key={article._id} article={article} setArticles={setArticles} />
            ))}
      </div>
      )}
     
    
      
      </div>
  )
}

export default HomePage