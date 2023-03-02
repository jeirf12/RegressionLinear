class Row {
  constructor(rows) {
    this.rows = rows;
  }

  getX(index) {
    return this.rows[index].X;
  }

  getY(index) {
    return this.rows[index].Y;
  }

  getRows() {
    return this.rows;
  }
}

export { Row };
