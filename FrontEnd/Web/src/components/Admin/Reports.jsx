import React from "react";
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
} from "recharts";
import styles from "./Reports.module.css";
import { useState } from "react";

const Reports = () => {
    const [selectedMonth, setSelectedMonth] = useState("February 2024");
    const [selectedYear, setSelectedYear] = useState("2024");

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
            { client: { name: "Client A" }, monthly_amounts: { "February 2024": { amount: 300 } } },
            { client: { name: "Client B" }, monthly_amounts: { "February 2024": { amount: 500 } } },
            { client: { name: "Client C" }, monthly_amounts: { "February 2024": { amount: 700 } } },
        ],
        monthly_totals: [
            { month: "February 2024", amount: 1500 },
            { month: "January 2024", amount: 1200 },
        ],
    };

    return (
        <div className={styles.reportsPage}>
        <table className={styles.tableContainer}>
          <tbody>
            <tr>
              <td className={styles.tableCell}>
                <div>
                  <h2>Jobs Location</h2>
                  <div className={styles.chartContainer}>
                    <h3>Annual</h3>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 25 }, (_, index) => {
                        const year = 2000 + index;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    <BarChart width={400} height={300} data={annualData.items}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" />
                    </BarChart>
                  </div>
                  <div>
                    <h3>Monthly</h3>
                    { (
                      <div>
                        {/* Bar chart */}
                        <BarChart
                          width={400}
                          height={300}
                          data={monthlyData.items}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="total" fill="#8884d8" />
                        </BarChart>
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className={styles.tableCell}>
                <div>
                  <h2>Most Paying Clients</h2>
                  <div>
                    <h3>Annual</h3>
                    <PieChart width={400} height={300}>
                      <Pie
                        dataKey="total_amount"
                        data={annualData.clients}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                  <div>
                    <h3>Monthly</h3>
                    {/* Select month dropdown */}
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      {monthlyData.monthly_data &&
                        Object.values(
                          monthlyData.monthly_data[0].monthly_amounts
                        ).map((item) => (
                          <option key={item.month} value={item.month}>
                            {item.month}
                          </option>
                        ))}
                    </select>
                    {selectedMonth !== "" && monthlyData.monthly_data && (
                      <BarChart
                        width={400}
                        height={300}
                        data={monthlyData.monthly_data}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="client.name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey={`monthly_amounts.${selectedMonth}.amount`}
                          fill="#8884d8"
                        />
                      </BarChart>
                    )}
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
