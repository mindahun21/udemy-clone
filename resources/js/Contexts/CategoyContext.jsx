import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000";

const CategoryContext = createContext();

export function useCategories() {
    return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get(
                    "/categories"
                );
                setCategories(response.data);
            }catch (error) {
                console.error('Failed to fetch categories', error);
            }
        }
        fetchCategories();
    }, []);
    return (
        <CategoryContext.Provider value={categories}>
            {children}
        </CategoryContext.Provider>
    )

}
