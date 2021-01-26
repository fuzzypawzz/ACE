export default (function () {
    function init() {
      let _this = this;

      _this.sayHello = () => {
        console.log("Hello World");
      };
    }

    return init;
})();

/*
var myLibary = new MyLibary; // Pass in configuration if needed
myLibary.sayHello();
*/