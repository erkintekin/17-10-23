import axios from "axios";
import React, { useEffect, useState } from "react";

function CovidAPI() {
  //önce APImizin URL'ini bir değişkene tanımlayalım
  const covidURL =
    "https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json";

  //2. aşama bu veriye erişim sağladığımızda değişikliklerin dinlenebilmesi için bir useState hazırlayacağız.
  const [veri, setVeri] = useState([]);
  const [tarih, setTarih] = useState("");

  //3. Bu aşamada yukarıda tanımlamış olduğumuz API linkine istek (request) atabilmek adına sayfamız render edildiği anda axios devreye sokulacak.

  const tarihHandler = (e) => {
    const history = e.target.value;
    // console.log(history);
    setTarih(history);
  };

  //4. aşama inputtan yakaladığımız tarih verisini bir state ile tutarak düzenli olarak her değişikliği dinliyor olacağız.

  useEffect(() => {
    axios
      .get(covidURL)
      .then((res) => setVeri(res.data[tarih]))
      .catch((err) => console.log(err));
  }, [tarih]);

  return (
    <div>
      <div className="text-center">
        <h2>TÜRKİYE GÜNCEL COVID ISTATISTIKLERI</h2>
        <input
          type="text"
          className="form-control my-3 w-50 m-auto"
          placeholder="GG/AA/YYYY"
          onChange={tarihHandler}
        />
        <table className="table table-dark table-striped table-hover table-bordered w-75 m-auto">
          <thead>
            <tr>
              <th>Günlük Hasta Sayısı</th>
              <th>Toplam Hasta Sayısı</th>
              <th>Günlük Test Sayısı</th>
              <th>Toplam Test Sayısı</th>
              <th>Günlük Vefat Sayısı</th>
              <th>Toplam Vefat Sayısı</th>
            </tr>
          </thead>
          <tbody>
            {veri === undefined ? (
              <tr>
                <td colSpan={6} className="table-danger">
                  VERİ BEKLENİYOR
                </td>
              </tr>
            ) : (
              <tr className="table-success">
                <td>{veri.patients}</td>
                <td>{veri.totalPatients}</td>
                <td>{veri.tests}</td>
                <td>{veri.totalTests}</td>
                <td>{veri.deaths}</td>
                <td>{veri.totalDeaths}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CovidAPI;
