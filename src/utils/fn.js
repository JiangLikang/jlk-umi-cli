// 随机数函数
export const random = (min, max) => {
  return min + Math.ceil(Math.random() * (max - min));
}

// 日期判断函数
export const isDuringDate = (beginDateStr, endDateStr) => {
  var curDate = new Date(),
      beginDate = new Date(beginDateStr),
      endDate = new Date(endDateStr);
  if (curDate >= beginDate && curDate <= endDate) {
      return true;
  }
  return false;
}
// isDuringDate('2020/09/17 13:00', '2020/09/17 15:00');
// isDuringDate('2018-09-17 13:00', '2019-09-17 15:00');


// 是否逾期函数
export const isOverdue = (endDateStr) => {
  var curDate = new Date(),
      endDate = new Date(endDateStr);
  if (curDate > endDate) {
      return true;
  }
  return false;
}

// 时间戳转时间函数
export const timestampToTime = timestamp => {
  var date = new Date(timestamp);

  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}

// 随机时间
export const randomTime = (min,max) => {
  //min,max为时间戳
  const random = min + Math.ceil(Math.random() * (max - min));
  const newStamp = new Date().getTime() - random
  var date = new Date(newStamp);

  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}

//洗牌函数
export const shuffle = (arr) => {
  　　for (var i = arr.length - 1; i >= 0; i--) {
  　　　　var randomIndex = Math.floor(Math.random() * (i + 1));
  　　　　var itemAtIndex = arr[randomIndex];
  　　　　arr[randomIndex] = arr[i];
  　　　　arr[i] = itemAtIndex;
  　　}
  　　return arr;
}

// 防抖
function debounce(fn, wait) {    
  var timeout = null;    
  return function() {        
      if(timeout !== null)   clearTimeout(timeout);        
      timeout = setTimeout(fn, wait);    
  }
}

// 节流
function throttle (func, delay) {            
  var timer = null;            
  return function() {                
      var context = this;               
      var args = arguments;                
      if (!timer) {                    
          timer = setTimeout(function() {                        
              func.apply(context, args);                        
              timer = null;                    
          }, delay);                
      }            
  }        
}   