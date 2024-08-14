import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";
import { LoginContext } from "../../utils/Contexts";
import { FetchReportsData } from "../../apis/AdminApis";
import styles from "./Reports.module.css";


const Reports = () => {
    // Translations
    const { t, i18n } = useTranslation('global');
    // Context
    const { accessToken } = useContext(LoginContext);
    // Define states
    const [isLoading, setIsLoading] = useState(true);
    const [jobLocations, setJobLocations] = useState([]);
    const [mostSkillTypes, setMostSkillTypes] = useState([]);
    const [topRatedUsers, setTopRatedUsers] = useState([]);
    const [transactionsByMonth, setTransactionsByMonth] = useState([]);

    useEffect(() => {
        FetchReportsData(accessToken).then((response) => {
            if (response.status === 200) {
                setJobLocations(response.data.MostCountries);
                setMostSkillTypes(response.data.MostSkillTypes);
                setTopRatedUsers(response.data.TopRatedUsers);
                setTransactionsByMonth(response.data.TransactionsByMonth)
            } else {
                console.log(response);
            }
        }).then(() => {
            setIsLoading(false);
        });
    }, []);

    const COLORS1 = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AF19FF",
        "#FF6666",
    ];
    const COLORS2 = [
        "#69B2F2",
        "#09806A",
        "#322C8A",
        "#FF8042",
        "#7A21AB",
        "#CA6928",
    ];

    return (
        <div className={styles.reportsPage}>
            <table className={styles.tableContainer}>
                <tbody>
                    <tr>
                        <td className={styles.tableCell}>
                            <div>
                                <h2>{t('components.admin.reports.location')}</h2>
                                <div className={styles.chartContainer}>
                                    <BarChart width={700} height={300} data={jobLocations} style={{ direction: 'ltr' }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        {i18n.language === 'ar' ? <>
                                            <XAxis dataKey="name" reversed={true} />
                                            <YAxis orientation="right" scale="linear" />
                                        </> : <>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                        </>}
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count">
                                            {jobLocations.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </div>
                                <div>
                                    <h2>{t('components.admin.reports.users')}</h2>
                                    <div className={styles.chartContainer}>
                                        <BarChart width={800} height={300} data={topRatedUsers} style={{ direction: 'ltr' }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            {i18n.language === 'ar' ? <>
                                                <XAxis dataKey="name" reversed={true} />
                                                <YAxis orientation="right" scale="linear" />
                                            </> : <>
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                            </>}
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="rating">
                                                {jobLocations.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS1.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className={styles.tableCell}>
                            <div>
                                <h2>{t('components.admin.reports.types')}</h2>
                                <div>
                                    <PieChart width={400} height={300} style={{ direction: 'ltr' }}>
                                        {i18n.language === 'ar' ?
                                            <Pie
                                                dataKey="count"
                                                data={mostSkillTypes}
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label
                                                reversed={true}
                                            >
                                                {mostSkillTypes.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS1[index % COLORS1.length]}
                                                    />
                                                ))}
                                            </Pie>
                                            :
                                            <Pie
                                                dataKey="count"
                                                data={mostSkillTypes}
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label
                                            >
                                                {mostSkillTypes.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS1[index % COLORS1.length]}
                                                    />
                                                ))}
                                            </Pie>}
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </div>
                                <div>
                                    <h2>{t('components.admin.reports.transactions')}</h2>
                                    <div className={styles.chartContainer}>
                                        <BarChart width={400} height={300} data={transactionsByMonth} style={{ direction: 'ltr' }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            {i18n.language === 'ar' ? <>
                                                <XAxis dataKey="month" reversed={true} />
                                                <YAxis orientation="right" scale="linear" />
                                            </> : <>
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                            </>}
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="amount">
                                                {transactionsByMonth.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
