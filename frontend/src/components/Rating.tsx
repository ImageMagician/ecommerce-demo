import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarStroke } from "@fortawesome/free-regular-svg-icons";

interface RatingProps {
    value: number;
    text?: string;
}

const Rating = ( { value, text }: RatingProps ) => {
    return (
        <div className={`text-yellow-500 text-sm`}>
            <span>
                { value >= 1
                    ? <FontAwesomeIcon icon={faStar} />
                    : value === 0.5
                        ? <FontAwesomeIcon icon={faStarHalfStroke} />
                        : <FontAwesomeIcon icon={faStarStroke} />
                }
            </span>
            <span>
                { value >= 2
                    ? <FontAwesomeIcon icon={faStar} />
                    : value >= 1.5
                        ? <FontAwesomeIcon icon={faStarHalfStroke} />
                        : <FontAwesomeIcon icon={faStarStroke} />
                }
            </span>
            <span>
                { value >= 3
                    ? <FontAwesomeIcon icon={faStar} />
                    : value >= 2.5
                        ? <FontAwesomeIcon icon={faStarHalfStroke} />
                        : <FontAwesomeIcon icon={faStarStroke} />
                }
            </span>
            <span>
                { value >= 4
                    ? <FontAwesomeIcon icon={faStar} />
                    : value === 3.5
                        ? <FontAwesomeIcon icon={faStarHalfStroke} />
                        : <FontAwesomeIcon icon={faStarStroke} />
                }
            </span>
            <span>
                { value >= 5
                    ? <FontAwesomeIcon icon={faStar} />
                    : value === 4.5
                        ? <FontAwesomeIcon icon={faStarHalfStroke} />
                        : <FontAwesomeIcon icon={faStarStroke} />
                }
            </span>
            <span className={`ml-2 inline-block text-gray-400`}>{ text && `${text} reviews` }</span>
        </div>
    )
}

export default Rating;