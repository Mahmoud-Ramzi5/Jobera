import { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ProfileContext } from '../../utils/Contexts';
import styles from './posting_page.module.css'
import fullTimeJob from '../../assets/fullTimeJob.png'
import PartTimeJob from '../../assets/partTimeJob.png'
import freelancingJob from '../../assets/freelancingJob.png'
import PostJob from '../../components/Jobs/PostJob';
import PostFreelancing from '../../components/Jobs/PostFreelancing';



const PostingPage = () => {

    const { profile } = useContext(ProfileContext);

    const [type, setType] = useState('')

    const handleFullTimeJob = (event) => {
        setType('FullTime');
    }

    const handlePartTimeJob = (event) => {
        setType('PartTime');
    }

    const handleFreelancingJob = (event) => {
        setType('Freelancing')
    }

    return (
        <div className={styles.container}>
            <div className={styles.screen}>
                <div className={styles.screen_content}>
                    <h2 className={styles.heading}>Post a job</h2>
                    <div className={styles.all_cards}>
                        {profile.type === "company" ?
                            <>
                                <div className={styles.cardlimit}>
                                    <Card onClick={handleFullTimeJob}>
                                        <div className={styles.card_background}>
                                            <Card.Img
                                                className={styles.Card_Img}
                                                variant="top"
                                                src={fullTimeJob}
                                                alt={'FullTimeJob picture'}
                                            />
                                            <Card.Body>
                                                <Card.Title className={styles.title}> FullTime </Card.Title>
                                            </Card.Body>
                                        </div>
                                    </Card>
                                </div>
                                <div className={styles.cardlimit}>
                                    <Card onClick={handlePartTimeJob}>
                                        <div className={styles.card_background}>
                                            <Card.Img
                                                className={styles.Card_Img}
                                                variant="top"
                                                src={PartTimeJob}
                                                alt={'PartTimeJob picture'}
                                            />
                                            <Card.Body>
                                                <Card.Title className={styles.title}> PartTime </Card.Title>
                                            </Card.Body>
                                        </div>
                                    </Card>
                                </div>
                            </> : <></>}
                        <div className={styles.cardlimit}>
                            <Card onClick={handleFreelancingJob}>
                                <div className={styles.card_background}>
                                    <Card.Img
                                        className={styles.Card_Img}
                                        variant="top"
                                        src={freelancingJob}
                                        alt={'freelancingJob picture'}
                                    />
                                    <Card.Body>
                                        <Card.Title className={styles.title}> Freelancing </Card.Title>
                                    </Card.Body>
                                </div>
                            </Card>
                        </div>
                    </div>
                    {type ? (type === 'FullTime' ? <PostJob type = {type}/> : (type === 'PartTime' ? <PostJob type = {type}/> : <PostFreelancing />)) : <></>}
                </div>
            </div>
        </div>
    );


};
export default PostingPage;