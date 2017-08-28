function charLen(sStr) {
    sStr = sStr.toString();
    var iLen = sStr.length;
    var iUcCharLen = 2;
    var realLength = 0, charCode = -1;

    for (var i = 0; i < iLen; i++) {
        charCode = sStr.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += iUcCharLen;
    }

    return realLength;
}

function isEmpty(mVal) {
    if (mVal === null || mVal === undefined) {
        return true;
    }

    if ( mVal.length !== undefined) {
        return mVal.length === 0;
    } else {
        var iLen = 0;
        $.each(mVal, function() {iLen ++});
        return iLen === 0;
    }
}

 function parseTime(sDate) {
    var iTime = new Date(sDate).getTime() / 1000;
    return isNaN(iTime) ? 0 : iTime;
}

// YYYY-mm-dd 형식의 날자 받아 오기
function getFormatDate(oDate) {

    // 인자가 없으면 현재를 받아옴
    oDate = oDate === undefined ? new Date() : oDate;

    var sY = oDate.getFullYear().toString();
    var sM = (oDate.getMonth() + 1).toString();
    var sD = oDate.getDate().toString();

    // 월 처리
    sM = (sM.length === 1) ? '0' + sM : sM;

    // 일 처리
    sD = (sD.length === 1) ? '0' + sD : sD;

    return sY + '-' + sM + '-' + sD;
}

