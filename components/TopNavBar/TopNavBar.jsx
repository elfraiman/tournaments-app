import styles from "./TopNavBar.module.css";


const TopNavBar = () => {

    return (
        <div className={styles.container}>
            <h2>#BRANDNAME</h2>

            <div>
                <p>
                    UserName
                </p>
            </div>
        </div>
    )
}

export default TopNavBar;