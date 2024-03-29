import UserInfo from "./UserInfo";
import ZCard from "./ZCard";
import styles from "./css/main.module.css";

function Profile(){
        return (
          <div className={styles.Profile}>
            <div className={styles.leftSide}><UserInfo /></div>
            <div className={styles.rightSideContainer}>
              <div className={styles.rightSide}><ZCard /></div>
            </div>
          </div>
        );
}
export default Profile;