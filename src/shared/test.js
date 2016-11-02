class Test {
  constructor(message) {
    this.message = message;
  }

  read() {
    return `Message passed: ${this.message}`;
  }
}

export default Test;
