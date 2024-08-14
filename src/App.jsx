import "./App.css";
import { useState } from "react";

function App() {
  const [countryName, setCountryName] = useState("");
  const [goldMedal, setGoldMedal] = useState(0);
  const [silverMedal, setsilverMedal] = useState(0);
  const [copperMedal, setCopperMedal] = useState(0);
  const [countries, setCountries] = useState({});

  const addOrUpdateCountry = () => {
    if (goldMedal < 0 || silverMedal < 0 || copperMedal < 0) {
      alert("메달은 음수값이 될 수 없습니다");
    } else if (isNaN(parseInt(goldMedal)) || isNaN(parseInt(silverMedal)) || isNaN(parseInt(copperMedal))) {
      alert("메달 수를 자연수로 입력해주세요");
    } else {
      setCountries((prevCountries) => ({
        ...prevCountries,
        [countryName]: {
          gold: parseInt(goldMedal),
          silver: parseInt(silverMedal),
          copper: parseInt(copperMedal),
        },
      }));
      setCountryName("");
      setGoldMedal(0);
      setsilverMedal(0);
      setCopperMedal(0);
    }
  };

  const addCountry = () => {
    if (!countryName) alert("국가명을 입력해주세요");
    else if (countryName in countries) alert(`이미 ${countryName}이(가) 있습니다`);
    else addOrUpdateCountry();
  };

  const removeCountry = (country) => {
    setCountries((prevCountries) => {
      const updatedCountries = { ...prevCountries };
      delete updatedCountries[country];
      return updatedCountries;
    });
  };

  const updateCountry = () => {
    if (!countryName) alert("국가명을 입력해주세요");
    else if (!(countryName in countries)) alert("등록되지 않은 국가입니다");
    else addOrUpdateCountry();
  };

  return (
    <div className="container">
      <h1>2024 파리 올림픽 메달 트래커</h1>
      <form className="input-group">
        <div className="input_field">
          <label>국가명</label>
          <input
            onChange={(e) => setCountryName(e.target.value)}
            type="text"
            placeholder="국가 입력"
            value={countryName}
          />
        </div>
        <div className="input_field">
          <label>금메달</label>
          <input onChange={(e) => setGoldMedal(e.target.value)} type="number" min="0" value={goldMedal} />
        </div>
        <div className="input_field">
          <label>은메달</label>
          <input onChange={(e) => setsilverMedal(e.target.value)} type="number" min="0" value={silverMedal} />
        </div>
        <div className="input_field">
          <label>동메달</label>
          <input onChange={(e) => setCopperMedal(e.target.value)} type="number" min="0" value={copperMedal} />
        </div>
        <div className="button-group">
          <button type="button" onClick={addCountry}>
            국가 추가
          </button>
          <button type="button" onClick={updateCountry}>
            업데이트
          </button>
        </div>
      </form>
      <div>
        {Object.keys(countries).length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>국가명</th>
                <th>금메달</th>
                <th>은메달</th>
                <th>동메달</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(countries)
                .sort(([, a], [, b]) => {
                  if (a.gold !== b.gold) return b.gold - a.gold;
                  else {
                    if (a.silver !== b.silver) return b.silver - a.silver;
                    else return b.copper - a.copper;
                  }
                })
                .map(([key, value]) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value.gold}</td>
                      <td>{value.silver}</td>
                      <td>{value.copper}</td>
                      <td>
                        <button onClick={() => removeCountry(key)}>삭제</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p>아직 추가된 국가가 없습니다. 메달을 추가해보세요!</p>
        )}
      </div>
    </div>
  );
}

export default App;
