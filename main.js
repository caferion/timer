(function(){
  const timerInput = document.getElementsByClassName('timer-input')[0];
  const timerAddBtn = document.getElementsByClassName('timer-button')[0];
  const timerListEl = document.getElementsByClassName('timer-list')[0];
  const deleteAllTimer = document.getElementsByClassName('clear-button')[0];

  deleteAllTimer.addEventListener('click', clearTimer)

  timerAddBtn.addEventListener('click', clickTimerBtn);
  let index = 0;
  let timerList = [];

  function clearTimer() {
    for(let ix = 0; ix < timerList.length; ix++){
      timerListEl.removeChild(timerList[ix].el.liEl);
    }
    timerList = [];
  }

  function createEl(h, cls) {
    const el = document.createElement(h);
    if (cls) {
      el.classList.add(cls);
    }
    return el;
  }
  function getTitle(idx) {
    return `Timer ${idx} :`
  }

  function createTimerDom(val) {
    const liEl = createEl('li', 'timer-item');
    const txtEl = createEl('span', 'timer-title');
    const valEl = createEl('span', 'timer-value');
    const titleTxt = getTitle(index++);
    txtEl.textContent = titleTxt;
    valEl.textContent = val;
    liEl.append(titleTxt,valEl);
    return { liEl, valEl };
  }
  function getEndTime(val) {
    return new Date().getTime() + (++val * 1000);
  }
  function clickTimerBtn() {
    const val = timerInput.value;
    const timerElObj = createTimerDom(val);

    timerListEl.appendChild(timerElObj.liEl);
    timerList.push({
      endTime: getEndTime(val),
      el: timerElObj,
    })
  }
  function changeTimerText(val,el) {
    el.textContent = val;
  }

  function doTimer() {
    const curr = new Date().getTime();

    for (let ix = 0; ix < timerList.length; ix++) {
      const item = timerList[ix];
      const endTime = item.endTime;
      if(endTime - curr >= 1000) {
        const remainingSec = Math.floor((endTime - curr)/1000);
        console.log(remainingSec)
        changeTimerText(remainingSec, item.el.valEl);
      } else {
        item.endTime = null;
        timerListEl.removeChild(item.el.liEl);
      }
    }
    timerList = timerList.filter((d)=>d.endTime !== null );
    requestAnimationFrame(doTimer);
  }

  requestAnimationFrame(doTimer);

}())
