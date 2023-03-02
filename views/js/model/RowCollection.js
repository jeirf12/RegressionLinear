class RowCollection {
  constructor(rows) {
    this.rows = rows;
  }

  size() {
    return this.rows.getRows().length;
  }

  getRows() {
    return this.rows.getRows();
  }

  summationX() {
    let sumX = 0;
    this.rows.getRows().forEach((row) => {
      sumX = row.X + sumX;
    });
    return sumX;
  }

  summationY() {
    let sumY = 0;
    this.rows.getRows().forEach((row) => {
      sumY = row.Y + sumY;
    });
    return sumY;
  }

  summationXY() {
    let sumXY = 0;
    this.rows.getRows().forEach((row) => {
      sumXY += row.Y * row.X;
    });
    return sumXY;
  }

  summationSquareX() {
    let sumXX = 0;
    this.rows.getRows().forEach((row) => {
      sumXX += row.X * row.X;
    });
    return sumXX;
  }

  summationSquareY() {
    let sumYY = 0;
    this.rows.getRows().forEach((row) => {
      sumYY += row.Y * row.Y;
    });
    return sumYY;
  }

  getColumnX() {
    let array = [];
    this.rows.getRows().forEach((row) => {
      array.push(row.X);
    });
    return array;
  }

  getColumnY() {
    let array = [];
    this.rows.getRows().forEach((row) => {
      array.push(row.Y);
    });
    return array;
  }

  averageX() {
    let average = this.summationX() / this.size();
    return average;
  }

  averageY() {
    let average = this.summationY() / this.size();
    return average;
  }

  getCovariance() {
    let firstTerm = this.summationXY() / this.size();
    let secondTerm = this.averageX() * this.averageY();
    let covariance = firstTerm - secondTerm;
    return covariance;
  }

  getSCR() {
    let a = this.getA();
    let b = this.getB();

    let sumY = this.summationY();
    let sumXY = this.summationXY();
    let n = this.size();
    let valueAverageY = this.averageY();
    let scr = a * sumY + b * sumXY - n * (valueAverageY * valueAverageY);
    return scr;
  }

  getSCE() {
    let firstTerm = this.summationY() * this.summationY();
    let secondTerm = this.getA() * this.summationY();
    let thirdTerm = this.getB() * this.summationXY();
    let sce = firstTerm - secondTerm - thirdTerm;
    return sce;
  }

  getSCT() {
    let sumyy = this.summationY() * this.summationY();
    let n = this.size();
    let averageyy = this.averageY() * this.averageY();
    let sct = sumyy - (n * averageyy);
    return sct;
  }

  getCMR() {
    let cmr = this.getSCR() / 1;
    return cmr;
  }

  getCME() {
    let cme = this.getSCE() / (this.size() - 2);
    return cme;
  }

  getF() {
    let f = this.getCMR() / this.getCME();
    return f;
  }

  getB() {
    let numerator =
      this.summationXY() - this.size() * this.averageX() * this.averageY();
    let divisor =
      this.summationSquareX() - this.size() * this.averageX() * this.averageX();
    let b = numerator / divisor;
    return b;
  }

  getA() {
    let a = this.averageY() - this.getB() * this.averageX();
    return a;
  }

  getFunction() {
    let result = this.getA() + "+" + (this.getB() + "x");
    return result;
  }

  getFunctionCalculatedY(valueX) {
    let result = this.getA() + (this.getB() * valueX); 
    return result;
  }

  getFunctionCalculatedX(valueY) {
    let result = (valueY - this.getA()) / this.getB(); 
    return result;
  }

  getValuesFunction() {
    let miArray = [];
    let auxA = this.getA();
    let auxB = this.getB();
    this.rows.getRows().forEach((row) => {
      let termB = auxB * row.X;
      let complete = auxA + termB;
      miArray.push(complete);
    });
    return miArray;
  }

  getSX() {
    let sx;
    let firstTerm = this.summationSquareX() / this.size();
    let average = this.averageX();
    let secondTerm = average * average;
    sx = Math.sqrt(firstTerm - secondTerm);
    return sx;
  }

  getSY() {
    let sy;
    let firstTerm = this.summationSquareY() / this.size();
    let average = this.averageY();
    let secondTerm = average * average;
    sy = Math.sqrt(firstTerm - secondTerm);
    return sy;
  }

  getCorrelation() {
    let correlation = "";
    let result = this.getCovariance() / (this.getSX() * this.getSY());
    if(result <= 0 || result < 0.2) correlation = result+" --> No existe correlacion lineal entre variables";
    else if(result <= 0.2 || result < 0.5) correlation = result+" --> La correlacion entre las variables es debil";
    else if(result <= 0.5 || result < 0.7) correlation = result+" --> La correlacion entre las variables es fuerte";
    else if(result <= 0.7 || result < 1) correlation = result+" --> La correlacion entre las variables es optima";
    return correlation;
  }
}

export { RowCollection }
