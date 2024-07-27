let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        console.log(this.step);
        return this;
    },
};

// chaining 
ladder.up().up().down().showStep();

//homework - implement a chaining function
// calc(1).add(2).multiply(3).subtract(4).divide(5).result() // 1+2*3-4/5 = 1