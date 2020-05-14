class Ajax {
  /**
   * @param {string} url
   * @param {function} callback
   * @param {object} data
   */
  constructor(url, callback = null, data = null) {
    this.request = new XMLHttpRequest();

    this.url      = url;
    this.callback = callback;
    this.data     = data;

    this.setCallback();
    this.setAjax();
  }

  setCallback() {
    if (this.callback === null) {
      this.callback = this.showResponse;
    }
  }

  /**
   * @param response
   */
  showResponse(response) {
    console.log(response);
  }

  setAjax() {
    if (this.data) {
      this.ajaxPost();
    } else {
      this.ajaxGet();
    }
  }

  ajaxGet() {
    this.request.open("GET", this.url);
    this.runAjax();
  }

  ajaxPost() {
    this.request.open("POST", this.url);
    this.runAjax();
  }

  runAjax() {
    this.listenAjax();
    this.request.send(this.data);
  }

  listenAjax() {
    this.request.addEventListener("load", this.listenLoad.bind(this));
    this.request.addEventListener("error", this.listenError.bind(this));
  }

  listenLoad() {
    if (this.request.status >= 200 && this.request.status < 400) {
      this.callback(this.request.responseText);

    } else {
      console.error(this.request.status + " " + this.request.statusText + " " + this.url);
    }
  }

  listenError() {
    console.error("Network Error @URL => " + this.url);
  }
}
