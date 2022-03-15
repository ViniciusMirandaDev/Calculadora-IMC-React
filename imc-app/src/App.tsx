import { useState } from "react";

import styles from "./App.module.css";
import powerImg from "./assets/powered.png";
import leftArrowImg from "./assets/leftarrow.png";

import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/GridItem";

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [showItem, setShowItem] = useState<Level | null>(null);

  const handleCalculationButton = () => {
    if (heightField && weightField) {
      var result = calculateImc(heightField, weightField);
      if (result && result.yourImc !== 0) {
        setShowItem(result);
      } else {
        alert("Não foi possível calcular com esses valores!");
      }
    } else {
      alert("Digite todos os campos!");
    }
  };

  const handleBackButton = () => {
    setShowItem(null);
    setHeightField(0);
    setWeightField(0);
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powerImg} alt="Powered by B7Web logo" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC!</h1>
          <p>
            O índice de massa corporal é uma medida internacional usada para
            calcular se uma pessoa está no peso ideal
          </p>
          <input
            type="number"
            //Verify if is 0, if true placeholder appears
            value={heightField > 0 ? heightField : ""}
            placeholder="Digite a sua altura. Ex: 1.5 (Em metros)"
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={showItem ? true : false}
          />
          <input
            type="number"
            value={weightField > 0 ? weightField : ""}
            placeholder="Digite o seu peso. Ex: 71.5 (Em kg)"
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={showItem ? true : false}
          />

          <button
            onClick={handleCalculationButton}
            disabled={showItem ? true : false}
            title={
              showItem
                ? "Você precisa clicar em voltar para um novo cálculo!"
                : "calcular"
            }
          >
            Calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {!showItem && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                //Map in our levels array, and structure in GridItem component
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {showItem && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImg} alt="Return icon" width={25} />
              </div>
              <GridItem item={showItem} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
