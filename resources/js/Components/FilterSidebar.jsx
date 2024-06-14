import React, { useState } from "react";
import StarRatings from "react-star-ratings";


const Filter = function ({children, text}) {
  const [isFilterOpen, setFilterOpen] = useState(true);
  return (
      <div className="mb-4 border-y border-slate-300">
          <button
              className="font-bold text-lg flex justify-between items-center w-full h-10 bg-slate-50 px-3"
              onClick={() => setFilterOpen(!isFilterOpen)}
          >
              {text}
              <span>{isFilterOpen ? "-" : "+"}</span>
          </button>
          {isFilterOpen && <div className="px-3 pb-5">{children}</div>}
      </div>
  );
}
const FilterSidebar = ({handleRatingFilterChange}) => {

    return (
        <div className="w-1/4 p-4 bg-white">
            <Filter text="Ratings">
                <ul className="mt-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating, index) => (
                        <li key={index} className="mt-1">
                            <input
                                type="radio"
                                name="rating"
                                value={rating}
                                id={`rating-${index}`}
                                onChange={handleRatingFilterChange}
                            />{" "}
                            <span>
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="gold"
                                    starDimension="12px"
                                    starSpacing="0px"
                                />
                            </span>
                            <span className="text-sm text-gray-400">{rating} & up</span>
                        </li>
                        
                    ))}
                </ul>
            </Filter>
        </div>
    );
};

export default FilterSidebar;
