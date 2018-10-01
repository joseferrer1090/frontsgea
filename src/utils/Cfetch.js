import fetch from "isomorphic-fetch";
//import cookie from "js-cookie";
import { message } from "antd";
const errorMessages = res => `${res.status} ${res.statusText}`;

//#https://github.github.io/fetch/

/* 资源找不到 */
function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}
/* 没有登陆，需要去登陆 */
function check401(res) {
  if (res.status === 401 && !res.url.match("auth")) {
    //  window.location.href = window.location.origin + "/#/login";
  }
  return res;
}

async function checkStatus(response) {
  const res = response.json();
  if (response.status >= 200 && response.status < 300) {
    if(response.status === 204){
      return {"result":"resource updated successfully"}
    }
    return res.then(({ errorCode, errorMsg, result, ...rest }) => {

      if (errorCode) {
        return Promise.reject({
          statusCode: errorCode,
          msg: errorMsg
        });
      }
      return {
        ...rest,
        result
      };
    });
  }
  return res.then(() =>
    Promise.reject({
      statusCode: response.status,
      msg: response.statusText
    })
  );
}

/* 302跳转到登陆页 */
function check302(data) {
  const { errorCode } = data;
  if (errorCode === "302") {
    window.location.href = window.location.origin + "/#/login";
  } else {
    return data;
  }
}

function setUriParam(keys, value, keyPostfix) {
  let keyStr = keys[0];
  keys.slice(1).forEach(key => {
    keyStr += `[${key}]`;
  });
  if (keyPostfix) {
    keyStr += keyPostfix;
  }
  return `${encodeURIComponent(keyStr)}=${encodeURIComponent(value)}`;
}

function getUriParam(keys, object) {
  const array = [];
  if (object instanceof Array) {
    object.forEach(value => {
      array.push(setUriParam(keys, value, "[]"));
    });
  } else if (object instanceof Object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key];

        array.push(getUriParam(keys.concat(key), value));
      }
    }
  } else {
    if (object !== undefined) {
      array.push(setUriParam(keys, object));
    }
  }
  return array.join("&");
}

function toQueryString(object) {
  const array = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const str = getUriParam([key], object[key]);
      if (str !== "") {
        array.push(str);
      }
    }
  }
  return array.join("&");
}

function process(url, options) {
  // let mergeUrl = `${url}?checkSum=${checkSum}`;
  let mergeUrl = `${url}`;
  const defaultOptions = {
    method: "GET",
    credentials: "same-origin"
  };
  let opts = Object.assign({}, defaultOptions, { ...options });
  // add query params to url when method is GET
  if (opts && opts.method === "GET" && opts["params"]) {
    mergeUrl = mergeUrl + "?" + toQueryString(opts["params"]);
  }

  opts.headers = {
    ...opts.headers,
    'Access-Control-Request-Method':'GET, PUT, POST, DELETE, PATCH',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow':"*",
    'origin':'*'
  };

  //"X-csrf-token": "8dfdf4f",
  //Authorization: "access_token" || "" //aqui se obtienen credencial saved

  // Authentication
  if (opts.method === "POST" || opts.method === "PUT" || opts.method === "DELETE") {
    if (Object.prototype.toString.call(opts.body) !== "[object FormData]") {
      opts.body = JSON.stringify(opts.body);
    }
  }
  return { mergeUrl, opts };
}

function cFetch(url, options) {
  const { mergeUrl, opts } = process(url, options);
  return fetch(mergeUrl, opts)
    .then(check404)
    .then(check401)
    .then(checkStatus)
    .then(check302)
    .catch(err => {
      if (err.statusCode) {
        message.error("No es posible conectarse con el servicio");
      } else {
        message.error(err.message || "Regresa en otro momento o comunicate con tu administrador");
      }
      return Promise.reject(err); // 后面的catch 约定不要弹框，不然就会重复弹框了
    });
}

export default cFetch;
