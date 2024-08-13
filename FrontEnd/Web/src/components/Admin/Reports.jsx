import React, { useEffect, useState, useContext } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import styles from "./Reports.module.css";
import { LoginContext } from "../../utils/Contexts";
import { FetchReportsData } from "../../apis/AdminApis";

const Reports = () => {
    const [selectedMonth, setSelectedMonth] = useState("February 2024");
    const [isLoading, setIsLoading] = useState(true);

    const { accessToken } = useContext(LoginContext);
    const [jobLocations, setJobLocations] = useState([]);
    const [mostSkillTypes, setMostSkillTypes] = useState([]);
    const [topRatedUsers, setTopRatedUsers] = useState([]);
    const [transactionsByMonth, setTransactionsByMonth] = useState([]);
    useEffect(() => {
        FetchReportsData(accessToken)
            .then((response) => {
                if (response.status === 200) {
                    setJobLocations(response.data.MostCountries);
                    setMostSkillTypes(response.data.MostSkillTypes);
                    setTopRatedUsers(response.data.TopRatedUsers);
                    setTransactionsByMonth(response.data.TransactionsByMonth)
                } else {
                    console.log(response);
                }
            })
            .then(() => {
                setIsLoading(false);
            });
    }, [accessToken]);
    console.log(mostSkillTypes);

    // Dummy data for demonstration
    const annualData = {
        skills: [
            { name: "Item A", total: 2000 },
            { name: "Item B", total: 3500 },
            { name: "Item C", total: 5000 },
        ],
        clients: [
            { name: "Client A", total_amount: 400 },
            { name: "Client B", total_amount: 700 },
            { name: "Client C", total_amount: 1000 },
        ],
        annual_total_amount: 15000,
    };

    const monthlyData = {
        items: [
            { name: "Item A", total: 500 },
            { name: "Item B", total: 800 },
            { name: "Item C", total: 1200 },
        ],
        monthly_data: [
            {
                client: { name: "Client A" },
                monthly_amounts: { "February 2024": { amount: 300 } },
            },
            {
                client: { name: "Client B" },
                monthly_amounts: { "February 2024": { amount: 500 } },
            },
            {
                client: { name: "Client C" },
                monthly_amounts: { "February 2024": { amount: 700 } },
            },
        ],
        monthly_totals: [
            { month: "February 2024", amount: 1500 },
            { month: "January 2024", amount: 1200 },
        ],
    };
    const COLORS = [
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
                                <h2>Jobs Location</h2>
                                <div className={styles.chartContainer}>
                                    <BarChart width={700} height={300} data={jobLocations}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count">
                                            {jobLocations.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </div>
                                <div>
                                <h2>Top Rated Users</h2>
                                <div className={styles.chartContainer}>
                                    <BarChart width={800} height={300} data={topRatedUsers}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="rating">
                                            {jobLocations.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </div>
                            </div>
                            </div>
                        </td>
                        <td className={styles.tableCell}>
                            <div>
                                <h2>Most Skill Types</h2>
                                <div>
                                    <PieChart width={400} height={300}>
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
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </div>
                                <div>
                                <h2>Transactions</h2>
                                <div className={styles.chartContainer}>
                                    <BarChart width={400} height={300} data={transactionsByMonth}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="amount">
                                            {transactionsByMonth.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
