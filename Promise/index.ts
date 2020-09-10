enum PromiseStatus {
    "PENDING" = "pending",
    "FULFILLED" = "fulfilled",
    "REJECTED" = "rejected",
  }
  
  class MyPromise {
    state = PromiseStatus.PENDING;
    value = undefined;
    thenCallbacks = [];
    errorCallbacks = [];
  
    constructor(action) {
      action(this.resolver.bind(this), this.reject(this));
    }
  
    resolver(value) {
      this.state = PromiseStatus.FULFILLED;
      this.value = value;
      this.thenCallbacks.forEach((callback) => {
        callback(this.value);
      });
    }
  
    reject(value) {
      this.state = PromiseStatus.REJECTED;
      this.value = value;
      this.errorCallbacks.forEach((callback) => {
        callback(this.value);
      });
    }
  
    then(callback) {
      this.thenCallbacks.push(callback);
      return this;
    }
  
    catch(callback) {
      this.errorCallbacks.push(callback);
      return this;
    }
  
  }
  