var oOperator = {
    'gte' : function(mVal, mRuleVal) {
        return mVal >= mRuleVal;
    },
    'lte' : function(mVal, mRuleVal) {
        return parseFloat(mVal) <= parseFloat(mRuleVal);
    },
    'eq' : function(mVal, mRuleVal) {
        if (notNull(mRuleVal) === false) {
            return isEmpty(mVal);
        }
        return mVal == mRuleVal;
    },
    'not_eq' : function(mVal, mRuleVal) {
        return mVal != mRuleVal;
    },
    'gt' : function(mVal, mRuleVal) {
        return parseFloat(mVal) > parseFloat(mRuleVal);
    },
    'lt' : function(mVal, mRuleVal) {
        return parseFloat(mVal) < parseFloat(mRuleVal);
    },
    'divide' : function(mVal, mRuleVal) {
        return parseFloat(mVal) % parseFloat(mRuleVal) === 0;
    },
    'not_divide' : function(mVal, mRuleVal) {
        return parseFloat(mVal) % parseFloat(mRuleVal) !== 0;
    }
};
var oValidation = {
    value : {
        'in' : function(mVal, mRuleVal) {
            if (typeof mRuleVal !== 'object') {
                mRuleVal = mRuleVal.split(',').map(function(v) {return $.trim(v)});
            }

            return mRuleVal.indexOf(mVal.toString()) >= 0;
        },
        'not_in' : function(mVal, mRuleVal) {
            if (typeof mRuleVal !== 'object') {
                mRuleVal = mRuleVal.split(',').map(function(v) {return $.trim(v)});
            }

            return mRuleVal.indexOf(mVal.toString()) === -1;
        },
        'in_scope' : function(mVal, mRuleVal) {
            if (typeof mRuleVal !== 'object') {
                mRuleVal = mRuleVal.split(',');
            }
            mVal = parseFloat(mVal);
            return mVal >= parseFloat(mRuleVal[0]) && mVal <= parseFloat(mRuleVal[1]);
        },
        'notIn_scope' : function(mVal, mRuleVal) {
            if (typeof mRuleVal !== 'object') {
                mRuleVal = mRuleVal.split(',');
            }
            mVal = parseFloat(mVal);

            return mVal < parseFloat(mRuleVal[0]) || mVal > parseFloat(mRuleVal[1]);
        }
    },
    valueType : {
        is_number : function(mVal, mRuleVal) {
            var bIsNumber = mVal == '0' || (/^[1-9]([0-9]+)?$/.test(mVal));
            return mRuleVal === 'T' ? bIsNumber : !bIsNumber;
        },
        is_date : function(mVal, mRuleVal) {
            var sRegx = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])'
                + '|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)'
                + '|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])'
                + '|(?:0[48]|[2468][048]|[13579][26])00)-02-29)'
                + '( [0-2][0-4]:[0-5][0-9]:[0-5][0-9])?$';

            var oRegx = new RegExp(sRegx);
            var bIsDate = oRegx.test(mVal);
            return mRuleVal === 'T' ? bIsDate : !bIsDate;
        },
        // [날짜] 해당 날짜보다 이전인지 체크
        lt_date : function (mVal, mRuleVal) {

            mRuleVal = mRuleVal === 'today' ? getFormatDate() : mRuleVal;
            mRuleVal = mRuleVal.replace(/-|\//g, '').substr(0, 8);
            mVal = mVal.replace(/-|\//g, '').substr(0, 8);

            return mVal < mRuleVal;
        },
        // [날짜] 해당 날짜보다 이인지 체크
        gt_date : function (mVal, mRuleVal) {

            mRuleVal = mRuleVal === 'today' ? getFormatDate() : mRuleVal;
            mRuleVal = mRuleVal.replace(/-|\//g, '').substr(0, 8);
            mVal = mVal.replace(/-|\//g, '').substr(0, 8);

            return mVal > mRuleVal;
        },
        // [날짜] 해당 날짜와 동일한지 체크
        eq_date : function (mVal, mRuleVal) {

            mRuleVal = mRuleVal === 'today' ? getFormatDate() : mRuleVal;
            mRuleVal = mRuleVal.replace(/-|\//g, '').substr(0, 8);
            mVal = mVal.replace(/-|\//g, '').substr(0, 8);

            return mVal === mRuleVal;
        },
        // 숫자 형식인지 체크합니다 (양수 O,  음수 O, 소수 X, 0으로시작하는 수 X)
        is_number_nga: function (mVal, mRuleVal) {
            var bIsNumber = mVal == '0' || (/^-?[1-9]([0-9]+)?$/.test(mVal));
            return mRuleVal === 'T' ? bIsNumber : !bIsNumber;
        },
        // 숫자 형식인지 체크합니다 (양수 O,  음수 X, 소수 O, 0으로시작하는 수 X)
        is_number_pos: function (mVal, mRuleVal) {

            var oRegExp = /^(\d+)((\.)?(\d+)?)?$/;
            var aMatch = oRegExp.exec(mVal);

            if (Array.isArray(aMatch) === false) {
                return mRuleVal !== 'T';
            }

            return this.is_number(aMatch[1], mRuleVal);
        },
        // 숫자 형식인지 체크합니다 (양수 O,  음수 O, 소수 O, 0으로시작하는 수 X)
        is_number_nga_pos: function (mVal, mRuleVal) {

            var oRegExp = /^(-?)(\d+)((\.)?(\d+)?)?$/;
            var aMatch = oRegExp.exec(mVal);

            if (Array.isArray(aMatch) === false) {
                return mRuleVal !== 'T';
            }

            return this.is_number(aMatch[2], mRuleVal);
        },
         checkNumberScope : function (val, oRule) {
            var iMin = oRule['iMin'];
            var iMax = oRule['iMax'];
            // 값이 설정되지 않을 경우
            if (this.isUndefined(iMin) && this.isUndefined(iMax)) {
                console.error('Check Rule Error', oRule);
                return false;
            }
            // 최대치와 초소치중 한개만 입력될 경우
            if (this.isUndefined(iMax) === true) {
                return parseInt(val) >= iMin;
            } else if (this.isUndefined(iMin) === true) {
                return parseInt(val) <= iMax;
            }
            return parseInt(val) >= iMin && parseInt(val) <= iMax;
        }
    },
    func : {
        func : function() {}
    },
    regex : {
        gt_max_length : function(mVal, mRuleVal) {
            mRuleVal = mRuleVal.split(',').map(function(v) {return $.trim(v);});
            if (mRuleVal[1] === undefined) {return false;}
            var iTmp = parseFloat(mRuleVal[1]);
            if (isNaN(iTmp)) {return false;}

            if (mRuleVal[0] === mRuleVal[1]) {
                return mVal.length > iTmp;
            } else {
                return charLen(mVal) > iTmp;
            }
        },
        regex : function(mVal, mRuleVal) {
            var oRegx = new RegExp(mRuleVal);
            return !oRegx.test(mVal.toString());
        },
        date_in_scope : function(mVal, mRuleVal) {
            if (oValidation.valueType.is_date(mVal, 'T') === false) {
                return false;
            }
            mRuleVal = mRuleVal.split(',').map(function(v) {return $.trim(v)});
            mRuleVal[0] = mRuleVal[0].length === 10 ? parseTime(mRuleVal[0] + ' 00:00:00') : parseTime(mRuleVal[0]);
            if (mRuleVal.length === 2) {
                mRuleVal[1] = mRuleVal[1].length === 10 ? parseTime(mRuleVal[1] + ' 23:59:59') : parseTime(mRuleVal[1]);
            } else {
                mRuleVal[1] = new Date().getTime() / 1000;
            }

            mVal = $.trim(mVal);
            mVal = mVal.length === 10 ? parseTime(mVal + ' 00:00:00') : parseTime(mVal);

            return mVal >= mRuleVal[0] && mVal <= mRuleVal[1];
        },
        date_notIn_scope : function(mVal, mRuleVal) {
            return !oValidation.regex.date_in_scope(mVal, mRuleVal);
        },
        in_space : function(mVal, mRuleVal) {
            var bInSpace = mVal.toString().indexOf(' ') >= 0;
            return mRuleVal === 'T' ? bInSpace : !bInSpace;
        }
    },
    symbol : {
        in_interdict_word : function(mVal, mRuleVal) {
            if (notNull(mRuleVal) === false) {return false;}
            var sRegx = '';
            $.each(mRuleVal.split('/'), function(i, v) {
                if (v.length === 0) {return true;}
                sRegx += '|(' + $.trim(v) + ')';
            });
            if (sRegx.length === 0) {return false;}
            sRegx = sRegx.slice(1);
            var oRegx = new RegExp(sRegx, 'i');
            return oRegx.test(mVal.toString());
        },
        use_special_char : function(mVal, mRuleVal) {
            if (notNull(mRuleVal) === false) {return false;}

            var sRegx = '';
            var aTmp = mRuleVal.split(' ');
            $.each(aTmp, function(i, v) {
                if (v.length === 0) {return true;}
                sRegx += '\\' + $.trim(v);
            });
            if (sRegx.length === 0) {return false;}

            sRegx = '^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9 ' + sRegx + ']+$';
            var oRegx = new RegExp(sRegx);

            return !oRegx.test(mVal.toString());
        },
        not_use_special_char : function(mVal, mRuleVal) {
            if (notNull(mRuleVal) === false) {return false;}
            var sRegx = '';
            var aTmp = mRuleVal.split(' ');
            $.each(aTmp, function(i, v) {
                if (v.length === 0) {return true;}
                sRegx += '\\' + $.trim(v);
            });
            if (sRegx.length === 0) {return false;}
            sRegx = '[' + sRegx + ']+';
            var oRegx = new RegExp(sRegx);

            return oRegx.test(mVal.toString());
        }
    }
};
