import { useState } from "react"

const Star = ({ handleRating, full, onEnter, onLeave }) => {

    return (
        <span 
            role="button" 
            className="star" 
            onClick={handleRating}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {   full ?
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#fcc419"
                    stroke="#fcc419"
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>
                :   <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#fcc419"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="{2}"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                    </svg>
            }
        </span>
    )
}

const StarReview = ({maxStars = 5, onSetRating}) => {
    const [rating, setRating] = useState(0)
    const [temRating, setTempRating] = useState(0)

    function handleRating(rating) {
        setRating(rating)
        onSetRating(rating)
    }

    function handleTempRatingEnter(index) {
        setTempRating(index + 1)
    }

    function handleTempRatingLeave(index) {
        setTempRating(index)
    }


    const starElements = Array.from({length: maxStars}, (_, i) => 
        <Star 
            key={i} 
            full={temRating ? temRating >= i + 1 : rating >= i + 1} 
            handleRating={() => handleRating(i + 1)}
            onEnter={() => handleTempRatingEnter(i)}
            onLeave={() => handleTempRatingLeave(0)}
        />);

    return (
        <div className="star-container">
            <div className="stars">
                {starElements}
            </div>
            <p className="star-text">{temRating || rating || ''}</p>
        </div>
    )
}

export default StarReview;