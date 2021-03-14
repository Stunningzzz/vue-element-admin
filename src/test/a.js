


async function testAwait(){
  try {
    Promise.reject('出错拉')
  } catch (error) {
    console.log('error --- ',error);
  }
}
testAwait();