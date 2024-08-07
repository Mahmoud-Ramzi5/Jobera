import { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginContext } from '../utils/Contexts';
import { GetTransactions } from '../apis/TransactionsApis';
import Clock from '../utils/Clock';
import styles from './transactions_page.module.css';


const TransactionsPage = () => {
    // Translations
    const { t } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const initialized = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            setIsLoading(true);
            GetTransactions(accessToken).then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    setTransactions(response.data.transactions);
                }
                else {
                    console.log(response);
                }
            }).then(() => {
                setIsLoading(false);
            });
        }
    }, []);

    const RenderTransactions = (transaction) => {

        return (
            <tr key={transaction.id}>
                <td>{transaction.sender.name}</td>
                <td>{transaction.receiver.name}</td>
                <td>{transaction.job.title}</td>
                <td>{transaction.amount}</td>
                <td>
                    {transaction.date}
                </td>
            </tr>
        );
    };

    if (isLoading) {
        return <Clock />
    }
    return (
        <div className={styles.page_screen}>
            <div className={styles.page_content}>
                <table className={styles.transactions_table}>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>From:</th>
                            <th style={{ width: '20%' }}>To:</th>
                            <th style={{ width: '20%' }}>Job title</th>
                            <th style={{ width: '20%' }}>Amount</th>
                            <th style={{ width: '20%' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>{transactions.map(RenderTransactions)}</tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionsPage;
