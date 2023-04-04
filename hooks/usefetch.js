import { useState, useEffect } from "react";
import axios from "axios";
import { SPOONACULAR_API_KEY } from "@env";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setIsloading(true);
        try {
            const response = await axios.request(url);
            setData(response.data.data);
            setIsloading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            alert("There is an error");
        } finally {
            setIsloading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const reFetch = () => {
        setIsloading(true);
        fetchData();
    };

    return {
        data,
        isloading,
        error,
        reFetch,
    };
};

export default useFetch;
