import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Certificates.module.css";
import { ShowCertificates } from "../../apis/ProfileApis";

const Certificates = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  
  useEffect(() => {
    ShowCertificates( "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjUyOGJkZGVmZmYwN2EzMjdkMDI4NTAyMDk4YjllODExODg2ZjYwMTViMjY2ZjU0MDg5OWViZDY5YTA5YzE0MDc0OTUwMzMzNDA0NDg3YmEiLCJpYXQiOjE3MTQzODIxMzUuNDc4MzE0LCJuYmYiOjE3MTQzODIxMzUuNDc4MzE2LCJleHAiOjE3NDU5MTgxMzUuNDcwNjk2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.KgPbgFDzU5uDfn4NbVD5F_xxuSj8Af4qBZKkOjhyhaSmWwXz6LPCB9bjA9RQtNI40IM1UcMsMh4G0dH_3vJqN_bj4knngpi4eZCvKdim1o6V9Ar8V2ZePrJiYAdap-QtOq6zgU4wQuZ5fjEJCQM8uJiQYIVGCYaGbLSO7Uvf3p_2U8zO-meIuptz5F3hNz67B6Lh6Nucgjs8E13euA5IJhAopJ0HparIbd8arsG7-OmZJyTOdKmC54b9i-ZYcZTrKJj_8UaDBc-xal6ujbOWw6YdQ3h2G2SoGjdM52K0fbed0o4Zj3p2-jNcTvj5ulFQWG34V4qEa_7p8yPQwf02lPNZ2IhSbF6NsB1b1LeCcbPE4H26eR9tjOoYXuYqJF8L6ny81MoFBuAQrjjoxcqphdv_RRFSmWpegJBxikk-lFvh9LLrkZK4DJ2fWvLfaXCOJX0KCaB9snp1hEj5EXN_hstKohWaopt0sOYpJikhJqYqn24lXUQd0OvHBAVmqrwmdl2J01wHbVcI9e9x7iD0Q-8Xy8eoLejn__bW-42fcouClWO8JeJ16-C8ptyxwXzU4fHS9q8RnrukEJs9wTfHxtlqem0Dbyilni2OaghNDIzbTytbfl-G6bASv8t_XO2024r2tTFw2AIiotVJmcvRqZlu6ODTepY-BtuOT1EI4Qo")
    .then((response) => {
      if (response.status === 202) {
        setCertificates(response.data.data);
        console.log(certificates);
      }
      else {
        console.log(response.statusText);
      }
    });
  });
  return (
    <div className="container">
      <div className={styles.certificatesContainer}>
        <h1 className={styles.heading}>Certificates</h1>
        <ul className={styles.certificateList}>
          {certificates.length === 0 ? (
            <p className={styles.message}>No certificates found.</p>
          ) : (
            certificates.map((certificate, index) => (
              <li key={index} className={styles.certificateRow}>
                <span>{certificate.name}</span>
                <span>{certificate.organization}</span>
                <span>{certificate.releaseDate}</span>
              </li>
            ))
          )}
        </ul>
        <button className={styles.addButton} onClick={() => navigate("/cer")}>
          Add Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificates;
