
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { review } from '../apis/ProfileApis/ProfileApis';
import { StarFill } from 'react-bootstrap-icons';
import styles from './rating.module.css'
const Rating = ({ title, access, reviewer_id, reviewed_id, jobEnded }) => {
    const navigate = useNavigate();
    const [done, setDone] = useState(false);
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRate = (event) => {
        event.preventDefault();
        review(
            access,
            reviewer_id,
            reviewed_id,
            rating
        ).then((response) => {
            if (response.status == 200) {
                console.log('rate added successfully')
                setDone(true);
                jobEnded(true);
                navigate('/jobs/Freelancing')
            } else {
                console.log(response);
            }
        })
    }

    if (done === false) {
        return (
            <div className={styles.container}>
                <div className={styles.title}>{title}</div>
                <div className={styles.rating}>
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return (
                            <label>
                                <input
                                    className={styles.my_stars}
                                    type='radio'
                                    name='rating'
                                    value={currentRating}
                                    onClick={() => { setRating(currentRating) }} />
                                <StarFill className={styles.star}
                                    color={currentRating <= (hover || rating) ? "#567EF5" : "#FFFFFF"}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)} />
                            </label>
                        );
                    })}
                </div>
                <div className={styles.button_holder}>
                    <button className={styles.submit} onClick={handleRate}>rate</button>
                    <button className={styles.submit} onClick={() => { setDone(true); jobEnded(true); navigate('/jobs/Freelancing') }}>cancel</button>
                </div>
            </div>
        )
    } else {
        return (
            <></>
        )
    }
};
export default Rating