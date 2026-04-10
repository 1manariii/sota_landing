import styles from './styles.module.scss'

const Contact = () => {
    return (
        <section className={styles.ctaSection}>
            <div className={`${styles.ctaContent} container`}>
                <h2 className={styles.ctaTitle}>ГОТОВЫ ПРИСОЕДИНИТЬСЯ?</h2>
                <p className={styles.ctaText}>Станьте частью быстрорастущего рынка шеринг-сервисов вместе с SOTA Box</p>
                <button className={styles.ctaButton} onClick={() => window.open('https://docs.google.com/forms/d/1V-kvVo2-4-B11L6t__o51U3nsYyrQbJ2-fhsdfmjw4A/edit')}>ОСТАВИТЬ ЗАЯВКУ</button>
            </div>
        </section>
    )
}

export default Contact;