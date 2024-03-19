let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('done');
  }, 5000);
});

setInterval(async () => {
  console.log('tapos na');
  promise.then((res) => {
    console.log(res);
  });
}, 1000);
