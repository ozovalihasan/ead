const saveJSON = (data: object, filename= 'EAD.json') => {
  
    let dataNew: object | string = data;
    const filenameNew = filename;
  
    if (typeof dataNew === 'object') {
      dataNew = JSON.stringify(dataNew, undefined, 4);
    }
  
    const blob = new Blob([dataNew], { type: 'text/json' });
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
  
    a.download = filenameNew;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  };
  
  export default saveJSON;