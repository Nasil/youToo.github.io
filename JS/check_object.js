/**
   * 오브젝트 인지 판단
   * @param obj
   * @returns {boolean}
   */
  isObj : function(obj) {
      return (obj !== null && typeof obj === 'object');
  },

  /**
   * 오브젝트 값 받아오기
   * @param mKeys
   * @param mObj
   * @param mDefault
   * @returns {*}
   */
  getVal : function (mKeys, mObj, mDefault) {

      var self = this;

      if (mDefault === undefined) mDefault = '';
      if (mKeys === undefined) return mDefault;
      if (mKeys instanceof Array === false) {
          mKeys = [mKeys];
      }
      var mVal = mObj;
      $.each(mKeys, function (i, v) {
          if (self.isObj(mVal) === false) {
              mVal = mDefault;
              return false;
          }
          var sKey = v.toString();
          if (mVal[sKey] === undefined) {
              mVal = mDefault;
              return false;
          }
          mVal = mVal[sKey];
      });

      return mVal;
  },

  clone : function(obj) {

      var self = this;

      var o;
      if (typeof obj == "object") {
          if (obj === null) {
              o = null;
          } else {
              if (obj instanceof Array) {
                  o = [];
                  for (var i = 0, len = obj.length; i < len; i++) {
                      o.push(self.clone(obj[i]));
                  }
              } else {
                  o = {};
                  for (var j in obj) {
                      o[j] = self.clone(obj[j]);
                  }
              }
          }
      } else {
          o = obj;
      }
      return o;
  },

  /**
   * path info 정보 받아옴
   * @returns {{}}
   */
  path_info : function() {

      var self = this;

      var sSearch = location.search;
      // 没有检索到
      if (sSearch.length === 0) {
          return {};
      }

      var aSearch = sSearch.slice(1).split('&');
      var oQuery = {};
      $.each(aSearch, function(i, v) {
          var aTmp = v.split('=');
          oQuery[aTmp[0]] = self._default(aTmp[1], '');
      });

      return oQuery;
  },

  /**
   * 디폴트 값 받아오기
   * @param mVal
   * @param mDefault
   * @returns {*}
   * @private
   */
  _default : function(mVal, mDefault) {
      if (mDefault === undefined) {mDefault = '';}

      return (mVal === undefined || mVal === null) ? mDefault : mVal;
  },

  /**
   * 로그 남기
   */
  log : function () {
      //if (this.path_info['debug'] === 'T') {
          console.log('debug: ', arguments);
      //}
  }
